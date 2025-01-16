import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { filterOptions } from "@/config";
import { Separator } from "../ui/separator";

const ProductFilter = () => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b ">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="pl-4">
        {Object.keys(filterOptions).map((item) => (
          <>
            <div className="font-bold mb-1">{item}</div>
            <div>
              {filterOptions[item].map((option) => (
                <div
                  className="mb-2 flex items-center gap-2"
                  key={option.label}
                >
                  <Checkbox />
                  <Label className="">{option.label}</Label>
                </div>
              ))}
            </div>
            <Separator />
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
