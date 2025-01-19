import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "@/store/admin/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts = () => {
  const [openAddProductsDialog, setOpenAddProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (currentEditedId) {
      dispatch(
        editProduct({
          formData: { ...formData, image: uploadedImageUrl },
          id: currentEditedId,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(getAllProducts());
          setOpenAddProductsDialog(false);
          setFormData(initialFormData);
          setImageFile(null);
          setCurrentEditedId(null);
          setUploadedImageUrl("");
          toast({
            title: "Product Edited successfully",
          });
        }
      });
    } else {
      dispatch(addProduct({ ...formData, image: uploadedImageUrl })).then(
        (data) => {
          if (data?.payload?.success) {
            dispatch(getAllProducts());
            setOpenAddProductsDialog(false);
            setFormData(initialFormData);
            setImageFile(null);
            setUploadedImageUrl("");
            toast({
              title: data?.payload?.message,
            });
          }
        }
      );
    }
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllProducts());
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };

  const formValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  return (
    <>
      <div className="flex justify-end w-full mb-5">
        <Button onClick={() => setOpenAddProductsDialog(true)}>
          Add New Produt
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <AdminProductTile
              product={product}
              key={product._id}
              handleDelete={handleDelete}
              setOpenCreateProductsDialog={setOpenAddProductsDialog}
              setFormData={setFormData}
              setCurrentEditedId={setCurrentEditedId}
            />
          ))}
      </div>
      <Sheet
        open={openAddProductsDialog}
        onOpenChange={() => {
          setOpenAddProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditedId(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>
              {currentEditedId ? "Edit" : "Add"} New Product
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <CommonForm
            formControls={addProductFormElements}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={currentEditedId ? "Edit" : "Add"}
            isBtnDisabled={!formValid()}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
