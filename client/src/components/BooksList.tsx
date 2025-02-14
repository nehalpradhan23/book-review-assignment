import { bookType } from "../types/types";
import Card from "./Card";

const BooksList = ({ books }: { books: bookType[] }) => {
  // const {
  //   allBooksObject: { allBooks },
  // } = useGlobalContext();
  // ===============================
  return (
    <div className="flex flex-wrap gap-14 max-lg:px-10 max-lg:justify-between">
      {books?.map((item, index) => (
        <Card book={item} key={index} />
      ))}
    </div>
  );
};

export default BooksList;
