"use client";
import { useEffect } from "react";
import { useState } from "react";
import { OrderSelect } from "./orderselect";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const UserStore = ({ storecategoryname, id, getData }) => {
  const [foodsTypes, setFoodsTypes] = useState([]);
  console.log(foodsTypes, "hahaha");

  const getFoodTypes = async () => {
    const data = await fetch(
      `http://localhost:8000/store/findId/${id}`,
      options
    );
    const jsondata = await data.json();
    setFoodsTypes(jsondata);
  };

  useEffect(() => {
    getFoodTypes();
  }, []);

  return (
    <div className="w-screen flex flex-col justify-between mb-4 mt-1">
      <div className=" h-10 flex items-center px-6 text-black ">
        {storecategoryname}
      </div>
      <div className=" flex w-screen flex-wrap gap-6 justify-center">
        {foodsTypes.map((storesinform) => {
          return (
            <OrderSelect
              key={storesinform._id}
              store={storesinform._id}
              src={storesinform.image}
              storeName={storesinform.storeName}
              price={storesinform.price}
              ingredients={storesinform.ingredients}
              getData={getData}
            />
          );
        })}
      </div>
    </div>
  );
};
