/**
 * The 4b product page, as the design's phone mockup: fixed brand-green header, plain score / 100
 * over the red→green track, the diet delta chip and three insight rows.
 */

const insightRows = [
  { label: 'Net carbs', value: '7g', tone: '#1B9E57' },
  { label: 'Protein', value: '14g', tone: '#1B9E57' },
  { label: 'Saturated fat', value: '5g', tone: '#E69100' },
];

export default function PhoneMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative h-[620px] w-[308px] rounded-[46px] bg-[#15130F] p-[9px] shadow-phone ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-[9px] flex flex-col overflow-hidden rounded-[38px] bg-paper">
        <div className="relative bg-brand-dark px-5 pb-6 pt-[52px]">
          <div className="font-mono text-[9px] font-bold tracking-[.14em] text-white/[.62]">FOOD &amp; BEVERAGES</div>
          <div className="mt-[5px] max-w-[190px] text-[20px] font-extrabold leading-[1.18] tracking-[-.01em] text-white">
            Chobani Whole Milk Plain Greek Yogurt
          </div>
          <div className="absolute right-[18px] top-[78px] h-[86px] w-[86px] overflow-hidden rounded-full border-4 border-paper bg-white shadow-[0_8px_20px_rgba(0,0,0,.22)]">
            <img src="/greek-yogurt.webp" alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="px-5 pt-[18px]">
          <div className="flex items-baseline gap-[5px]">
            <span className="text-[52px] font-extrabold leading-[.85] tracking-[-.04em] text-brand-score">88</span>
            <span className="text-[13px] font-bold text-muted-3">/ 100</span>
            <span className="ml-[10px] flex items-center gap-[6px]">
              <span className="h-[10px] w-[10px] rounded-full bg-brand-score" />
              <span className="text-[16px] font-extrabold text-ink">Excellent</span>
            </span>
          </div>

          <div
            className="relative mt-4 h-[9px] rounded-full"
            style={{ background: 'linear-gradient(90deg,#E03A22 0%,#F05A1E 25%,#E69100 50%,#5BB98C 74%,#1B9E57 100%)' }}
          >
            <div className="absolute left-[58%] top-[-3px] h-[15px] w-[3px] rounded-[2px] bg-[#9296A0]" />
            <div className="absolute left-[88%] top-[-6px] -ml-[10px] h-[21px] w-[21px] rounded-full border-[3px] border-brand-score bg-white shadow-[0_1px_4px_rgba(34,48,31,.28)]" />
          </div>
          <div className="mt-[6px] flex text-[9px] font-bold text-[#B5B8C0]">
            <span className="flex-1">BAD</span>
            <span className="flex-1 text-center">OK</span>
            <span className="flex-1 text-right">GREAT</span>
          </div>

          <div className="mt-[14px] inline-flex items-center gap-[6px] rounded-full bg-brand-tint px-3 py-[7px]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M6 11l6-6 6 6" stroke="#1E8E54" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] font-extrabold text-[#1E8E54]">+30 pts from your Keto plan</span>
          </div>

          <div className="mt-[14px] flex items-center gap-[9px] rounded-[14px] bg-paper-3 px-[14px] py-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.6" stroke="#75705F" strokeWidth="2" />
              <path d="M4.5 20c1.3-3.3 4.1-5 7.5-5s6.2 1.7 7.5 5" stroke="#75705F" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[11.5px] font-semibold text-muted">
              Scored for <b className="font-extrabold text-ink">Keto</b> · change diet
            </span>
          </div>

          <div className="mt-[14px]">
            {insightRows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center gap-[10px] py-[11px] ${i < insightRows.length - 1 ? 'border-b border-line' : ''}`}
              >
                <span className="flex-1 text-[13px] font-bold text-ink">{row.label}</span>
                <span className="text-[12px] font-bold text-muted">{row.value}</span>
                <span className="h-[10px] w-[10px] rounded-full" style={{ background: row.tone }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
