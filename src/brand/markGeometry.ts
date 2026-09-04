/**
 * The Upvote mark's centreline, and the upright heart that is the SAME ribbon.
 *
 * The mark is not freeform artwork — it is a constant-width stroked ribbon, and its centreline is a
 * TURTLE WALK: straight runs at exactly ±45°, two hooks of exactly 180°, one elbow of exactly +90°.
 * Reconstructing it from the seven numbers below and pixel-diffing the stroke against the official
 * `apps/expo/assets/images/brand/heart/heart-main.svg` at 512×592 gives IoU ≈ 0.999, missing 25 of
 * ~157,000 ink pixels. The mark IS this walk, to rasterisation tolerance.
 *
 * Which means the easter egg is a fact about the brand, not an effect we are adding: change three
 * lengths and the handedness of one hook and the same ribbon stands up as a symmetric heart. Total
 * arc length differs by 0.17% between the two poses — it is one strip of ribbon in both.
 *
 * ⛔ INTERPOLATE THE PARAMETERS, NEVER THE SAMPLED POINTS. Because the grammar fixes every angle and
 * both radii, a pose is fully determined by (L0, L1, L2, L3, R, bank). Walking an interpolated
 * parameter set gives an exactly length-controlled, always-valid ribbon for free — no curve
 * interpolation, no accumulation error, no re-anchoring. Interpolating sampled centreline points
 * instead does not preserve arc length and visibly crushes the strip mid-transition.
 *
 * Same `"worklet"` contract as the rest of `splash/`: inert directives, no imports at all.
 */

/** Half the ribbon's width. */
export const HALF_WIDTH = 37.5
/** The hook's centreline radius. */
export const HOOK_RADIUS = 74.9

/**
 * ⛔ `HALF_WIDTH` is ALGEBRAIC, not a fit. The artwork encodes it: `HEART_PATH_B` contains the
 * literal `53.03`, which is `37.5 × √2` — the diagonal of the round cap on a ±45° run — and the
 * elbow's join radius is 37.5 as well. Fitting width against the raster instead gives 37.41–37.50
 * with the same IoU to three decimal places, because width and radius trade against each other at
 * the rasterisation floor. Pin the value the artwork states and fit the radius to it.
 *
 * `HOOK_RADIUS` is then measured: 74.90 is the optimum at this width. The tempting round answer
 * R = 2·HALF_WIDTH = 75 is measurably WORSE (IoU 0.99616 against 0.99898) — it is not 2w.
 */

/** A pose: four run lengths, the hook radius, and the bank that carries the handedness. */
export interface RibbonParams {
  readonly l0: number
  readonly l1: number
  readonly l2: number
  readonly l3: number
  readonly radius: number
  /**
   * The SIGNED turn of the second hook, radians: −π in the heart, +π in the mark. The hook's ARC
   * LENGTH is fixed, so its radius follows from this angle — at ±π it is the mark's own hook, and
   * as the angle approaches zero the hook unrolls toward a straight run of the same length.
   *
   * ⛔ THIS REPLACED AN OUT-OF-PLANE BANK, AND IT MUST NOT GO BACK. A symmetric upright heart
   * genuinely needs the opposite hook handedness from the mark (verified: no set of lengths gives
   * one with the mark's handedness), so something has to invert. Rotating the hook's turn PLANE
   * through 180° does invert it, but it swings the hook ~150 units — twice the ribbon's width —
   * through depth, turns it edge-on at 90°, and the strip renders as a blade with holes punched in
   * it. Unrolling instead keeps every frame flat, in-plane and a valid constant-width ribbon.
   */
  readonly turn2: number
}

/** Where the walk begins, and heading, in the authored 404.06 × 349.18 box (y grows downward). */
export const WALK_START = [198.34, 311.66, 0] as const
const R2 = Math.SQRT1_2
export const WALK_HEADING = [R2, -R2, 0] as const

/** The brand mark, as worn. Every landmark below was measured off the official artwork. */
export const MARK_PARAMS: RibbonParams = {
  l0: 206.92,
  l1: 201.66,
  l2: 51.85,
  l3: 45,
  radius: HOOK_RADIUS,
  turn2: Math.PI,
}

