import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({ address, handleAddressDelete }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 py-6">
        <Label>Address: {address.address}</Label>
        <Label>City: {address.city}</Label>
        <Label>Pincode: {address.pincode}</Label>
        <Label>Phone: {address.phone}</Label>
        <Label>Notes: {address.notes}</Label>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button>Edit</Button>
        <Button onClick={() => handleAddressDelete(address)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
