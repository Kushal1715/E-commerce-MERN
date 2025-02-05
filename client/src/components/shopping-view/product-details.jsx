import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [starRating, setStarRating] = useState(0);

  const handleAddToCart = (currentProductId) => {
    dispatch(
      addToCart({ userId: user.id, productId: currentProductId, quantity: 1 })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: "Added to cart",
        });
        dispatch(fetchCartItems(user.id));
      }
    });
  };

  const handleStarRating = (ratingNumber) => {
    setStarRating(ratingNumber);
  };

  console.log(productDetails);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]"
        aria-describedby="dialog-description"
      >
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center">
              <StarIcon className="fill-black" />
              <StarIcon className="fill-black" />
              <StarIcon className="fill-black" />
              <StarIcon className="fill-black" />
              <StarIcon className="fill-black" />
            </div>
            <span>({productDetails?.averageReview})</span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              className="w-full"
              onClick={() => handleAddToCart(productDetails._id)}
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div>
            <h1 className="font-bold text-xl mb-5">Reviews</h1>
            <div className=" max-h-[250px] overflow-auto">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>KK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-lg">Kushal Khadka</h2>
                  <div className="flex items-center gap-1">
                    <StarIcon fill="black" />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                  <span className="text-muted-foreground">
                    This is an awesome product
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="font-bold text-xl mb-2">Write a Review</h1>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <StarIcon
                      className={`w-8 h-8 cursor-pointer`}
                      key={number}
                      onClick={() => handleStarRating(number)}
                      fill={number <= starRating ? "yellow" : "white"}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-3 mb-5">
                <Input placeholder="Write a review" type="text" />
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
