import React, { useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import CommonForm from "./form";

const initialFormData = {
  status: "",
};

const OrderDetailsModal = () => {
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
            <Label>23423</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Order Date</p>
            <Label>1/26/2025</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Order Price</p>
            <Label>$2323</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Payment Method</p>
            <Label>Esewa</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Payment Status</p>
            <Label>In Process</Label>
          </div>
          <div className="flex items-center justify-between font-medium">
            <p>Order Status</p>
            <Label>Pending</Label>
          </div>
        </div>
        <div className="grid gap-2">
          <h1 className="font-bold text-lg ">Item Details</h1>
          <div className="flex items-center justify-between mt-4">
            <Label>Title: Product 1</Label>
            <Label>Quantity: 1</Label>
            <Label>Price: $234</Label>
          </div>
        </div>
        <div className="grid gap-2 font-medium">
          <h1 className="text-lg font-bold">Shipping Info</h1>
          <span>UserName</span>
          <span>Address</span>
          <span>City</span>
          <span>Pincode</span>
          <span>Phone</span>
          <span>Notes</span>
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
