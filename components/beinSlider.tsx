import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";

const BeinSlider = ({
  beinSport,
}: {
  beinSport: Array<string | number | any>;
}) => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center mt-10 gap-6 px-8 max-w-[1400px] mx-auto">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={2500}
        slidesPerView={5}
        spaceBetween={20}
        modules={[FreeMode, Pagination, Autoplay]}
        className="pt-4 flex justify-center items-center  ">
        {beinSport ? (
          <>
            {beinSport
              .filter((lastVoda) => lastVoda.num > 1)
              .map((filterLastVod) => (
                <SwiperSlide
                  key={filterLastVod.stream_id}
                  className="flex w-52 h-32 sm:w-64 sm:h-36 border-[3px] items-center justify-center border-[#f9f9f9] border-opacity-10 rounded-lg cursor-pointer shadow-xl overflow-hidden  group">
                  <img
                    src={filterLastVod.stream_icon}
                    className="mx-auto flex justify-center items-center text-center w-48 h-48 hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300 "
                  />
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
    </section>
  );
};

export default BeinSlider;
