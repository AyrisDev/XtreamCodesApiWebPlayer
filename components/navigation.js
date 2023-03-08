import React from "react";
import { BiMoviePlay } from "react-icons/bi";
import { MdOutlineLiveTv } from "react-icons/md";
import { TbMovie } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import Logo from "../assets/vercel.svg";
import { useState, useEffect, useRef } from "react";

function Navigation({ movie, live, seriesCate }) {
  const [movieModal, setMovieModal] = useState(true);
  const [secMovie, setSecMovie] = useState(false);
  const [secLive, setSecLive] = useState(false);
  const [secSeries, setSecSeries] = useState(false);
  const navbar = movieModal
    ? "sticky navi bottom-0 z-50 flex items-center backdrop-blur-[5px] bg-[#10121b] bg-opacity-10  bg-clip-padding justify-between  p-5 md:mt-6  lg:fixed lg:left-0 lg:mr-0 lg:h-full lg:flex-col lg:py-9 "
    : "sticky navi bottom-0 z-50 flex items-left space-y-10 bg-[#10121b] bg-opacity-10 backdrop-blur-[5px] p-5  md:mt-6   lg:fixed lg:left-0 lg:mr-0 lg:h-full lg:flex-col lg:py-9 ";
  const button = movieModal
    ? "h-[20px] w-[25px] lg:h-[50px] lg:w-[50px] cursor-pointer"
    : "hidden";

  const hider = movieModal ? "space-y-10" : "hidden";
  const hiderr = movieModal
    ? "hidden"
    : "flex flex-col justify-center items-center ";

  const liveSection = secLive
    ? "flex flex-col justify-center items-center"
    : "hidden";

  const movieSection = secMovie
    ? "flex flex-col justify-center items-center"
    : "hidden";

  const seriesSection = secSeries
    ? "flex flex-col justify-center items-center"
    : "hidden";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);
  const refOne = useRef(null);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      console.log("clic outside");
      setMovieModal(true);
      setSecMovie(false);
      setSecLive(false);
      setSecSeries(false);
    } else {
      console.log("inside");
    }
  };

  return (
    <div className={navbar} ref={refOne}>
      <div className="flex space-x-2 items-center justify-center">
        <svg
          className="h-[20px] w-[25px] lg:h-[25.6px] lg:w-[32px]"
          width="1em"
          height="1em"
          viewBox="0 0 33 27"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
            fill="#FC4747"
          />
        </svg>
        <h1 className="hidden">afddf</h1>
      </div>
      <div className={hider}>
        <div
          onClick={() => {
            setMovieModal(!movieModal);
            setSecLive(!secLive);
          }}
          className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <MdOutlineLiveTv className={button} />

          <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
            Live Channels
          </span>
        </div>
        <div
          onClick={() => {
            setMovieModal(!movieModal);
            setSecMovie(!secMovie);
          }}
          className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <TbMovie className={button} />

          <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
            Movies
          </span>
        </div>
        <div
          onClick={() => {
            setMovieModal(!movieModal);
            setSecSeries(!secSeries);
          }}
          className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <BiMoviePlay className={button} />

          <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
            Series
          </span>
        </div>
      </div>
      {/* Live Section */}
      <div className={liveSection}>
        <div
          className="w-full flex space-x-4 mr-24 mb-6 font-bold text-lg items-center justify-center  text-center cursor-pointer hover:text-red-500 "
          onClick={() => {
            setMovieModal(!movieModal);
            setSecLive(false);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>

          <h1 className="font-bold text-2xl text-center   font-oswald">
            Live Channels
          </h1>
        </div>

        <ul className="max-h-screen overflow-y-scroll flex flex-col ml-4 w-max scrollbar-thin scrollbar-thumb-[#10121b]/30  scrollbar-track-transparent relative">
          {live ? (
            <>
              {live.map((genre) => (
                <div
                  className="font-bold   relative  two px-4"
                  key={genre.category_id}>
                  <a href={`/live/${genre.category_id} `}>
                    <li className=" cursor-pointer  hover:scale-105   mt-2 font-oswald relative">
                      {genre.category_name}
                    </li>
                    <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-1 bg-yellow-400"></span>
                    <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-1 bg-yellow-400"></span>
                  </a>
                </div>
              ))}
            </>
          ) : (
            <>Loading</>
          )}
          <li>test</li>
        </ul>
      </div>
      {/* Movie Section */}
      <div className={movieSection}>
        <div
          className="w-full flex space-x-4 mr-24 mb-6 font-bold text-lg items-center justify-center  text-center cursor-pointer hover:text-red-500 "
          onClick={() => {
            setMovieModal(!movieModal);
            setSecMovie(false);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>

          <h1 className="font-bold text-2xl text-center   font-oswald">
            Movies Categories
          </h1>
        </div>

        <ul className="max-h-screen overflow-y-scroll flex flex-col ml-4 w-max scrollbar-thin scrollbar-thumb-[#10121b]/30  scrollbar-track-transparent relative">
          {movie ? (
            <>
              {movie.map((genre) => (
                <div
                  className="font-bold   relative  two px-4"
                  key={genre.category_id}>
                  <a href={`/movie/category/${genre.category_id}`}>
                    <li className=" cursor-pointer  hover:scale-105   mt-2 font-oswald relative">
                      {genre.category_name}
                    </li>
                    <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-1 bg-yellow-400"></span>
                    <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-1 bg-yellow-400"></span>
                  </a>
                </div>
              ))}
            </>
          ) : (
            <>Loading</>
          )}
          <li>test</li>
        </ul>
      </div>
      {/* Series Section */}
      <div className={seriesSection}>
        <div
          className="w-full flex space-x-4 mr-24 mb-6 font-bold text-lg items-center justify-center  text-center cursor-pointer hover:text-red-500 "
          onClick={() => {
            setMovieModal(!movieModal);
            setSecSeries(false);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>

          <h1 className="font-bold text-2xl text-center   font-oswald">
            Series Categories
          </h1>
        </div>

        <ul className="max-h-screen overflow-y-scroll flex flex-col ml-4 w-max scrollbar-thin scrollbar-thumb-[#10121b]/30  scrollbar-track-transparent relative">
          {seriesCate ? (
            <>
              {seriesCate.map((genre) => (
                <div
                  className="font-bold   relative  two px-4"
                  key={genre.category_id}>
                  <a href={`/series/category/${genre.category_id}`}>
                    <li className=" cursor-pointer  hover:scale-105   mt-2 font-oswald relative">
                      {genre.category_name}
                    </li>
                    <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-1 bg-yellow-400"></span>
                    <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-1 bg-yellow-400"></span>
                  </a>
                </div>
              ))}
            </>
          ) : (
            <>Loading</>
          )}
          <li>test</li>
        </ul>
      </div>

      <div>
        <div
          onClick={() => setMovieModal(!movieModal)}
          className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <CiSettings className={button} />

          <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
            Settings
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
