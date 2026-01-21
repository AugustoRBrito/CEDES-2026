'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Welcome = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      id='welcome'
      className='relative h-screen bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: "url('/404.webp')" }}
    >
      <div className='absolute inset-0 bg-black/50'></div>
      <div className='relative mx-auto px-4'>
        <div className='grid items-center gap-16'>
          {/* Texto */}
          <motion.div
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='space-y-8'
          >
            <motion.div {...fadeInUp} className='space-y-4'>
              <Link href='/'>
                <h2 className='pt-8 text-lg font-semibold tracking-wider text-white uppercase hover:text-blue-300'>
                  Volta Para Home
                </h2>
              </Link>
              <h3 className='pt-40 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl'>
                Página Não Encontrada
              </h3>
            </motion.div>
          </motion.div>

          {/* Imagens */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative grid grid-cols-2 gap-4'
          >
            {/* <div className="space-y-4">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/hero.avif"
                  alt="Momento de adoração"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Image
                  src="/hero.avif"
                  alt="Comunidade unida"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Image
                  src="/hero.avif"
                  alt="Momentos especiais"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/hero.avif"
                  alt="Nossa comunidade"
                  fill
                  className="object-cover"
                />
              </div>
            </div> */}

            {/* Valores Flutuantes */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl"
            >
              <h4 className="text-primary font-bold mb-2">Nossos Valores</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Fé Autêntica
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Comunidade Acolhedora
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Excelência Intencional
                </li>
              </ul>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
