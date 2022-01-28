// import { evaluate } from "mathjs";

export const smallKidsDivide = (x: number, y: number): number => {
  const small = Math.min(x, y);
  const big = Math.max(x, y);
  return (big - (big % small)) / small;
};

interface factorization {
  number: number;
  exponent: number;
}

interface squareRoot {
  outer: number;
  inner: number;
}

export const formatSquareRoot = (num: number): squareRoot => {
  let outer = 1;
  let inner = num;
  let d = 2;
  while (d * d <= inner) {
    if (inner % (d * d) === 0) {
      inner = inner / (d * d);
      outer = outer * d;
    } else {
      d = d + 1;
    }
  }
  return { outer, inner };
};

export const removeDuplicates = (arr: number[]): number[] => {
  return arr.sort().filter(function (item, pos, ary) {
    return !pos || item !== ary[pos - 1];
  });
};

export const primeFactors = (num: number): factorization[] => {
  function countInArray(array: number[], what: number) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === what) {
        count++;
      }
    }
    return count;
  }

  function rawPrimeFactors(n: number) {
    const factors = [];
    let divisor = 2;

    while (n >= 2) {
      if (n % divisor === 0) {
        factors.push(divisor);
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }

  const factorArr = rawPrimeFactors(num);
  const exponentArr: number[] = [];

  const noDuplicates = removeDuplicates(factorArr).sort(function (a, b) {
    return a - b;
  });

  noDuplicates.forEach((factor) =>
    exponentArr.push(countInArray(factorArr, factor))
  );

  const primeFactorization = [];
  for (var i = 0; i < noDuplicates.length; i++) {
    primeFactorization.push({
      number: noDuplicates[i],
      exponent: exponentArr[i],
    });
  }
  return primeFactorization;
};

export const numFormat = (num: number) => {
  if (num >= 0) return "+" + num.toString(10);
  else return num.toString(10);
};

export const toggleBlue = (): void => {
  const r = document.querySelector<HTMLElement>(":root");
  if (!r) return;
  r.style.setProperty("--color-primary", "#0c72ad");
  r.style.setProperty("--color-secondary", "#369dd9");
  r.style.setProperty("--color-tertiary", "#11195c");
  localStorage.setItem("color-scheme", "blue");
};

export const toggleOrange = () => {
  const r = document.querySelector<HTMLElement>(":root");
  if (!r) return;
  r.style.setProperty("--color-primary", "#ff5c00");
  r.style.setProperty("--color-secondary", "#fc955b");
  r.style.setProperty("--color-tertiary", "#7f1d1d");
  localStorage.setItem("color-scheme", "orange");
};

export const togglePink = () => {
  const r = document.querySelector<HTMLElement>(":root");
  if (!r) return;
  r.style.setProperty("--color-primary", "#ff0080");
  r.style.setProperty("--color-secondary", "#fc4e97");
  r.style.setProperty("--color-tertiary", "#57022f");
  localStorage.setItem("color-scheme", "pink");
};

export const toggleGreen = () => {
  const r = document.querySelector<HTMLElement>(":root");
  if (!r) return;
  r.style.setProperty("--color-primary", "#00c800");
  r.style.setProperty("--color-secondary", "#00e676");
  r.style.setProperty("--color-tertiary", "#004d40");
  localStorage.setItem("color-scheme", "green");
};

export function setColorTheme(color: string): void {
  switch (color) {
    case "blue":
      toggleBlue();
      break;
    case "pink":
      togglePink();
      break;
    case "green":
      toggleGreen();
      break;
    default:
      toggleOrange();
      break;
  }
}

export function error1(
  questionId: string,
  resolve: (value: React.SetStateAction<Solution1Object | undefined>) => void,
  element: JSX.Element
): void {
  shake(questionId);
  resolve({
    isSolved: false,
    solutionElement: element,
  });
}

export function error2(
  questionId: string,
  resolve: (value: React.SetStateAction<Solution2Object | undefined>) => void,
  element: JSX.Element
): void {
  shake(questionId);
  resolve({
    isSolved: false,
    solution1Element: element,
    solution2Element: element,
  });
}

export function error3(
  questionId: string,
  resolve: (
    value: React.SetStateAction<SolutionOptionalObject | undefined>
  ) => void,
  element1: JSX.Element,
  element2: JSX.Element
): void {
  shake(questionId);
  resolve({
    isSolved: false,
    solution1Element: element1,
    solution2Element: element2,
  });
}

export function shake(id: string) {
  const r = document.getElementById(id);
  if (!r) return;
  r.classList.add("shake");
  setTimeout(() => {
    r.classList.remove("shake");
  }, 250);
}

export function formatDecimal(str: string): null | string {
  var comma, pre, offset, pad, times, repeat;

  if (-1 === (comma = str.indexOf("."))) return str;

  pre = str.substr(0, comma + 1);
  str = str.substr(comma + 1);

  for (var i = 0; i < str.length; i++) {
    offset = str.substr(0, i);

    for (var j = 0; j < 5; j++) {
      pad = str.substr(i, j + 1);

      times = Math.ceil((str.length - offset.length) / pad.length);

      repeat = new Array(times + 1).join(pad); // Silly String.repeat hack

      if (0 === (offset + repeat).indexOf(str)) {
        return pre + offset + "(" + pad + ")";
      }
    }
  }
  return null;
}

export function isSquare(n: number): boolean {
  return Math.sqrt(n) % 1 === 0;
}

export interface Solution1Object {
  isSolved: boolean;
  solutionElement: JSX.Element;
}

export interface Solution2Object {
  isSolved: boolean;
  solution1Element: JSX.Element;
  solution2Element: JSX.Element;
}

export interface SolutionOptionalObject {
  isSolved: boolean;
  solution1Element: JSX.Element | null;
  solution2Element: JSX.Element | null;
}

// export function parseParentheses(input: string): any[] {
//   let openParenCount = 0;
//   let myOpenParenIndex = 0;
//   let myEndParenIndex = 0;
//   const result = [];

//   for (let i = 0; i < input.length; i++) {
//     if (input[i] === "(") {
//       if (openParenCount === 0) {
//         myOpenParenIndex = i;

//         // checking if anything exists before this set of parentheses
//         if (i !== myEndParenIndex) {
//           result.push(input.substring(myEndParenIndex, i));
//         }
//       }
//       openParenCount++;
//     }

//     if (input[i] === ")") {
//       openParenCount--;
//       if (openParenCount === 0) {
//         myEndParenIndex = i + 1;

//         // recurse the contents of the parentheses to search for nested ones
//         result.push(parseParentheses(input.substring(myOpenParenIndex + 1, i)));
//       }
//     }
//   }

//   // capture anything after the last parentheses
//   if (input.length > myEndParenIndex) {
//     result.push(input.substring(myEndParenIndex, input.length));
//   }

//   return result;
// }

// export function evalExpression(arr: any[], level = 0): string {
//   let result = "";
//   for (var i = 0; i < arr.length; i++) {
//     let levelCounter = 0;
//     if (arr[i].isArray() && levelCounter <= level) {
//       levelCounter += 1;
//       return evalExpression(arr[i]);
//     }
//     arr[i] = evaluate(arr[i]);
//   }
//   return result;
// }
