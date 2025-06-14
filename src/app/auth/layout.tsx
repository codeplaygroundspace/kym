export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-purple flex flex-col justify-end px-0 pb-0 md:flex-row md:items-center md:justify-center md:px-6">
      <div className="w-full md:max-w-md">{children}</div>
    </div>
  );
}
