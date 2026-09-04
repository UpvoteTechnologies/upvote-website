import { useEffect, useId, useMemo, useState } from 'react';
import {
  ART_CX,
  ART_CY,
  BRAND_FLAT,
  BRAND_GRADIENT_AXIS,
  BRAND_GRADIENT_DARK,
  BRAND_GRADIENT_LIGHT,
  BRAND_PATH_A,
  BRAND_PATH_B,
  EXTENDED_GRADIENT_AXIS,
  EXTENDED_HEIGHT,
  EXTENDED_LETTER_PATHS,
  EXTENDED_PATH_A,
  EXTENDED_PATH_B,
  EXTENDED_RATIO,
  EXTENDED_WIDTH,
  HEART_ANGLE,
  MARK_ANGLE,
  MEDIUM_GREEN,
} from './brandArt';
import {
  centrelineCoverPath,
  centrelineLength,
  HALF_WIDTH,
  MARK_PARAMS,
  walkCentreline,
} from './markGeometry';
import {
  MOTION_END_MS,
  settleScale,
  turnProgress,
  unfurlReveal,
  wordmarkAt,
} from './splashChoreo';

/**
 * The app's splash piece, played inside the website's header lockup.
 *
 * The phone splash draws the mark on, turns it a quarter turn, and lets the wordmark rise beneath
 * it. The website wears the EXTENDED lockup instead (mark beside the lettering), so the same
 * choreography — the same `splashChoreo.ts` clock, the same `markGeometry.ts` centreline, the same
 * brand paths — runs in the lockup's own coordinate box: the mark pivots about the point the kit's
 * `EXTENDED_MARK_TRANSFORM` pivots about, and the letters rise in where the kit places them.
 *
 * On the web the reveal is a real SVG `<mask>` rather than a canvas-coloured stroke (the phone
 * needs the stroke because its native renderer ignores masks; the DOM honours them). That makes
 * the piece independent of whatever sits behind the header — a gradient, a photo, a scrolled
 * page — where the stroke would have painted a visible shape. The dash arithmetic is the app's.
 *
 * Once the motion has ended the mark cross-fades to the lockup's OWN half-heart
 * (`EXTENDED_PATH_A`): the kit redraws the inner lobe for the lockup, so the frame that stays on
 * screen is byte-for-byte the shipped `logo-default.svg` artwork, not a composition of it.
 */

/** The cover is a little wider than the ribbon so no edge of the artwork survives underneath it. */
const COVER_WIDTH = 2 * HALF_WIDTH + 14;
/** The ribbon's round caps stand HALF_WIDTH past the last centreline point; reach past them. */
const COVER_EXT = HALF_WIDTH + 6;

/** The quarter turn the mark wears inside the lockup (`EXTENDED_MARK_TRANSFORM`'s scale). */
const LOCKUP_MARK_SCALE = 0.8642;
/**
 * The wordmark's rise, in lockup units. The phone lifts a 53px-tall wordmark by 10px; the lockup's
 * lettering is ~210 units tall, so the same proportion is ~40 units.
 */
const LETTER_RISE = 40;
/** The hand-off from the animated half-heart to the lockup's authored one. */
const HANDOFF_MS = 260;

