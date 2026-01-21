import { motion } from 'framer-motion';
import Image from 'next/image';

export function Impact() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  return (
    <section className='py-10'>
      <div className='container mx-auto grid items-center gap-10 px-4 md:grid-cols-2'>
        {/* Imagem */}
        <motion.div
          {...fadeInUp}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src='/sesc/impacto.webp'
            alt='Impacto Social'
            width={600}
            height={400}
            className='rounded-lg shadow-md'
            priority
          />
        </motion.div>

        {/* Conteúdo */}
        <motion.div
          {...fadeInUp}
          initial='hidden'
          whileInView='show'
          variants={staggerContainer}
          viewport={{ once: true }}
          className='space-y-6'
        >
          <motion.h2
            variants={itemVariants}
            className='text-3xl font-bold text-gray-800 md:text-4xl'
          >
            Impacto Social
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className='break-word text-justify leading-relaxed text-gray-700'
          >
            O Sesc atua no fortalecimento de vínculos comunitários e na promoção
            do protagonismo local. Através de ações colaborativas, incentivamos
            a participação e autonomia.
          </motion.p>
          <div className='grid grid-cols-2 gap-4'>
            <motion.div
              variants={itemVariants}
              className='space-y-2 rounded-lg bg-blue-100 p-4 shadow-md'
            >
              <h3 className='text-xl font-semibold text-blue-800'>
                200+ Projetos
              </h3>
              <p className='text-gray-700'>
                Iniciativas que transformam realidades.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className='space-y-2 rounded-lg bg-blue-100 p-4 shadow-md'
            >
              <h3 className='text-xl font-semibold text-blue-800'>
                10.000+ Pessoas
              </h3>
              <p className='text-gray-700'>Beneficiadas por nossas ações.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
