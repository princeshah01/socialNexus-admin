import React from "react";
import BackButton from "../components/ui/BackButton";
const UserDetails = () => {
  return (
    <div className="relative w-full h-full overflow-y-auto  border-neutral border-2 rounded-xl">
      <div className="sticky gap-4 top-0 z-10 backdrop-blur-xl px-4 h-12 flex justify-between  items-center border-b border-neutral rounded-t-2xl">
        <BackButton />
        <h3 className="text-xl tracking-wide font-semibold">User Details</h3>
      </div>
      <div className="w-full h-full flex flex-col lg:flex-row justify-between px-10 py-5 gap-10 ">
        {/* <div className="bg-base-200 h-full w-full lg:w-2/4 border-neutral border-2 rounded-lg ">
          hi
        </div>
        <div className="bg-base-200 h-full w-full lg:w-2/4 border-neutral border-2 rounded-lg">
          hi
        </div> */}
      </div>
    </div>
  );
};

export default UserDetails;
