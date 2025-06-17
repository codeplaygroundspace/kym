import Navbar from "@/components/common/nav-bar";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-secondary">
      {children}
      <Navbar />
    </div>
  );
}
