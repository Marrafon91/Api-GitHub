import type React from "react";
import { FaTrash } from "react-icons/fa";

type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function DeleteButton({ ...props }: DeleteButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className="mx-2 cursor-pointer rounded-md bg-transparent text-[#0D2636]"
    >
      <FaTrash size={14} />
    </button>
  );
}
