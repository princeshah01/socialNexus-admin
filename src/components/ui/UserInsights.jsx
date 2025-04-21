import React, { useState } from "react";

const UserInsights = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className=" bg-base-100  h-[17.5rem] overflow-y-auto  border-neutral border-2 rounded-lg">
      <div className="w-[100%]">
        <div className="sticky gap-4 top-0 z-10 border-b-1 border-neutral bg-base-100 h-10 overflow-hidden flex items-center  rounded-t-sm">
          {/* <div className="tabs h-10 tabs-box p-0 w-full  overflow-hidden">
            <input
              type="radio"
              name="my_tabs_1"
              className="tab w-1/3"
              aria-label="Tab 1"
            />
            <input
              type="radio"
              name="my_tabs_1"
              className="tab w-1/3"
              aria-label="Tab 2"
              defaultChecked
            />
            <input
              type="radio"
              name="my_tabs_1"
              className="tab w-1/3"
              aria-label="Tab 3"
            />
          </div> */}
          <div role="tablist" className="tabs tabs-lift w-full">
            <a
              role="tab"
              onClick={() => {
                setActiveTab(1);
              }}
              className={`tab w-1/3 ${
                activeTab == 1 && "bg-base-300"
              } hover:bg-base-300`}
            >
              Connections
            </a>
            <a
              role="tab"
              onClick={() => {
                setActiveTab(2);
              }}
              className={`tab w-1/3 ${
                activeTab == 2 && "bg-base-300"
              } hover:bg-base-300`}
            >
              Issues
            </a>
            <a
              role="tab"
              onClick={() => {
                setActiveTab(3);
              }}
              className={`tab w-1/3 ${
                activeTab == 3 && "bg-base-300"
              } hover:bg-base-300`}
            >
              Photos
            </a>
          </div>
        </div>
        {activeTab == 1 && (
          <>
            <div className=" w-full h-80 bg-red-400"> connections </div>
          </>
        )}
        {activeTab == 2 && (
          <>
            <div className=" w-full h-80 bg-amber-200">issues</div>
          </>
        )}
        {activeTab == 3 && (
          <>
            <div className=" w-full h-80 bg-amber-600">Photos</div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInsights;
