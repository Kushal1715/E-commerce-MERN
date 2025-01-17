import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop-product-slice";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.shopProducts);
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (section, currentOption) => {
    let copyFilters = { ...filters };
    const indexOfSection = Object.keys(copyFilters).indexOf(section);
    if (indexOfSection === -1) {
      copyFilters = { ...copyFilters, [section]: [currentOption] };
    } else {
      const indexOfOption = copyFilters[section].indexOf(currentOption);
      if (indexOfOption === -1) {
        copyFilters[section].push(currentOption);
      } else {
        copyFilters[section].splice(indexOfOption, 1);
      }
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  console.log(searchParams);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter handleFilter={handleFilter} filters={filters} />
      <div className="w-full bg-background rounded-lg shadow">
        <div className="flex items-center justify-between border-b p-4">
          <h1 className="font-extrabold text-lg">All Products</h1>
          <div className="flex items-center gap-3">
            <h3 className="text-muted-foreground">
              {products?.length} products
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" /> <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem value={option.id} key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
          {products && products.length > 0
            ? products.map((productList) => (
                <ShoppingProductTile
                  product={productList}
                  key={productList._id}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
