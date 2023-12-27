import { Link, useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { OrangeButton } from "../common";
import { useEffect, useState } from "react";
import {
  addDataToSearchHistory,
  getSearchHistoryByUserId,
} from "../services/UserService";
import { useStateValue } from "../context/StateProvider";
import { useRef } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistoryStatus, setShowHistoryStatus] = useState("hidden");
  const [{ userId }] = useStateValue();
  const navigate = useNavigate();
  const showSearchHistory = () => {
    if (showHistoryStatus === "hidden") setShowHistoryStatus("");
  };
  const search = (e) => {
    e.preventDefault();
    navigate(`/search`, { searchTerm: searchTerm });
    addDataToSearchHistory(userId, searchTerm);
    setSearchHistory([searchTerm, ...searchHistory]);
    setShowHistoryStatus("hidden");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const historyRef = useRef(null);

  let searchHistory2 = searchHistory.filter((history) =>
    history.includes(searchTerm)
  );

  const fetchData = async () => {
    const historyList = await getSearchHistoryByUserId(userId);
    console.log(historyList);
    setSearchHistory(historyList);
  };
  return (
    <div className="flex justify-between px-4 py-2 h-[10vh] shadow-lg items-center relative z-10">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="mb-2 md:mb-0" />
      </Link>
      <form className="relative" onSubmit={search}>
        <FaSearch className="absolute top-1/3 left-3" />
        <input
          type="search"
          className="border-solid border-2 rounded-2xl pl-8 py-2 w-96"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onClick={() => {
            if (showHistoryStatus === "hidden") setShowHistoryStatus("");
            else setShowHistoryStatus("hidden");
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>

        <ul
          className={`border-solid border-2 absolute w-96 max-h-56 bg-white rounded-xl flex flex-col ${showHistoryStatus}`}
          ref={historyRef}
        >
          {searchHistory2?.slice(0, 5).map((history) => (
            <li
              className="px-4 py-2 hover:bg-gray-200 hover:cursor-pointer"
              onClick={(e) => {
                navigate("/search", { searchTerm: e.target.innerText });
                setSearchTerm(e.target.innerText);
                setShowHistoryStatus("hidden");
              }}
            >
              {history}
            </li>
          ))}
        </ul>
      </form>
      <div className="flex gap-4">
        <OrangeButton
          icon={<IoAddCircleOutline />}
          title={"Thêm bài viết"}
          onClick={() => navigate("/newpost")}
        />
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
