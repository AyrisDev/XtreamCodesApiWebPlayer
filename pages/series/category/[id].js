import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CardGenre from "@/components/movieCard";

function Categories() {
  const router = useRouter();
  const [movie, setMovie] = useState([]);
  const { id } = router.query;

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl");
    const urll = await JSON.parse(url);
    if (url === null) {
      router.replace("/Login");
    }

    const response = await fetch(urll + "&action=get_series&category_id=" + id);
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
      <section className="mb-10 flex flex-wrap justify-between space-y-2 ">
        {movie ? (
          <>
            {movie.map((genre) => (
              <Link href={`/live/${genre.id}`} passHref key={genre.id}>
                <CardGenre text={genre.name} image={genre.cover} />
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
