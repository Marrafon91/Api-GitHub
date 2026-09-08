import type React from "react";

type StateButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
};

export default function StateButton({
  children,
  active,
  ...props
}: StateButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={`mx-2 flex w-32 cursor-pointer items-center justify-center rounded-md p-1 text-white transition duration-300 ${
        active ? "bg-[#0071DB]" : "bg-gray-500 hover:bg-[#0D2636]"
      }`}
    >
      {children}
    </button>
  );
}
