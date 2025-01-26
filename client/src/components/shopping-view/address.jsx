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

const Address = ({ selectedAddress, setSelectedAddress }) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [addressToBeEditedId, setAddressToBeEditedId] = useState(null);
  const { toast } = useToast();

  const handleAddressFormSubmit = (e) => {
    e.preventDefault();

    if (addressList.length >= 2 && !addressToBeEditedId) {
      toast({
        title: "Only 2 address can be added",
        variant: "destructive",
      });
      return;
    }

    if (addressToBeEditedId) {
      dispatch(
        updateAddress({
          userId: user.id,
          addressId: addressToBeEditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAddress(user.id));
          setAddressToBeEditedId(null);
          setFormData(initialFormData);
        }
      });
    } else {
      dispatch(addAddress({ ...formData, userId: user.id })).then((data) => {
        if (data?.payload?.success) {
          setFormData(initialFormData);
          toast({
            title: "Address added successfully",
          });
          dispatch(fetchAddress(user.id));
        }
      });
    }
  };

  const isValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  const handleAddressDelete = (currentAddress) => {
    dispatch(
      deleteAddress({ userId: user.id, addressId: currentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Address deleted successfully",
        });
        dispatch(fetchAddress(user.id));
      }
    });
  };

  const handleAddressEdit = (currentAddress) => {
    setAddressToBeEditedId(currentAddress._id);
    console.log(currentAddress);
    setFormData({
      ...formData,
      address: currentAddress.address,
      city: currentAddress.city,
      pincode: currentAddress.pincode,
      phone: currentAddress.phone,
      notes: currentAddress.notes,
    });
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
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle>{addressToBeEditedId ? "Edit" : "Add"} Address</CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddressFormSubmit}
          buttonText={addressToBeEditedId ? "Edit" : "Add"}
          isBtnDisabled={!isValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
