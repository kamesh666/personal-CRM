use("personalCRM");

var pipeline = [
  {
    $group: {
      _id: expression,
      fieldN: {
        accumulatorN: expressionN,
      },
    },
  },
];

db.getCollection("users").find({});
