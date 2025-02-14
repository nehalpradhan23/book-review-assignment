import { createContext, useContext, useState } from "react";
import { bookType, GlobalContextType, userType } from "../types/types";

const ContextProvider = createContext<GlobalContextType>({
  userObject: {
    user: null,
    setUser: () => {},
    isAuthUser: undefined,
    setIsAuthUser: () => {},
  },
  addBookModalOpenObject: {
    addBookModalOpen: false,
    setAddBookModalOpen: () => {},
  },
  allBooksObject: {
    allBooks: [],
    setAllBooks: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthUser, setIsAuthUser] = useState<boolean | undefined>(false); // is user logged in
  const [user, setUser] = useState<userType | null>(null); // store user data

  const [allBooks, setAllBooks] = useState<bookType[] | []>([]);

  const [addBookModalOpen, setAddBookModalOpen] = useState<boolean>(false);
  // ==============================================================
  return (
    <ContextProvider.Provider
      value={{
        userObject: { user, setUser, isAuthUser, setIsAuthUser },
        addBookModalOpenObject: { addBookModalOpen, setAddBookModalOpen },
        allBooksObject: { allBooks, setAllBooks },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useGlobalContext must be within a GlobalContextProvider");
  }
  return context;
};
