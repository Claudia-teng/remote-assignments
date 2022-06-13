function count(input) {
  let map = {};
  for (let char of input) {
    if (!map[char]) {
      map[char] = 1;
    } else {
      map[char]++;
    }
  }
  return map;
}

function groupByKey(input) {
  let map = {};
  for (let pair of input) {
    if (!map[pair.key]) {
      map[pair.key] = pair.value;
    } else {
      map[pair.key] += pair.value;
    }
  }
  return map;
}

let input1 = ['a', 'b', 'c', 'a', 'c', 'a', 'x'];
console.log(count(input1)) // {a:3, b:1, c:2, x:1 }
let input2 = [
  { key: 'a', value: 3 },
  { key: 'b', value: 1 },
  { key: 'c', value: 2 },
  { key: 'a', value: 3 },
  { key: 'c', value: 5 },
]
console.log(groupByKey(input2)) // {a:6, b:1, c:7}