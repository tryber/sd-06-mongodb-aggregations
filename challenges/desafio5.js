db.movies.aggregate([
  {
    $match: {
      countries: "Estados unidos",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      num_favs: 
    }
  }
]);

// Sandra Bullock
// Tom Hanks
// Julia Roberts
// Kevin Spacey
// George Clooney

// countries é Estados unidos
// tomatoes.viewer.rating maior ou igual a 3
// Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes da nossa lista de favoritos aparecem no elenco (campo cast) do filme.
// Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.
// Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore operadores como $size e $setIntersection.

// O resultado da sua query deve ter o seguinte formato: