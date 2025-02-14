export interface GlobalContextType {
  userObject: {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
    isAuthUser: boolean | undefined;
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  };
  addBookModalOpenObject: {
    addBookModalOpen: boolean;
    setAddBookModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allBooksObject: {
    allBooks: bookType[] | [];
    setAllBooks: React.Dispatch<React.SetStateAction<bookType[] | []>>;
  };
  currentBookDetailsObject: {
    currentBookDetails: bookType | null;
    setCurrentBookDetails: React.Dispatch<
      React.SetStateAction<bookType | null>
    >;
  };
}

export interface userType {
  email: string;
  name: string;
  id: string;
  isAdmin: boolean;
}

export interface bookType {
  _id: string;
  name: string;
  author: string;
  image: string;
  addedBy: string;
  reviews: any[];
}
