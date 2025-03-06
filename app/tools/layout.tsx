import { ReactNode } from "react";
import { Sidebar } from "../components/ui/sidebar/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}