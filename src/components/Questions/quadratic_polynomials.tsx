import { useCallback, useState, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import Fraction from "fraction.js";
import {
  formatDecimal,
  isSquare,
  Solution1Object,
  numFormat,
  error1,
} from "../../utils";

export default function QUADRATIC_POLYNOMIALS() {
  const [a, setAValue] = useState<number>();
  const [b, setBValue] = useState<number>();
  const [c, setCValue] = useState<number>();
  const [Solution, solved] = useState<Solution1Object>();

  const error1Element = useMemo(
    () => (
      <div className="error">
        <h2>Oops! That's too big</h2>
      </div>
    ),
    []
  );

  const error2Element = useMemo(
    () => (
      <div className="error">
        <h2>The roots of this polynomial are complex numbers</h2>
      </div>
    ),
    []
  );

  const solve = useCallback(async () => {
    if ((!a && a !== 0) || (!b && b !== 0) || (!c && c !== 0)) return;

    const D = b * b - 4 * a * c;
    if (D < 0) return error1("polynomial_roots", solved, error2Element);

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

    if (isSquare(D))
      // prettier-ignore
      return solved({
        isSolved: true,
        solutionElement: (
          <div className="card">
            <h2>Solution</h2>
            <p>
              <Latex>{`$Let\\ p(x) = ${a}x^2 ${numFormat(b)}x ${numFormat(c)}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ p(x) = ${parseFloat(x1[1]) * parseFloat(x2[1])}x^2 ${numFormat(-parseFloat(x1[1]) * parseFloat(x2[0]))}x ${numFormat(-parseFloat(x1[0]) * parseFloat(x2[1]))}x ${numFormat(parseFloat(x1[0]) * parseFloat(x2[0]))}$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ p(x) = (${x1[1]}x ${numFormat(-x1[0])})(${x2[1]}x ${numFormat(-x2[0])})$`}</Latex>
              <br /><br />
              <Latex>{`$\\therefore\\ (${x1[1]}x ${numFormat(-x1[0])})\\ and\\ (${x2[1]}x ${numFormat(-x2[0])})\\ are\\ factors\\ of\\ p(x)$`}</Latex>
              <Latex>{finalAnswer}</Latex>
            </p>
          </div>
        ),
      });
    solved({
      isSolved: false,
      solutionElement: (
        <div className="error">
          <h2>
            Please use <a href="#quadratic">Quadratic Equations</a> question to
            solve this.
          </h2>
        </div>
      ),
    });
  }, [a, b, c, error2Element, solved]);

  const updateA = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("polynomial_roots", solved, error1Element);
      setAValue(parseInt(e.target.value));
    },
    [solved, setAValue, error1Element]
  );

  const updateB = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("polynomial_roots", solved, error1Element);
      setBValue(parseInt(e.target.value));
    },
    [solved, setBValue, error1Element]
  );

  const updateC = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("polynomial_roots", solved, error1Element);
      setCValue(parseInt(e.target.value));
    },
    [solved, setCValue, error1Element]
  );

  useEffect(() => {
    solve();
  }, [solve]);

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

  return (
    <article id="polynomial_roots" className="question">
      <h2 className="statement">
        Q. Factorize the following quadratic polynomial and find it's zeroes
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
      <div className="solution">{Solution?.solutionElement}</div>
      {Solution?.isSolved ? <button onClick={closeBtn}>Close</button> : null}
    </article>
  );
}
