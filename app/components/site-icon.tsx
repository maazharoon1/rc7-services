export function Icon({
  name = "arrow",
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    diagonal: <path d="M6 18 18 6M6 6h12v12" />,
    phone: (
      <path d="m7 3 3 5-2 2c1.5 3 3 4.5 6 6l2-2 5 3c-1 4-3 5-6 3C9 17 7 15 4 9 2 6 3 4 7 3Z" />
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-8l1-7Z" />,
    roof: (
      <>
        <path d="m2 12 10-9 10 9M5 10v11h14V10M15 5V3h4v6" />
      </>
    ),
    paint: (
      <>
        <rect x="3" y="3" width="14" height="6" rx="1" />
        <path d="M17 6h4v7H11v3M9 16h4v6H9z" />
      </>
    ),
    floor: (
      <path d="m2 9 10-6 10 6-10 6-10-6Zm0 6 10 6 10-6M7 6l10 6M7 12l10-6" />
    ),
    concrete: <path d="M3 5h18v14H3zM3 12h18M11 5v7M8 12v7M17 12v7" />,
    frame: <path d="M3 21V9l9-7 9 7v12M3 9h18M8 9v12M16 9v12M3 20h18M12 2v7" />,
    home: <path d="m2 11 10-9 10 9M5 9v12h14V9M9 21v-8h6v8" />,
    pause: <path d="M8 5v14M16 5v14" />,
    play: <path d="m8 4 12 8-12 8V4Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M3 7h18M3 16h18" />,
    check: <path d="m5 12 4 4L19 6" />,
    facebook: (
      <path d="M14 22v-9h3l1-4h-4V7c0-1 1-2 2-2h2V1h-3c-4 0-6 2-6 6v2H6v4h3v9" />
    ),
  };
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
