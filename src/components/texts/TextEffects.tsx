import { TypeAnimation } from "react-type-animation";

export const TextEffects = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "",
        2400, // wait 1s before replacing "Mice" with "Hamsters"
        "CADES",
        5000,
      ]}
      wrapper="span"
      speed={50}
      className=" text-red-600 font-bold"
      repeat={Infinity}
    />
  );
};
