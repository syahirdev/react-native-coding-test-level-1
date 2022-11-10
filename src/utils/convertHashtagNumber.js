export const convertHashtagNumber = (num) => {
  const DIGIT = 3;
  num = num.toString();
  while(num.length < DIGIT) {
    num = "0" + num;
  }
  return num;
};
