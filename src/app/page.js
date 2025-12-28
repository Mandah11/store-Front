"use client";
import { DeliveryIcon } from "./icons/delivery";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState, useEffect, useMemo } from "react";
// import { useUser } from "./userContext";
import { useRouter } from "next/navigation";
import { UserStore } from "./features/userStore";
import Link from "next/link";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export default function Home() {
  const [store, setStore] = useState([]);
  const [addfood, setAddFood] = useState([]);
  const [address, setAddress] = useState("");
  const [addloc, setAddLoc] = useState(false);
  const [deliveryIconclick, setDeliveryIconClick] = useState(false);
  // const { user, setUser, loading } = useUser();

  const getStoreDatas = async () => {
    const data = await fetch(`http://localhost:8000/storeCategory`, options);
    const jsondata = await data.json();
    setStore(jsondata);
    console.log("food", jsondata);
  };
  useEffect(() => {
    getStoreDatas();
  }, []);
  const handleAddressChange = async () => {
    setAddLoc(false);
  };
  const handleCancelChange = async () => {
    setAddLoc(false);
    setAddress("");
  };
  // const handleUser = async () => {
  //   setUserClick(!userclick);

  //   if (user) {
  //     try {
  //       const { token } = await res.json();
  //       const res = await fetch(`http://localhost:8000/users`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           accept: "application/json",
  //         },
  //         headers: JSON.stringify({
  //           Authorization: token,
  //         }),
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     console.log("tar");
  //   }
  // };

  const getData = async () => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("fooddata") || "[]";

      const jsondata = JSON.parse(data);
      console.log(jsondata, "jsoooon");

      setAddFood(jsondata);
    }
  };

  const handleRemove = (food) => {
    const removedFoods = addfood.filter((item) => item.food !== food);
    setAddFood(removedFoods);

    localStorage.setItem("fooddata", JSON.stringify(removedFoods));
  };

  // const getTokenData = async () => {
  //   const token = localStorage.getItem("token");
  //   console.log(token, "jjjjjjj");
  //   try {
  //     const { id, email } = jwtDecode(token);
  //     console.log(email, "id");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);
  const router = useRouter();

  // const tokenhere = localStorage.getItem("token");
  const handleSignOut = async () => {
    const tokens = localStorage.getItem("token");
    if (tokens) {
      localStorage.removeItem("token");
      setUser(null);
      router.push("/login");
      console.log("push");
    } else {
      console.log("error");
    }
  };
  console.log(addfood, "adddddddd");

  const processed = useMemo(() => {
    return addfood?.map((data) => data.price * data.quantity);
  }, [addfood]);
  console.log(processed, "akakakakak");
  const total = useMemo(() => {
    return processed.reduce((sum, num) => sum + num, 0);
  }, [processed]);
  // console.log(total, "totalshdee");
  // console.log("{user?.email", user?.email);

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
          <Link href={`/shopBag`}>
            {" "}
            <button className="border-solid border items-center flex justify-center  rounded-sm   h-8 w-8 ">
              <DeliveryIcon />
            </button>
          </Link>

          <button className="border-solid border items-center flex justify-center  rounded-sm   h-8 w-8 ">
            <FaRegUser size={12} />
          </button>
        </div>
      </div>
      <div className="h-48 w-full flex justify-center items-center">
        <img className="h-46 w-[97%] rounded-sm" src="./storeheader.JPG" />
      </div>
      {store.map((store) => {
        return (
          <UserStore
            storecategoryname={store.categoryName}
            key={store._id}
            id={store._id}
            getData={getData}
          />
        );
      })}
    </div>
  );
}
