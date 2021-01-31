db.movies.aggregate(
  [{ $match: {
    $and: [
      { "imdb.rating": { $gte: 7 } },
      { $nor: [
        { genres: { $elemMatch: { $eq: "Crime" } } },
        { genres: { $elemMatch: { $eq: "Horror" } } },
      ] },
      { $or: [{ rated: "PG" }, { rated: "G" }] },
      { $and: [{ languages: "English" }, { languages: "Spanish" }] },
    ],
  } }],
);
