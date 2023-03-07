import _ from "lodash";

// @@ weight [
//    {
//       item:(any),
//       weightNum:(Number)
//    }
// ]

export const weightRandomCreator = (weightTable) => {
  const total = _.sumBy(weightTable, "weight");
  const weightsArray = _.map(weightTable, "weight");
  // 累加 weightsArray
  const ticksArray = _.map(weightsArray, (num, i) => {
    return _.sum(_.take(weightsArray, i + 1));
  });

  const conditions = _.map(ticksArray, (num, i) => {
    // min <= val < max
    const min = i === 0 ? 1 : ticksArray[i - 1] + 1;
    const max = num + 1;
    return [(val) => _.inRange(val, min, max), () => weightTable[i]];
  });

  const filter = _.cond(conditions);

  return () => {
    const result = _.random(1, total);
    return filter(result);
  };
};
