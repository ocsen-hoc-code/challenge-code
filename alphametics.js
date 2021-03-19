const getParaAndResult = (puzzle) => {
  puzzle = puzzle.replaceAll(' ', '');
  puzzle = puzzle.split('==');

  let params = null;
  let result = null;

  if (puzzle.length == 2) {
    params = puzzle[0].split('+');
    result = puzzle[1];
  }

  return { params, result };
}

const getUniqueCharacters = (puzzle) => {
  let rs = [];
  puzzle = puzzle.replaceAll(' ', '');
  puzzle = puzzle.replaceAll('+', '');
  puzzle = puzzle.replaceAll('==', '');

  while (puzzle.length > 0) {
    if (!rs.includes(puzzle[0])) {
      rs[puzzle[0]] = 0;
      puzzle = puzzle.replaceAll(puzzle[0], '');
    }
  }

  return rs;
}

const isCorrect = (ls, puzzle) => {
  let str = puzzle;
  for (const key in ls) {
    str = str.replaceAll(key, ls[key]);
  }

  return eval(str);
}

//Source from https://stackoverflow.com/questions/9960908/permutations-in-javascript
const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result;
}

const puzzleResolve = (puzzle) => {

  let ls = getUniqueCharacters(puzzle);
  //Make bruteforce list
  const pList = permutator([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  let n = pList.length;

  //Bruteforce all case
  for (let i = 0; i < n; i++) {
    let j = 0;
    for (const key in ls) {
      ls[key] = pList[i][j];
      j++;
    }
    if (isCorrect(ls, puzzle)) {
      return { ...ls };
    }
  }

  return null;
}

export const solve = (puzzle) => {
  return puzzleResolve(puzzle);
};
