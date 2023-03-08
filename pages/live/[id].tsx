import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import CardGenre from "@/components/CardGenre";
import { ReactNetflixPlayer } from "react-netflix-player";

function Live() {
  const teste = "http://magtv.soon.it:80/Jobotest123/DEMknd44GN/24712.m3u8";
  const router = useRouter();
  const [movie, setMovie] = useState<any[]>([]);
  const { id } = router.query;
  const routerId = id;
  console.log(id + "catid");
  const oddBgColor = "odd:bg-cyan-700";

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl") as string;
    const urll = await JSON.parse(url);
    if (url === null) {
      router.replace("/Login");
    }

    const response = await fetch(
      urll + "&action=get_live_streams&category_id=" + id
    );
    const data = await response.json();
    setMovie(data);
  };

  console.log(movie + "routerId");

  useEffect(() => {
    if (id !== undefined) {
      movieRequest();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Movies | Watcho</title>
      </Head>
      <section className="mb-10 flex flex-row   space-y-2  space-x-2 ">
        <div className="w-1/4 flex flex-wrap">
          <ul className="max-h-screen overflow-y-scroll flex flex-col ml-4 w-max scrollbar-thin scrollbar-thumb-[#10121b]/30  scrollbar-track-transparent relative">
            {movie ? (
              <>
                {movie.map((genre) => (
                  <div
                    className="font-bold   relative  two px-4 "
                    key={genre.name}>
                    <a
                      href={`/live/${genre.id} `}
                      className="flex flex-row space-x-2 max-h-screen">
                      <img src={genre.stream_icon} className="w-12" />
                      <li className=" cursor-pointer  hover:scale-105   mt-2 font-oswald relative">
                        {genre.name}
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
          </ul>
        </div>
        <div className="w-3/4 flex">
          {" "}
          <ReactPlayer
            url={teste}
            playing={false}
            width="100%"
            height="80%"
            controls={true}
          />
        </div>
      </section>
    </>
  );
}

export default Live;

//
