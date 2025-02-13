import BooksList from "../components/BooksList";

const Home = () => {
  return (
    <div className="flex flex-col max-2xl:mx-6 2xl:max-w-[1500px] mx-auto pt-20">
      <div className="my-10">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-700">
          Featured
        </h1>
        {/* <div className="flex justify-between">
          
        </div> */}
        <div className="mt-20">
          <BooksList />
        </div>
      </div>
    </div>
  );
};

export default Home;
