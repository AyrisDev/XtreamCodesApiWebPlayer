import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import Navigationn from "@/components/navigation";
import CatLogo from "@/components/CatLogo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";
import BeinSlider from "@/components/beinSlider";
import MoviesStuff from "@/components/MoviesStuff";
import Sliderr from "@/components/Slider";

const HomePage: NextPage = ({
  lastVod,
  lastTime,
  beinSport,
  lastSeries,
}: {
  lastVod: Array<string | number | any>;
  beinSport: Array<string | number | any>;
  lastSeries: Array<string | number | any>;
  lastTime: number;
}) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col space-y-2 w-full mx-auto min-h-screen  overflow-hidden ">
        <div className="backdrop-filter backdrop-blur-[5px]">
          {/*Slider Section */}
          <Sliderr lastVod={lastVod} lastTime={lastTime} />
          <CatLogo />
          <BeinSlider beinSport={beinSport} />
          <MoviesStuff lastSeries={lastSeries} lastTime={lastTime} title="" />
          {/*Bein Sports
          <h2 className="font-semibold ml-36  items-center  flex font-oswald text-xl uppercase">
            Son Eklenen Filmler
          </h2>
           *
          <div className="flex space-x-6 space-y-6 overflow-y-hidden overflow-x-scroll my-10 ml-24 scrollbar justify-center items-center   scrollbar-hide scrollbar scrollbar-thin scrollbar-thumb-[#10121b]  scrollbar-track-[#10121b]/30 pb-4  ">
            <Swiper
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              speed={2500}
              slidesPerView={5}
              spaceBetween={20}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              >
              {beinSport ? (
                <>
                  {beinSport
                    .filter((lastVoda) => lastVoda.num > 1)
                    .map((filterLastVod) => (
                      <SwiperSlide className="h-[250px] w-full  flex justify-center items-center relative font-oswald flex rounded-lg overflow-hidden shadow-xl border-[2px]  border-[#f9f9f9] border-opacity-10   hover:shadow-2xl transform transition duration-300 cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10   hover:shadow-2xl transform hover:scale-105 transition duration-300">
                        <img
                          src={filterLastVod.stream_icon}
                          className="object-contain  h-[200px] w-full "
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
          </div> /}
          {/*Last Added Movies
          <h2 className="font-semibold ml-36  items-center  flex font-oswald text-xl uppercase">
            Son Eklenen Filmler
          </h2>
           
          <div className="flex space-x-6 space-y-6 overflow-y-hidden overflow-x-scroll my-10 ml-24 scrollbar justify-center items-center   scrollbar-hide scrollbar scrollbar-thin scrollbar-thumb-[#10121b]  scrollbar-track-[#10121b]/30 pb-4  ">
            <Swiper
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              speed={2500}
              slidesPerView={5}
              spaceBetween={20}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="max-w-[80%] ">
              {beinSport ? (
                <>
                  {beinSport.map((filterLastVod) => (
                    <SwiperSlide className="h-[250px] w-full rounded rounded-2xl  flex justify-center items-center relative font-oswald flex rounded-lg overflow-hidden shadow-xl border-[2px]  border-[#f9f9f9] border-opacity-10   hover:shadow-2xl transform transition duration-300 cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10   hover:shadow-2xl transform hover:scale-105 transition duration-300">
                      <img
                        src={filterLastVod.stream_icon}
                        className="object-fill  h-[200px] w-full "
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;

export async function getServerSideProps(context: NextPageContext) {
  /**
   * Why these headers?
   * - FFmpeg core (ffmpeg-core) uses SharedArrayBuffer, SharedArrayBuffer is disabled
   * in all major browsers from 2018, reason = Spectre (security vulnerability)
   * - FFmpeg core won't load, if these headers are not present
   */

  // prevent XS-leaks, don't load cross origin documents in the same browsing context
  context?.res?.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  // prevent docs from loading cross-origin resource, only load resources from the same origin
  context?.res?.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  return {
    props: {},
  };
}
