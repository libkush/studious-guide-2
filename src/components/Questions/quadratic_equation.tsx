import { useCallback, useState, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import Fraction from "fraction.js";
import {
  formatDecimal,
  isSquare,
  numFormat,
  formatSquareRoot,
  SolutionOptionalObject,
  error3,
} from "../../utils";

export default function QUADRATIC_EQUATION_ZEROES() {
  const [a, setAValue] = useState<number>();
  const [b, setBValue] = useState<number>();
  const [c, setCValue] = useState<number>();
  const [Solution, solved] = useState<SolutionOptionalObject>();

  const errorElement = useMemo(
    () => (
      <div className="error">
        <h2>Aw, snap! That's huge . . .</h2>
      </div>
    ),
    []
  );

  const solve = useCallback(async () => {
    if ((!a && a !== 0) || (!b && b !== 0) || (!c && c !== 0)) return;

    const D = b * b - 4 * a * c < 0 ? -(b * b - 4 * a * c) : b * b - 4 * a * c;

    const root1 = (-b + Math.sqrt(D)) / (2 * a);
    const root2 = (-b - Math.sqrt(D)) / (2 * a);

    let x1;
    let x2;

    if (root1.toString().split(".")[1]) {
      if (parseFloat(root1.toString().split(".")[1]) >= 15) {
        x1 = new Fraction(formatDecimal(root1.toString() ?? "") ?? 0.0)
          .toFraction(false)
          .split("/");
      } else x1 = new Fraction(root1.toString()).toFraction(false).split("/");
    } else {
      x1 = [`${root1}`, `1`];
    }
    if (root2.toString().split(".")[1]) {
      if (parseFloat(root2.toString().split(".")[1]) >= 15) {
        x2 = new Fraction(formatDecimal(root2.toString() ?? "") ?? 0.0)
          .toFraction(false)
          .split("/");
      } else x2 = new Fraction(root2.toString()).toFraction(false).split("/");
    } else {
      x2 = [`${root2}`, `1`];
    }

    const finalAnswer =
      x1[1] === "1" && x2[1] !== "1"
        ? `$$x = ${root1}\\ or\\ x = \\frac{${x2[0]}}{${x2[1]}}$$`
        : x2[1] === "1" && x1[1] !== "1"
        ? `$$x = \\frac{${x1[0]}}{${x1[1]}}\\ or\\ x = ${root2}$$`
        : x2[1] === "1" && x1[1] === "1"
        ? `$$x = ${root1}\\ or\\ x = ${root2}$$`
        : `$$x = \\frac{${x1[0]}}{${x1[1]}} \\ or\\ x = \\frac{${x2[0]}}{${x2[1]}}$$`;

    // prettier-ignore
    if (isSquare(D) && (b * b - 4 * a * c) >= 0) {
      return solved({
        isSolved: true,
        solution1Element: (
          <div className="card">
            <h2>Using Factorization</h2>
            <p>
              <br />
              <Latex>{`$Let\\ p(x) = ${a}x^2 ${numFormat(b)}x ${numFormat(c)}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ p(x) = ${parseFloat(x1[1]) * parseFloat(x2[1])}x^2 ${numFormat(-parseFloat(x1[1]) * parseFloat(x2[0]))}x ${numFormat(-parseFloat(x1[0]) * parseFloat(x2[1]))}x ${numFormat(parseFloat(x1[0]) * parseFloat(x2[0]))}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ p(x) = (${x1[1]}x${numFormat(-x1[0])})(${x2[1]}x ${numFormat(-x2[0])})$`}</Latex>
              <br />
              <Latex>{finalAnswer}</Latex>
            </p>
          </div>
        ),
          solution2Element: <div className="card">
            <h2>Using Quadratic Formula</h2>
            <p>
              <Latex>{`$x = \\frac{-b \\pm \\sqrt{b^{2}-4ac}}{2a}$`}</Latex>
              <br /><br />
              <Latex>{`$Here,\\ a = ${a},\\ b = ${b},\\ c = ${c}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b}^{2}-4(${a})(${c})}}{2(${a})}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b ** 2} - (${4 * a * c})}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b * b - 4 * a * c}}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b - Math.sqrt(D)}}{${2 * a}}, x = \\frac{${-b + Math.sqrt(D)}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{finalAnswer}</Latex>
            </p>
          </div>
      });
    }
    else if (!isSquare(D) && (b * b - 4 * a * c) >= 0) {
      solved({
        isSolved: true,
        solution1Element: null,
        solution2Element: (
        <div className="card">
          <h2>Using Quadratic Formula</h2>
            <p>
              <Latex>{`$x = \\frac{-b \\pm \\sqrt{b^{2}-4ac}}{2a}$`}</Latex>
              <br /><br />
              <Latex>{`$Here,\\ a = ${a},\\ b = ${b},\\ c = ${c}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b}^{2}-4(${a})(${c})}}{2(${a})}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b ** 2} - (${4 * a * c})}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b * b - 4 * a * c}}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} + ${formatSquareRoot(b * b - 4 * a * c).outer}\\sqrt{${formatSquareRoot(b * b - 4 * a * c).inner}}}{${2 * a}},\\ 
                      x = \\frac{${-b} - ${formatSquareRoot(b * b - 4 * a * c).outer}\\sqrt{${formatSquareRoot(b * b - 4 * a * c).inner}}}{${2 * a}}$`}</Latex>
            </p>
        </div>
        )
      })
    }
    else if (isSquare(D) && (b * b - 4 * a * c) < 0) {
      solved({
        isSolved: true,
        solution1Element: null,
        solution2Element: (<div className="card">
          <h2>Using Quadratic Formula</h2>
            <p>
              <Latex>{`$x = \\frac{-b \\pm \\sqrt{b^{2}-4ac}}{2a}$`}</Latex>
              <br /><br />
              <Latex>{`$Here,\\ a = ${a},\\ b = ${b},\\ c = ${c}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b}^{2}-4(${a})(${c})}}{2(${a})}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b ** 2} - (${4 * a * c})}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b * b - 4 * a * c}}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} + \\sqrt{${b * b - 4 * a * c}}}{${2 * a}},\\ x = \\frac{${-b} - \\sqrt{${b * b - 4 * a * c}}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm ${Math.sqrt(-(b * b - 4 * a * c))}i}{${2 * a}}$`}</Latex>
            </p>
        </div>)
      })
    }
    else {
      solved({
        isSolved: true,
        solution1Element: null,
        solution2Element: (
          <div className="card">
          <h2>Using Quadratic Formula</h2>
            <p>
              <Latex>{`$x = \\frac{-b \\pm \\sqrt{b^{2}-4ac}}{2a}$`}</Latex>
              <br /><br />
              <Latex>{`$Here,\\ a = ${a},\\ b = ${b},\\ c = ${c}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b}^{2}-4(${a})(${c})}}{2(${a})}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b ** 2} - (${4 * a * c})}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} \\pm \\sqrt{${b * b - 4 * a * c}}}{${2 * a}}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ x = \\frac{${-b} + ${formatSquareRoot(-(b * b - 4 * a * c)).outer}\\sqrt{${formatSquareRoot(-(b * b - 4 * a * c)).inner}}i}{${2 * a}},\\ 
                      x = \\frac{${-b} - ${formatSquareRoot(-(b * b - 4 * a * c)).outer}\\sqrt{${formatSquareRoot(-(b * b - 4 * a * c)).inner}}i}{${2 * a}}$`}</Latex>
            </p>
          </div>
        )
      })
    }
  }, [a, b, c, solved]);

  const updateA = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error3("quadratic_zeroes", solved, errorElement, errorElement);
      setAValue(parseInt(e.target.value));
    },
    [setAValue, solved, errorElement]
  );

  const updateB = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error3("quadratic_zeroes", solved, errorElement, errorElement);
      setBValue(parseInt(e.target.value));
    },
    [setBValue, solved, errorElement]
  );

  const updateC = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error3("quadratic_zeroes", solved, errorElement, errorElement);
      setCValue(parseInt(e.target.value));
    },
    [setCValue, solved, errorElement]
  );

  const closeBtn = useCallback(() => {
    solved(undefined);
  }, [solved]);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      solve();
    },
    [solve]
  );

  useEffect(() => {
    solve();
  }, [solve]);

  return (
    <article id="quadratic_zeroes" className="question">
      <h2 className="statement">
        Q. Find the roots of the following Quadratic Equation
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          className="small_box"
          type="number"
          size={1}
          value={a}
          onChange={updateA}
        />
        <label className="math" htmlFor="a">
          <Latex>{"$x^{2} +\\ $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={b}
          onChange={updateB}
        />
        <label className="math" htmlFor="b">
          {" "}
          <Latex>{"$x\\ +\\ $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={c}
          onChange={updateC}
        />
        <label className="math" htmlFor="b">
          <Latex>{"$\\ $"}</Latex>
        </label>
        <button type="submit">Solve</button>
      </form>
      <div className="solution">
        {Solution?.solution1Element}
        {Solution?.solution2Element}
      </div>
      {Solution?.isSolved ? <button onClick={closeBtn}>Close</button> : null}
    </article>
  );
}
