import { useEffect, useState } from "react";
import { colors } from "../../styling/styles/colors";
import { randomColor } from "../../utils/randomColor";

interface Props {
  color?: string;
}

const Avatar = ({ color }: Props) => {
  const [avatarColor, setAvatorColor] = useState("");
  useEffect(() => setAvatorColor(color || randomColor()), []);

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="23.5" fill="white" stroke={colors.grey[20]} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.7432 9.00591C25.7682 8.91121 29.6982 9.9503 32.8304 12.4799C36.357 15.328 39.2292 19.0668 39.7731 23.5671C40.3828 28.6112 39.9764 34.6986 35.8789 37.7027C31.9202 40.6051 26.6305 37.2435 21.7432 36.786C17.668 36.4046 12.9411 38.1575 10.0275 35.2828C7.10807 32.4022 8.13686 27.6631 8.346 23.5671C8.53943 19.7787 8.59738 15.7812 11.1658 12.9896C13.8177 10.1073 17.8277 9.09803 21.7432 9.00591Z"
        fill={avatarColor}
        stroke="black"
      />
    </svg>
  );
};

export default Avatar;
