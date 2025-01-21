import React from "react";
import accImg from "../../assets/account.jpg";

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default ShoppingAccount;
