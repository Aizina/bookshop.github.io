"use client";
import React from "react";
import { CategoriesProps } from "@/context/interfaces";


export default function Categories({ currentCategory, setCurrentCategory}: CategoriesProps) {
  
  const categories = [ "Architecture", "Art & Fashion", "Biography",
                        "Business", "Crafts & Hobbies", "Drama",
                        "Fiction", "Food & Drink", "Health & Wellbeing",
                        "History & Politics", "Humor", "Poetry",
                        "Psychology", "Science", "Technology", "Travel & Maps",];

  return (
    <div className="flex flex-col gap-4 bg-[#EFEEF6] max-h-max p-12 pl-7 text-xs text-left md:text-md md:pl-24 ">
      { categories.map((category) => (
        <div key={category} className="flex flex-row items-center space-x-2 relative">
          {currentCategory === category && (
            <span className="w-2 h-2 bg-[#756AD3] rounded-full absolute left-[-4%]"></span>
          )}
          <div
            className={`${
              currentCategory === category
                ? "text-[#1C2A39] font-bold text-md md:text-lg"
                : "text-[#5C6A79] "
            } cursor-pointer`} onClick={() =>setCurrentCategory(category)}
          >
            {category}
          </div>
        </div>
  ))}
    </div>
  );
}
