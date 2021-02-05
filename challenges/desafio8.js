db.air_alliances.aggregate([
  { $unwind: "$airlines" },
	{ $lookup:
		{
      from: "air_routes",
      let: { airline_name: "$airlines" },
      pipeline: [
				{ $match:
					{ $and:
						[
              { $expr: { $eq: ["$airline.name", "$$airline_name"] } },
              { airplane: { $in: ["747", "380"] } },
            ],
          },
        },
      ],
      as: "dados_rota",
    },
  },
	{ $addFields:
		{
      total: { $size: "$dados_rota" },
    },
  },
	{ $group:
		{
      _id: "$name",
      totalRotas: { $sum: "$total" },
    },
  },
	{ $project:
		{ _id: 1, totalRotas: 1 
		},
  },
	{ $sort: 
		{ totalRotas: -1 
		},
  },
  { $limit: 1 },
]);
