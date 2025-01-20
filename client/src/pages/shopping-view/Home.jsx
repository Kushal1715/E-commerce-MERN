import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const ShoppingHome = () => {
  const [slider, setSlider] = useState(0);
  const slides = [banner1, banner2, banner3];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlider((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[600px] w-full relative overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={` ${
              index === slider ? "opacity-100" : "opacity-0"
            } h-full w-full object-cover absolute top-0 left-0 transition-opacity duration-1000`}
          />
        ))}
        <Button
          className="absolute top-1/2 left-4 bg-white"
          variant="outline"
          onClick={() =>
            setSlider(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          className="absolute top-1/2 right-4 bg-white"
          variant="outline"
          onClick={() =>
            setSlider((prevSlide) => (prevSlide + 1) % slides.length)
          }
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem, index) => (
              <Card
                // onClick={() =>
                //   handleNavigateToListingPage(categoryItem, "category")
                // }
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={index}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
