export function Testimonials() {
  return (
    <section id="testimonials" className="bg-neutral-200 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Depoimentos
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 rounded-lg p-6 shadow-md space-y-4">
            <p className="text-gray-700">
              &quot;A CADES mudou a minha vida! Encontrei apoio e amigos
              verdadeiros.&quot;
            </p>
            <p className="text-gray-600 font-semibold">- Maria S.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md space-y-4">
            <p className="text-gray-700">
              &quot;Graças à CADES, consegui um emprego e agora tenho uma vida
              digna.&quot;
            </p>
            <p className="text-gray-600 font-semibold">- João P.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md space-y-4">
            <p className="text-gray-700">
              &quot;Sou muito grato à CADES pela ajuda e apoio que eles oferecem
              à comunidade.&quot;
            </p>
            <p className="text-gray-600 font-semibold">- Carlos R.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
