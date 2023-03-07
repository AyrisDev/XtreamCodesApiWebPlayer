import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MovieCard() {
  const router = useRouter();
  const [movie, setMovie] = useState();

  const movieRequest = async () => {
    const url = sessionStorage.getItem("xtreamUrl");
    const urll = await JSON.parse(url);
    if (url === null) {
      router.replace("/Login");
    }
    const response = await fetch(urll + "&action=get_vod_categories");
    const data = await response.json();
    setMovie(data);

    console.log(data + "moviedata");
  };

  useEffect(() => {
    movieRequest();
  }, []);

  return (
    <div className="mb-10 flex flex-wrap justify-between">
      {movie ? (
        <>
          {movie.map((movies) => (
            <Link key={movies.category_id} href={`/${movies.category_id} `}>
              <p className="card-hover-animation m-2 flex h-44 w-44 grow items-center justify-center rounded-lg p-8 text-center text-xl font-medium even:bg-app-semi-dark-blue bg-cyan-700">
                {" "}
                {movies.category_name}
              </p>
            </Link>
          ))}
        </>
      ) : (
        <ul>afadaf</ul>
      )}
    </div>
  );
}

export default MovieCard;