/**
 * The upright heart. Symmetric by construction (l0 = l3, l1 = l2), which is what makes it read as a
 * standard heart rather than the lopsided one the mark shows when you merely turn it 90°.
 *
 * ⚠ That lopsided version is free — the authored mark rotated 90° IS a heart, with zero
 * deformation, and it is the heart the reference film uses. We deliberately do not use it: a tilted
 * heart is the logo's heart, and the point of this animation is to show the heart as ITSELF first.
 * That choice is what costs us the bank flip and the length changes.
 */
export const HEART_PARAMS: RibbonParams = {
  l0: 201.66,
  l1: 51.9,
  l2: 51.9,
  l3: 201.66,
  radius: HOOK_RADIUS,
  turn2: -Math.PI,
}

/** `l3` is UNOBSERVABLE in the artwork — the tail is fully occluded by the `l1` run. */
export const L3_VALID_RANGE = [10, 51.8] as const

export function lerpParams(a: RibbonParams, b: RibbonParams, u: number): RibbonParams {
  "worklet"
  return {
    l0: a.l0 + (b.l0 - a.l0) * u,
    l1: a.l1 + (b.l1 - a.l1) * u,
    l2: a.l2 + (b.l2 - a.l2) * u,
    l3: a.l3 + (b.l3 - a.l3) * u,
    radius: a.radius + (b.radius - a.radius) * u,
    turn2: a.turn2 + (b.turn2 - a.turn2) * u,
  }
}

/** Total centreline length. Both hooks are exactly half-circles, so they contribute πR each. */
export function totalLength(p: RibbonParams): number {
  "worklet"
  // Both hooks contribute πR no matter what angle hook 2 is currently turning through — that is
  // the whole point of deriving its radius from its angle, and it is what keeps the ribbon
  // inextensible across the transition.
  return p.l0 + p.l1 + p.l2 + p.l3 + 2 * Math.PI * p.radius
}

/**
 * The arc-length fractions of the walk's structural boundaries: cap, hook-1 in/out, elbow,
 * hook-2 in/out, tail.
 *
 * ⛔ THESE MIGRATE, so nothing downstream may cache them. The elbow sits at fraction 0.500 in the
 * heart and 0.660 in the mark, because `l1` and `l3` swap roles between the poses. The twist step,
 * the bank window and the run boundaries are all defined in arc-length fraction, so they must be
 * re-derived from the CURRENT parameters every frame.
 */
export function knotFractions(p: RibbonParams): number[] {
  "worklet"
  const hook = Math.PI * p.radius
  const total = totalLength(p)
  const marks = [0, p.l0, hook, p.l1, 0, p.l2, hook, p.l3]
  const out: number[] = []
  let acc = 0
  for (let i = 0; i < marks.length; i++) {
    acc += marks[i]
    out.push(acc / total)
  }
  return out
}

/**
 * The mark's own gradient, lifted verbatim from `heart-main.svg` with its `gradientTransform`
 * pre-applied, so these are authored-space coordinates. It dresses the half-heart path; the swoosh
 * is flat `#8DDB90`, which is also this gradient's own light stop — which is why the two paths read
 * as one continuous ribbon in the finished mark.
 */
export const BRAND_GRADIENT = {
  x1: 15.06,
  y1: 172.5,
  x2: 287.74,
  y2: -97.12,
  dark: "#00a23d",
  light: "#8ddb90",
} as const

const GRAD_UX = BRAND_GRADIENT.x2 - BRAND_GRADIENT.x1
const GRAD_UY = BRAND_GRADIENT.y2 - BRAND_GRADIENT.y1
const GRAD_LEN = GRAD_UX * GRAD_UX + GRAD_UY * GRAD_UY

/**
 * How far the ribbon lifts out of plane where it weaves over itself, in units of half-width.
 *
 * ⛔ WITHOUT THIS THE MARK STACKS WRONG. At rest the walk is planar, so every sample has z = 0, the
 * depth sort has nothing to order by, and whichever run happens to come last wins the crossing.
 *
 * Which strand is actually in front is not a judgement call — the artwork states it. `heart-main.svg`
 * paints the half-heart first and the swoosh second, and later paint wins, so the SWOOSH passes IN
 * FRONT. The weave therefore ramps from the swoosh side (toward the camera) to the half-heart side
 * (away), smoothly, across the dress seam — where the two strands are far apart and the ramp cannot
 * be seen. Amplitude is kept small: at the camera distance used here it shifts the silhouette by
 * well under a pixel, so it buys the correct stacking without disturbing the geometry.
 */
export const WEAVE_DEPTH = 0.25

