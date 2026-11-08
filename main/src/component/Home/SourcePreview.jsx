const SourcePreview = () => (
  <svg viewBox="0 0 640 360" role="img" aria-label="Source code project" className="w-full h-full">
    <rect width="640" height="360" fill="#151c29" />

    <g transform="translate(110 56)">
      <rect width="420" height="248" rx="14" fill="#1b2335" stroke="rgba(255,255,255,0.1)" />
      <rect width="420" height="34" rx="14" fill="#202a40" />
      <rect y="20" width="420" height="14" fill="#202a40" />
      <g fill="rgba(199,207,224,0.25)">
        <circle cx="20" cy="17" r="4.5" />
        <circle cx="36" cy="17" r="4.5" />
        <circle cx="52" cy="17" r="4.5" />
      </g>

      <g strokeLinecap="round" strokeWidth="8">
        <line x1="32" y1="66" x2="88" y2="66" stroke="#9b6bff" />
        <line x1="100" y1="66" x2="196" y2="66" stroke="rgba(199,207,224,0.3)" />
        <line x1="208" y1="66" x2="248" y2="66" stroke="#c6f26e" />

        <line x1="56" y1="94" x2="124" y2="94" stroke="rgba(199,207,224,0.3)" />
        <line x1="136" y1="94" x2="256" y2="94" stroke="#9b6bff" opacity="0.7" />

        <line x1="56" y1="122" x2="104" y2="122" stroke="#c6f26e" />
        <line x1="116" y1="122" x2="228" y2="122" stroke="rgba(199,207,224,0.3)" />
        <line x1="240" y1="122" x2="300" y2="122" stroke="#5b8def" opacity="0.8" />

        <line x1="80" y1="150" x2="172" y2="150" stroke="rgba(199,207,224,0.3)" />
        <line x1="184" y1="150" x2="288" y2="150" stroke="#9b6bff" opacity="0.7" />
        <line x1="300" y1="150" x2="336" y2="150" stroke="#c6f26e" />

        <line x1="56" y1="178" x2="140" y2="178" stroke="rgba(199,207,224,0.3)" />

        <line x1="32" y1="206" x2="68" y2="206" stroke="#9b6bff" />
        <line x1="80" y1="206" x2="204" y2="206" stroke="rgba(199,207,224,0.3)" />
        <line x1="216" y1="206" x2="268" y2="206" stroke="#5b8def" opacity="0.8" />
      </g>
    </g>

    <g transform="translate(486 262)">
      <circle r="34" fill="#9b6bff" />
      <path
        d="M-10 -7 L-18 0 L-10 7 M10 -7 L18 0 L10 7 M3 -12 L-3 12"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default SourcePreview;
