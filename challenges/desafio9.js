db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $exists: true } },
        { birthYear: { $ne: "" } },
      ],
    },
  },
  {
    $addFields: {
      yearToInt: {
        $toInt: "$birthYear",
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: "$yearToInt",
      },
      menorAnoNascimento: {
        $min: "$yearToInt",
      },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