/** Samples in the elbow's round-join fan. */
export const JOIN_FAN = 10

/**
 * Where the ribbon's dress changes, in arc-length units PAST the elbow.
 *
 * ⛔ MEASURE THIS WITH PAINT ORDER IN MIND. `heart-main.svg` draws the half-heart and then the
 * swoosh, and the two paths OVERLAP — so wherever both cover a point, the swoosh is what you see.
 * Testing "is this point inside the half-heart" answers a different question than "what colour is
 * this point", and the two disagree across the entire run between hook 1 and the elbow: that stretch
 * is inside the half-heart and painted over by the swoosh. Believing the first measurement dressed a
 * third of the mark in the gradient and rendered it visibly too dark.
 *
 * Sampling the VISIBLE dress along the walk gives flat swoosh to 0.705, gradient to 0.969, then the
 * tail — which is occluded anyway. The gradient therefore dresses essentially just the second hook:
 * the dark bowl, and nothing else.
 */
export const DRESS_SEAM_AFTER_ELBOW = 44

/** Rodrigues rotation of `v` about unit axis `k` by `ang`, written into `out`. */
function rotateAbout(v: number[], k: number[], ang: number, out: number[]): void {
  "worklet"
  const c = Math.cos(ang)
  const s = Math.sin(ang)
  const kd = k[0] * v[0] + k[1] * v[1] + k[2] * v[2]
  out[0] = v[0] * c + (k[1] * v[2] - k[2] * v[1]) * s + k[0] * kd * (1 - c)
  out[1] = v[1] * c + (k[2] * v[0] - k[0] * v[2]) * s + k[1] * kd * (1 - c)
  out[2] = v[2] * c + (k[0] * v[1] - k[1] * v[0]) * s + k[2] * kd * (1 - c)
}

/** The walk's output: centreline samples, the twist at each, and where the knots landed. */
export interface WalkResult {
  xyz: number[]
  /**
   * The exact tangent at each sample, flat xyz.
   *
   * ⛔ THE WALK MUST HAND THESE OVER; they cannot be recovered by differencing the positions. Round
   * joins and round caps are emitted as FANS — runs of samples that share one position while the
   * heading rotates through the corner — so a finite-difference tangent there is exactly zero and
   * the strip tears open. The walk knows every tangent in closed form anyway, so differencing was
   * only ever an approximation.
   */
  tangent: number[]
  twist: number[]
  /**
   * Position along the brand's gradient axis, 0 at its dark stop and 1 at its light stop, per
   * sample. Carried by the walk because it is a property of the ribbon's DRESS, computed in
   * authored space before any camera transform touches it — so the mark wears the brand's own
   * gradient no matter how the animation is rotating it.
   */
  gradT: number[]
  /** Sample indices of the structural boundaries, for knot-aware run splitting. */
  knotIndex: number[]
  /**
   * The sample at which the dress changes from the flat swoosh to the gradient half-heart.
   *
   * A run boundary has to land EXACTLY here. A run is one flat-or-gradient polygon, so if the seam
   * falls inside a run the colour cannot change until the next boundary — up to half a run late —
   * and the edge you see is wherever two runs happen to overlap rather than the ribbon's own
   * cross-section. That reads as a rough, kinked diagonal instead of a clean cut across the strip.
   */
  seamIndex: number
  /**
   * Flat [start, end] sample-index pairs covering every zero-length FAN.
   *
   * A run boundary may not land inside one. Fan samples share a single position, so a polygon that
   * starts or ends in the middle of one is degenerate and leaves a hairline crack between
   * neighbouring runs — visible as a white sliver across the ribbon at the elbow.
   */
  fans: number[]
}

/**
 * Walk the turtle and sample the centreline.
 *
 * ⛔ SAMPLING IS KNOT-AWARE: every structural boundary gets a sample exactly on it. Distributing
 * samples uniformly over the whole strip instead lets a boundary fall between samples, which cuts
 * the corner and costs an order of magnitude in silhouette accuracy (measured: 0.055% → 0.90% XOR
 * against the brand artwork). The elbow is the worst offender because it is a hard crease.
 */
