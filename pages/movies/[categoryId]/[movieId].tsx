import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ReactNetflixPlayer } from "react-netflix-player";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { getCreateFFmpegCore } from "@ffmpeg/core";

const MovieId = () => {
  const router = useRouter();

  const [videoSrc, setVideoSrc] = useState("");
  const [subsSrc, setSubsSrc] = useState("");

  const { movieId } = router.query;

  console.log(movieId + "moviedata");

  const [movieInfo, setMovieInfo] = useState();
  const [playerUrl, setPlayerUrl] = useState("");
  const [ready, setReady] = useState(false);
  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl");
    const dataUrl = sessionStorage.getItem("dataUrl");
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    const usernamee = await JSON.parse(username);
    const passwordd = await JSON.parse(password);

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

    const movieData = data?.movie_data || {};
    const movieUrl = `${dataUrll}/movie/${usernamee}/${passwordd}/${movieData?.stream_id}.${movieData?.container_extension}`;
    setPlayerUrl(movieUrl);
    console.log(movieUrl);
    doTranscode();
  };

  useEffect(() => {
    if (movieId !== undefined) {
      movieRequest();
    }
  }, [movieId]);

  const ffmpeg = createFFmpeg({
    //corePath: "/files/ffmpeg/ffmpeg-core.js",
    // corePath: "/ffmpeg/ffmpeg-core.js",
    log: true,
    progress: (p) => {
      console.log(p);
    },
  });

  async function doTranscode() {
    console.log("Loading ffmpeg-core.js");
    await ffmpeg.load();

    console.log("FFmpeg loaded");
    console.log("Fetching your video file");
    console.log(`URL: ${url}`);
    let file = await fetchFile(`https://cors-anywhere.kingbri.dev/${url}`);

    ffmpeg.FS("writeFile", "test.mkv", file);
    setMessage("Remuxing started");
    await ffmpeg.run(
      "-i",
      "test.mkv",
      "-map",
      "0:s",
      "subs.vtt",
      "-map",
      "0:v",
      "-map",
      "0:a:0",
      "-c",
      "copy",
      "test.mp4"
    );

    console.log("Remuxing complete");

    const data = ffmpeg.FS("readFile", "test.mp4");
    setVideoSrc(
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );

    const subs = ffmpeg.FS("readFile", "subs.vtt");
    setSubsSrc(URL.createObjectURL(new Blob([subs], { type: "text/vtt" })));

    setShowVideoPlayer(true);
  }

  return (
    <div className="w-screen h-screen">
      {movieInfo && playerUrl ? (
        <>
          <div className="font-bold text-[100px]">
            {" "}
            <h1> {movieInfo.name}</h1>
          </div>
          <ReactPlayer
            url={videoSrc}
            playing={false}
            width="50%"
            height="65%"
            controls={true}
          />
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
