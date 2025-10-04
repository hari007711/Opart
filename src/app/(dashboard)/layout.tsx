"use client";

import { StepProvider } from "@/contexts/stepContext";
import RestaurantSidebar from "@/components/SideBar/sideBar";
import StepIndicator from "@/components/TopBar/StepIndicator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StepProvider>
      <div className="h-screen bg-gray-50 flex">
        {/* sidebar */}
        <RestaurantSidebar />

        {/* main content  */}
        <div className="flex-1 flex flex-col p-2 bg-ui-secondary">
          {/* top bar */}
          <StepIndicator />

          {/* <main className="flex-1 p-6 bg-white rounded-b-2xl">{children}</main> */}
          <main className="flex-1 p-2 bg-white rounded-b-2xl overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </StepProvider>
  );
}
