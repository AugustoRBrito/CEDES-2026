import Image from "next/image";

export function WhatWeDo() {
  return (
    <section
      id="whatWeDo"
      className="py-10 bg-neutral-100 border border-neutral-200 m-5 rounded-lg shadow-lg"
    >
      <div className="container mx-auto px-4 space-y-10">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          O Que Fazemos
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission Item 1 */}
          <div
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1200"
          >
            <div className="bg-blue-100 p-6 rounded-lg shadow-md shadow-blue-950 text-center space-y-4">
              <div className="mx-auto w-16 h-16">
                <Image
                  src="/icons/apoio.png"
                  alt="Apoio"
                  width={64}
                  height={64}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-semibold text-gray-800">Apoio</h3>
              <p className="text-gray-600">
                Capacitamos pessoas para construção de uma sociedade mais
                inclusiva e igualitária.
              </p>
            </div>
          </div>

          {/* Mission Item 2 */}
          <div
            data-aos="fade-down"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1200"
          >
            <div className="bg-blue-100 p-6 rounded-lg shadow-md shadow-blue-950 text-center space-y-4">
              <div className="mx-auto w-16 h-16">
                <Image
                  src="/icons/desenvolvimento.png"
                  alt="Desenvolvimento"
                  width={64}
                  height={64}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-semibold text-gray-800">Desenvolvimento</h3>
              <p className="text-gray-600">
                Promovemos o desenvolvimento pessoal e profissional dos membros
                da comunidade.
              </p>
            </div>
          </div>

          {/* Mission Item 3 */}
          <div
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1200"
          >
            <div className="bg-blue-100 p-6 rounded-lg shadow-md shadow-blue-950 text-center space-y-4">
              <div className="mx-auto w-16 h-16">
                <Image
                  src="/icons/comunidade.png"
                  alt="Desenvolvimento"
                  width={64}
                  height={64}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-semibold text-gray-800">Comunidade</h3>
              <p className="text-gray-600">
                Fortalecemos os laços comunitários através de ações e atividades
                coletivas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
