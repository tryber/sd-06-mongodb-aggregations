  // Crie uma pipeline que retorna documentos com o novo campo title_split, ela deve seguir as
  // seguintes condições:
db.movies.aggregate([
  {
    // title_split deve conter uma lista de palavras presentes em title.
    $addFields: {
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    // A pipeline deve ser ordenada por title em ordem alfabética.
    $sort: { title: 1 },
  },
  {
    // A pipeline deve retornar apenas filmes com o título composto apenas de uma palavra.
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
]);
