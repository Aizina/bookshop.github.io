"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookCardProps } from '../context/interfaces';
import Image from 'next/image';
import '@/styles/globals.css'
import { RootState, AppDispatch } from '@/store/index';
import {removeFromCart, addToCart} from '@/store/cartSlice';


const BookCard: React.FC<BookCardProps> = (props) => {
   
    const dispatch: AppDispatch = useDispatch();
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const [inCart, setInCart] = useState(props.isInCart);

    useEffect(() => {
        const isInCart = cartItems.some(item => item.id === props.id);
        setInCart(isInCart);
    }, [cartItems, props.id]);

    const handleCartToggle = () => {
        if (inCart) {
            dispatch(removeFromCart(props.id));
        } else {
            dispatch(addToCart(props));
        }
        setInCart(!inCart);
    }

    const createRatingStars = (averageRating: number) => {
        const rating = averageRating ? Math.round(averageRating) : Math.floor(Math.random() * 5) + 1;
        return <Image src={`/stars/stars${rating}.png`} alt={`Rating: ${rating} stars`} width={50} height={20}/>;
    };
  
      return (
        <div className="flex max-w-l gap-3 overflow-hidden min-h-full align-middle justify-center z-10 p-3 md:p-5">
    
            <div className="w-1/2 flex align-middle ">
                <Image src={props.cover} alt={`${props.title} cover`}  layout="responsive"  
                width={100} height={100} objectFit="cover" objectPosition="center"/>
            </div>
        
            <div className="flex flex-col justify-center w-1/2 p-3 gap-2">
                <div>
                    <p className="text-[#5C6A79] mb-2 truncate font-opensans text-xs md:text-sm">{props.author.join(', ')}</p>
                    <h2 className="text-md font-bold text-[#1C2A39] truncate md:text-lg">{props.title}</h2>
                    
                    <div className="flex items-center mb-2">
                        {createRatingStars(props.averageRating)}
                        <span className="text-[#5C6A79] text-xs md:text-sm">{props.ratingsCount} review</span>
                    </div>
    
                    <p className="text-[#5C6A79] line-clamp-3 font-opensans text-xs md:text-sm">{props.description}</p>
                </div>
    
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#1C2A39] text-md md:text-lg">${props.amount}</p>
                </div>
    
                <button
                    onClick={handleCartToggle}
                    className="text-[#4C3DB2] font-semibold uppercase border-solid border-[1px] border-[#4C3DB2] py-4 px-2 mt-2 text-xs md:text-sm"
                >
                    {inCart ? "in the cart" : "Buy Now"}
                </button>
            </div>
        </div>
    );
    
};

export default BookCard;
