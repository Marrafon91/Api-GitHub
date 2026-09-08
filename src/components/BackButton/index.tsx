import type React from "react";
import { FaArrowLeft } from "react-icons/fa";

type BackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({ ...props }: BackButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className="mx-2 flex cursor-pointer rounded-md bg-transparent text-black"
    >
      <FaArrowLeft size={32} />
    </button>
  );
}
