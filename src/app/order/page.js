"use client";
import Link from "next/link";
import { FoodLogo } from "../admin/icon/adminfoodlogo";
import { FoodBlackLogo } from "../admin/icon/adminfoodblacklogo";
import { OrderWhiteLogo } from "../admin/icon/orderwhitefoodlogo";
import { StateIcon } from "../admin/icon/statusIcon";
import { DownIcon } from "../admin/icon/downicon";
import { LeftIcon } from "../admin/icon/lefticon";
import { RightIcon } from "../admin/icon/righticon";
import { OrderList } from "./features/orderList";
import { useEffect, useState } from "react";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export default function Home() {
  const [order, setOrder] = useState([]);
  const getData = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/orders`,
      options
    );
    const jsondata = await data.json();
    setOrder(jsondata);
    console.log("order", jsondata);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full h-full flex">
      <div className="w-full flex justify-between">
        <div className="w-[15%]  flex flex-col items-center">
          <div className="w-[80%]  h-28  mt-7 px-5 flex items-center text-[15px]">
            <FoodLogo />
            <div className="flex flex-col items-center">
              <div className="text-[22px] font-medium">NomNom</div>
              <div className="text-[18px] ml-3 text-[#808081]">
                Swift delivery
              </div>
            </div>
          </div>
          <div className="w-[80%] h-30   mt-8  flex flex-col pl-6">
            <Link href={"/admin"}>
              <button className="w-[90%] h-10  rounded-2xl   flex justify-center items-center text-[16px] gap-3">
                <FoodBlackLogo />
                Food Menu
              </button>
            </Link>
            <button className="w-[90%] h-12 rounded-2xl bg-black text-white flex items-center justify-center text-[16px] gap-3 mt-6 ">
              <OrderWhiteLogo />
              Order
            </button>
          </div>
        </div>

        <div className="w-[90%] bg-[#f5f5f7] h-screen flex  justify-center ">
          <div className="w-[95%] min-h-237 flex flex-col  ">
            <div className="h-15 w-full  justify-end flex mt-5">
              <button className="w-9 h-9 bg-black rounded-3xl"></button>
            </div>
            <div className="w-full  border border-gray-200 rounded-md h-fit ">
              <div className="h-19 w-full flex bg-white  items-center justify-between">
                <div className="w-121.25 h-11  ml-4">
                  <div>Order</div>
                  <div>32 items</div>
                </div>
                <div className="w-131.25 h-11 flex items-center justify-between mr-4">
                  <button className="w-75 h-9  rounded-2xl text-[15px] border-gray-500 bg-amber-200 border flex justify-center items-center">
                    <div>
                      <input type="date"></input>
                    </div>
                    <div className="ml-5">
                      <input type="date"></input>
                    </div>
                  </button>

                  <button className="w-53.25 h-9 bg-black text-white text-[15px] rounded-2xl">
                    Change delivery stated
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-full  h-14  flex border border-gray-200">
                  <div className="w-[4%] h-full bg- flex justify-center items-center ">
                    <input type="checkbox"></input>
                  </div>
                  <div className="w-[5%] h-full flex justify-center items-center">
                    №
                  </div>
                  <div className="w-[19%]   h-full items-center flex justify-end">
                    <div className="w-[95%] ">Customer</div>
                  </div>
                  <div className="w-[14%]    h-full items-center flex  justify-end ">
                    <div className="w-[95%] "> Food</div>
                  </div>
                  <div className="w-[13%]   h-full items-center flex  justify-end">
                    <div className="w-[91%] "> Date</div>
                  </div>
                  <div className="w-[11%]  h-full items-center flex  justify-end">
                    <div className="w-[91%] ">Total </div>
                  </div>
                  <div className="w-[18%]   h-full items-center flex justify-end">
                    <div className="w-[95%]  ">Delivery Address</div>
                  </div>
                  <div className="w-[13%]  h-full items-center flex  justify-center">
                    Delivery state
                  </div>
                </div>
                {order.map((order, index) => {
                  return (
                    <OrderList
                      key={order._id}
                      user={order?.user}
                      index={index + 1}
                      totalPrice={order.totalPrice}
                      deliveryAddress={order.deliveryaddress}
                      foodOrderItems={order.foodOrderItems}
                      createdAt={order.createdAt.slice(0, 10)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="h-22 flex justify-end items-center gap-2">
              <button className="w-8 h-8 flex justify-center items-center bg-white rounded-2xl">
                <LeftIcon />
              </button>
              <button className="w-8 h-8 flex justify-center items-center bg-white rounded-2xl">
                1
              </button>
              <button className="w-8 h-8 flex justify-center items-center bg-white rounded-2xl">
                2
              </button>
              <button className="w-8 h-8 flex justify-center items-center bg-white rounded-2xl">
                <RightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
