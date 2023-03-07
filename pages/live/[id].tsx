import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Genres from "@/components/Genres";
import CardGenre from "@/components/CardGenre";

function Live() {
  const router = useRouter();
  const [movie, setMovie] = useState();
  const { id } = router.query;
  const routerId = id;
  console.log(id + "catid");
  const oddBgColor = "odd:bg-cyan-700";

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl");
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
      <section className="mb-10 flex flex-wrap justify-between space-y-2 ">
        {movie ? (
          <>
            {movie.map((genre) => (
              <Link href={`/live/${genre.id}`} key={genre.id} passHref>
                <CardGenre text={genre.name} image={genre.stream_icon} />
              </Link>
            ))}
          </>
        ) : (
          <>Loading</>
        )}
      </section>
    </>
  );
}

export default Live;
