import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <main className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </main>
  );
}