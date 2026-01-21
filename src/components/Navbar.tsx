"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { menuItens } from "@/constants/menuItens";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/50 shadow-lg" : "bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="">
            <Image
              src="/logo/LogoFinal.webp"
              alt="Cades"
              width={128}
              height={43}
              className="w-[128px] h-auto"
              priority
            />
            {/* <span
              className={`text-xl font-bold ${
                isScrolled ? "text-[#e0e010]" : "text-white"
              }`}
            >
              Associação Cades
            </span> */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItens.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`nav-link font-semibold ${
                  isScrolled ? "text-[#e0e010]" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button className="btn-primary">Doe Agora</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className={`w-8 h-8 ${
                isScrolled ? "text-[#e0e010]" : "text-white"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-screen py-4 w-full" : "max-h-0"
          } overflow-hidden bg-black/80`}
        >
          <div className="space-y-4">
            {menuItens.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="block text-white hover:text-[#e0e010] px-4 py-2 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="px-4 pt-2">
              <button className="btn-secondary w-full">Doe Agora</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
