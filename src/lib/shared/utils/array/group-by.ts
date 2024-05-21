export type Group<Key extends PropertyKey, T> = Record<
  Key,
  [T, ...T[]] | undefined
>;

export function groupBy<T, Key extends PropertyKey>(
  rawArray: T[],
  groupKeyFn: (currentValue: T, currentIndex: number, array: T[]) => Key,
) {
  return rawArray.reduce(
    (group, curr, i, array) => {
      const groupKey = groupKeyFn(curr, i, array);
      const groupItem = group[groupKey];

      if (groupItem) {
        groupItem.push(curr);
      } else {
        group[groupKey] = [curr];
      }

      return group;
    },
    {} as Group<Key, T>,
  );
}
