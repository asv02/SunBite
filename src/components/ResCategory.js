import { useState } from "react";

const ResCategory = ({ title, itemCards,show,setShow,showIndex }) => {
  
  const handleClick= ()=>
    {
      showIndex();
      setShow()
    }
  
  return (
    <div className="w-6/12 mx-auto my-4 border border-gray-300 rounded-md shadow-md overflow-hidden">
      <div
        className="bg-gray-100 px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-200"
      >
        <h2 className="text-lg font-medium">{title}</h2>
        <span onClick={handleClick} className="text-xl">{show ? "▲" : "▼"}</span>
      </div>

      {show && (
        <ul className="bg-white px-4 py-2">
          {itemCards.map((res, index) => (
            <li
              key={index}
              className="py-2 border-b border-gray-200 last:border-none text-gray-700"
            >
              {res.card.info.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResCategory;
