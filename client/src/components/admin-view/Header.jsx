import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut, Menu } from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="flex gap-2 items-center text-sm font-medium shadow rounded-md">
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
