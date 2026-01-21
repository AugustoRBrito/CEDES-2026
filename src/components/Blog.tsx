import { blogItems } from "@/constants/blogItens";
import Image from "next/image";

export function Blog() {
  // Ordena os posts por data (do mais recente para o mais antigo)
  const sortedBlogItems = [...blogItems].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Pega os 3 primeiros posts (os mais recentes)
  const latestBlogItems = sortedBlogItems.slice(0, 3);

  return (
    <section
      id="blog"
      className="py-10 bg-neutral-100 border border-neutral-200 m-5 rounded-lg shadow-lg"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Últimas do Blog
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {latestBlogItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div
                data-aos="zoom-in"
                data-aos-offset="100"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1600"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
