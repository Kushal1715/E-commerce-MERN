import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetSearchProducts, searchProduct } from "@/store/shop/searchSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchProducts } = useSelector((state) => state.shopSearch);

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
    </div>
  );
};

export default SearchProducts;
