"use client";
import React, { SetStateAction } from "react";
import { useCart } from "./Context";

type Propstype = {
  title: string;
  description: string;
  image: string;
  price: number;
  id: number;
};
function Item(props: Propstype) {
  const { cart, setCart } = useCart();
  const title = props.title;
  const description = props.description;
  const price = props.price;
  const image = props.image;
  const id = props.id;
  const existingItemIndex = cart.findIndex((item) => item.id === id);

  return (
    <div
      className="xl:basis-1/3 md:basis-2/5 max-md:basis-full border-blue-100 rounded-2xl px-5 "
      key={id}
    >
      {existingItemIndex == -1 ? (
        <img className=" rounded-xl " alt="image" src={image}></img>
      ) : (
        <img
          className=" rounded-xl border-2 border-Red"
          alt="image"
          src={image}
        ></img>
      )}

      <div className="mt-10">
        <p className="text-sm text-Rose-500">{title}</p>
        <p className="text-lg text-Rose-900 font-medium">{description}</p>
        <p className="text-lg text-Red font-medium">${price.toFixed(2)}</p>
      </div>

      {existingItemIndex !== -1 ? (
        <div className=" relative -top-36 border-[1px]  py-3 border-Red text-center bg-Red  mx-8 rounded-2xl ">
          <div className="flex flex-row justify-center text-white ">
            <button
              onClick={() => {
                const updatedCart = [...cart];

                if (updatedCart[existingItemIndex].count == 1) {
                  updatedCart.splice(existingItemIndex, 1);
                } else {
                  updatedCart[existingItemIndex].count -= 1;
                }
                setCart(updatedCart);
              }}
              className="basis-6 text-center text-lg  border-white"
            >
              <div className="rounded-full border-2 w-6 h-6 p-1 hover:bg-white fill-Reds">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 10 2"
                >
                  <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                </svg>
              </div>
            </button>
            <div className="basis-24 text-center text-lg font-semibold">
              {cart[existingItemIndex].count}
            </div>
            <button
              onClick={() => {
                const updatedCart = [...cart];
                updatedCart[existingItemIndex].count += 1;
                setCart(updatedCart);
              }}
              className="basis-6 text-center text-lg  border-white"
            >
              <div className="rounded-full border-2 w-6 h-6 p-1 hover:bg-white fill-Reds">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 10 10"
                >
                  <path
                    fill="#fff"
                    d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            if (existingItemIndex !== -1) {
              const updatedCart = [...cart];
              updatedCart[existingItemIndex].count += 1;
              setCart(updatedCart);
            } else {
              setCart((prevCart) => [...prevCart, { id: id, count: 1 }]);
            }
          }}
          className="hover:cursor-pointer relative -top-36 border-[1px] border-Rose-500 hover:border-Red text-center bg-white mx-8 rounded-2xl hover:text-Red"
        >
          <button className="text-lg my-3 ">
            <img
              src="./assets/images/icon-add-to-cart.svg"
              className="inline me-3 "
            ></img>
            <p className="inline font-semibold ">Add to cart</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Item;
