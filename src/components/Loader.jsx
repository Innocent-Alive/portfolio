import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/loader.json";

const Loader = () => {
  const container = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-background flex flex-col justify-center items-center z-50">
      <div className="w-[300px] h-[300px]" ref={container}></div>
    </div>
  );
};

export default Loader;
