import type { FC, SVGAttributes } from "react";
import { useId } from "react";

export type HealthAILogoProps = SVGAttributes<SVGSVGElement>;

const HealthAILogo: FC<HealthAILogoProps> = (props) => {
  const id = useId();
  const gradientId = `health-ai-logo-gradient-${id}`;
  const pulseGradientId = `health-ai-pulse-gradient-${id}`;

  return (
    <svg
      width="250"
      height="70"
      viewBox="0 0 250 70"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#0EA5E9", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#14B8A6", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id={pulseGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#0EA5E9", stopOpacity: 0.2 }} />
          <stop offset="50%" style={{ stopColor: "#14B8A6", stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: "#0EA5E9", stopOpacity: 0.2 }} />
        </linearGradient>
      </defs>

      {/* Medical Cross Symbol */}
      <path
        d="M40 20h-5v-5c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v5h-5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-5h5c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z"
        fill={`url(#${gradientId})`}
      />

      {/* Heartbeat Line */}
      <path
        d="M60 35 h10 l5 -10 l5 20 l5 -10 h10"
        stroke={`url(#${pulseGradientId})`}
        strokeWidth="2"
        fill="none"
      />

      {/* Text */}
      <text
        x="100"
        y="40"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill={`url(#${gradientId})`}
      >
        Health AI
      </text>
    </svg>
  );
};

export default HealthAILogo;
