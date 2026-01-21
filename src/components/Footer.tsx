'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  MdOutlineEmail,
  MdOutlineMyLocation,
  MdOutlinePhone,
} from 'react-icons/md';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto px-4'>
        {/* Grid Principal */}
        <div className='grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-3'>
          {/* Logo e Descrição */}
          <div className='space-y-6'>
            <Link
              href='/'
              className='flex flex-col items-start justify-center space-x-2'
            >
              <Image
                src='/logo/LogoFinal.webp'
                alt='Associação Cades'
                width={280}
                height={280}
                priority
              />
            </Link>

            <div className=''>
              <div className=''>
                <div>
                  <h4 className='text-lg font-bold'>Contato</h4>

                  <p className='flex items-center gap-2'>
                    <span>
                      <MdOutlineEmail />
                    </span>
                    asscades@gmail.com{' '}
                  </p>
                  <p className='flex items-center gap-2'>
                    <span>
                      <MdOutlinePhone />
                    </span>{' '}
                    (91) 98385-6569 | 99639-8338 | 99350-2235
                  </p>
                  <p className='flex items-center gap-2'>
                    <span>
                      <MdOutlineMyLocation />
                    </span>
                    Av. Barão de Igarapé Miri, 979
                    <br />
                  </p>
                  <p className='ml-6'>CEP: 66.073-200 - Guamá - Belém/PA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className='mb-6 text-lg font-bold'>Links Rápidos</h3>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/#about'
                  className='text-gray-400 transition-colors duration-300 hover:text-white'
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href='/#whatWeDo'
                  className='text-gray-400 transition-colors duration-300 hover:text-white'
                >
                  O Que Fazemos
                </Link>
              </li>
              <li>
                <Link
                  href='/#projects'
                  className='text-gray-400 transition-colors duration-300 hover:text-white'
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  href='/#blog'
                  className='text-gray-400 transition-colors duration-300 hover:text-white'
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href='/transparency'
                  className='text-gray-400 transition-colors duration-300 hover:text-white'
                >
                  Transparência
                </Link>
              </li>
            </ul>
          </div>

          {/* Horários */}
          <div>
            <h3 className='mb-6 text-lg font-bold'>Horários de atendimento</h3>
            <ul className='space-y-4'>
              <li className='flex items-center justify-between'>
                <span className='text-gray-400'>Segunda à Sábado</span>
                <span className='text-white'>9h às 12h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-gray-800 py-8 text-center text-gray-400'>
          <p>
            &copy; {new Date().getFullYear()} Associação Cades. Todos os
            direitos reservados.
          </p>
          <div className='mt-4 flex cursor-pointer items-center justify-center space-x-2'>
            <p>Desenvolvido por </p>
            <Link
              href='https://whatsa.me/5591988534110'
              target='_blank'
              className='flex items-center space-x-2'
            >
              <p className='hover:text-blue-400'>Márcio Rodrigues </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
