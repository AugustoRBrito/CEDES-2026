"use client";

import { useEffect, useState } from "react";

// Importar dados diretamente
import { ButtonDownload } from "@/components/ButtonDownload";
import projetoData from "@/data/data.json";
import { LogosSection } from "./LogosSection";

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
    naturezaDespesa: string;
    notaEmpenho: string;
    unidadeGestora: string;
    fonteRecursos: string;
    valorRemuneracaoEquipeTrabalho: string;
  };
  prestacaoContas: string;
  situacaoPrestacaoContas: string;

  realizacaoImagem: string;
  apoioImagem: string;
}

// Dados estáticos como fallback
const dadosFallback: ProjetoData = {
  tituloProjeto:
    "PROJETO DESENVOLVENDO MULHERES PARA O FUTURO.\nTERMO DE FOMENTO (MROSC) Nº 963769/2024 - NÚMERO INTERNO 006449/2024 \nQUE ENTRE SI CELEBRAM O DISTRITO FEDERAL, POR MEIO DO MINISTÉRIO DAS MULHERES E ASSOCIAÇÃO CULTURAL AMBIENTAL DESPORTIVA EDUCACIONAL E SOCIAL.",
  osc: {
    razaoSocial:
      "ASSOCIAÇÃO CULTURAL AMBIENTAL DESPORTIVA EDUCACIONAL E SOCIAL",
    endereco: "Avenida Barão de Igarapé Mirim 979",
    cnpj: "12.080.369/0001-30",
    localidade: "Guamá/Belém",
    uf: "PA",
    cep: "66073-200",
    representanteLegal: "Carlos Roberto da Costa",
  },
  dadosComplementares: {
    emendaParlamentar:
      "41820003 de autoria do Parlamentar Senador Zequinha Marinho",
    proposta: "006449/2024, cadastrada no Transferegov.br",
    processoAdministrativo: "21260.200840/2024-65",
  },
  descricaoObjeto:
    "Implementação e Desenvolvimento do Projeto Desenvolvendo Mulheres para o Futuro, no Município de Guamá em Belém/PA com a capacitação de 100 mulheres capacitação em programação de sistemas para WEB e participação de 150 mulheres em 03 Encontros com Palestras promovendo o acesso a inovação, conhecimentos em tecnologia, aumentando as oportunidades de ingresso no mercado do trabalho, o reconhecimento social e troca de experiência., visando a consecução de finalidade de interesse público e recíproco que envolve a transferência de recursos financeiros à Organização da Sociedade Civil (OSC), conforme especificações estabelecidas no Plano de Trabalho.",
  periodoExecucao: "06 meses",
  valorGlobal: {
    valor: "R $ 500.000,00 (Quinhentos mil reais)",
    acaoOrcamentaria:
      "21GG - Igualdade de Direitos e Autonomia Econômica das Mulheres",
    ptres: "241452",
    naturezaDespesa: "33.50.41-01",
    notaEmpenho: "2024NE000107",
    unidadeGestora: "810012/000",
    fonteRecursos: "1000000000",
    valorRemuneracaoEquipeTrabalho:
      "R$ 163.798,00 (cento e sessenta e três mil setecentos e noventa e oito reais) referente ao RH e Prestação de serviços nos cargos de Coordenação Técnica, Coordenação Administrativa, Gerente do Projeto, Professor de Informática, Monitor de Informática, Assistente Administrativo.",
  },
  prestacaoContas:
    "12 (doze) meses de duração da parceria, contado da primeira liberação de recursos para sua execução.",

  situacaoPrestacaoContas:
    "Não existe prestação de contas anteriores, uma vez que é a primeira vez que a instituição executará projeto com recurso de emenda em parceria com o Governo Federal.",
  realizacaoImagem: "/images/realizacao-logo.png",
  apoioImagem: "/images/apoio-logo.png",
};

