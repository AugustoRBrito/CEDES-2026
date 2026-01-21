import React from "react";

import { FaDownLong } from "react-icons/fa6";

interface DownloadButtonProps {
  fileName: string; // Nome do arquivo na pasta /public/data/
  buttonText?: string; // Texto opcional do botão (padrão: "Baixar PDF")
}

export const ButtonDownload: React.FC<DownloadButtonProps> = ({
  fileName,
  buttonText = "Baixar PDF",
}) => {
  return (
    <button className="mx-4 bg-blue-600 hover:bg-blue-400  text-white font-light py-3 px-6 rounded-full cursor-pointer relative z-30 text-base md:text-lg ">
      <a
        href={`/data/${fileName}`}
        download={fileName}
        className="flex items-center gap-2"
      >
        <FaDownLong size={20} />
        {buttonText}
      </a>
    </button>
  );
};
