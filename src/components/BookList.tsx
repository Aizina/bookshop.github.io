"use client";
import React from 'react';
import BookCard from './BookCard';
import { Books } from '@/context/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


const BookList = ({ books }: Books) => {
    const { cartItems } = useSelector((state: RootState) => state.cart);

    const inCart = (id:string) => {
        return cartItems.some((obj) => obj.id === id);
    }
        return (
        <div >
           {Array.isArray(books) ?
                     <ul className="grid grid-cols-1 lg:grid-cols-2 gap-9 md:-ml-16 pt-10">{books.map(book => (
                        <li key={book.id}>
                            <BookCard  
                            cover={book.volumeInfo.imageLinks?.thumbnail} 
                            author={book.volumeInfo.authors || ['Unknown Author']} 
                            title={book.volumeInfo.title}
                            averageRating={book.volumeInfo.averageRating || 0} 
                            ratingsCount={book.volumeInfo.ratingsCount || 0} 
                            description={book.volumeInfo.description || 'No description available'}
                            amount={book.saleInfo.retailPrice?.amount || 0}
                            isInCart={inCart(book.id)}
                            id = {book.id}
                            cartAmount= {0} />
                        </li> ))}
                    </ul>  
                    :
                    null }
        </div>
    );
};

export default BookList;
