import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CardGenre from "@/components/movieCard";

function Categories() {
  const router = useRouter();
  const [movie, setMovie] = useState<any[]>([]);
  const { id } = router.query;

  console.log(id + "catid");

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl") as string;
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
              <Link
                href={`/movies/${id}/${genre.stream_id}`}
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
