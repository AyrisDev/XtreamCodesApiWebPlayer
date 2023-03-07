import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ReactNetflixPlayer } from "react-netflix-player";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { getCreateFFmpegCore } from "@ffmpeg/core";

const ffmpeg = createFFmpeg({
  corePath: "/ffmpeg-core/dist/ffmpeg-core.js",
  // corePath: "/ffmpeg/ffmpeg-core.js",
  log: true,
  progress: (p) => {
    console.log(p);
  },
});

const MovieId = () => {
  const router = useRouter();

  const [videoSrc, setVideoSrc] = useState("");
  const [subsSrc, setSubsSrc] = useState("");

  const { movieId } = router.query;

  console.log(movieId + "moviedata");

  const [movieInfo, setMovieInfo] = useState<any[]>([]);
  const [playerUrl, setPlayerUrl] = useState("");

  const load = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
  };

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl") as string;
    const dataUrl = sessionStorage.getItem("dataUrl") as string;
    const username = sessionStorage.getItem("username") as string;
    const password = sessionStorage.getItem("password") as string;

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

    await setPlayerUrl(movieUrl);
    console.log(movieUrl);
    load();
    await ffmpeg.isLoaded();
    const purl =
      "http://forzaiptv.com:8080//movie/mstfyldz/syhvbyz1903/83982.mkv";
    console.log("FFmpeg loaded");
    console.log("Fetching your video file");
    console.log("URL:" + purl);
    let file = await fetchFile(`https://cors-anywhere.herokuapp.com/${purl}`);

    ffmpeg.FS("writeFile", "test.mkv", file);
    console.log("Remuxing started");
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

    const dataa = ffmpeg.FS("readFile", "test.mp4");
    setVideoSrc(
      URL.createObjectURL(new Blob([dataa.buffer], { type: "video/mp4" }))
    );

    const subs = ffmpeg.FS("readFile", "subs.vtt");
    setSubsSrc(URL.createObjectURL(new Blob([subs], { type: "text/vtt" })));
  };

  useEffect(() => {
    if (movieId !== undefined) {
      movieRequest();
    }
  }, [movieId]);

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

export async function getServerSideProps(context: NextPageContext) {
  /**
   * Why these headers?
   * - FFmpeg core (ffmpeg-core) uses SharedArrayBuffer, SharedArrayBuffer is disabled
   * in all major browsers from 2018, reason = Spectre (security vulnerability)
   * - FFmpeg core won't load, if these headers are not present
   */

  // prevent XS-leaks, don't load cross origin documents in the same browsing context
  context?.res?.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  // prevent docs from loading cross-origin resource, only load resources from the same origin
  context?.res?.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  return {
    props: {},
  };
}
