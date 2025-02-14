import { createPortal } from "react-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useGlobalContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const AddBookModal = () => {
  const {
    addBookModalOpenObject: { setAddBookModalOpen },
  } = useGlobalContext();

  const [bookTitle, setBookTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageSave = async () => {
    console.log(bookTitle);
    console.log(authorName);
    console.log(coverImage);
    console.log(imageFile);
  };

  // =======================================

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file); // Generate preview URL
      setCoverImage(imageUrl);
    }
  };
  // =======================================

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const handleImageUpload = async () => {
    // const file = e.target.files?.[0];

    if (!imageFile) return;

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "upload_preset_1");
    data.append("cloud_name", "dslottvms");
    toast.info("uploading image");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dslottvms/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImageUrl = await res.json();

    if (!uploadedImageUrl) {
      toast.error("uploading error");
      return;
    }

    // setImages([...images, uploadedImageUrl.url]);
    toast.success("Image uploaded successfully");
  };
  // =======================================
  return createPortal(
    <div className="no-doc-scroll overflow-y-scroll fixed inset-0 z-50 w-full h-screen bg-black/50 flex justify-center items-center">
      <div
        className={`${"w-[90%] h-[80%] lg:w-[1200px] lg:h-[800px] rounded-2xl"} bg-white p-6 flex flex-col`}
      >
        {/* top bar - close button ----------- */}
        <div className="flex items-center justify-between text-3xl font-semibold">
          <span>Add new book</span>
          {/* <button className=""></button> */}
          <MdOutlineCancel
            className="cursor-pointer"
            onClick={() => setAddBookModalOpen(false)}
          />
        </div>
        {/* form ====================================== */}
        <div className="flex flex-col mt-8 gap-5 text-xl overflow-y-scroll h-full">
          <div className="flex flex-col gap-2">
            <span>Add book title: </span>
            <input
              className="border px-2 py-1 border-black/50 rounded-md outline-none"
              type="text"
              placeholder="Book title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Add author name: </span>
            <input
              className="border px-2 py-1 border-black/50 rounded-md outline-none"
              type="text"
              placeholder="Author name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>

          {/* add image -------------------------------------*/}
          {coverImage ? (
            // {/* display image --------------- */}
            <div className="flex flex-col gap-2">
              <div className="mt-5">
                <label
                  htmlFor="uploadImg"
                  className="flex gap-2 items-center py-2 justify-center w-full bg-gray-100 rounded-md border border-black/40 cursor-pointer"
                >
                  <FaPlus />
                  Select another
                  <input
                    id="uploadImg"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="h-[350px] w-[300px] object-contain overflow-hidden bg-red-400">
                <img
                  src={coverImage!}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <label
                htmlFor="uploadImg"
                className="flex gap-2 items-center py-2 justify-center w-full bg-gray-100 rounded-md border border-black/40 cursor-pointer"
              >
                <FaPlus />
                Add cover Image
                <input
                  id="uploadImg"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>
        {/* save book =============================== */}
        <button
          onClick={handleImageSave}
          className="bg-blue-500 mt-4 hover:bg-blue-600 text-white rounded-md py-2 text-xl"
        >
          Add book
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AddBookModal;
