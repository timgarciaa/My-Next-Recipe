import React from "react";

type Props = {
  label: string;
  onClick: () => void;
  color?: string;
};

function button({ label, onClick, color = "#743f22" }: Props) {
  return (
    <button
      style={{ backgroundColor: color }}
      className={`text-white px-4 py-2 rounded-lg`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default button;
