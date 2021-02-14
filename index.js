try {
  var mongoose = require("mongoose");
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require("parent-require"),
    mongoose = prequire("mongoose");
}

const checkIfSetPresent = (size, set) => {
  if (set) {
    return [{ $set: set }, { $sample: { size: size } }];
  } else return [{ $sample: { size: size } }];
};

async function getUniqeRandomDocuments(colection, schema, size, set) {
  try {
    let uniqueRandomAccumulator = [];
    const breakePoint = size;

    const randomiseRecursion = async (colection, schema, size, set) => {
      const randomDocs = await mongoose
        .model(colection, schema)
        .aggregate(checkIfSetPresent(size, set));
      if (randomiseRecursion.length < breakePoint) {
        return randomiseRecursion;
      }

      const uniqueRandomIterate = [
        ...uniqueRandomAccumulator,
        ...randomDocs,
      ].reduce(
        (acc, task) => {
          if (acc.map[task._id]) return acc;
          acc.map[task._id] = true;
          acc.tasks.push(task);
          return acc;
        },
        { map: {}, tasks: [] }
      ).tasks;

      uniqueRandomAccumulator = [...uniqueRandomIterate].slice(0, breakePoint);
      if (uniqueRandomAccumulator.length === breakePoint) {
        return uniqueRandomAccumulator;
      }

      return await randomiseRecursion(colection, schema, breakePoint, set);
    };

    return await randomiseRecursion(
      colection,
      schema,
      breakePoint + Math.trunc(breakePoint / 5),
      set
    );
  } catch (err) {
    return err;
  }
}

module.exports = getUniqeRandomDocuments;
