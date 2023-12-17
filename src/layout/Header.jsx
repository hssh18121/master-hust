import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { OrangeButton } from "../common";

const Header = () => {
  return (
    <div className="flex justify-between px-4 py-2 h-[10vh] shadow items-center">
      <Link to="/">
        <img src="/logo.png" />
      </Link>
      <div className="flex gap-8">
        <OrangeButton icon={<IoAddCircleOutline />} title={"Thêm bài viết"} />
        <img src="/avatar.jpeg" className="rounded-full w-14 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
