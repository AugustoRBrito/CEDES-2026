export function CadesSescDivider({
  color = "bg-gray-100",
  height = 100,
}: {
  color?: string;
  height?: number;
}) {
  return (
    <div className={`w-full ${color} relative`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        className="w-full h-24"
        preserveAspectRatio="none"
        style={{ display: "block", height: `${height}px` }}
      >
        <path
          fill="white"
          d="M0,0 C240,120 1200,120 1440,0 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
