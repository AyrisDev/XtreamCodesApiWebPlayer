import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CardGenre from "@/components/movieCard";

function Categories() {
  const router = useRouter();
  const [movie, setMovie] = useState([]);

  const { id } = router.query;

  console.log(id + "catid");

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl");
    const urll = await JSON.parse(url);
    if (url === null) {
      router.replace("/Login");
    }

    const response = await fetch(
      urll + "&action=get_vod_streams&category_id=" + id
    );
    const data = await response.json();
    setMovie(data);
  };

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
      <section className="mb-10 flex flex-wrap justify-center space-y-4 space-x-4 ">
        {movie ? (
          <>
            {movie.map((genre) => (
              <Link
                href={`/movie/${id}/${genre.stream_id}`}
                passHref
                key={genre.stream_id}>
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

export default Categories;
