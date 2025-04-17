import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";
const Layout = ({ children }) => {
  const [togglesideBar, setToggleSideBar] = useState(false);
  return (
    <div className="w-full  min-h-screen flex flex-col lg:p-[0.8rem] p-[0.6rem]">
      <Navbar />
      <div className="flex flex-row justify-between gap-3">
        <Sidebar
          togglesideBar={togglesideBar}
          setToggleSideBar={setToggleSideBar}
        />
        <section
          data-theme="gigaguerilla"
          className={`fixed top-25  left-0 flex justify-center items-center bg-base-100 border-2 border-neutral rounded-2xl transition-all duration-200
    ${
      togglesideBar
        ? "lg:w-[81.7vw] w-[62vw] left-70"
        : "lg:w-[91.3vw] w-[81.7vw] left-33"
    }
    h-[84vh] overflow-hidden`}
        >
          <div className="w-[100%] h-[100%] overflow-y-auto p-4">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Layout;
// ${
//   togglesideBar ? "w-[80.5vw]" : "w-[90.5vw]"
// }
