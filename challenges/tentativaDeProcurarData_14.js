db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: { $toDate: "2016-03-10" }, $lt: { $toDate: "2016-03-11" } },
    },
  },
]).pretty();
