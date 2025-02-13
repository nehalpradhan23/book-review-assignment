import BookReviews from "../components/BookReviews";

const BookDetails = () => {
  return (
    <div className="flex flex-col max-2xl:mx-6 2xl:max-w-[1500px] mx-auto mt-12 gap-10">
      <h1 className="text-5xl font-semibold">Book Details</h1>
      <div className="flex flex-col lg:flex-row bg-green-300">
        <div className="h-[500px] bg-red-300 lg:w-[40%] w-full">image</div>
        <div className="flex flex-col p-4">
          <span>title</span>
          <span>author</span>
          <span>ratings</span>
        </div>
      </div>
      <BookReviews />
    </div>
  );
};

export default BookDetails;