export function walkCentreline(p: RibbonParams, samples = 320): WalkResult {
  "worklet"
  const hookLen = Math.PI * p.radius
  const segLens = [p.l0, hookLen, p.l1, p.l2, hookLen, p.l3]
  const total = totalLength(p)

  const xyz: number[] = []
  const tangent: number[] = []
  const twist: number[] = []
  const gradT: number[] = []
  const knotIndex: number[] = [0]
  const fans: number[] = []
  let seamIndex = -1

  const pos: number[] = [WALK_START[0], WALK_START[1], WALK_START[2]]
  const head: number[] = [WALK_HEADING[0], WALK_HEADING[1], WALK_HEADING[2]]
  const tmp = [0, 0, 0]

  // Where the dress changes — past the elbow, on the run into the second hook.
  const seamAt = (p.l0 + hookLen + p.l1 + DRESS_SEAM_AFTER_ELBOW) / total
  // The weave ramps across the seam: +z (toward the camera) on the swoosh, −z on the half-heart.
  const weaveAmp = WEAVE_DEPTH * HALF_WIDTH
  const weaveLo = seamAt - 0.06
  const weaveHi = seamAt + 0.06

  let walked = 0
  const push = (): void => {
    const f = walked / total
    const e = f <= weaveLo ? 0 : f >= weaveHi ? 1 : (f - weaveLo) / (weaveHi - weaveLo)
    const smooth = e * e * (3 - 2 * e)
    xyz.push(pos[0], pos[1], pos[2] + weaveAmp * (1 - 2 * smooth))
    tangent.push(head[0], head[1], head[2])
    const dressed = walked / total >= seamAt
    if (dressed && seamIndex < 0) seamIndex = xyz.length / 3 - 1
    twist.push(dressed ? Math.PI : 0)
    const gx = pos[0] - BRAND_GRADIENT.x1
    const gy = pos[1] - BRAND_GRADIENT.y1
    gradT.push(Math.min(1, Math.max(0, (gx * GRAD_UX + gy * GRAD_UY) / GRAD_LEN)))
  }

  /**
   * A fan: `n` samples at the CURRENT position while the heading turns through `ang` about `ax`.
   * Zero arc length, so it never disturbs the length budget — it exists purely so the strip builder
   * sweeps a proper rounded corner instead of bevelling across it.
   */
  const fan = (ang: number, ax: number[], n: number): void => {
    fans.push(xyz.length / 3 - 1)
    const h0 = [head[0], head[1], head[2]]
    for (let i = 1; i <= n; i++) {
      rotateAbout(h0, ax, ang * (i / n), tmp)
      head[0] = tmp[0]
      head[1] = tmp[1]
      head[2] = tmp[2]
      push()
    }
    fans.push(xyz.length / 3 - 1)
  }

  // ⛔ CAPS ARE NOT FANS. A join fan works because the two strip edges sweep OPPOSITE arcs and the
  // polygon between them has area; at an END they sweep the SAME arc, so the polygon retraces
  // itself, encloses nothing, and the cap shows up as a white notch bitten out of the ribbon. The
  // round caps are emitted by the strip builder instead (`buildRuns`), which has the projected
  // tangent and can lay the semicircle down in screen space.
  push()

  const straight = (len: number): void => {
    const n = Math.max(2, Math.round((samples * len) / total))
    for (let i = 1; i <= n; i++) {
      const step = len / n
      pos[0] += head[0] * step
      pos[1] += head[1] * step
      pos[2] += head[2] * step
      walked += step
      push()
    }
  }

  /**
   * A 180° hook. `bankAngle` tips the TURN PLANE about the tangent: at 0 the hook turns one way in
   * the picture plane, at π it turns the other, and in between it genuinely leaves the plane.
   */
  /**
   * A hook of FIXED arc length `hookLen` turning through the signed angle `turn`, in the picture
   * plane. The radius follows from the angle (r = arc / |turn|), so a shallower angle simply means
   * a longer, lazier curve rather than a shorter one — the ribbon never stretches.
   */
  const hook = (turn: number): void => {
    const n = Math.max(12, Math.round((samples * hookLen) / total))
    if (Math.abs(turn) < 1e-4) {
      // Fully unrolled: the hook is a straight run of exactly its own arc length.
      straight(hookLen)
      return
    }
    const r = hookLen / Math.abs(turn)
    const sign = turn < 0 ? -1 : 1
    const cx = pos[0] - head[1] * r * sign
    const cy = pos[1] + head[0] * r * sign
    const a0 = Math.atan2(pos[1] - cy, pos[0] - cx)
    for (let i = 1; i <= n; i++) {
      const a = a0 + sign * Math.abs(turn) * (i / n)
      pos[0] = cx + r * Math.cos(a)
      pos[1] = cy + r * Math.sin(a)
      const t = a + (sign * Math.PI) / 2
      head[0] = Math.cos(t)
      head[1] = Math.sin(t)
      head[2] = 0
      walked += hookLen / n
      push()
    }
  }

  /**
   * The elbow. The CENTRELINE creases — the corner has no arc length — but the ribbon around it
   * does not: the outer edge has to sweep a quarter circle of radius `HALF_WIDTH` while the inner
   * edge pivots on the vertex. Emitting it as a zero-length fan gets both for free.
   *
   * ⛔ Do not round the centreline instead. Measured against the artwork, rounding the corner costs
   * 0.26% of ink at radius 0.25·w and 1.27% at radius w — the brand creases here, and the round
   * JOIN is what softens it.
   */
  const turn = (ang: number): void => {
    fan(ang, [0, 0, 1], JOIN_FAN)
  }

  straight(segLens[0])
  knotIndex.push(xyz.length / 3 - 1)
  hook(-Math.PI)
  knotIndex.push(xyz.length / 3 - 1)
  straight(segLens[2])
  knotIndex.push(xyz.length / 3 - 1)
  turn(Math.PI / 2)
  straight(segLens[3])
  knotIndex.push(xyz.length / 3 - 1)
  hook(p.turn2)
  knotIndex.push(xyz.length / 3 - 1)
  straight(segLens[5])
  knotIndex.push(xyz.length / 3 - 1)

  return { xyz, tangent, twist, gradT, knotIndex, fans, seamIndex }
}

