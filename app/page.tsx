"use client";
import Image from "next/image";
import Item from "./components/Item";
import data from "../data.json";
import { useEffect, useState } from "react";
import { count } from "console";
import { useCart } from "./components/Context";
export default function Home() {
  let width: number;

  useEffect(() => {
    width = window.screen.width;
  }, []);

  const { cart, setCart } = useCart();
  const [total, settotal] = useState<number>(0);
  const [Confirm, setConfirm] = useState<boolean>(false);
  const screen = () => {
    if (width >= 1440) {
      return "dasktop";
    } else if (width > 425) {
      return "tablet";
    } else {
      return "mobile";
    }
  };
  useEffect(() => {
    if (Confirm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [Confirm]);
  useEffect(() => {
    let sum = 0;
    cart.map((item) => {
      sum = sum + data[item.id].price * item.count;
    });
    settotal(sum);
  }, [cart]);
  const typepc = screen();

  return (
    <main className="flex flex-row flex-wrap min-h-screen  container mx-auto">
      <div className="basis-full text-5xl font-bold my-20 max-md:ms-5 max-md:my-10">
        Desserts
      </div>
      <div className="basis-3/5 max-md:basis-full">
        <div
          className="flex flex-row flex-wrap justify-around gap-0"
          
        >
          {data.map((datas, index) => {
            let image;
            if (typepc === "dasktop") {
              image = datas.image.desktop;
            } else if (typepc === "tablet") {
              image = datas.image.tablet;
            } else if (typepc === "mobile") {
              image = datas.image.mobile;
            } else {
              image = datas.image.thumbnail;
            }
            return (
              <Item
                key={index}
                id={index}
                title={datas.category}
                description={datas.name}
                price={datas.price}
                image={image}
              ></Item>
            );
          })}
        </div>
      </div>
      <div className="basis-2/5 max-md:basis-full">
        <div className="relative md:-top-20 md:w-4/5 w-full mx-auto bg-white p-5 rounded-2xl " >
          <div className="my-5 mx-3 text-2xl font-bold">
            You Cart ({cart.length})
          </div>
          {cart.length == 0 ? (
            <img
              src="./assets/images/illustration-empty-cart.svg "
              className="w-2/5 mx-auto"
            ></img>
          ) : (
            cart.map((item,index) => {
              return (
                <div key={"cart-"+index} >
                  <div className="flex flex-wrap my-2 mx-3">
                    <div className="basis-full font-medium text-lg">
                      {data[item.id].name}
                    </div>
                    <div className="basis-1/5 font-medium text-Red text-lg  ">
                      {item.count}x
                    </div>
                    <div className="basis-3/5 text-lg text-Rose-500 ">
                      @ ${data[item.id].price.toFixed(2)} $
                      <span className="font-semibold">
                        {(data[item.id].price * item.count).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })
          )}
          {cart.length == 0 ? (
            <div className="text-xl text-center mb-10">
              Your added items will appear here
            </div>
          ) : (
            <div className="m-3">
              <div className="flex justify-between  ">
                <div className="text-lg text-Rose-900 font-medium">
                  order total
                </div>
                <div className="text-2xl text-Rose-900 font-bold">
                  ${total.toFixed(2)}
                </div>
              </div>
              <div className="text-lg py-3 bg-Rose-50 flex justify-center rounded-xl my-3">
                <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
                <div>
                  This is a<span className="font-medium"> carbon-neutral </span>
                  delivery
                </div>
              </div>
              <button
                onClick={() => setConfirm(true)}
                className="text-lg py-3 bg-Red hover:bg-RedBold w-full rounded-full text-white font-semibold"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
        {Confirm ? (
          <div className="">
            <div className="fixed inset-0 bg-black bg-opacity-50  touch-none  z-10"></div>
            <div className="fixed md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 max-md:bottom-0  max-md:rounded-t-2xl max-md:px-5 md:min-w-[500px] lg:w-1/3 md:w-1/2 w-full bg-white z-20 rounded-t-xl">
              <div className="flex flex-row flex-wrap ">
                <div className="basis-full">
                  <div className="md:w-4/5 w-full mx-auto  mt-10 rounded-md">
                    <img
                      className="mb-5 mt-16"
                      src="./assets/images/icon-order-confirmed.svg"
                      alt=""
                    />
                    <div className="lg:text-5xl text-4xl font-bold ">
                      Order Comfirmed
                    </div>
                    <p className="text-lg text-Rose-400">
                      We hope you enjoy your food!
                    </p>
                  </div>
                  <div className="md:w-4/5 w-full mx-auto bg-Rose-100 p-5 mt-5 rounded-md md:max-h-[500px] max-h-[400px] overflow-y-auto">
                    {cart.map((item,index) => {
                      return (
                        <div key={"Confirm-"+index}>
                          <div className="flex flex-wrap my-2 mx-3 items-center">
                            <div className="basis-1/6 font-medium text-lg">
                              <img src={data[item.id].image.thumbnail} alt="" />
                            </div>
                            <div className="basis-3/6 font-medium text-lg mx-5 ">
                              <div className="text-Rose-900">
                                {data[item.id].name}
                              </div>
                              <div className="text-Red">
                                {item.count}x
                                <span className="text-Rose-500 ms-10">
                                  ${data[item.id].price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <div className="basis-1/6 text-lg text-Rose-900 font-bold ">
                              ${(data[item.id].price * item.count).toFixed(2)}
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                    <div className="flex justify-between  ">
                      <div className="text-lg text-Rose-900 font-medium">
                        order total
                      </div>
                      <div className="text-2xl text-Rose-900 font-bold">
                        ${total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-4/5 w-full mx-auto my-10">
                    <button
                      onClick={() => {
                        setConfirm(false);
                        setCart([])
                      }}
                      className="text-lg py-3  bg-Red hover:bg-RedBold rounded-full text-white font-semibold w-full"
                    >
                      Start New Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {}
      <div className="basis-full text-center">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d"
          target="_blank"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://www.frontendmentor.io/profile/NiLoBol" target="_blank">
          NiLoBol
        </a>
        .
      </div>
    </main>
  );
}
