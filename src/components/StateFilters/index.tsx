import type React from "react";

type StateFiltersProps = React.HTMLAttributes<HTMLDivElement>;

export default function StateFilters({
  children,
  ...props
}: StateFiltersProps) {
  return <div {...props}>{children}</div>;
}
