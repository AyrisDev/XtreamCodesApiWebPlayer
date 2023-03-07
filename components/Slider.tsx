import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";
const Slider = ({ lastVod, lastTime }) => {
  return (
    <div className="flex space-x-6 space-y-6 overflow-y-hidden overflow-x-scroll my-10 ml-36 mr-10 scrollbar justify-center items-center drop-shadow-xl  scrollbar-hide scrollbar scrollbar-thin scrollbar-thumb-[#10121b]  scrollbar-track-[#10121b]/30 pb-4  ">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={2500}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={50}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[500px] rounded rounded-xl ">
        {lastVod ? (
          <>
            {lastVod
              .filter((lastVoda) => lastVoda.added > lastTime)
              .map((filterLastVod) => (
                <SwiperSlide className="flex justify-center items-center relative font-oswald ">
                  <a
                    href={`/movies/${filterLastVod.category_id}/${filterLastVod.stream_id} `}
                    className="cursor-pointer">
                    <img
                      src={filterLastVod.stream_icon}
                      className="object-fill w-full h-[500px]"
                    />
                    <div className="absolute right-[50px] bottom-[50px] bg-yellow-100 font-medium mr-2 px-2.5 py-0.5 rounded-lg h-16">
                      {" "}
                      <h1 className="text-yellow-800 z-50  font-bold font-oswald">
                        {filterLastVod.name}
                      </h1>
                      <span class="absolute right-8 bottom-2 justify-end  text-yellow-800 font-bold rounded-lg text-xs  mr-2 px-2.5 py-0.5 ">
                        Rating
                      </span>
                      <span class="absolute right-0 bottom-2 justify-end bg-purple-900 text-white rounded-lg text-xs font-medium mr-2 px-2.5 py-0.5">
                        {filterLastVod.rating}
                      </span>
                    </div>
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
  );
};

export default Slider;
