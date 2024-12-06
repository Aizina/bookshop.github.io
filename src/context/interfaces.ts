export type BookCardProps = {
    cover: string;
    author: string[];
    title: string;
    averageRating: number;
    ratingsCount: number;
    description: string;
    amount: number;
    isInCart: boolean;
    id: string;
    cartAmount: number;
  };

export type BookProps = {
    id: string;
    saleInfo: {
        retailPrice: {
            amount: number;
        }
    }
    volumeInfo: {
        title: string,
        authors: string[];
        description: string; 
        averageRating: number;
        ratingsCount: number;    
        imageLinks: {
            thumbnail: string;
        };
    }
};

export type Books = {
    books: BookProps[];
}

export type CategoriesProps = {
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
};

  
export type CartContextType = {
    cartItems: BookCardProps[];
    addToCart: (item: BookCardProps) => void;
    removeFromCart: (id: string) => void;
    getCartItemCount: () => number;
    updateCart: (id: string, cartAmount:number) => void;
  };
  
  export type BookInCartProps = {
    cover: string;
    author: string[];
    title: string;
    averageRating: number;
    ratingsCount: number;
  }

  export type User = {
    userName: string;
    email: string;
    description: string;
    userPhoto: string;
  }

  export interface BooksState {
    books: BookProps[];
    currentCategory: string;
    maxResults: number;
    error: string | null;
    loading: boolean;
  }
  
 