/**
 * The SVG path for the centreline alone, for the pixel gate: stroking this at `2 × HALF_WIDTH` with
 * round caps and round joins is what must reproduce the brand artwork.
 */
export function centrelinePath(walk: WalkResult): string {
  "worklet"
  const xyz = walk.xyz
  let d = `M${xyz[0].toFixed(2)},${xyz[1].toFixed(2)}`
  for (let i = 3; i < xyz.length; i += 3) {
    d += `L${xyz[i].toFixed(2)},${xyz[i + 1].toFixed(2)}`
  }
  return d
}

/**
 * The centreline between two samples, as an SVG path.
 *
 * The unfurl strokes these rather than masking the artwork: `<Mask>` is honoured by
 * react-native-web and silently ignored by react-native-svg's NATIVE renderer, so a masked draw-on
 * animates in Storybook and pops in fully formed on a phone. A dashed stroke is a plain path
 * property that both renderers implement, and stroking this centreline at the ribbon's own width
 * reproduces the mark to IoU 0.999 — so the draw-on and the finished art are the same shape.
 */
export function centrelinePathRange(walk: WalkResult, from: number, to: number): string {
  "worklet"
  const xyz = walk.xyz
  const a = from < 0 ? 0 : from
  const b = to > xyz.length / 3 - 1 ? xyz.length / 3 - 1 : to
  let d = `M${xyz[a * 3].toFixed(2)},${xyz[a * 3 + 1].toFixed(2)}`
  for (let i = a + 1; i <= b; i++) {
    d += `L${xyz[i * 3].toFixed(2)},${xyz[i * 3 + 1].toFixed(2)}`
  }
  return d
}

/** Arc length between two samples, so each stroked part can carry its own dash. */
export function centrelineLength(walk: WalkResult, from: number, to: number): number {
  "worklet"
  const xyz = walk.xyz
  let total = 0
  for (let i = from + 1; i <= to; i++) {
    const dx = xyz[i * 3] - xyz[(i - 1) * 3]
    const dy = xyz[i * 3 + 1] - xyz[(i - 1) * 3 + 1]
    total += Math.sqrt(dx * dx + dy * dy)
  }
  return total
}

/**
 * A centreline stretch as flat [x0,y0,x1,y1,…] plus the cumulative length at each point.
 *
 * ⛔ THE DRAW-ON ANIMATES `d`, NOT THE DASH PROPS. `strokeDasharray` and `strokeDashoffset` are
 * NOT pass-through in react-native-svg: `extractStroke` runs them through `extractLengthList` in
 * JS, and it drops the offset entirely unless the dasharray is already truthy
 * (`o.strokeDashoffset = strokeDasharray && strokeDashoffset ? … : null`). A worklet writing them
 * straight to the native view bypasses all of that, so the dash silently never applies and the
 * whole stroke renders at once — the mark appears fully formed instead of drawing. On the web the
 * same props work, which is why the preview looked perfect while the phone did not.
 *
 * `d` IS pass-through (`elements/Path.js` sets it directly), so rebuilding the path each frame is
 * the one draw-on that behaves identically in both renderers. Benchmarked at ~0.3ms/frame.
 */
