import React from "react";

const MovieCard = ({
  image,
  text,
  lastTime,
}: {
  image: string,
  lastTime: number,
  text: String,
}) => {
  return (
    <div className="flex rounded-lg w-[330px] h-[330px] overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300 ">
      <a className="card-hover-animation flex flex-col grow space-y-2 items-center justify-center rounded-lg text-center text-xl font-medium even:bg-app-semi-dark-blue">
        <img src={image} className="object-fill h-full w-full" />
        {/* 
        <span className="">{text} </span>  */}
      </a>
    </div>
  );
};

export default MovieCard;
