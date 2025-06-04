export function Alert({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "destructive";
}) {
  return (
    <div
      className={`p-4 rounded-lg ${
        variant === "destructive"
          ? "bg-red-50 text-red-800"
          : "bg-blue-50 text-blue-800"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 text-sm">{children}</div>;
}
