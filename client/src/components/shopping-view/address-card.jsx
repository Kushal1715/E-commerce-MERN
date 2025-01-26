import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  address,
  handleAddressDelete,
  handleAddressEdit,
  selectedAddress,
  setSelectedAddress,
}) => {
  return (
    <Card
      className={`${
        selectedAddress?._id === address?._id ? "border border-blue-500" : null
      }`}
    >
      <CardContent
        className={`flex flex-col gap-3 py-6`}
        onClick={() => setSelectedAddress(address)}
      >
        <Label>Address: {address.address}</Label>
        <Label>City: {address.city}</Label>
        <Label>Pincode: {address.pincode}</Label>
        <Label>Phone: {address.phone}</Label>
        <Label>Notes: {address.notes}</Label>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={() => handleAddressEdit(address)}>Edit</Button>
        <Button onClick={() => handleAddressDelete(address)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
