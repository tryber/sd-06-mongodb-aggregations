db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide:
            [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);

/* PR do Matheus me ajudou novamente na parte de manipulação das horas.
Não tinha me atentado que o retorno seria em segundos e teria que fazer a
transformação com a divisão. */
