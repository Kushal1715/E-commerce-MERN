import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddress,
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
  const { toast } = useToast();

  const handleAddressFormSubmit = (e) => {
    e.preventDefault();

    dispatch(addAddress({ ...formData, userId: user.id })).then((data) => {
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
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle>Address</CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddressFormSubmit}
          buttonText="Add"
          isBtnDisabled={!isValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
