interface LogoProps {
  showText?: boolean;
  size?: number;
}


export default function Logo({
  showText = true,
  size = 42,
}: LogoProps) {

  return (
    <div className="logo">

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >

        {/* Shield */}

        <path
          d="
            M24 4
            L40 10
            V22
            C40 32 33.5 40 24 44
            C14.5 40 8 32 8 22
            V10
            L24 4Z
          "
          fill="#23354D"
        />


        {/* Inner shield */}

        <path
          d="
            M24 9
            L35 13
            V22
            C35 29.5 30.7 35.5 24 39
            C17.3 35.5 13 29.5 13 22
            V13
            L24 9Z
          "
          fill="#02122F"
        />


        {/* Ballot */}

        <rect
          x="17"
          y="18"
          width="14"
          height="11"
          rx="2"
          fill="#F0ECDD"
        />


        {/* Ballot line */}

        <path
          d="M20 22H28"
          stroke="#8BA3C5"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M20 25H25"
          stroke="#8BA3C5"
          strokeWidth="1.8"
          strokeLinecap="round"
        />


        {/* Check */}

        <path
          d="M26 27L28 29L32 24"
          stroke="#F0ECDD"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

      </svg>


      {showText && (
        <span className="logo-text">
          Secure Voting System
        </span>
      )}

    </div>
  );
}