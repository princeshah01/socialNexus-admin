import {
  Airplay,
  BadgeAlert,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MessagesSquare,
  Settings2,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { path: "/issues", label: "Issues", icon: <BadgeAlert size={20} /> },
  { path: "/users", label: "Users", icon: <User size={20} /> },
  { path: "/messages", label: "Messages", icon: <MessagesSquare size={20} /> },
  { path: "/monitor", label: "Monitor", icon: <Airplay size={20} /> },
  { path: "/settings", label: "Settings", icon: <Settings2 size={20} /> },
];

const Sidebar = ({ togglesideBar, setToggleSideBar }) => {
  const location = useLocation();
  const [activeHover, setActiveHover] = useState(null);
  const [isCollapsing, setIsCollapsing] = useState(false);

  const handleToggle = () => {
    setIsCollapsing(true);
    setTimeout(() => {
      setToggleSideBar(!togglesideBar);
      setIsCollapsing(false);
    }, 200);
  };

  return (
    <aside
      data-theme="gigaguerilla"
      className={`${
        togglesideBar ? "w-64" : "w-25"
      } bg-base-100 h-[84vh] border-neutral border-2 rounded-xl flex flex-row justify-between overflow-hidden transition-all duration-200 ease-in-out ${
        isCollapsing ? "opacity-90 scale-95" : ""
      }`}
    >
      <nav className="w-[85%] flex flex-col justify-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`ml-3 mr-1 px-3 py-5 rounded-md flex items-center gap-3 transition-colors duration-300 ${
              location.pathname.startsWith(item.path)
                ? "bg-primary text-primary-content shadow-md"
                : "hover:bg-base-300"
            } ${activeHover === item.path ? "scale-[1.02]" : ""}`}
            onMouseEnter={() => setActiveHover(item.path)}
            onMouseLeave={() => setActiveHover(null)}
          >
            <span className={`${togglesideBar ? "" : "mx-auto"}`}>
              {item.icon}
            </span>
            {togglesideBar && (
              <span className="text-sm font-medium transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleToggle}
        className="w-[2rem] flex justify-center items-center hover:bg-base-300 transition-colors duration-150 group"
        aria-label={togglesideBar ? "Collapse sidebar" : "Expand sidebar"}
      >
        <div className="p-2 transition-colors duration-150">
          {togglesideBar ? (
            <ChevronLeft size={24} className="text-base-content" />
          ) : (
            <ChevronRight size={24} className="text-base-content" />
          )}
        </div>
      </button>
    </aside>
  );
};

export default Sidebar;
