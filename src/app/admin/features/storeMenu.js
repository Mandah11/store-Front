"use client";
import { MenuLogo } from "../../icons/foodmenulogo.js";
import { FoodLogo } from "../../icons/adminfoodlogo.js";

import Link from "next/link";

import { useState, useEffect } from "react";
import { OrderLogo } from "../../icons/orderfoodlogo.js";
import { CategoryBadge } from "../componant/categoryBadge.js";
import { ProductItem } from "../componant/productItem.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const StoreMenu = () => {
  const [storeMenu, setStoreMenu] = useState([]);
  const [stores, setStores] = useState([]);
  const [addfoodcategory, setAddFoodCategory] = useState("");
  const [successmes, setSuccessMes] = useState("");
  const [errorAddCategory, setErrorAddCategory] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  const handleAddCategoryChange = async () => {
    if (!addfoodcategory.trim()) {
      return setErrorAddCategory("Category name is required!!");
    }
    try {
      const res = await fetch(`http://localhost:8000/storeCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          categoryName: addfoodcategory,
        }),
      });
      await getData();
      await getFood();
      setAddFoodCategory("");
      setAddCategory(false);
      setSuccessMes("New Category is being added to the menu");

      setTimeout(() => setSuccessMes(""), 3000);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    const data = await fetch(`http://localhost:8000/storeCategory`, options);
    const jsondata = await data.json();
    setStoreMenu(jsondata);
    console.log("category", jsondata);
  };
  const getFood = async () => {
    const data = await fetch(`http://localhost:8000/store`, options);
    const jsondata = await data.json();
    setStores(jsondata);
    console.log("food", jsondata);
  };

  useEffect(() => {
    getData();
    getFood();
  }, []);

  return (
    <div className="w-full h-screen flex">
      <div className="flex  w-full justify-between  ">
        <div className="w-[15%]  flex flex-col items-center  ">
          <div className="  w-[80%] h-28  mt-7 px-5 flex items-center text-[15px]">
            <FoodLogo />
            <div className=" flex flex-col items-center">
              <div className="text-[22px] font-medium">NomNom</div>
              <div className="text-[18px] ml-3 text-[#808081]">
                Swift delivery
              </div>
            </div>
          </div>
          <div className="w-[80%] h-30   mt-8  flex flex-col pl-6">
            <button className="w-[90%] h-12 bg-black rounded-2xl text-white  flex justify-center items-center text-[16px] gap-3">
              <MenuLogo />
              Food Menu
            </button>
            <Link href={"/order"}>
              <button className="w-[90%] h-10 rounded-2xl  flex justify-center items-center text-[16px] gap-3 mt-6 ">
                <OrderLogo />
                Order
              </button>
            </Link>
          </div>
        </div>

        <div className="w-[90%] bg-[#f5f5f7]  rounded-2xl min-h-232.5 items-center justify-center flex flex-col max-h-fit">
          <div className="w-[95%] h-59 items-end flex flex-col mt-5 mb-6 ">
            <button className=" h-9 w-9 bg-black rounded-3xl"> </button>
            <div className="w-full min-h-30 h-fit bg-white  rounded-xl flex flex-col justify-between mt-5 gap-2">
              <div className="w-280.75 h-8   text-[25px] flex  font-medium ml-5  mt-3">
                Dishes category
              </div>
              <div className="w-[full] min-h-20 h-fit items-center gap-3 flex flex-wrap ml-5 mb-3 ">
                <div>
                  {stores && (
                    <button className="w-auto rounded-2xl pl-2 gap-2 flex items-center border p-2 h-9">
                      All dishes
                      <div className="bg-black text-white rounded-2xl w-10 mr-1 h-6 justify-center items-center ">
                        {stores.length}
                      </div>
                    </button>
                  )}
                </div>
                {storeMenu.map((name, index) => {
                  return (
                    <CategoryBadge
                      categoryName={name.categoryName}
                      key={index}
                      totalfood={name.store}
                    />
                  );
                })}
                <div
                  onClick={() => {
                    setAddCategory(true);
                  }}
                >
                  <button className="h-9 rounded-3xl bg-[#ef4444] w-9 text-white">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[95%]  flex flex-col items-center h-full overflow-scroll ">
            {storeMenu.map((store) => {
              return (
                <ProductItem
                  categories={stores}
                  id={store._id}
                  key={store._id}
                  getData={getData}
                  getfood={getFood}
                  foodId={store._id}
                  storeMenu={storeMenu}
                  StorecategoryName={store.categoryName}
                />
              );
            })}
          </div>
        </div>
      </div>

      {addCategory && (
        <div className="flex absolute  bg-black/30 w-full h-full justify-center items-center">
          <div className="w-115 h-68 bg-white  rounded-2xl ml-10 items-center flex flex-col justify-evenly ">
            <div className="w-103 h-13 flex ">
              <div className="h-7 w-91.5 ml-1 text-[19px] font-medium mt-1">
                Add new category
              </div>
              <button
                className="h-9 w-9 bg-[#f5f5f7] rounded-2xl text-xl"
                onClick={() => setAddCategory(false)}
              >
                x
              </button>
            </div>
            <div className="w-103 h-18 justify-between flex flex-col">
              <p className="h-7 ml-1 text-[17px] font-medium">Categoryname</p>
              <input
                className="h-8.75 w-full rounded-md border px-2"
                placeholder="Type category name..."
                value={addfoodcategory}
                onChange={(e) => {
                  setAddFoodCategory(e.target.value);
                }}
              />
            </div>
            {errorAddCategory && <div>{errorAddCategory}</div>}
            <div className="w-103 h-16  flex justify-end items-end">
              <button
                className="h-10 w-30.75 bg-black text-white  rounded-md"
                onClick={handleAddCategoryChange}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
      {successmes && (
        <div className="flex fixed inset-0  z-1 w-full h-[5%]  justify-center items-center mt-2">
          <div className="bg-black rounded-md text-white h-12 flex items-center justify-center w-auto px-3 ">
            {successmes}
          </div>
        </div>
      )}
    </div>
  );
};
