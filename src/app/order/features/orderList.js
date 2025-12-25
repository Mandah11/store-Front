"use client";
import { DownIcon } from "@/app/admin/icon/downicon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { use, useState } from "react";

export const OrderList = ({
  user,
  totalPrice,
  deliveryAddress,
  index,
  foodOrderItems,
  createdAt,
}) => {
  const indexs = [index + 1];
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    return setOpen(!open);
  };
  return (
    <>
      {indexs < 18 && (
        <div className="w-full  h-14  flex border-x border-b border-gray-200">
          <div className="w-[4%] h-full bg- flex justify-center items-center ">
            <input type="checkbox"></input>
          </div>
          <div className="w-[5%]  h-full flex justify-center items-center">
            {indexs}
          </div>
          <div className="w-[19%]  h-full items-center flex justify-end">
            <div className="w-[95%] "> {user?.email}</div>
          </div>
          <div className="w-[14%]   h-full items-center flex  justify-end  ">
            <div className="w-[95%]">
              <div className="flex items-center justify-between w-[75%] gap-2 h-full">
                <div className="flex gap-1">
                  <div> {foodOrderItems.length}</div>
                  <div>foods</div>
                </div>

                <div onClick={handleOpen}>
                  <DownIcon />
                </div>
              </div>
              {open && (
                <div className="fixed mt-3.5 w-60 h-13.5 bg-blue-300 justify-center flex">
                  {foodOrderItems.map((food) => {
                    return (
                      <div
                        key={food._id}
                        value="food._id"
                        className="flex items-center h-full w-[95%] bg-green-200"
                      >
                        <img
                          className="w-10 rounded-sm h-10 object-fill"
                          src={food.food?.image || "/facebook.png"}
                        />
                        <div className="flex">
                          <div>{food.food?.foodName}</div>
                          <div className="h-full flex items-center">
                            x{food.quantity}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {/* <Select>
              <SelectTrigger className="w-[80%] border-0">
                <div className="flex items-center justify-center gap-2 text-[15px]">
                  <div> {foodOrderItems.length} foods</div>
                </div>
              </SelectTrigger>
              <SelectContent className="w-70 h-fit">
                {foodOrderItems.map((food) => {
                  return (
                    <SelectItem key={food._id} value="food._id">
                      <div>{food.food?.foodName}</div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select> */}
            </div>
          </div>
          <div className="w-[13%]   h-full items-center flex justify-end">
            <div className="w-[91%] "> {createdAt}</div>
          </div>
          <div className="w-[11%] h-full items-center flex  justify-end">
            <div className="w-[91%] ">{totalPrice}</div>
          </div>
          <div className="w-[18%] h-full items-center flex justify-end">
            <div className="w-[95%]  "> {deliveryAddress}</div>
          </div>
          <div className="w-[13%]  h-full items-center flex  justify-center">
            <Select>
              {" "}
              <SelectTrigger className="w-[49%] ml-1.5 rounded-3xl justify-around flex">
                <SelectValue placeholder="PENDING" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="DELIVERY">DELIVERY</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="CANCELED">CANCELED</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </>
  );
};