export interface CentrelineRun {
  /** Flat x,y pairs. */
  readonly pts: number[]
  /** Cumulative arc length at each point; last entry is the run's total. */
  readonly cum: number[]
}

export function centrelineRun(walk: WalkResult, from: number, to: number): CentrelineRun {
  const pts: number[] = []
  const cum: number[] = []
  let total = 0
  for (let i = from; i <= to; i++) {
    const x = walk.xyz[i * 3]
    const y = walk.xyz[i * 3 + 1]
    if (i > from) {
      const dx = x - pts[pts.length - 2]
      const dy = y - pts[pts.length - 1]
      total += Math.sqrt(dx * dx + dy * dy)
    }
    pts.push(x, y)
    cum.push(total)
  }
  return { pts, cum }
}

/**
 * The path for the first `shown` units of a run, with the final segment cut part-way so the tip
 * travels smoothly instead of snapping from sample to sample.
 */
export function partialPath(run: CentrelineRun, shown: number): string {
  "worklet"
  const { pts, cum } = run
  // ⛔ NEVER RETURN AN EMPTY `d`. react-native-svg renders an empty path as a filled box on the
  // native side — a green square flashed on the first frame, before the worklet had run once.
  // A zero-length segment with a round cap is the correct "nothing yet": it draws the cap alone.
  if (shown <= 0) {
    return `M${pts[0].toFixed(1)},${pts[1].toFixed(1)}L${pts[0].toFixed(1)},${pts[1].toFixed(1)}`
  }
  let d = `M${pts[0].toFixed(1)},${pts[1].toFixed(1)}`
  for (let i = 1; i < cum.length; i++) {
    if (cum[i] <= shown) {
      d += `L${pts[i * 2].toFixed(1)},${pts[i * 2 + 1].toFixed(1)}`
      continue
    }
    const span = cum[i] - cum[i - 1] || 1
    const f = (shown - cum[i - 1]) / span
    const x = pts[(i - 1) * 2] + (pts[i * 2] - pts[(i - 1) * 2]) * f
    const y = pts[(i - 1) * 2 + 1] + (pts[i * 2 + 1] - pts[(i - 1) * 2 + 1]) * f
    d += `L${x.toFixed(1)},${y.toFixed(1)}`
    return d
  }
  return d
}

/**
 * The centreline chopped into equal-length links, each described as a rectangle lying ALONG the
 * ribbon: where it starts, which way it points, and how long it is.
 *
 * ⛔ THIS EXISTS BECAUSE A PATH-TRACE CANNOT BE ANIMATED DIRECTLY ON THIS STACK. Every way of
 * animating an SVG property from a worklet was tried on a device and failed — `strokeDashoffset`
 * leaves the stroke whole, `d` does nothing, and driving either from JS gets starved by the boot
 * stall. The one thing that does update reliably from the UI thread is a `Rect`'s geometry inside a
 * `ClipPath`, because `x/y/width/height` are pass-through props on the native view.
 *
 * So the trace is rebuilt out of that primitive: lay a chain of rects head-to-tail along the
 * ribbon, and grow each one in turn. The clip sweeps ALONG the path rather than across the artwork,
 * which is the drawing motion — assembled from the only part that works.
 *
 * Links overlap slightly and are cut a little wider than the ribbon so the corners and the round
 * joins stay covered as the clip passes them.
 */
export interface RevealLink {
  /** Where this link begins, in authored coordinates. */
  readonly x: number
  readonly y: number
  /** Its direction along the ribbon, in degrees, for the rect's static rotation. */
  readonly angle: number
  /** How long the link is. */
  readonly length: number
  /** Arc length at which this link starts, so each can time itself against one clock. */
  readonly at: number
}

