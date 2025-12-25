"use client";
import { BiSolidShoppingBags } from "react-icons/bi";
import { DeliveryIcon } from "./icons/delivery";
import { UserIcon } from "./icons/user";
import { CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="h-16 flex justify-between">
        <div className="flex px-3 gap-2  h-full items-center ">
          <HiOutlineShoppingBag size={30} className="text-[#1d4ed8]" />
          <div className="h-8 font-medium w-16 mt-1 text-[12px] flex flex-col justify-center  text-[#1d4ed8]">
            <p>Herlen'z</p>
            <p>store</p>
          </div>
        </div>
        <div className="h-full flex items-center w-20 gap-2">
          <button className="border-solid border items-center flex justify-center  rounded-sm   h-8 w-8 ">
            <DeliveryIcon />
          </button>
          <button className="border-solid border items-center flex justify-center  rounded-sm   h-8 w-8 ">
            <FaRegUser size={12} />
          </button>
        </div>
      </div>
      <div className="h-48 w-full flex justify-center items-center">
        <img className="h-46 w-[97%] rounded-sm" src="./storeheader.JPG" />
      </div>
      <div className="w-full ">
        <div className="h-10 flex items-center px-6">fhsg dhajgfuye</div>
        <div className="w-full  h-fit gap-6 flex items-center flex-wrap justify-center">
          <div className="bg-green-200 h-50 w-40"></div>
          <div className="bg-green-200 h-50 w-40"></div>
          <div className="bg-green-200 h-50 w-40"></div>
          <div className="bg-green-200 h-50 w-40"></div>
          <div className="bg-green-200 h-50 w-40"></div>
          <div className="bg-green-200 h-50 w-40"></div>
        </div>
      </div>
    </div>
  );
}
