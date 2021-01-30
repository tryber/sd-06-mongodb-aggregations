/*
Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos à equipe
quais são seus atores ou atrizes preferidos. Aqui está o resultado:

Sandra Bullock
Tom Hanks
Julia Roberts
Kevin Spacey
George Clooney

Considerando esta lista, crie uma pipeline que retorne o title do 0)vigésimo
quinto filme da agregação que satisfaz as seguintes condições:

1)countries é Estados unidos
2)tomatoes.viewer.rating maior ou igual a 3
3)Crie um novo campo chamado num_favs, que represente quantos atores ou atrizes
da nossa lista de favoritos aparecem no elenco (campo cast) do filme.
4)Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em
ordem decrescente.

Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore
operadores como $size e $setIntersection.

O resultado da sua query deve ter o seguinte formato:

{ "title" : <nome_do_filme> }
*/

// https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection
// https://docs.mongodb.com/manual/reference/operator/aggregation/skip
const atoresFavoritos = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

// cast $in atoresFavoritos (alguém em cast comtempla o array)
// contemplando, o $setIntersection compara dois ou  mais arrays e retorna um array
// que contém o elemento que aparece em cada array. ({ $setIntersection: [ "$A", "$B" ] })
// o $size conta quantos elementos (.length) aquele array tem (quanto maior o numero,
// mais artistas combinam com a condição e influencia o $sort)
// embora o $skip sirva para pular 24 documentos, primeiro é necessário ordenar com o $sort
// $project pra trazer apenas o 'title'
// $limit para trazer um só.

db.aggregate([
  {
    $match:
    {
      contries: "Estados Unidos",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast:
        {
          $in: atoresFavoritos,
        },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
            "$cast",
          ],
        },
      },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 } },
  { $skip: 24 },
  { $limit: 1 },
]);
