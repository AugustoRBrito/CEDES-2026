"use client";

import { projects } from "@/constants/projects";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref para o container

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 8000);
    return () => {
      resetTimeout();
    };
  }, [currentIndex, nextSlide]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  return (
    <section id="slider" className="py-10 bg-neutral-200">
      <div className="relative w-full max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          Galeria de Imagens
        </h1>
        {/* Container do Carousel */}
        <div
          className="overflow-hidden rounded-lg h-[420px] md:h-[480px]"
          ref={containerRef} // Adicionando a ref para o container
        >
          {/* Slides */}
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center p-4 space-y-4"
              >
                <div className="w-auto h-96 overflow-hidden rounded-lg shadow-md shadow-blue-950">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={300}
                    priority
                    //className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Botões fora do container do Carousel */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <button
            onClick={handlePrev}
            className="text-white bg-gray-700 hover:bg-gray-800 p-2 rounded-full pointer-events-auto"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="text-white bg-gray-700 hover:bg-gray-800 p-2 rounded-full pointer-events-auto"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
