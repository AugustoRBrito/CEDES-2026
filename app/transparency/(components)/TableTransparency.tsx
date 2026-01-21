"use client";

import { useEffect, useState } from "react";

interface Projeto {
  termoFomento: string;
  numeroInterno: string;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  cep: string;
  representanteLegal: string;
  emendaParlamentar: string;
  parlamentar: string;
  proposta: string;
  processoAdministrativo: string;
  descricaoProjeto: string;
  duracao: string;
  valorGlobal: string;
  acaoOrcamentaria: string;
  ptres: string;
  naturezaDespesa: string;
  notaEmpenho: string;
  unidadeGestora: string;
  fonteRecursos: string;
  prestacaoContas: string;
}

export const TableTransparency = () => {
  const [projeto, setProjeto] = useState<Projeto | null>(null);

  useEffect(() => {
    fetch("/dadosProjeto.json") // Corrected path
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProjeto(data))
      .catch((err) => console.error("Erro ao carregar JSON:", err));
  }, []);

  const formatFieldName = (fieldName: string): string => {
    const formattedName = fieldName
      .replace(/([A-Z])/g, " $1")
      .replace("Descricao Projeto", "Descrição do Projeto")
      .trim();

    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Detalhes do Projeto
      </h2>
      {projeto ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-slate-400 text-white">
              <tr>
                <th className="p-3 text-left text-black">Campo</th>
                <th className="p-3 text-left text-black">Detalhe</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {Object.entries(projeto).map(([key, value]) => (
                <tr key={key} className="border-b hover:bg-gray-200 transition">
                  <td className="p-3 font-semibold">{formatFieldName(key)}</td>
                  <td className="p-3">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Carregando dados...</p>
      )}
    </div>
  );
};
