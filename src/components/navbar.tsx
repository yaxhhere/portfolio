import { FaSearch, FaInfoCircle, FaSuitcase } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

export default async function Navbar() {
  return (
    <nav className="flex justify-between w-full p-10 xl:px-[200px] absolute">
      <img
        src="/images/logo.png"
        className="w-[50px] md:w-[150px] md:h-[120px]"
      />
      <ul className="flex flex-row justify-between gap-10">
        <li className="md:hidden block basis-1/3 text-[30px] cursor-pointer hover:drop-shadow-2xl">
          <FaInfoCircle />
        </li>
        <li className="md:hidden block basis-1/3 text-[30px] cursor-pointer hover:drop-shadow-2xl">
          <FaSuitcase />
        </li>
        <li className="md:hidden block basis-1/3 text-[34px] cursor-pointer hover:drop-shadow-2xl">
          <MdOutlineMailOutline />
        </li>
        <li className="md:block hidden basis-1/3 text-[24px] cursor-pointer hover:drop-shadow-2xl">
          About
        </li>
        <li className="md:block hidden basis-1/3 text-[24px] cursor-pointer hover:drop-shadow-2xl">
          Portfolio
        </li>
        <li className="md:block hidden basis-1/3 text-[24px] cursor-pointer hover:drop-shadow-2xl">
          Contact
        </li>
      </ul>
      <div className="flex flex-row relative">
        <input
          className="hidden md:block w-[150px] h-[38px] text-[18px] rounded-[12px] bg-transparent border-[2px] border-gray-600 px-2"
          placeholder="Search..."
        />
        <FaSearch className="absolute md:right-3 md:top-[9px] text-gray-600 md:text-[18px] text-[30px]" />
      </div>
    </nav>
  );
}
