import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  Menu,
  ShoppingBasket,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

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

const MenuItems = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10 flex flex-col gap-6">
      {adminSidebarMenuItems.map((item) => (
        <div
          className="flex items-center gap-3 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground py-2 px-3 rounded-md text-lg"
          onClick={() => navigate(`${item.path}`)}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </div>
  );
};

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-64 hidden lg:flex flex-col bg-background border-r p-6">
        <div
          className="flex items-center gap-2 font-extrabold text-2xl cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined />
          Admin Panel
        </div>
        <MenuItems />
      </div>
    </>
  );
};

export default AdminSidebar;
