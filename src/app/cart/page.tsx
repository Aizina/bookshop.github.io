"use client";
import BookInCart from "@/components/BookInCart";
import { BookCardProps } from "@/context/interfaces";
import Image from 'next/image';
import { RootState, AppDispatch } from '@/store/index';
import { useDispatch, useSelector } from "react-redux";
import {removeFromCart, updateCart} from '@/store/cartSlice';


export default function CartPage() {

const dispatch: AppDispatch = useDispatch();
const { cartItems } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((obj) => obj.id === id);
    if (item) {
      if (item.cartAmount === 1 && delta < 0) {
       dispatch(removeFromCart(id));
      } else {
        const cartAmount = item.cartAmount + delta;
        dispatch(updateCart({id, cartAmount}));
      }
    } else {
      console.error("Item not found");
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.amount * (item.cartAmount || 1),
      0
    );
  };

  return (
    <div className="p-16 m-auto">
      <table className="text-left w-full border-spacing-12">
        <thead>
          <tr>
            <th className="text-[#5C6A79] p-4 uppercase">Item</th>
            <th className="text-[#5C6A79] p-4 uppercase">Quantity</th>
            <th className="text-[#5C6A79] p-4 uppercase">Price</th>
            <th className="text-[#5C6A79] p-4 uppercase">Delivery</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item: BookCardProps) => (
            <tr key={item.id} className="mt-6">
              <td className="p-4 ">
                <BookInCart cover={item.cover} author={item.author} title={item.title} averageRating={item.averageRating} ratingsCount={item.ratingsCount} />
              </td>
              <td className="p-4">
                <div className="flex flex-row items-center h-14">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className=" border-y border-l border-[#EEEDF5] p-4 h-14"> 
                    <Image src="/icons/minus.png" alt="minus icon" width={20} height={20}/>
                  </button>
                  <span className="border-y border-[#EEEDF5] p-4 text-[#5C6A79] text-lg h-14 font-bold">{item.cartAmount}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, +1)}
                    className="border-y border-r border-[#EEEDF5] p-4 h-14" >
                    <Image src="/icons/plus.png" alt="plus icon" width={20} height={20} />
                  </button>
                </div>

              </td>
              <td className="p-4"> 
              <span className="text-[#1C2A39] font-bold">${(item.amount * (item.cartAmount || 1)).toFixed(2)}</span>
              </td>
              <td className="p-4">
                <p className="text-[#5C6A79] font-bold">Shipping: delivery</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[#1C2A39] font-bold text-2xl p-4 py-10">TOTAL PRICE: ${calculateTotalPrice()}</p>
      <button className="text-[#4C3DB2] font-bold uppercase border-solid border-[1px] border-[#4C3DB2] px-4 py-2 m-auto w-64">CHECKOUT</button>
    </div>

  );
}
