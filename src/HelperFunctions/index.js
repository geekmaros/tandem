export const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const generateUniqueNumbersOfElementFromArray = (
  numbersOfElements,
  arr
) => {
  const myArr = [];
  while (myArr.length < numbersOfElements) {
    const value = arr[Math.floor(Math.random() * arr.length)];
    if (myArr.indexOf(value) === -1) myArr.push(value);
  }
  return myArr;
};
