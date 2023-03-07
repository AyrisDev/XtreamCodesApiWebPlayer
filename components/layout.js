import React from "react";
import Footer from "./footer";
import Navigation from "./navigation";

const layout = ({
  children,
  movie,
  live,
  seriesCate,
}: {
  lastVod: Array<string | number | any>,

  movie: Array<string | number | any>,
  live: Array<string | number | any>,
  seriesCate: Array<string | number | any>,
}) => {
  return (
    <div className=" text-app-pure-white lg:flex   ">
      <main className="mx-0 flex flex-col py-6 px-4 md:m-6 md:px-0 md:pt-0 lg:ml-32 lg:min-w-[1024px]  lg:grow ">
        <Navigation movie={movie} live={live} seriesCate={seriesCate} />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default layout;
