export function groupBy<T, R extends PropertyKey>(
  rawArray: T[],
  groupKeyFn: (currentValue: T, currentIndex: number, array: T[]) => R,
) {
  return rawArray.reduce(
    (group, curr, i, array) => {
      const groupKey = groupKeyFn(curr, i, array);

      if (group[groupKey]) {
        group[groupKey].push(curr);
      } else {
        group[groupKey] = [curr];
      }

      return group;
    },
    {} as Record<R, T[]>,
  );
}
