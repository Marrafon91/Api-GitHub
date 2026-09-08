import type React from "react";
import { FaArrowRight } from "react-icons/fa";

type FowardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function FowardButton({ ...props }: FowardButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className="mx-2 flex cursor-pointer rounded-md bg-transparent text-black disabled:cursor-not-allowed disabled:opacity-50"
    >
      <FaArrowRight size={32} />
    </button>
  );
}
