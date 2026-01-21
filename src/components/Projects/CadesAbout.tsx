import { motion } from 'framer-motion';
import Image from 'next/image';

export function CadesAbout() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };
  return (
    <section className='bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        <motion.h2
          variants={fadeInUp} // Add this line
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl'
        >
          O que fazemos
        </motion.h2>
        <div className='grid gap-8 md:grid-cols-3'>
          {/* Card 1 */}
          <motion.div
            variants={fadeInUp} // also add here, because u use {...fadeInUp}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='space-y-4 rounded-lg bg-white p-6 shadow-md'
          >
            <div className='mx-auto h-16 w-16'>
              <Image
                src='/sesc/icons/capacitacao.png' // Replace with actual icon
                alt='Capacitação'
                width={64}
                height={64}
              />
            </div>
            <h3 className='text-center text-xl font-semibold text-gray-800'>
              Capacitação
            </h3>
            <p className='text-center text-gray-600'>
              Promovemos cursos e oficinas para o desenvolvimento de
              habilidades.
            </p>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            variants={fadeInUp} // also add here, because u use {...fadeInUp}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='space-y-4 rounded-lg bg-white p-6 shadow-md'
          >
            <div className='mx-auto h-16 w-16'>
              <Image
                src='/sesc/icons/articulacao.png' // Replace with actual icon
                alt='Articulação'
                width={64}
                height={64}
              />
            </div>
            <h3 className='text-center text-xl font-semibold text-gray-800'>
              Articulação
            </h3>
            <p className='text-center text-gray-600'>
              Conectamos pessoas e recursos para o bem comum.
            </p>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            variants={fadeInUp} // also add here, because u use {...fadeInUp}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
            className='space-y-4 rounded-lg bg-white p-6 shadow-md'
          >
            <div className='mx-auto h-16 w-16'>
              <Image
                src='/sesc/icons/mobilizacao.png' // Replace with actual icon
                alt='Mobilização'
                width={64}
                height={64}
              />
            </div>
            <h3 className='text-center text-xl font-semibold text-gray-800'>
              Mobilização
            </h3>
            <p className='text-center text-gray-600'>
              Incentivamos a participação ativa na transformação social.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
