'use client';

import { useEffect, useState } from 'react';

// Importar dados diretamente
import { ButtonDownload } from '@/components/ButtonDownload';
import tf_975923 from '@/data/tf_975923.json';
import { LogosSection } from './LogosSection';

interface ProjetoData {
  tituloProjeto: string;

  osc: {
    razaoSocial: string;
    endereco: string;
    cnpj: string;
    localidade: string;
    uf: string;
    cep: string;
    representanteLegal: string;
  };
  dadosComplementares: {
    emendaParlamentar: string;
    proposta: string;
    processoAdministrativo: string;
  };
  descricaoObjeto: string;
  periodoExecucao: string;
  valorGlobal: {
    valor: string;
    acaoOrcamentaria: string;
    ptres: string;
    elementoDespesa: string;
    notaEmpenho: string;
    unidadeGestora: string;
    fonteRecursos: string;
    valorRemuneracaoEquipeTrabalho?: string;
  };
  prestacaoContas: string;
  situacaoPrestacaoContas: string;

  realizacaoImagem: string;
  apoioImagem: string;
}

// Dados estáticos como fallback
const dadosFallback: ProjetoData = {
  tituloProjeto:
    'IMPLEMENTAÇÃO E DESENVOLVIMENTO DO PROJETO FINANÇAS PARA EMPREENDER +.\nTERMO DE FOMENTO (MROSC) Nº 975923/2025 \nQUE ENTRE SI CELEBRAM A UNIÃO, POR MEIO DO MINISTÉRIO DAS MULHERES E ASSOCIAÇÃO CULTURAL AMBIENTAL DESPORTIVA EDUCACIONAL E SOCIAL',
  osc: {
    razaoSocial:
      'ASSOCIAÇÃO CULTURAL AMBIENTAL DESPORTIVA EDUCACIONAL E SOCIAL',
    endereco: 'Avenida Barão de Igarapé Mirim 979',
    cnpj: '12.080.369/0001-30',
    localidade: 'Guamá/Belém',
    uf: 'PA',
    cep: '66073-200',
    representanteLegal: 'Laurismar Brandão Pantoja',
  },
  dadosComplementares: {
    emendaParlamentar: '41820006',
    proposta: '025630/2025, cadastrada no Transferegov.br',
    processoAdministrativo: '21260.002278/2025-97',
  },
  descricaoObjeto:
    'Execução de implementação e desenvolvimento do projeto “Finanças para Empreender +”, com o objetivo de capacitar mulheres empreendedoras em gestão financeira e empresarial, por meio de aulas presenciais, contínuas e interativas. A iniciativa proporcionará conhecimentos práticos e acessíveis para estruturar, organizar e fortalecer a sustentabilidade dos negócios das participantes, promovendo autonomia, visão estratégica e aplicação imediata dos conteúdos no dia a dia profissional visando a consecução de finalidade do interesse público e recíproco conforme especificações estabelecidas no plano de trabalho.',
  periodoExecucao: '06 (seis) meses',
  valorGlobal: {
    valor:
      'R$ 500.000,00 (Quinhentos mil reais) disponibilizados pelo Ministério das Mulheres',
    acaoOrcamentaria: '21GG',
    ptres: '254042',
    elementoDespesa: '33.50.41',
    unidadeGestora: '810012',
    notaEmpenho: '2025NE000044',
    fonteRecursos:
      '1000000000, conforme cronograma de desembolso constante do plano de trabalho.',
  },
  prestacaoContas: 'Data limite para prestação de contas: 10/08/2026',

  situacaoPrestacaoContas: 'Termo de Fomento nº 963769 em andamento',
  realizacaoImagem: '/images/realizacao-logo.png',
  apoioImagem: '/images/apoio-logo.png',
};

