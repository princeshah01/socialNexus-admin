import { Ellipsis } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/AuthSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const { fullname, avatar } = useSelector((store) => store.Auth.userInfo);
  const dispatch = useDispatch();
  const Handlelogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav data-theme="gigaguerilla" className="rounded-2xl  mb-4 bg-base-100 ">
      <div className="navbar bg-base-100 shadow-sm border-2 border-neutral rounded-2xl">
        <div className="flex-1">
          <Link to="dashboard">
            <span className="btn btn-ghost text-xl">Social Nexus</span>
          </Link>
        </div>
        <div className="flex flex-row justify-between items-center space-x-5">
          <div>
            <p>{fullname}</p>
          </div>
          <Link to="profile" className="avatar">
            <div className="w-10 h-10 rounded-full ">
              <img alt="Tailwind CSS Navbar component" src={avatar} />
            </div>
          </Link>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-2xl"
            >
              <Ellipsis size={30} />
            </div>
            <ul
              tabIndex={0}
              className="menu border-2 border-neutral menu-sm dropdown-content bg-base-100 rounded-lg z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="settings">Settings</Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    document.getElementById("my_modal_1").showModal();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal shadow-full">
        <div className="modal-box w-76">
          <h3 className="font-bold text-lg">Logout Confirmation</h3>
          <p className="py-4">Are you sure you want to Logout?</p>
          <div className="modal-action w-full">
            <form
              method="dialog"
              className="flex flex-row justify-between w-full"
            >
              <button className="btn">Close</button>
              <button className="btn" onClick={Handlelogout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </nav>
  );
};

export default Navbar;
