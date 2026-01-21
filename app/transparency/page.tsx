import TabelaProjeto from './(components)/TabelaProjeto';
import TabelaProjetoFinançasEmpreender from './(components)/TabelaProjetoFinançasEmpreender';

const TransparencyPage = () => {
  return (
    <section
      id='transparency'
      className='w-full overflow-x-hidden bg-neutral-300 pt-14'
    >
      <h1 className='mt-10 mb-4 text-center text-3xl font-bold text-gray-900'>
        Projetos
      </h1>
      <TabelaProjetoFinançasEmpreender />
      <TabelaProjeto />

      {/* <Tabela /> */}
    </section>
  );
};

export default TransparencyPage;
