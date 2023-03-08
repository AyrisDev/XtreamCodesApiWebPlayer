import Head from "next/head";
import Link from "next/link";

import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ReactNetflixPlayer } from "react-netflix-player";
import MoviesStuff from "@/components/CatStuff";

const MovieId = () => {
  const router = useRouter();

  const [mMovieData, setMMovieData] = useState();
  const { movieId } = router.query;

  const [movieInfo, setMovieInfo] = useState("");
  const [lastSeries, setLastSeries] = useState("");
  const [playerUrl, setPlayerUrl] = useState("");

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl");
    const dataUrl = sessionStorage.getItem("dataUrl");
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    const usernamee = await JSON.parse(username);
    const passwordd = await JSON.parse(password);
    const noCors = "https://cors-anywhere.herokuapp.com/";
    const dataUrll = await JSON.parse(dataUrl);
    const urll = await JSON.parse(url);
    if (url === null) {
      router.replace("/Login");
    }
    const response = await fetch(
      urll + "&action=get_vod_info&vod_id=" + movieId
    );
    const data = await response.json();

    const parts = router.asPath.split("/");

    const lastSeriesss = await fetch(
      urll + "&action=get_vod_streams&category_id=" + parts[2]
    );
    const lastSeriess = await lastSeriesss.json();

    setLastSeries(lastSeriess);
    setMovieInfo(data.info);

    const movieData = data?.movie_data || {};
    setMMovieData(movieData);

    const movieUrl = `${dataUrll}/movie/${usernamee}/${passwordd}/${movieData?.stream_id}.${movieData?.container_extension}`;

    await setPlayerUrl(movieUrl);
  };

  useEffect(() => {
    if (movieId !== undefined) {
      movieRequest();
    }
  }, [movieId]);

  return (
    <div className="w-full h-full mt-24 ">
      <img
        src={movieInfo.backdrop_path}
        className="absolute top-0 left-0 object-fill blur-[8px] w-screen h-full -z-50 mix-blend-screen "
      />

      {movieInfo ? (
        <>
          {" "}
          <div className="font-bold flex flex-row items-center justify-center w-full h-full relative space-x-4">
            {" "}
            <div className="w-1/2 flex items-center justify-center shadow-2xl shadow-black ">
              {" "}
              <ReactPlayer
                url={playerUrl}
                playing={false}
                controls={true}
                width="100%"
                height="100%"
                wrapper="div"
                className="react-player"
              />{" "}
            </div>
            <div className="text-white text-lg w-1/2 flex flex-col space-y-4">
              <div className="">
                {" "}
                <h1 className="font-movieTitle text-[60px] text-white ">
                  {movieInfo.name}{" "}
                </h1>{" "}
                <span className="mt-4 flex"> {movieInfo.plot}</span>
              </div>

              <div className="flex">
                <span className="mr-4">{movieInfo.releasedate}</span>
                <span className="mr-4">{movieInfo.rating}</span>
                <span>{movieInfo.duration}</span>
              </div>

              <div>
                <button class="w-[160px] relative inline-flex items-center justify-center mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                  <span class="relative px-[45.5px] py-5  transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
                    Watch Trailer
                  </span>
                </button>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  Watch Now
                </button>
              </div>
              <div>
                <span>{movieInfo.actors}</span>
              </div>
              <div>
                {" "}
                <span> {movieInfo.genre}</span>
              </div>

              <span>{movieInfo.youtube_trailer}</span>

              <span> {mMovieData.category_id}</span>
            </div>
          </div>
          <MoviesStuff lastSeries={lastSeries} lastTime={0} title="" />
          {/*
          <ReactNetflixPlayer
            src={playerUrl}
            title={movieInfo.name}
            titleMedia={movieInfo.name}
            backButton={() => history.goBack()}
            autoControllCloseEnabled
            primaryColor="var(--second-color)"
            secundaryColor="var(--first-color)"
            fullPlayer
          /> */}
        </>
      ) : (
        <div className="font-bold text-[100px]">Loading</div>
      )}
    </div>
  );
};

export default MovieId;
