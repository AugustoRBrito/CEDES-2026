export interface EmphasisProject {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string; // Adicionado para a data
}

export const emphasisItems: EmphasisProject[] = [
  {
    id: 1,
    title: "Projeto Desenvolvendo mulheres para o futuro",
    description:
      "Conheça o projeto que está transformando a vida de mulheres em nossa comunidade, promovendo autonomia e liderança.",
    imageUrl: "/Projects/project-web.jpg",
    date: "2025-06-16",
  },
];
