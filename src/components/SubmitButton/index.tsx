import type React from "react";

type SubmitButtonProps = {
  children?: React.ReactNode;
  loading?: boolean;
};

export default function SubmitButton({ children, loading }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-[#0D2636] p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}
