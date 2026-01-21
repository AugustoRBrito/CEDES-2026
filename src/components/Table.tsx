'use client';

import { useEffect, useState } from 'react';

interface Transacao {
  data: string;
  tipo: string;
  origemDestino: string;
  descricao: string;
  valor: number;
  saldo: number;
  documento: string;
}

interface Projeto {
  nome: string;
  transacoes: Transacao[];
}

const Tabela = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  useEffect(() => {
    // Mock data temporário para manter compatibilidade
    const mockProjetos: Projeto[] = [
      {
        nome: 'Projeto Desenvolvendo Mulheres para o Futuro',
        transacoes: [
          {
            data: '2024-01-15',
            tipo: 'Crédito',
            origemDestino: 'Ministério das Mulheres',
            descricao: 'Repasse inicial',
            valor: 250000,
            saldo: 250000,
            documento: 'DOC001',
          },
          {
            data: '2024-02-15',
            tipo: 'Crédito',
            origemDestino: 'Ministério das Mulheres',
            descricao: 'Segundo repasse',
            valor: 250000,
            saldo: 500000,
            documento: 'DOC002',
          },
        ],
      },
    ];
    setProjetos(mockProjetos);
  }, []);

  return (
    <div className='container mx-auto px-4'>
      {projetos.length === 0 ? (
        <p className='text-center text-gray-500'>Carregando dados...</p>
      ) : (
        projetos.map((projeto, index) => (
          <div key={index} className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
              {projeto.nome}
            </h2>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse overflow-hidden rounded-lg shadow-lg'>
                <thead className='bg-slate-400 text-white'>
                  <tr>
                    <th className='p-3 text-left leading-relaxed text-black'>
                      Data
                    </th>
                    <th className='p-3 text-left leading-relaxed text-black'>
                      Tipo
                    </th>
                    <th className='p-3 text-left leading-relaxed text-black'>
                      Origem/Destino
                    </th>
                    <th className='p-3 text-left leading-relaxed text-black'>
                      Descrição
                    </th>
                    <th className='p-3 text-right leading-relaxed text-black'>
                      Valor (R$)
                    </th>
                    <th className='p-3 text-right leading-relaxed text-black'>
                      Saldo (R$)
                    </th>
                    <th className='p-3 text-left leading-relaxed text-black'>
                      Documento
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white text-gray-900'>
                  {projeto.transacoes.map((transacao, idx) => (
                    <tr
                      key={idx}
                      className={`border-b ${
                        transacao.tipo === 'Recebimento'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      } transition hover:bg-gray-200`}
                    >
                      <td className='p-3'>{transacao.data}</td>
                      <td className='p-3'>{transacao.tipo}</td>
                      <td className='p-3'>{transacao.origemDestino}</td>
                      <td className='p-3'>{transacao.descricao}</td>
                      <td
                        className={`p-3 text-right ${
                          transacao.valor > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transacao.valor.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className='p-3 text-right'>
                        {transacao.saldo.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className='p-3'>{transacao.documento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Tabela;
