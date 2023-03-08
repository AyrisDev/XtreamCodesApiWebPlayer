import Head from "next/head";
import Link from "next/link";

import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ReactNetflixPlayer } from "react-netflix-player";

const MovieId = () => {
  const router = useRouter();

  const [videoSrc, setVideoSrc] = useState("");
  const [subsSrc, setSubsSrc] = useState("");
  const [bgUrl, setBgUrl] = useState();
  console.log(bgUrl);
  const { movieId } = router.query;
  const { urlId } = router.asPath;
  const [movieInfo, setMovieInfo] = useState("");
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
    console.log(urll + "&action=get_vod_info&vod_id=" + movieId);
    setMovieInfo(data.info);
    console.log(JSON.stringify(data.info.name) + "566");
    console.log(JSON.stringify(data.info));
    console.log(router.asPath);

    const movieData = data?.movie_data || {};
    const movieInfoData = data?.info || {};
    setBgUrl(movieInfoData?.backdrop_path);
    const movieUrl = `${dataUrll}/movie/${usernamee}/${passwordd}/${movieData?.stream_id}.${movieData?.container_extension}`;

    await setPlayerUrl(movieUrl);
    console.log(movieUrl);
  };

  useEffect(() => {
    if (movieId !== undefined) {
      movieRequest();
    }
  }, [movieId]);

  return (
    <div className="w-screen h-screen ]">
      <img src={bgUrl} className="absolute top-0 left-0 w-full h-full" />

      {movieInfo ? (
        <>
          <div className="font-bold flex flex-col ">
            {" "}
            <h1> {router.pathname}</h1>
            <div>
              {" "}
              <ReactPlayer
                url={playerUrl}
                playing={false}
                width="50%"
                height="65%"
                controls={true}
              />{" "}
            </div>
            <div> </div>
          </div>

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