export interface AnimatedLockupProps {
  /** Rendered height in px; width follows the lockup's ratio. */
  height?: number;
  /** Skip the piece and show the finished lockup — reduced motion, or a repeat visit. */
  animate?: boolean;
  className?: string;
  /** Called once the finished lockup is on screen and static. */
  onSettled?: () => void;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function AnimatedLockup({
  height = 40,
  animate = true,
  className,
  onSettled,
}: AnimatedLockupProps) {
  const rawId = useId();
  const ids = useMemo(
    () => ({
      grad: `${rawId}-g`,
      gradExt: `${rawId}-ge`,
      maskA: `${rawId}-ma`,
      maskB: `${rawId}-mb`,
    }),
    [rawId]
  );

  const playing = animate && !prefersReducedMotion();
  const [ms, setMs] = useState(() => (playing ? 0 : Number.POSITIVE_INFINITY));

  useEffect(() => {
    if (!playing) return;
    const startAt = performance.now();
    let raf = 0;
    const end = MOTION_END_MS + HANDOFF_MS;
    const tick = (now: number) => {
      const t = now - startAt;
      setMs(t);
      if (t < end) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const settled = ms >= MOTION_END_MS + HANDOFF_MS;
  useEffect(() => {
    if (settled) onSettled?.();
  }, [settled, onSettled]);

  const draw = useMemo(() => {
    const walk = walkCentreline(MARK_PARAMS, 320);
    const last = walk.xyz.length / 3 - 1;
    const seam = walk.seamIndex > 0 ? walk.seamIndex : last;
    return {
      fullCover: centrelineCoverPath(walk, COVER_EXT, 0, last),
      flatCover: centrelineCoverPath(walk, COVER_EXT, 0, seam),
      totalLen: centrelineLength(walk, 0, last),
      flatLen: centrelineLength(walk, 0, seam),
    };
  }, []);

  const width = height * EXTENDED_RATIO;

  // The finished lockup, exactly as the kit ships it.
  if (settled) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${EXTENDED_WIDTH} ${EXTENDED_HEIGHT}`}
        className={className}
        role="img"
        aria-label="Upvote"
      >
        <defs>
          <linearGradient id={ids.gradExt} {...EXTENDED_GRADIENT_AXIS} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={BRAND_GRADIENT_DARK} />
            <stop offset="1" stopColor={BRAND_GRADIENT_LIGHT} />
          </linearGradient>
        </defs>
        <g transform={`translate(${ART_CX} ${ART_CY}) rotate(${MARK_ANGLE}) scale(${LOCKUP_MARK_SCALE}) translate(${-ART_CX} ${-ART_CY})`}>
          <path d={EXTENDED_PATH_A} fill={`url(#${ids.gradExt})`} />
          <path d={EXTENDED_PATH_B} fill={BRAND_FLAT} />
        </g>
        {EXTENDED_LETTER_PATHS.map((d) => (
          <path key={d.slice(0, 16)} d={d} fill={MEDIUM_GREEN} />
        ))}
      </svg>
    );
  }

  const revealed = draw.totalLen * unfurlReveal(ms);
  const angle = HEART_ANGLE + (MARK_ANGLE - HEART_ANGLE) * turnProgress(ms);
  const scale = LOCKUP_MARK_SCALE * settleScale(ms);
  const word = wordmarkAt(ms);
  const letterRise = (word.translateY / 10) * LETTER_RISE;
  // The hand-off: the animated half-heart yields to the lockup's authored one.
  const handoff = Math.min(1, Math.max(0, (ms - MOTION_END_MS) / HANDOFF_MS));

  /**
   * One path's cover, painted BLACK into a mask. `hidden` is how much of that stretch is still to
   * be drawn; the overshoot past its far end retracts over the last stride, so at hidden = 0 the
   * dash is empty and the artwork stands alone.
   */
  const cover = (d: string, len: number, hidden: number) => {
    const from = COVER_EXT - Math.min(COVER_EXT, hidden);
    const dash = COVER_EXT + hidden - from;
    if (dash <= 0) return null;
    return (
      <path
        d={d}
        fill="none"
        stroke="#000"
        strokeWidth={COVER_WIDTH}
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeDasharray={`${dash} ${COVER_EXT + len + COVER_EXT + 4}`}
        strokeDashoffset={-from}
      />
    );
  };

  const markTransform = `translate(${ART_CX} ${ART_CY}) rotate(${angle}) scale(${scale}) translate(${-ART_CX} ${-ART_CY})`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${EXTENDED_WIDTH} ${EXTENDED_HEIGHT}`}
      className={className}
      role="img"
      aria-label="Upvote"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* The mark's own gradient, in authored coordinates, so it rides inside the rotation. */}
        <linearGradient id={ids.grad} {...BRAND_GRADIENT_AXIS} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={BRAND_GRADIENT_DARK} />
          <stop offset="1" stopColor={BRAND_GRADIENT_LIGHT} />
        </linearGradient>
        <linearGradient id={ids.gradExt} {...EXTENDED_GRADIENT_AXIS} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={BRAND_GRADIENT_DARK} />
          <stop offset="1" stopColor={BRAND_GRADIENT_LIGHT} />
        </linearGradient>
        {/* Each brand path keeps its OWN cover: the ribbon crosses itself, and one cover for both
            would bite through the swoosh that was drawn long before the pen came back round. */}
        <mask id={ids.maskA} maskUnits="userSpaceOnUse" x={-200} y={-200} width={800} height={800}>
          <rect x={-200} y={-200} width={800} height={800} fill="#fff" />
          {cover(draw.fullCover, draw.totalLen, draw.totalLen - revealed)}
        </mask>
        <mask id={ids.maskB} maskUnits="userSpaceOnUse" x={-200} y={-200} width={800} height={800}>
          <rect x={-200} y={-200} width={800} height={800} fill="#fff" />
          {cover(draw.flatCover, draw.flatLen, Math.max(0, draw.flatLen - revealed))}
        </mask>
      </defs>

      <g transform={markTransform}>
        {/* Nothing is painted before the pen touches down: at reveal zero the ribbon's start cap
            would otherwise sit on the page as a green disc. */}
        {revealed > 0 ? (
          <>
            {/* The artwork's own paint order: half-heart first, then the swoosh crosses over it. */}
            <g opacity={1 - handoff}>
              <path d={BRAND_PATH_A} fill={`url(#${ids.grad})`} mask={`url(#${ids.maskA})`} />
            </g>
            {handoff > 0 ? (
              <g opacity={handoff}>
                <path d={EXTENDED_PATH_A} fill={`url(#${ids.gradExt})`} />
              </g>
            ) : null}
            <path d={BRAND_PATH_B} fill={BRAND_FLAT} mask={`url(#${ids.maskB})`} />
          </>
        ) : null}
      </g>

      <g opacity={word.opacity} transform={`translate(0 ${letterRise})`}>
        {EXTENDED_LETTER_PATHS.map((d) => (
          <path key={d.slice(0, 16)} d={d} fill={MEDIUM_GREEN} />
        ))}
      </g>
    </svg>
  );
}
