// Header.js
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="flex justify-between px-4 py-2 h-[10vh] shadow items-center">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="mb-2 md:mb-0" />
      </Link>
      <div className="flex gap-4">
        <button className="flex items-center gap-2 border rounded-lg px-4 bg-add text-white hover:bg-orange-400 transition-all">
          <span className="text-2xl">
            <IoAddCircleOutline />
          </span>
          <span className="hidden md:block">Thêm bài viết</span>
        </button>
        <img
          src="avatar.jpeg"
          alt="Avatar"
          className="rounded-full w-10 md:w-14 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
