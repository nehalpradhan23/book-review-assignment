import BooksList from "../components/BooksList";

const BookListings = () => {
  return (
    <div className="flex flex-col max-2xl:mx-6 2xl:max-w-[1500px] mx-auto">
      <div className="my-10 flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-6xl font-semibold">All books</h1>
          <button className="bg-blue-500 rounded-full text-xl text-white px-4 flex items-center justify-center py-2 h-fit">
            Login
          </button>
        </div>
        {/* search and filter */}
        <div className="flex items-center gap-4 mt-10">
          <input
            className="w-[400px] border p-3 border-black/30 rounded-md"
            type="text"
            placeholder="Search"
          />
          <button>filters</button>
        </div>
        <div className="mt-14">
          <BooksList />
        </div>
      </div>
    </div>
  );
};

export default BookListings;
