import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineEmail,
  MdOutlineMyLocation,
  MdOutlinePhone,
} from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Grid Principal */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 py-16">
          {/* Logo e Descrição */}
          <div className="space-y-6">
            <Link
              href="/"
              className="flex flex-col items-start justify-center space-x-2"
            >
              <Image
                src="/sesc/logo.png"
                alt="Sesc"
                width={180}
                height={180}
                priority
              />
              <div className="flex flex-col items-start">
                <p className="text-xl font-bold">Sesc</p>
                <p className="text-sm font-bold">Servindo a Sociedade</p>
              </div>
            </Link>
            {/* <p className="text-gray-400">Servimos a Comunidade.</p> */}
            <div className="flex items-center justify-self-start space-x-12">
              <a
                href="https://www.facebook.com/sescnacional"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/sescbrasil/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Contato</h4>
            <div className="flex items-center space-x-2 text-gray-400">
              <MdOutlineMyLocation />
              <p>
                Av. Ayrton Senna, 5555 - Jacarepaguá, <br /> Rio de Janeiro -
                RJ, 22775-004
              </p>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <MdOutlineEmail />
              <p>atendimento@sesc.com.br</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <MdOutlinePhone />
              <p>+55 (21) 4003-5555</p>
            </div>
          </div>

          {/* Navegação */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Navegação</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Sesc. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
