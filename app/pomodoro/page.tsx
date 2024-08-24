"use client";
import { useEffect, useRef, useState } from "react";

export default function Pomodoro() {
  const Ref = useRef(null);
  const [minutes, setMinutes] = useState("19");
  const [seconds, setSeconds] = useState("60");
  const [timer, setTimer] = useState("20:00");
  const [statusTimer, setStatusTimer] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      if (!statusTimer) {
        startTimer();
      }
    }, 1000);
    return () => clearInterval(id);
  });

  const startTimer = () => {
    let { total, minutesParse, secondsParse } = getTimeRemaining();
    if (total >= 0) {
      setTimer(
        (minutesParse > 9 ? minutesParse : "0" + minutesParse) +
          ":" +
          (secondsParse > 9 ? secondsParse : "0" + secondsParse)
      );
    }
  };

  const getTimeRemaining = () => {
    let minutesParse = parseInt(minutes);
    let secondsParse = parseInt(seconds);
    const total = minutesParse * 60 + secondsParse;

    if (minutesParse === 0 && secondsParse === 0) {
      setStatusTimer(true);
      setMinutes(`00`);
      setSeconds(`00`);
    } else if (secondsParse === 0 && minutesParse > -1) {
      minutesParse = minutesParse - 1;
      setMinutes(`${minutesParse}`);
      secondsParse = 59;
      setSeconds(`${secondsParse}`);
    } else {
      secondsParse = secondsParse - 1;
      setSeconds(`${secondsParse}`);
    }
    return {
      total,
      minutesParse,
      secondsParse,
    };
  };

  const clearTimer = () => {
    setStatusTimer(true);
    setTimer("25:00");
    setMinutes("24");
    setSeconds("60");
    if (Ref.current) clearInterval(Ref.current);
  };

  const onClickStart = () => {
    setStatusTimer(!statusTimer);
  };

  const onClickReset = () => {
    clearTimer();
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
          <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
            <h1 className="text-center font-semibold text-7xl text-gray-800">
              {timer}
            </h1>
            <div className="grid grid-cols-8 gap-1">
              <button
                className="w-full mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none col-span-7"
                onClick={onClickStart}
              >
                {statusTimer === true ? "Start" : "Pause"}
              </button>
              <button className="restart mt-10" onClick={onClickReset} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