const TabelaProjeto = () => {
  const [data, setData] = useState<ProjetoData>(dadosFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tentativa de carregar os dados do JSON
    try {
      // Se já importamos diretamente, use esses dados
      setData(projetoData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar os dados via import:", error);

      // Fallback para fetch
      const fetchData = async () => {
        try {
          const response = await fetch("/constants/data.json");
          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
          }
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error("Erro ao carregar os dados via fetch:", error);
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
      <div className="flex justify-center items-center h-64">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="  bg-neutral-100 border border-neutral-200 m-5 rounded-md shadow-lg shadow-blue-950">
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-gray-200 divide-y divide-gray-200 text-gray-900">
            <tr className="bg-gray-200">
              <td
                colSpan={2}
                className="px-6 py-4 text-sm md:text-lg font-bold text-center"
              >
                {data.tituloProjeto.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </td>
            </tr>

            <tr className="bg-gray-50 ">
              <td
                colSpan={2}
                className="px-6 py-3 text-sm md:text-base font-semibold "
              >
                DADOS E INFORMAÇÕES DA OSC
              </td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-sm font-medium w-1/3">
                Razão Social:
              </td>
              <td className="px-6 py-3 text-sm">{data.osc.razaoSocial}</td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-sm font-medium">
                Endereço Completo:
              </td>
              <td className="px-6 py-3 text-sm">{data.osc.endereco}</td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-sm font-medium">CNPJ:</td>
              <td className="px-6 py-3 text-sm">{data.osc.cnpj}</td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-sm font-medium">
                Localidade/UF/CEP:
              </td>
              <td className="px-6 py-3 text-sm">
                {data.osc.localidade} UF: {data.osc.uf} CEP: {data.osc.cep}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-sm font-medium">
                Nome do Representante Legal:
              </td>
              <td className="px-6 py-3 text-sm">
                {data.osc.representanteLegal}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td
                colSpan={2}
                className="px-6 py-3 text-sm md:text-base font-semibold"
              >
                DADOS COMPLEMENTARES
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm">
                Emenda Parlamentar nº{" "}
                {data.dadosComplementares.emendaParlamentar}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm">
                Proposta nº {data.dadosComplementares.proposta}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm">
                Processo Administrativo nº{" "}
                {data.dadosComplementares.processoAdministrativo}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td
                colSpan={2}
                className="px-6 py-3 text-sm md:text-base font-semibold"
              >
                DESCRIÇÃO DO OBJETO:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm text-justify">
                {data.descricaoObjeto}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td
                colSpan={2}
                className="px-6 py-3 text-sm md:text-base font-semibold"
              >
                PERÍODO DE EXECUÇÃO:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm">
                {data.periodoExecucao}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td
                colSpan={2}
                className="px-6 py-3 text-sm md:text-base font-semibold"
              >
                VALOR GLOBAL DA PARCERIA:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm">
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    {data.valorGlobal.valor} disponibilizados pelo Ministério
                    das Mulheres. O recurso já foi liberado.
                  </li>
                  <li>Ação orçamentária {data.valorGlobal.acaoOrcamentaria}</li>
                  <li>
                    PTRES{data.valorGlobal.ptres}, Natureza da Despesa:{" "}
                    {data.valorGlobal.naturezaDespesa}
                  </li>
                  <li>Nota de Empenho nº {data.valorGlobal.notaEmpenho}</li>
                  <li>Unidade Gestora {data.valorGlobal.unidadeGestora}</li>
                  <li>
                    Fonte de Recursos nº {data.valorGlobal.fonteRecursos},
                    conforme cronograma de desembolso constante do plano de
                    trabalho.
                  </li>
                </ul>
              </td>
            </tr>

            <tr className="">
              <td
                colSpan={2}
                className="px-6 text-sm md:text-base font-semibold"
              >
                VALOR TOTAL DA REMUNERAÇÃO DA EQUIPE DE TRABALHO:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm">
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-justify">
                    {data.valorGlobal.valorRemuneracaoEquipeTrabalho}
                  </li>
                </ul>
              </td>
            </tr>

            <tr className="bg-gray-50">
              <td
                colSpan={2}
                className="px-6 py-3 text-sm md:text-base font-semibold"
              >
                PRESTAÇÃO DE CONTAS:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm">
                {data.prestacaoContas}
              </td>
            </tr>

            <tr className="bg-gray-50">
              <td
                colSpan={2}
                className="px-6 py-3 text-sm md:text-base font-semibold"
              >
                SITUAÇÃO DA PRESTAÇÃO DE CONTAS:
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm">
                {data.situacaoPrestacaoContas}
              </td>
            </tr>
          </tbody>
        </table>
        <LogosSection />
      </div>
      <div className="flex md:justify-start justify-center mb-5 items-center">
        <ButtonDownload
          fileName="SEI_006449_43147398_Termo_de_Fomento.pdf"
          buttonText="Baixar Termo de Fomento"
        />
      </div>
    </div>
  );
};

export default TabelaProjeto;
