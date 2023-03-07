import React from "react";

const CardGenre = ({
  image,
  text,
  lastTime,
}: {
  image: string,
  lastTime: number,
  text: String,
}) => {
  return (
    <div className="flex rounded-lg w-[330px] h-[210px] overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300 ">
      <a className="card-hover-animation m-2 flex flex-col h-44 w-44 grow space-y-2 items-center justify-center rounded-lg p-8 text-center text-xl font-medium even:bg-app-semi-dark-blue">
        <img src={image} />
        <span className="">{text} </span>
      </a>
    </div>
  );
};

export default CardGenre;
