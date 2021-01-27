db.movies.aggregate([{ $project: { _id: 0, title_split: { $split: ["$title", " "] } } }, { $match: { "title_split.1": { $exists: false } } }, { $sort: { title: 1 } }]);
