import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { filterOptions } from "@/config";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b ">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="pl-4">
        {Object.keys(filterOptions).map((item) => (
          <React.Fragment key={item}>
            <div className="font-bold mb-1">{item}</div>
            <div>
              {filterOptions[item].map((option) => (
                <div
                  className="mb-2 flex items-center gap-2"
                  key={option.label}
                >
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      (filters[item]?.indexOf(option.id) > -1 || false)
                    }
                    onCheckedChange={() => handleFilter(item, option.id)}
                  />
                  <Label className="">{option.label}</Label>
                </div>
              ))}
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
