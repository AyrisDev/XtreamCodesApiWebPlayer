import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [data, setData] = useState("");
  const [login, setLogin] = useState(false);

  const [movie, setMovie] = useState();
  const [seriesCate, setSeriesCate] = useState();
  const [live, setLive] = useState();
  const [beinSport, setBeinSport] = useState();

  const [lastVod, setLastVod] = useState();
  const [lastSeries, setLastSeries] = useState();

  const date = moment().format();
  const epoch = new Date(date).getTime();
  const timeStamp = epoch / 1000;
  const lastTime = timeStamp - 1037488;

  useEffect(() => {
    const userName = sessionStorage.getItem("username") as string;

    if (userName === null) {
      router.replace("/Login");
      setLogin(true);
    }
    console.log(userName + " userName  " + "afdadf");
  }, []);

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl") as string;
    const urll = await JSON.parse(
      sessionStorage.getItem("xtreamUrl") as string
    );
    if (url === null) {
      router.replace("/Login");
    }
    const noCors = "https://cors-anywhere.herokuapp.com/";
    const vod = await fetch(urll + "&action=get_vod_categories");
    const live = await fetch(urll + "&action=get_live_categories");
    const series = await fetch(urll + "&action=get_series_categories");
    const bein = await fetch(urll + "&action=get_live_streams&category_id=5");

    const seriesCat = await series.json();
    const voddata = await vod.json();
    const livedata = await live.json();
    const beinData = await bein.json();

    const lVod = await fetch(urll + "&action=get_vod_streams");
    const lSeries = await fetch(urll + "&action=get_series");
    const lastVodData = await lVod.json();
    const lastSeriesData = await lSeries.json();
    setBeinSport(beinData);
    setLastVod(lastVodData);
    setMovie(voddata);
    setSeriesCate(seriesCat);
    setLive(livedata);
    setLastSeries(lastSeriesData);

    const result = lastVodData.filter((word: any) => word.added > lastTime);
    console.log(JSON.stringify(livedata[1].category_name) + "livedata");
    console.log(JSON.stringify(voddata[1].category_name) + "livedata");
    console.log(JSON.stringify(seriesCat[1].category_name) + "livedata");
    console.log(result + "result");
  };
  {
    /* 1037488*/
  }
  useEffect(() => {
    movieRequest();
  }, []);

  return (
    <Layout movie={movie} live={live} seriesCate={seriesCate} login={login}>
      <Component
        {...pageProps}
        movie={movie}
        seriesCate={seriesCate}
        live={live}
        beinSport={beinSport}
        lastVod={lastVod}
        lastSeries={lastSeries}
        lastTime={lastTime}
      />
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  /**
   * Why these headers?
   * - FFmpeg core (ffmpeg-core) uses SharedArrayBuffer, SharedArrayBuffer is disabled
   * in all major browsers from 2018, reason = Spectre (security vulnerability)
   * - FFmpeg core won't load, if these headers are not present
   */

  // prevent XS-leaks, don't load cross origin documents in the same browsing context
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  // prevent docs from loading cross-origin resource, only load resources from the same origin
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  return {
    props: {},
  };
}
