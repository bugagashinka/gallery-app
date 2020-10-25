import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  const resizeHandler = () => setSize([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return size;
};

export default useWindowSize;
