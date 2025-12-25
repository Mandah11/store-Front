"use client";
import Image from "next/image";
import { Pens } from "../../icons/pen";
import { useState } from "react";
import { validators } from "tailwind-merge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { DeleteIcon } from "../../icons/delete";
import { Textarea } from "@/components/ui/textarea";
export const StoreCard = ({
  image,
  id,
  foodName,
  price,
  ingredients,
  foodMenu,
  FoodcategoryName,
  logoUrl,
  uploading,
  handleLogoUpload,
  getFoodType,
  foodId,
}) => {
  const [changeFoodstype, setChangeFoodsType] = useState(false);
  const [changeFoodMenu, setChangeFoodMenu] = useState({
    FoodName: foodName,
    Price: price,
    Ingredients: ingredients,
    category: foodId,
  });
  console.log("category", foodId);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/store`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      setChangeFoodsType(false);
      getFoodType();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/store`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          id: id,
          foodName: changeFoodMenu.FoodName,
          price: changeFoodMenu.Price,
          ingredients: changeFoodMenu.Ingredients,
          category: changeFoodMenu.category,
        }),
      });
      setChangeFoodsType(false);
      // await getData();
      getFoodType();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-99.25 min-h-85.5 h-fit  border bg-white border-gray-400 rounded-2xl flex flex-col items-center justify-evenly ">
      <div className="w-90 h-56.25 relative">
        <Image
          src={image}
          width={100}
          height={100}
          alt="image failed"
          className="w-full h-full object-center rounded-lg"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute bottom-4 right-4">
          <button
            className="h-11 w-11 rounded-full flex justify-center items-center bg-white cursor-pointer text-red-500"
            onClick={() => setChangeFoodsType(true)}
          >
            <Pens />
          </button>
        </div>
      </div>
      <div className="w-91.25 h-18  flex flex-col justify-between items-center">
        <div className="h-8  flex justify-between w-full ">
          <p>{foodName}</p>
          <p>{price}</p>
        </div>
        <div className=" h-15 w-91.25 overflow-x-scroll">
          <p>{ingredients}</p>
        </div>
      </div>
      {changeFoodstype && (
        <div className="flex fixed inset-0   z-1 bg-black/10 w-full h-full justify-center items-center">
          <div className="w-118 h-149 bg-white  rounded-2xl ml-10 items-center flex flex-col justify-evenly ">
            <div className="w-106 h-9 flex justify-between items-center ">
              <div className="h-7 w-91.5  text-[19px] font-medium">
                Dishes Info
              </div>
              <button
                className="h-9 w-9 bg-[#f5f5f7] rounded-2xl text-xl"
                onClick={() => setChangeFoodsType(false)}
              >
                x
              </button>
            </div>

            <div className="w-106 h-[424] justify-around flex-col flex ">
              <div className="w-full justify-between h-15 flex items-center ">
                <label id="dish-name" className="h-9">
                  Dishes name
                </label>

                <Textarea
                  htmlFor="dish-name"
                  className=" w-72 px-2 border"
                  placeholder="Type food name"
                  value={changeFoodMenu.FoodName}
                  onChange={(e) =>
                    setChangeFoodMenu({
                      ...changeFoodMenu,
                      FoodName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="w-full h-15 flex justify-between items-center">
                <p className="h-9">Dish category</p>
                <Select
                  value={changeFoodMenu.category}
                  onValueChange={(e) =>
                    setChangeFoodMenu({
                      ...changeFoodMenu,
                      category: e,
                    })
                  }
                >
                  <SelectTrigger className="w-72 ">
                    <SelectValue placeholder={FoodcategoryName} />
                  </SelectTrigger>
                  <SelectContent>
                    {foodMenu.map((category) => {
                      return (
                        <SelectGroup key={category._id}>
                          <SelectItem value={category._id}>
                            {category.categoryName}
                          </SelectItem>
                        </SelectGroup>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full h-26 justify-between flex items-center">
                <p className="h-20">Ingredients</p>
                <Textarea
                  className="h-20 w-72 px-2 border "
                  placeholder="Type food name"
                  value={changeFoodMenu.Ingredients}
                  onChange={(e) =>
                    setChangeFoodMenu({
                      ...changeFoodMenu,
                      Ingredients: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full h-15 justify-between flex items-center">
                <p className="h-9">Price</p>
                <Textarea
                  className="h-9 w-72 px-2 border "
                  placeholder="Type food name"
                  value={changeFoodMenu.Price}
                  onChange={(e) =>
                    setChangeFoodMenu({
                      ...changeFoodMenu,
                      Price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full h-35 justify-between flex items-center">
                <p className="h-29">Image</p>
                <div className="h-29 w-72 border rounded-xl">
                  {!logoUrl ? (
                    <div>
                      <Label htmlFor="file-input">
                        <div className=" w-full h-35 flex items-center justify-center">
                          <img
                            className="w-full h-full rounded-lg"
                            src={image}
                          />
                        </div>
                      </Label>
                      <input
                        type="file"
                        accept="image/*"
                        id="file-input"
                        onChange={handleLogoUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="relative w-full h-35 object-cover">
                        <Image
                          src={logoUrl}
                          alt="Uploaded logo"
                          fill
                          className="object-center rounded-lg border border-gray-300 "
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-106 h-16  flex justify-between items-center ">
              <button
                className="w-12 h-10 border border-red-500 rounded-lg items-center flex justify-center"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </button>
              <button
                className="w-31.5 h-10 bg-black rounded-lg text-white"
                onClick={handleUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
