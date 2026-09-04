/**
 * The splash animation's choreography as PURE functions of ONE clock. Every beat below was set
 * against a frame-by-frame measurement of the reference film rather than by feel — the numbers in
 * the comments are what that film actually does, so a future edit can argue with the evidence.
 *
 * There is a single `elapsed` input and no per-phase timers. Five independent `withTiming` calls
 * would be five clocks that can drift apart under load, and the Storybook scrubber could not
 * rewind them; one clock means scrubbing is just passing a different number.
 *
 * Same `"worklet"` contract as `ribbonGeometry.ts`: inert directives, no animation imports.
 */


/**
 * The mark draws itself on.
 *
 * ⛔ 340ms WITH AN EASE-OUT WAS A WIPE, NOT A DRAWING — measured, not felt. An ease-out front-loads
 * motion, so at 60fps **14% of the mark appeared in the very first frame**, half of it was down by
 * 71ms, and the whole "draw" was effectively over by ~120ms. Nobody can read a logo being drawn in
 * four frames; it reads as a pop.
 *
 * 800ms is ~48 frames at 60fps, which puts roughly 20 units of a ~976-unit path on screen per
 * frame — under half a ribbon width, so the leading tip is always visibly travelling.
 *
 * ⛔ Do not go below this. 340ms was tried and read as a pop; 800 is the value that fixed it.
 */
export const UNFURL_MS = 800
/**
 * The heart holds DEAD STILL. This is the easter egg's whole moment, and stillness is what sells
 * it — the reference holds ~300ms here with the projected area flat to within a pixel.
 */
export const HEART_HOLD_MS = 380
/**
 * The reconfiguration. The reference spends 870ms; ours is tighter because we do not copy its
 * second tumble. Across this window the projected area must stay within ±5% (the reference holds
 * −3.4%) — the object is near face-on the whole way, it is not tumbling.
 */
export const TURN_MS = 700
/** Overshoot and settle onto the tilted mark — the reference overshoots then eases, 1.60→2.00s. */
export const SETTLE_MS = 280
/** The wordmark rises beneath the mark. Matches the outgoing splash's 400ms ease-out-quad. */
export const WORDMARK_MS = 380

export const UNFURL_END = UNFURL_MS
export const HEART_HOLD_END = UNFURL_END + HEART_HOLD_MS
export const TURN_END = HEART_HOLD_END + TURN_MS
export const SETTLE_END = TURN_END + SETTLE_MS
/**
 * How far the wordmark's rise LEADS the mark's landing. It begins WHILE THE MARK IS STILL TURNING,
 * not after it has come to rest: waiting for the mark reads as two beats in a row — the mark
 * finishes, then a word shows up — and leaves the finished lockup on screen for barely a moment.
 * Starting it inside the turn makes one arrival of the two and buys the complete lockup real time.
 *
 * ⛔ It may not start before `HEART_HOLD_END`. The upright heart is the easter egg the whole piece
 * exists for, and nothing else may move while it holds.
 */
export const WORDMARK_LEAD_MS = 600
export const WORDMARK_START = SETTLE_END - WORDMARK_LEAD_MS
/**
 * The moment the LAST thing to move has stopped. ⛔ A max, not a sum: once the wordmark leads it
 * finishes BEFORE the mark does, so reading this off the wordmark alone would call the piece over
 * while the mark was still settling.
 */
export const MOTION_END_MS = Math.max(SETTLE_END, WORDMARK_START + WORDMARK_MS)
/**
 * The beat on the FINISHED lockup, after everything has stopped. This is the LONGEST single beat in
 * the piece, and deliberately so: the animation exists to arrive at the logo, and the arrival is
 * the part worth dwelling on. Length belongs HERE rather than in the motion — slowing the draw or
 * the turn to buy time makes the piece feel sluggish, while holding the finished lockup simply
 * gives it presence. (Both were tried; the motion is back at its tuned pace and the time is here.)
 *
 * ⛔ It is part of the PIECE, not something the overlay adds afterwards. Held outside, it left the
 * choreography claiming to end the moment the mark stopped, so `splashPhaseAt`'s own lockup phase
 * had zero duration — the piece had no beat for the thing it was building to.
 */
export const LOCKUP_HOLD_MS = 1400
/** The whole piece, hold included. The overlay plays exactly this before it may hand off. */
export const SPLASH_TOTAL_MS = MOTION_END_MS + LOCKUP_HOLD_MS

export type SplashPhase = "unfurl" | "heart" | "turn" | "settle" | "lockup"

export function splashPhaseAt(elapsed: number): SplashPhase {
  "worklet"
  if (elapsed < UNFURL_END) return "unfurl"
  if (elapsed < HEART_HOLD_END) return "heart"
  if (elapsed < TURN_END) return "turn"
  if (elapsed < SETTLE_END) return "settle"
  return "lockup"
}

function clamp01(v: number): number {
  "worklet"
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/**
 * A sine ease with soft ends and a near-steady middle — the right curve for DRAWING something.
 *
 * ⛔ NOT an ease-out. Ease-out is the correct curve for something arriving and settling, and the
 * wrong one for a stroke being laid down: its speed is highest at t=0, so the pen starts at full
 * tilt and most of the mark exists before the eye has caught up. This peaks at only ~1.57× the
 * average rate, in the middle, where a travelling tip reads as motion.
 */
function easeInOutSine(t: number): number {
  "worklet"
  return -(Math.cos(Math.PI * t) - 1) / 2
}

function easeInOutCubic(t: number): number {
  "worklet"
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

/**
 * How much of the ribbon has uncoiled, 0→1. The renderer reveals this fraction of the centreline's
 * arc length, so the strip draws itself from one end rather than fading in.
 */
export function unfurlReveal(elapsed: number): number {
  "worklet"
  return easeInOutSine(clamp01(elapsed / UNFURL_MS))
}

/**
 * The pose interpolation parameter, 0 at the heart and 1 at the mark. Zero for the whole hold, so
 * the heart is genuinely motionless rather than creeping.
 */
export function turnProgress(elapsed: number): number {
  "worklet"
  if (elapsed <= HEART_HOLD_END) return 0
  return easeInOutCubic(clamp01((elapsed - HEART_HOLD_END) / TURN_MS))
}

/**
 * The settle's scale: a single soft bump that starts at 1, swells by `SETTLE_OVERSHOOT`, and comes
 * back to exactly 1 — the landing beat that keeps the mark from arriving mechanically.
 *
 * Written as a decaying half-sine rather than an ease-out-back curve. Ease-out-back interpolates
 * 0→1 and carries its overshoot in the middle, so using it as a SCALE means starting from zero;
 * damping it back down to a 1-based bump flattened the overshoot to a thousandth of a percent,
 * which is why the obvious spelling of this function is not the one here.
 */
export const SETTLE_OVERSHOOT = 0.045

export function settleScale(elapsed: number): number {
  "worklet"
  if (elapsed <= TURN_END || elapsed >= SETTLE_END) return 1
  const t = (elapsed - TURN_END) / SETTLE_MS
  return 1 + SETTLE_OVERSHOOT * Math.sin(Math.PI * t) * (1 - t)
}

/** The wordmark's opacity and its rise, in the outgoing splash's idiom (10px, ease-out-quad). */
export function wordmarkAt(elapsed: number): { opacity: number; translateY: number } {
  "worklet"
  const t = clamp01((elapsed - WORDMARK_START) / WORDMARK_MS)
  const eased = 1 - (1 - t) * (1 - t)
  return { opacity: t, translateY: 10 * (1 - eased) }
}
