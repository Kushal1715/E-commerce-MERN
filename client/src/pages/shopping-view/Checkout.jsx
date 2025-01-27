import React, { useState } from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/store/shop/orderSlice";
import { useToast } from "@/hooks/use-toast";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (acc, item) =>
            acc +
            (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
          0
        )
      : null;

  const handleCheckout = () => {
    if (!selectedAddress) {
      toast({
        title: "select one address",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.items.length < 1) {
      toast({
        title: "add at least one item to cart",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: selectedAddress?._id,
        address: selectedAddress?.address,
        city: selectedAddress?.city,
        pincode: selectedAddress?.pincode,
        phone: selectedAddress?.phone,
        notes: selectedAddress?.notes,
      },
      orderStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setSelectedAddress(null);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item, index) => (
                <UserCartItemsContent cartItem={item} key={index} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
