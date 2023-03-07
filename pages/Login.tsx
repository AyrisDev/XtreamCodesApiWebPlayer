import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  console.log(password);

  const makeRequest = async () => {
    const response = await fetch(
      `http://forzaiptv.com:8080/player_api.php?username=${user}&password=${password}`
    );
    const data = await response.json();
    if (data.user_info.auth === 1) {
      sessionStorage.setItem(
        "password",
        JSON.stringify(data.user_info.password)
      );
      sessionStorage.setItem(
        "username",
        JSON.stringify(data.user_info.username)
      );
      sessionStorage.setItem(
        "xtreamUrl",
        JSON.stringify(
          `http://forzaiptv.com:8080/player_api.php?username=${user}&password=${password}`
        )
      );
      sessionStorage.setItem(
        "dataUrl",
        JSON.stringify(`http://forzaiptv.com:8080/`)
      );
      router.replace("/");
    }

    if (data.user_info.auth === 0) {
      setErrorModal(true);
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center  bg-cover ">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
              width="150"
              alt=""
            />
            <h1 className="mb-2 text-2xl">Instagram</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>

          <div className="mb-4 text-lg">
            <input
              className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="text"
              placeholder="forzaiptv"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div className="mb-4 text-lg">
            <input
              className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="text"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-8 flex justify-center text-lg text-black">
            <button
              type="submit"
              onClick={() => makeRequest()}
              className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
