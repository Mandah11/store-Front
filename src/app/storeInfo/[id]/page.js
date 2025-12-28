"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export default function StoreDetail() {
  const params = useParams();
  console.log("this is params", params);
  const { id } = params;

  if (!id) {
    return <div> Something wrong</div>;
  }
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
    <>
      <div
        className="flex
           justify-between  items-center p-2 "
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[15px] sm:text-[18px] text-[#515151]">jshj</p>
            <div className="flex gap-1 text-[#515151]">
              {" "}
              <p>{foodsTypes.storeName} </p>
              <p>488min</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-70.75 bg-amber-200 flex justify-between">
        <img className="h-full w-72.5 hover:opacity-30 object-cover sm:flex hidden " />
        <div className="h-full w-190 bg-amber-600  relative items-end flex ">
          <img className=" absolute -z-1 h-full w-full object-cover hover:opacity-30" />
          <div className="flex h-20  w-full items-center gap-2 z-0 ">
            <div className=" flex justify-center    text-white items-center h-full ml-3">
              jj
            </div>{" "}
          </div>
        </div>
      </div>

      <div className="w-full mt-3 sm:flex flex-col hidden ">
        <div className="mt-3 flex gap-2"></div>
        <div className="mt-5">
          <p>iiii</p>
        </div>
      </div>
      <div className="sm:hidden w-full  flex justify-center">
        <div className="flex w-[90%] bg-amber-200  justify-between">
          <img className="h-37 w-25  hover:opacity-30 object-cover sm:flex mt-4 sm:mt-0" />
        </div>
      </div>
    </>
  );
}
