import type React from "react";

type SubmitButtonProps = {
  children?: React.ReactNode;
};

export default function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-[#0D2636] p-3 text-white"
    >
      {children}
    </button>
  );
}
