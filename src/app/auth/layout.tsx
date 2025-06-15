export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-purple flex justify-center px-6 items-center">
      <div className="md:min-w-md">{children}</div>
    </div>
  );
}
