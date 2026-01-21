import Image from "next/image";
import { GrSchedule } from "react-icons/gr";
import { RxAccessibility, RxCalendar, RxFace } from "react-icons/rx";

const features = [
  {
    name: "Início.",
    description: "16/06/2025",
    icon: GrSchedule,
  },
  {
    name: "Objetivo.",
    description:
      "Promover a autonomia econômica e valorização de 450 mulheres no segmento de tecnologia, por meio da capacitação em programação de sistemas para WEB e participação em 03 Encontros com Palestras promovendo o acesso a inovação, conhecimentos em tecnologia, aumentando as oportunidades de ingresso no mercado do trabalho, o reconhecimento social e troca de experiência em Belém/PA.",
    icon: RxFace,
  },
  {
    name: "Público-alvo.",
    description:
      "Mulheres da Comunidade de Belém/PA, em situação de vulnerabilidade social e economica",
    icon: RxAccessibility,
  },
  {
    name: "Beneficiárias:",
    description:
      "250 mulheres, sendo: <br />• 100 Mulheres alunas no Curso de capacitação em programação de sistemas para WEB. <br />• 150 Mulheres Participantes dos Encontros e Palestras",
    icon: RxCalendar,
  },
];

export function Emphasis() {
  return (
    <div className="overflow-hidden bg-white py-4 sm:py-4">
      <div className="mx-auto lg:px-4">
        <div className="mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 max-w-2xl gap-x-8 gap-y-8 sm:gap-y-16 lg:mx-0 lg:max-w-none">
          <div className="lg:pr-8 lg:pt-4">
            <h1 className="text-lg font-semibold leading-7 text-black hidden lg:block mb-8">
              Projeto em destaque
            </h1>

            <p className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
              Projeto Desenvolvendo mulheres para o futuro 🚀
            </p>

            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">
                    {feature.description
                      .split(/<br\s*\/?>/i)
                      .map((line, idx, arr) =>
                        idx < arr.length - 1 ? (
                          <span key={idx}>
                            {line}
                            <br />
                          </span>
                        ) : (
                          <span key={idx}>{line}</span>
                        )
                      )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div className="lg:pr-8 lg:pt-4">
              <h1 className="text-lg font-semibold leading-7 text-black text-center lg:hidden sm:block mb-8">
                Projeto em destaque
              </h1>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Image
                alt="logo do projeto"
                src="/Projects/project-web.jpg"
                width={2432}
                height={1442}
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[36rem] md:w-[42rem] xl:w-[44rem] marker:md:-ml-4 lg:-ml-0 md:mb-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
