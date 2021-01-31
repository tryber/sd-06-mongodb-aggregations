db.air_alliances.aggregate([
  { $unwind: '$airlines' },
  {
    $lookup: {
      from: 'air_routes',
      let: { air: '$airlines' },
      pipeline: [
        {
          $match: {
            $or: [{ airplane: '747' }, { airplane: '380' }],
            $expr: { $eq: ['$airline.name', '$$air'] },
          },
        },
      ],
      as: 'nome_da_alianca',
    },
  },
  {
    $addFields: {
      rotas: { $size: '$nome_da_alianca' },
    },
  },
  {
    $group: {
      _id: '$name',
      total_de_rotas: { $sum: '$rotas' },
    },
  },
  { $sort: { total_de_rotas: -1 } },
  { $project: { _id: 1, totalRotas: { $max: ['$total_de_rotas'] } } },
  { $limit: 1 },
]);
