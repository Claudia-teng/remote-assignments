function twoSum1(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

function twoSum2(nums, target) {
  let map = {};

  for (let i = 0; i < nums.length; i++) {
    let goal = target - nums[i];
    if (map[goal]) {
      return [i, Number(map[goal])];
    } else {
      map[nums[i]] = String(i);
    }
  }
}

twoSum1([2, 7, 11, 15], 9);
twoSum2([2, 7, 11, 15], 9);
