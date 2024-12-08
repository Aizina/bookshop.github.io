import React from 'react';
import { BookInCartProps } from '@/context/interfaces';
import Image from 'next/image';

const BookInCart: React.FC<BookInCartProps> = ({ cover, author, title, averageRating, ratingsCount}) => {
    
    const createRatingStars = (averageRating: number) => {
        const rating = averageRating ? Math.round(averageRating) : Math.floor(Math.random() * 5) + 1;
        return <Image src={`/stars/stars${rating}.png`} alt={`Rating: ${rating} stars`} width={20} height={20}/>;
    };

    return (
        <div className="flex max-w-md gap-3 overflow-hidden min-h-full align-middle justify-center">

            <div className="w-1/2 flex align-middle">
                <Image src={cover} alt={`${title} cover`} width={40} height={40} />
            </div>
        
            <div className="flex flex-col justify-around align-middle w-1/2">
                <div>
                    <h2 className="text-lg font-bold text-[#1C2A39] truncate">{title}</h2>
                    <p className="text-[#5C6A79] text-sm mb-2 truncate font-opensans">{author.join(', ')}</p>
                    
                    <div className="flex items-center mb-2">
                        {createRatingStars(averageRating)}
                        <span className="text-sm text-[#5C6A79]">{ratingsCount} review</span>
                    </div>

            </div>
        </div>
    </div>
    );
};

export default BookInCart;
