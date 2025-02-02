import ProductDetails from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchProductDetails } from "@/store/shop/productSlice";
import { resetSearchProducts, searchProduct } from "@/store/shop/searchSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchProducts } = useSelector((state) => state.shopSearch);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productDetails } = useSelector((state) => state.shopProducts);

  const handleSearch = () => {
    console.log(keyword);
    if (keyword && keyword.trim() !== "" && keyword.trim().length >= 3) {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(searchProduct(keyword)).then((data) => console.log(data));
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchProducts());
    }
  };

  const handleProductDetails = (productId) => {
    setOpenDetailsDialog(true);
    dispatch(fetchProductDetails(productId));
  };

  console.log(searchProducts);
  return (
    <div className="p-6">
      <div className="w-[50%] mx-auto">
        <Input
          className="border-2 border-gray-500 p-2 h-12 w-full text-xl"
          type="text"
          name="search"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="text-center mt-2 w-full">
          <Button className="w-24" onClick={handleSearch}>
            Search...
          </Button>
        </div>
      </div>
      {searchProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {searchProducts &&
            searchProducts.length > 0 &&
            searchProducts.map((product) => (
              <ShoppingProductTile
                product={product}
                key={product._id}
                handleProductDetails={handleProductDetails}
              />
            ))}
          <ProductDetails
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetails={productDetails}
          />
        </div>
      ) : (
        <h1 className="text-center font-bold text-3xl mt-6">Not found</h1>
      )}
    </div>
  );
};

export default SearchProducts;
