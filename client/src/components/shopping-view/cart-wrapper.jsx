import React from "react";
import { SheetContent, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetTitle>Your Cart</SheetTitle>
      <div>
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => (
              <UserCartItemsContent cartItem={item} key={index} />
            ))
          : null}
      </div>
    </SheetContent>
  );
};

export default UserCartWrapper;
