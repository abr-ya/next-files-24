import SideNav from "./_components/SideNav";

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <div className="container mx-auto pt-12 flex gap-8">
    <SideNav />
    <div className="w-full">{children}</div>
  </div>
);

export default DashboardLayout;
