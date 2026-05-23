"use client";

const IconBook = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 7h8M8 11h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function StudyMaterialsFloat() {
  return (
    <a
      href="https://bit.ly/welcomeToKMC"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Study Materials"
      className="group flex items-center gap-2 bg-amber-400 text-[#0B1F3A] font-bold text-sm shadow-xl hover:bg-amber-300 active:scale-95 transition-all duration-200"
      style={{
        borderRadius: "18px",
        padding: "0 18px 0 14px",
        height: "56px",
        whiteSpace: "nowrap",
      }}
    >
      <IconBook />
      <span>Study Materials</span>
    </a>
  );
}
