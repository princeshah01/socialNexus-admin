import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
const Layout = ({ children }) => {
  const [togglesideBar, setToggleSideBar] = useState(false);
  return (
    <div className="w-full min-h-screen flex flex-col p-[0.8rem]">
      <Navbar />
      <div className="flex flex-row justify-between ">
        <Sidebar
          togglesideBar={togglesideBar}
          setToggleSideBar={setToggleSideBar}
        />
        <section
          data-theme="gigaguerilla"
          className={`flex bg-base-100 ${
            togglesideBar ? "w-[80.5vw]" : "w-[90.5vw]"
          } border-2 border-neutral rounded-2xl flex justify-center items-center transition-all duration-200`}
        >
          {children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
