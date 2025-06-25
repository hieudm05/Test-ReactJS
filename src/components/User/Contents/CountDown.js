import { useEffect, useState } from "react";
const CountDown = (props) => {
  const [count, setCount] = useState(10);
  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };
  useEffect(() => {
    if (count === 0){
        props.onTimeUp();
        return;
    }
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count]);
  return <div className="countdown-container">{toHHMMSS(count)}</div>;
};
export default CountDown;
