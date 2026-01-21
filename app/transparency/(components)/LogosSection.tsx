import Image from "next/image";

export function LogosSection() {
  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {/* Realização */}
        <div className="text-center">
          <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2">
            Realização
          </h3>
          <div className="max-w-[30vh]">
            <Image
              src="/logo/LogoTipo.webp"
              alt="Logo Realização"
              width={240}
              height={240}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Apoio */}
        <div className="text-center pt-6">
          <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 ">
            Apoio
          </h3>
          <div className="max-w-[50vh]">
            <Image
              src="/logo/minMulheres.png"
              alt="Logo da Instituição de Apoio"
              width={360}
              height={320}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
