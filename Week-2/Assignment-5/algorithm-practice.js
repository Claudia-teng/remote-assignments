function binarySearchPosition(numbers, target) {
  let start = 0;
  let end = numbers.length-1;

  while(start <= end) {
    let mid = Math.floor((start+end)/2);
    let cur = numbers[mid];
    if(cur === target) {
      return mid;
    }
    if (cur > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

// assume array is sorted
console.log(binarySearchPosition([1, 2, 4, 6, 7], 1)) // 0
console.log(binarySearchPosition([1, 2, 4, 6, 7], 6)) // 3
console.log(binarySearchPosition([1, 2, 4, 6, 7], 8)) // -1