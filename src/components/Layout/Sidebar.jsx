import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/users", label: "Users" },
  { path: "/issues", label: "Issues" },
  { path: "/messages", label: "Messages" },
  { path: "/monitor", label: "Monitor" },
  { path: "/settings", label: "Settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-3 py-2 rounded ${
              location.pathname.startsWith(item.path)
                ? "bg-gray-700"
                : "hover:bg-gray-800"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
