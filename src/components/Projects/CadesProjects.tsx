import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'Educação Comunitária',
    description:
      'Incentivo ao aprendizado em todas as fases da vida, com atenção especial às necessidades de cada público.',
    imageUrl: '/sesc/projetos/educacao.webp', // Replace with actual image path
  },
  {
    title: 'Geração de Renda',
    description:
      'Apoio ao empreendedorismo e à economia local, fomentando o desenvolvimento sustentável.',
    imageUrl: '/sesc/projetos/renda.webp', // Replace with actual image path
  },
  {
    title: 'Participação e Cidadania',
    description:
      'Fortalecimento da participação social e da defesa de direitos.',
    imageUrl: '/sesc/projetos/participacao.webp', // Replace with actual image path
  },
  {
    title: 'Intercâmbio e Cooperação',
    description:
      'Troca de conhecimentos e experiências entre comunidades, ampliando horizontes.',
    imageUrl: '/sesc/projetos/intercambio.webp', // Replace with actual image path
  },
];

export function CadesProjects() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };
  return (
    <section className='bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        <motion.h2
          {...fadeInUp}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl'
        >
          Áreas de Atuação
        </motion.h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {projects.map((project, index) => (
            <motion.div
              {...fadeInUp}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true }}
              key={index}
              className='space-y-4 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg'
            >
              <div className='h-48 w-full overflow-hidden rounded-lg'>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className='h-full w-full object-cover'
                  fill
                />
              </div>
              <h3 className='text-xl font-semibold text-gray-800'>
                {project.title}
              </h3>
              <p className='text-gray-600'>{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
