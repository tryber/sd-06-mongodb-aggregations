/*
  Considerando esta lista, crie uma pipeline que retorne o title do vigésimo quinto filme da agregação que satisfaz as seguintes condições:
*/
db.movies.aggregate([
  {
    $match: {
      // countries é Estados unidos
      countries: "USA",
      // tomatoes.viewer.rating maior ou igual a 3
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: true },
    },
  },
  {
    /*
      Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes da nossa lista de favoritos aparecem no elenco (campo cast) do filme.
    */
    $addFields: {
      num_favs: {
        /*
          Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore operadores como $size e $setIntersection.
        */
        $size: {
          $setIntersection: [
            ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
            "$cast",
          ],
        },
      },
    },
  },
  {
    /*
      Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem
      decrescente.
    */
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
