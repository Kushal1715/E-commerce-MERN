import React, { useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import CommonForm from "./form";

const initialFormData = {
  status: "",
};

const OrderDetailsModal = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialFormData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "form submit");
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between font-medium">
            <p>Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Order Price</p>
            <Label>{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Payment Method</p>
            <Label>Esewa</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Payment Status</p>
            <Label>{orderDetails?.orderStatus}</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Order Status</p>
            <Label>{orderDetails?.orderStatus}</Label>
          </div>
        </div>
        <div className="grid gap-2">
          <h1 className="font-bold text-lg ">Item Details</h1>
          {orderDetails?.cartItems?.map((item, index) => (
            <div className="flex items-center justify-between mt-4" key={index}>
              <Label>Title: {item?.title}</Label>
              <Label>Quantity: {item?.quantity}</Label>
              <Label>Price: {item?.price}</Label>
            </div>
          ))}
        </div>
        <div className="grid gap-2 font-medium">
          <h1 className="text-lg font-bold">Shipping Info</h1>
          <span>{user?.userName}</span>
          <span>{orderDetails?.addressInfo?.address}</span>
          <span>{orderDetails?.addressInfo?.city}</span>
          <span>{orderDetails?.addressInfo?.pincode}</span>
          <span>{orderDetails?.addressInfo?.phone}</span>
          <span>{orderDetails?.addressInfo?.notes}</span>
        </div>

        {user.role === "admin" && (
          <div>
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleFormSubmit}
              buttonText={"Update Status"}
            />
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default OrderDetailsModal;
