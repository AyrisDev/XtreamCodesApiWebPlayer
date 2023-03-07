import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";

const MoviesStuff = ({ results, title, lastTime }) => {
  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex space-x-6 overflow-y-hidden scrollbar-hide p-2 -m-2">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={2500}
          slidesPerView={4}
          spaceBetween={20}
          modules={[FreeMode, Pagination, Autoplay]}
          className=" w-full rounded rounded-xl scrollbar-thin scrollbar-thumb-[#10121b]/30  scrollbar-track-transparent overflow-hidden overflow-x-hidden">
          {results ? (
            <>
              {results
                .filter((lastVoda) => lastVoda.last_modified > lastTime)
                .map((filterLastVod) => (
                  <SwiperSlide className="flex rounded-lg w-[330px] h-[210px] overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300 ">
                    <a
                      href={`/${filterLastVod.category_id}/${filterLastVod.stream_id} `}
                      className="cursor-pointer w-[330px] h-[210px]">
                      <img
                        src={filterLastVod.cover}
                        className="object-fill w-[330px] h-[400px] rounded-lg"
                      />
                    </a>
                  </SwiperSlide>
                ))}
            </>
          ) : (
            <>
              {" "}
              <SwiperSlide className="flex justify-center items-center">
                Loading
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default MoviesStuff;
