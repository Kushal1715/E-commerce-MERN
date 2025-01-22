import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
} from "@/store/shop/addressSlice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditId, setCurrentEditId] = useState(null);
  const { toast } = useToast();

  const handleAddressFormSubmit = (e) => {
    e.preventDefault();

    if (currentEditId === null && addressList.length >= 3) {
      setFormData(initialFormData);
      toast({
        title: "You can only add 3 addresses",
        variant: "destructive",
      });
      return;
    }
    currentEditId
      ? dispatch(
          updateAddress({ userId: user.id, addressId: currentEditId, formData })
        ).then((data) => {
          if (data?.payload?.success) {
            setFormData(initialFormData);
            setCurrentEditId(null);
            toast({
              title: "Address updated successfully",
            });
            dispatch(fetchAddress(user.id));
          }
        })
      : dispatch(addAddress({ ...formData, userId: user.id })).then((data) => {
          if (data?.payload?.success) {
            setFormData(initialFormData);
            toast({
              title: "Address added successfully",
            });
            dispatch(fetchAddress(user.id));
          }
        });
  };

  const isValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  const handleAddressEdit = (address) => {
    setFormData({
      ...formData,
      address: address.address,
      city: address.city,
      pincode: address.pincode,
      phone: address.phone,
      notes: address.notes,
    });
    setCurrentEditId(address._id);
  };
  const handleAddressDelete = (address) => {
    console.log(address);
    dispatch(deleteAddress({ userId: user.id, addressId: address._id })).then(
      (data) => {
        if (data?.payload?.success) {
          toast({
            title: "Address deleted successfully",
          });
          dispatch(fetchAddress(user?.id));
        }
      }
    );
  };

  useEffect(() => {
    dispatch(fetchAddress(user.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {addressList && addressList.length > 0
          ? addressList.map((address, index) => (
              <AddressCard
                key={index}
                address={address}
                handleAddressDelete={handleAddressDelete}
                handleAddressEdit={handleAddressEdit}
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle>{currentEditId ? "Edit" : "Add New"}Address</CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddressFormSubmit}
          buttonText={currentEditId ? "Edit" : "Add"}
          isBtnDisabled={!isValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