export function revealLinks(walk: WalkResult, count: number, overlap = 14): RevealLink[] {
  const xyz = walk.xyz
  const n = xyz.length / 3
  const cum: number[] = [0]
  for (let i = 1; i < n; i++) {
    const dx = xyz[i * 3] - xyz[(i - 1) * 3]
    const dy = xyz[i * 3 + 1] - xyz[(i - 1) * 3 + 1]
    cum.push(cum[i - 1] + Math.sqrt(dx * dx + dy * dy))
  }
  const total = cum[n - 1]
  const step = total / count
  const at = (target: number): [number, number] => {
    let i = 1
    while (i < n - 1 && cum[i] < target) i++
    const span = cum[i] - cum[i - 1] || 1
    const f = (target - cum[i - 1]) / span
    return [
      xyz[(i - 1) * 3] + (xyz[i * 3] - xyz[(i - 1) * 3]) * f,
      xyz[(i - 1) * 3 + 1] + (xyz[i * 3 + 1] - xyz[(i - 1) * 3 + 1]) * f,
    ]
  }
  const links: RevealLink[] = []
  for (let k = 0; k < count; k++) {
    const s0 = k * step
    // The ribbon's round caps stand a half-width beyond the centreline's ends, so the first and
    // last links reach further out — otherwise the caps are never covered and poke through from
    // the first frame.
    const lead = k === 0 ? overlap + 60 : overlap
    const tail = k === count - 1 ? overlap + 60 : overlap
    const p0 = at(Math.max(0, s0 - lead))
    const p1 = at(Math.min(total, s0 + step + tail))
    const dx = p1[0] - p0[0]
    const dy = p1[1] - p0[1]
    // Push the start back along the segment direction so the lead actually extends past the cap.
    const ux = dx / (Math.sqrt(dx * dx + dy * dy) || 1)
    const uy = dy / (Math.sqrt(dx * dx + dy * dy) || 1)
    const backX = k === 0 ? p0[0] - ux * 60 : p0[0]
    const backY = k === 0 ? p0[1] - uy * 60 : p0[1]
    links.push({
      x: backX,
      y: backY,
      angle: (Math.atan2(dy, dx) * 180) / Math.PI,
      length: Math.sqrt(dx * dx + dy * dy) + (k === 0 ? 60 : 0) + (k === count - 1 ? 60 : 0),
      at: s0,
    })
  }
  return links
}

/** Total centreline length of a walk, measured from its samples. */
export function walkedLength(walk: WalkResult): number {
  const xyz = walk.xyz
  let total = 0
  for (let i = 3; i < xyz.length; i += 3) {
    const dx = xyz[i] - xyz[i - 3]
    const dy = xyz[i + 1] - xyz[i - 2]
    total += Math.sqrt(dx * dx + dy * dy)
  }
  return total
}

/**
 * The centreline walked BACKWARDS — from the ribbon's far end to its start — with a short straight
 * extension past each end. This is the path the reveal's canvas-coloured cover rides.
 *
 * Backwards is what lets the cover use the ordinary two-element `strokeDasharray` that
 * react-native-svg actually honours on device: the dash paints from the far end, so growing the
 * reveal SHRINKS the dash, and no zero-length dash element is ever needed.
 *
 * The extensions exist because the ribbon ends in ROUND caps that reach `HALF_WIDTH` past the last
 * centreline point. A cover that stops at that point leaves a lens of the cap showing — which is
 * exactly the stray tick that appeared beyond the mark before they were added.
 */
export function centrelineCoverPath(
  walk: WalkResult,
  extend: number,
  from: number,
  to: number,
): string {
  "worklet"
  const xyz = walk.xyz
  const ex = xyz[to * 3]
  const ey = xyz[to * 3 + 1]
  const edx = ex - xyz[(to - 1) * 3]
  const edy = ey - xyz[(to - 1) * 3 + 1]
  const em = Math.sqrt(edx * edx + edy * edy) || 1
  let d = `M${(ex + (edx / em) * extend).toFixed(2)},${(ey + (edy / em) * extend).toFixed(2)}`
  for (let i = to; i >= from; i--) {
    d += `L${xyz[i * 3].toFixed(2)},${xyz[i * 3 + 1].toFixed(2)}`
  }
  const sdx = xyz[from * 3] - xyz[(from + 1) * 3]
  const sdy = xyz[from * 3 + 1] - xyz[(from + 1) * 3 + 1]
  const sm = Math.sqrt(sdx * sdx + sdy * sdy) || 1
  d += `L${(xyz[from * 3] + (sdx / sm) * extend).toFixed(2)},${(xyz[from * 3 + 1] + (sdy / sm) * extend).toFixed(2)}`
  return d
}
