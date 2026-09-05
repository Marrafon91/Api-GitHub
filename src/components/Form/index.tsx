type FormProps = {
  onSubmit: () => void;
  children: React.ReactNode;
};

export default function Form({ onSubmit, children }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full items-center gap-2 p-2"
    >
      {children}
    </form>
  );
}
