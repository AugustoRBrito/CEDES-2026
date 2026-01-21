import { TypeAnimation } from "react-type-animation";

export const TextEffectProjects = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Nossos Projetos",
        4800, // wait 1s before replacing "Mice" with "Hamsters"
        "Impactam Centenas de Vidas",
        2400,
      ]}
      wrapper="span"
      speed={50}
      className=" text-white font-semibold text-2xl md:text-3xl lg:text-4xl"
      repeat={Infinity}
    />
  );
};
