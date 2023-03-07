import Link from "next/link";
import CardGenre from "./CardGenre";

export default function Genres({ arr = [], media_type, oddBgColor }) {
  return (
    <section className="mb-10 flex flex-wrap justify-between">
      {arr.map((genre) => (
        <Link
          key={genre.category_id}
          href={`/live/${genre.category_id}`}
          passHref>
          <CardGenre oddBgColor={oddBgColor} text={genre.category_name} />
        </Link>
      ))}
    </section>
  );
}
