"use client"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBooks, setCategory, loadMoreBooks } from '@/store/bookSlice';
import { RootState, AppDispatch } from '@/store/index';
import BookList from '@/components/BookList';
import Categories from '@/components/Categories';
import Carousel from '@/components/Carousel';
import Head from 'next/head';

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { books, currentCategory, maxResults, loading, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (currentCategory && maxResults > 0) {
      dispatch(fetchBooks({ category: currentCategory, maxResults }));
    }
  }, [dispatch, currentCategory, maxResults]);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleLoadMore = () => {
    dispatch(loadMoreBooks());
  };

  return (
    <>
      <Head>
        <title>BookShop</title>
        <meta name="description" content="Online book shop" />
        <meta name="author" content="Aizat A" />
      </Head>
      <div className="py-9 flex flex-row justify-center">
        <main className="flex flex-col gap-16 w-full max-w-7xl">
          <Carousel />

          <div className="grid grid-cols-[0.2fr_0.8fr] md:grid-cols-[0.3fr_0.7fr]"> 
          <Categories currentCategory={currentCategory} setCurrentCategory={handleCategoryChange} />

            <div className="flex flex-col gap-9 align-center justify-center">
            {loading && 
              <div>Loading...</div> }
            {error && 
            <div className="text-red-500">{error}</div>}
          
              <BookList books={books} />
              <button
                onClick={handleLoadMore}
                className="text-[#4C3DB2] font-semibold uppercase border-solid border-[1px] border-[#4C3DB2] py-4 px-2 mt-2 text-xs md:text-sm m-auto w-64"
              >
                Load more
              </button>
            </div>
          </div>
        </main>
    </div>
    </>

  );
}
