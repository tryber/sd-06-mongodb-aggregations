db.movies.aggregate([
  {
    $match: {
      cast: { $exists: true },
      languages: "English",
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);

/* Ainda estou com alguma dificuldade em construir o fluxo de pensamento usando
os operadores e métodos na ordem correta para retornar exatamente os dados que
preciso. E este foi um dos requisitos que achei que não seria capaz de fazer.
Mas encontrei mais dificuldade nos dois últimos do que neste aqui, então
optei por essa query e precisei do auxílio do PR do Matheus Coutinho novamente.
link do PR: https://github.com/tryber/sd-06-mongodb-aggregations/pull/94/files */
