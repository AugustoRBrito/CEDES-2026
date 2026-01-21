import Image from "next/image";
import { Emphasis } from "./Projects/Emphasis";
import { TextEffectProjects } from "./texts/TextEffectProjects";

export const Projetos = () => {
  return (
    <section
      id="projects"
      className=" bg-neutral-100 border border-neutral-200 m-5 rounded-lg shadow-lg"
    >
      {/* Header */}
      <div
        className="relative w-full h-[100px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60 "></div>
        <div className="relative text-white ">
          {" "}
          <TextEffectProjects />
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-4">
        <Emphasis />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Section Projeto Cultura em Ação */}

          <div
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1200"
          >
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Projeto Cultura em Ação</h2>

              <Image
                src="/Projects/cultura2.png"
                alt="Pautas Sociais"
                width={400}
                height={250}
                className="mt-4 rounded-lg mx-auto"
              />

              <p className="text-gray-600 mt-2 text-justify">
                De 2022 a 2024, 232 crianças e adolescentes foram impactados por
                meio do esporte, recreação e educação! 🏀🏃‍♂️⚽ Além das
                modalidades esportivas, o projeto também promoveu palestras
                sobre temas essenciais, incentivando inclusão, saúde e valores
                como respeito e cooperação. 💙✨
              </p>
            </div>
          </div>

          {/* Section Projeto Agora */}
          <div
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            data-aos-duration="2400"
          >
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg h-full">
              <h2 className="text-xl font-semibold">Projeto Agora!</h2>
              <Image
                src="/Projects/agora.png"
                alt="Pautas Sociais"
                width={400}
                height={250}
                className="mt-4 rounded-lg mx-auto"
              />
              <p className="text-gray-600 mt-2 text-justify">
                Projeto AGORA! 💙👴👵 De 2022 a 2024, o Projeto AGORA! tem
                promovido o bem-estar de idosos por meio de atividades físicas,
                suporte psicológico, fisioterapia e assistência social. 🏋️‍♂️🧘‍♀️💬 O
                resultado? 169 pessoas com mais saúde, autonomia e qualidade de
                vida! 🌟💙
              </p>
            </div>
          </div>

          {/* Section Projeto Mulher Superação */}
          <div
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            data-aos-duration="3000"
          >
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg h-full">
              <h2 className="text-xl font-semibold">
                Projeto Mulher Superação
              </h2>
              <Image
                src="/Projects/mulherSuperacao.png"
                alt="Pautas Sociais"
                width={400}
                height={250}
                className="mt-4 rounded-lg mx-auto"
              />
              <p className="text-gray-600 mt-2 text-justify">
                De 2022 a 2024, a Associação CADES promoveu uma jornada de
                transformação para 373 mulheres! 🏋️‍♀️💆‍♀️ Com atividades físicas,
                palestras, apoio emocional e eventos especiais, o projeto
                fortaleceu a autoestima e o bem-estar, criando uma rede de apoio
                e superação. ✨💜
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
