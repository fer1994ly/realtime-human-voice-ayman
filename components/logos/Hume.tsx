import type { FC, SVGAttributes } from "react";
import { useId } from "react";

export type AutoClientLogoProps = SVGAttributes<SVGSVGElement>;

const AutoClientLogo: FC<AutoClientLogoProps> = (props) => {
  const id = useId();
  const gradientId = `autoclient-logo-gradient-${id}`;

  return (
    <svg
      width="250"
      height="70"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 40"
      {...props}
    >
      {/* Define a gradient for a more dynamic look */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FF7A8A", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#FFA500", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Text element with gradient fill */}
      <text
        x="15"
        y="28"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="26"
        fontWeight="bolder"
        letterSpacing="0.3"
        fill={`url(#${gradientId})`}
      >
      Autoclient
      </text>
    </svg>
  );
};

export default AutoClientLogo;