const TabelaProjetoFinançasEmpreender = () => {
  const [data, setData] = useState<ProjetoData>(dadosFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tentativa de carregar os dados do JSON
    try {
      // Se já importamos diretamente, use esses dados
      setData(tf_975923);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar os dados via import:', error);

      // Fallback para fetch
      const fetchData = async () => {
        try {
          const response = await fetch('/constants/data.json');
          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
          }
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Erro ao carregar os dados via fetch:', error);
          // Usamos os dados fallback que já estão definidos no state
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        Carregando dados...
      </div>
    );
  }

  return (
    <div className='m-5 rounded-md border border-neutral-200 bg-neutral-100 shadow-lg shadow-blue-950'>
      <div className='overflow-x-auto rounded-xl'>
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='divide-y divide-gray-200 bg-gray-200 text-gray-900'>
            <tr className='bg-gray-200'>
              <td
                colSpan={2}
                className='px-6 py-4 text-center text-sm font-bold md:text-lg'
              >
                {data.tituloProjeto.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </td>
            </tr>

            <tr className='bg-gray-50'>
              <td
                colSpan={2}
                className='px-6 py-3 text-sm font-semibold md:text-base'
              >
                DADOS E INFORMAÇÕES DA OSC
              </td>
            </tr>
            <tr>
              <td className='w-1/3 px-6 py-3 text-sm font-medium'>
                Razão Social:
              </td>
              <td className='px-6 py-3 text-sm'>{data.osc.razaoSocial}</td>
            </tr>
            <tr>
              <td className='px-6 py-3 text-sm font-medium'>
                Endereço Completo:
              </td>
              <td className='px-6 py-3 text-sm'>{data.osc.endereco}</td>
            </tr>
            <tr>
              <td className='px-6 py-3 text-sm font-medium'>CNPJ:</td>
              <td className='px-6 py-3 text-sm'>{data.osc.cnpj}</td>
            </tr>
            <tr>
              <td className='px-6 py-3 text-sm font-medium'>
                Localidade/UF/CEP:
              </td>
              <td className='px-6 py-3 text-sm'>
                {data.osc.localidade} UF: {data.osc.uf} CEP: {data.osc.cep}
              </td>
            </tr>
            <tr>
              <td className='px-6 py-3 text-sm font-medium'>
                Nome do Representante Legal:
              </td>
              <td className='px-6 py-3 text-sm'>
                {data.osc.representanteLegal}
              </td>
            </tr>
            <tr className='bg-gray-50'>
              <td
                colSpan={2}
                className='px-6 py-3 text-sm font-semibold md:text-base'
              >
                DADOS COMPLEMENTARES
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-sm'>
                Emenda Parlamentar nº{' '}
                {data.dadosComplementares.emendaParlamentar}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-sm'>
                Proposta nº {data.dadosComplementares.proposta}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-sm'>
                Processo Administrativo nº{' '}
                {data.dadosComplementares.processoAdministrativo}
              </td>
            </tr>
            <tr className='bg-gray-50'>
              <td
                colSpan={2}
                className='px-6 py-3 text-sm font-semibold md:text-base'
              >
                DESCRIÇÃO DO OBJETO:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-justify text-sm'>
                {data.descricaoObjeto}
              </td>
            </tr>
            <tr className='bg-gray-50'>
              <td
                colSpan={2}
                className='px-6 py-3 text-sm font-semibold md:text-base'
              >
                PERÍODO DE EXECUÇÃO:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-sm'>
                {data.periodoExecucao}
              </td>
            </tr>
            <tr className='bg-gray-50'>
              <td
                colSpan={2}
                className='px-6 py-3 text-sm font-semibold md:text-base'
              >
                VALOR GLOBAL DA PARCERIA:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-sm'>
                <ul className='list-disc space-y-1 pl-6'>
                  <li>{data.valorGlobal.valor}</li>
                  <li>Ação orçamentária {data.valorGlobal.acaoOrcamentaria}</li>
                  <li>PTRES{data.valorGlobal.ptres}</li>
                  <li>
                    Elemento da despesa {data.valorGlobal.elementoDespesa}
                  </li>
                  <li>Unidade Gestora {data.valorGlobal.unidadeGestora}</li>
                  <li>Nota de Empenho nº {data.valorGlobal.notaEmpenho}</li>
                  <li>Fonte de Recursos nº {data.valorGlobal.fonteRecursos}</li>
                </ul>
              </td>
            </tr>

            {/* <tr className=''>
              <td
                colSpan={2}
                className='px-6 text-sm font-semibold md:text-base'
              >
                VALOR TOTAL DA REMUNERAÇÃO DA EQUIPE DE TRABALHO:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-sm'>
                <ul className='list-disc space-y-1 pl-6'>
                  <li className='text-justify'>
                    {data.valorGlobal.valorRemuneracaoEquipeTrabalho}
                  </li>
                </ul>
              </td>
            </tr> */}

            <tr className='bg-gray-50'>
              <td
                colSpan={2}
                className='px-6 py-3 text-sm font-semibold md:text-base'
              >
                PRESTAÇÃO DE CONTAS:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-sm'>
                {data.prestacaoContas}
              </td>
            </tr>

            <tr className='bg-gray-50'>
              <td
                colSpan={2}
                className='px-6 py-3 text-sm font-semibold md:text-base'
              >
                SITUAÇÃO DA PRESTAÇÃO DE CONTAS ANTERIORES:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className='px-6 py-3 text-sm'>
                {data.situacaoPrestacaoContas}
              </td>
            </tr>
          </tbody>
        </table>
        <LogosSection />
      </div>
      <div className='mb-5 flex items-center justify-center md:justify-start'>
        <ButtonDownload
          fileName='tf_975923.pdf'
          buttonText='Baixar Termo de Fomento'
        />
        <ButtonDownload
    fileName='SEI_006449_975923_Termo_de_Fomento.pdf'
    buttonText='Termo de Fomento Doc 2'
  />
</div>
    </div>
  );
};

export default TabelaProjetoFinançasEmpreender;
