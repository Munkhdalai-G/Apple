// const nums = ["a", "b", "a", "c", "b"];
// const first = [];
// const second = nums.filter((num) => {
//   if (!first.includes(num)) {
//     first.push(num);
//     return false;
//   } else {
//     return true;
//   }
// });

// // console.log(result);

// // const result = nums.filter((num) => {
// //   if (num % 2 === 0) return true;
// //   else {
// //     return false;
// //   }
// // });
// console.log(second);

const nums = [10, 30, 5, 22];

const result = nums.reduce((accumulator, currentValue) => {
  console.log(accumulator, currentValue);
  if (accumulator < currentValue) return currentValue;
}, 0);
console.log(result);
