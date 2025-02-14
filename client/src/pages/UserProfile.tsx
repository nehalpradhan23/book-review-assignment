import { useGlobalContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const {
    userObject: { user },
  } = useGlobalContext();

  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return;
  }

  // =====================================
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200 -mt-20">
      <div className="w-[90%] h-[80%] lg:w-[800px] lg:h-[600px] rounded-2xl bg-white p-6 flex flex-col">
        <div className="text-4xl flex justify-between items-center font-semibold mb-10">
          <span>Profile</span>
          {/* <button>Edit</button> */}
        </div>
        {/* ------------- */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center text-2xl">
            <span>Username: </span>
            <span>{user?.name}</span>
          </div>
          <div className="flex gap-3 items-center text-2xl">
            <span>Email: </span>
            <span>{user?.email}</span>
          </div>
          {/* <div className="flex gap-3 items-center text-2xl">
            <span>Is Admin?: </span>
            <span>{user?.isAdmin ? "Is an admin" : "Not an admin"}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
