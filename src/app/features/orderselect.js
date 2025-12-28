"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const OrderSelect = ({
  src,
  storeName,
  price,
  ingredients,
  getData,
  store,
}) => {
  const router = useRouter();
  const [foodinfo, setFoodInfo] = useState(false);
  const [logo, setLogo] = useState(false);
  const [plus, setPlus] = useState(false);
  const [check, setCheck] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const handleNext = () => {
    return setQuantity(quantity + 1);
  };

  const handleBack = () => {
    if (quantity === 1) {
      return quantity;
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleLogochange = () => {
    return setFoodInfo(true), setLogo(false), setCheck(true), setPlus(false);
  };
  const handleAddCart = () => {
    const cartNewItem = { storeName, ingredients, price, src, quantity, store };
    const prevCart = localStorage.getItem("fooddata") || "[]";
    const parsedPrevCart = JSON.parse(prevCart);
    console.log(cartNewItem, parsedPrevCart);
    localStorage.setItem(
      "fooddata",
      JSON.stringify([...parsedPrevCart, cartNewItem])
    );
    setFoodInfo(false);
    setPlus(false);
    getData();
  };

  return (
    <div
      className=" w-40 h-48   border bg-purple-300 border-gray-400 rounded-2xl flex flex-col items-center justify-evenly "
      onClick={() => router.push(`/storeInfo/${store}`)}
    >
      <div className="w-36 h-27  relative">
        <img
          src={src || "/facebook.png"}
          width={100}
          height={100}
          alt="image failed"
          className="w-full h-full object-fill rounded-lg "
        />
        <div className="absolute bottom-2 right-2" onClick={handleLogochange}>
          <button className="h-6 w-6 rounded-full flex justify-center items-center bg-white cursor-pointer text-red-500 ">
            {!logo && <p>+</p>}
            {check && <p>-</p>}
          </button>
        </div>
      </div>
      <div className="w-36 min-h-12 h-fit flex flex-col justify-between items-center">
        <div className="h-7 items-center text-sm flex justify-between w-full ">
          <p>{storeName}</p>
          <p>{price}</p>
        </div>
        <div className="h-fit min-h-8 w-full text-sm overflow-scroll">
          {ingredients}
        </div>
      </div>
      {/* {foodinfo && (
        <div className="flex fixed inset-0   z-1 bg-black/30 w-full h-full justify-center items-center">
          <div className="w-[826px] h-[412px] bg-white  rounded-2xl ml-10 items-center flex justify-evenly  ">
            <div className="w-[377px] h-[364px] bg-amber-300"></div>
            <div className="w-[377px] h-[364px] ">
              <div className="w-full h-9 flex justify-end items-center">
                <button
                  className="w-9 h-9 rounded-3xl border border-gray-500"
                  onClick={() => {
                    setFoodInfo(false);
                  }}
                >
                  {" "}
                  x{" "}
                </button>
              </div>
              <div className="w-full h-[328px]  flex flex-col justify-between">
                <div className="w-full h-24  flex justify-between flex-col">
                  <div className="h-9  text-[30px] flex items-center">
                    {" "}
                    {foodName}
                  </div>
                  <div className="w-full h-12  text-[16px] flex items-center">
                    {" "}
                    {ingredients}
                  </div>
                </div>
                <div className="w-full h-31 justify-between flex flex-col">
                  <div className="h-14 w-full flex items-center">
                    <div className="h-full w-[256px]">
                      <div className="h-6  text-[16px] flex items-center">
                        Total price
                      </div>
                      <div className="h-8  text-[24px] font-semibold flex items-center">
                        {price * quantity}
                      </div>
                    </div>
                    <div className="w-[121px] h-11 flex justify-between items-center">
                      <button
                        className="w-11 h-11 rounded-4xl  flex items-center justify-center border border-gray-600"
                        onClick={handleBack}
                      >
                        -
                      </button>
                      <div className="h-11 w-[30px] flex justify-center items-center">
                        {quantity}
                      </div>
                      <button
                        className="w-11 h-11 rounded-4xl  flex items-center justify-center border border-gray-600"
                        onClick={handleNext}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="h-11 w-full rounded-3xl text-white bg-black"
                    onClick={handleAddCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
