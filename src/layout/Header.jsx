import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="flex justify-between px-4 py-2 h-[10vh] shadow items-center">
      <Link to="/">
        <img src="/logo.png" />
      </Link>
      <div className="flex gap-8">
        <button className="flex items-center gap-2 border rounded-lg px-4 bg-add text-white hover:bg-orange-400 transition-all">
          <span className="text-2xl">
            <IoAddCircleOutline />
          </span>
          <span>Thêm bài viết</span>
        </button>
        <img src="avatar.jpeg" className="rounded-full w-14 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
