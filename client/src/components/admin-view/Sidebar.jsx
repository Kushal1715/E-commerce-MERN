import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  Menu,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-10 flex flex-col gap-6">
      {adminSidebarMenuItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground py-2 px-3 rounded-md text-lg"
          onClick={() => {
            navigate(`${item.path}`);
            setOpen(false);
          }}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </div>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-64 hidden lg:flex flex-col bg-background border-r p-6">
        <div
          className="flex items-center gap-2 font-extrabold text-2xl cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined />
          Admin Panel
        </div>
        <MenuItems setOpen={setOpen} />
      </div>
    </>
  );
};

export default AdminSidebar;
