import { useState, useCallback, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import { Solution1Object, numFormat, error1 } from "../../utils";

export default function LINEAR_EQUATION() {
  const [X1, setX1] = useState<number>();
  const [X2, setX2] = useState<number>();
  const [Y1, setY1] = useState<number>();
  const [Y2, setY2] = useState<number>();
  const [C1, setC1] = useState<number>();
  const [C2, setC2] = useState<number>();

  const [Solution, solved] = useState<Solution1Object>();

  const error1Element = useMemo(
    () => (
      <div className="error">
        <h2>Ouch! This hurts . . .</h2>
      </div>
    ),
    []
  );

  const error2Element = useMemo(
    () => (
      <div className="error">
        <h2>Inconsistent pair of equations</h2>
      </div>
    ),
    []
  );

  const error3Element = useMemo(
    () => (
      <div className="error">
        <h2>Infinite solutions</h2>
      </div>
    ),
    []
  );

  const solve = useCallback(async () => {
    if (
      (!X1 && X1 !== 0) ||
      (!X2 && X2 !== 0) ||
      (!Y1 && Y1 !== 0) ||
      (!Y2 && Y2 !== 0) ||
      (!C1 && C1 !== 0) ||
      (!C2 && C2 !== 0)
    )
      return;

    if (X1 / X2 === Y1 / Y2 && X1 / X2 !== C1 / C2)
      return error1("linear-equation", solved, error2Element);

    if (X1 / X2 === Y1 / Y2 && X1 / X2 === C1 / C2)
      return error1("linear-equation", solved, error3Element);

    const x = (Y1 * C2 - Y2 * C1) / (Y2 * X1 - Y1 * X2);
    const y = (C1 * X2 - C2 * X1) / (Y2 * X1 - Y1 * X2);

    return solved({
      isSolved: true,
      solutionElement:
        // prettier-ignore
        <div className="card">
          <h2>Using Cross Multiplication</h2>
          <p>
            <Latex>{`$For\\ equations\\ ${X1}x ${numFormat(Y1)}y ${numFormat(C1)} = 0\\ and\\ $`}</Latex>
            <Latex>{`$${X2}x ${numFormat(Y2)}y ${numFormat(C2)} = 0:$`}</Latex>
            <br /><br />
            <Latex>{`$x=\\frac{b_{1}c_{2}-b_{2}c_{1}}{b_{2}a_{1}-b_{1}a_{2}},\\ $`}</Latex>
            <Latex>{`$y=\\frac{c_{1}a_{2}-c_{2}a_{1}}{b_{2}a_{1}-b_{1}a_{2}}$`}</Latex>
            <br /><br />
            <Latex>{`$\\Rightarrow\\ x = \\frac{(${Y1})(${C2}) - (${Y2})(${C1})}{(${Y2})(${X1}) - (${Y1})(${X2})},\\ $`}</Latex>
            <Latex>{`$y = \\frac{(${C1})(${X2}) - (${C2})(${X1})}{(${Y2})(${X1}) - (${Y1})(${X2})}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore x = \\frac{${Y1 * C2} - ${Y2 * C1}}{${Y2 * X1} - ${Y1 * X2}},\\ \\ $`}</Latex>
            <Latex>{`$y = \\frac{${C1 * X2} - ${C2 * X1}}{${Y2 * X1} - ${Y1 * X2}}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore x = \\frac{${Y1 * C2 - Y2 * C1}}{${Y2 * X1 - Y1 * X2}},\\ \\ $`}</Latex>
            <Latex>{`$y = \\frac{${C1 * X2 - C2 * X1}}{${Y2 * X1 - Y1 * X2}}$`}</Latex>
            <br /><br />
            <Latex>{`$x = ${x},\\ \\ y = ${y}$`}</Latex>
          </p>
        </div>,
    });
  }, [X1, X2, Y1, Y2, C1, C2, error2Element, error3Element, solved]);

  const updateX1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("linear-equation", solved, error1Element);
      setX1(parseInt(e.target.value));
    },
    [setX1, solved, error1Element]
  );

  const updateX2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("linear-equation", solved, error1Element);
      setX2(parseInt(e.target.value));
    },
    [setX2, solved, error1Element]
  );

  const updateY1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("linear-equation", solved, error1Element);
      setY1(parseInt(e.target.value));
    },
    [setY1, solved, error1Element]
  );

  const updateY2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("linear-equation", solved, error1Element);
      setY2(parseInt(e.target.value));
    },
    [setY2, solved, error1Element]
  );

  const updateC1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("linear-equation", solved, error1Element);
      setC1(parseInt(e.target.value));
    },
    [setC1, solved, error1Element]
  );

  const updateC2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("linear-equation", solved, error1Element);
      setC2(parseInt(e.target.value));
    },
    [setC2, solved, error1Element]
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
    <article id="linear-equation" className="question">
      <h2 className="statement">
        Q. Solve the following pair of linear equations
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          className="small_box"
          type="number"
          size={1}
          value={X1}
          onChange={updateX1}
        />
        <label className="math" htmlFor="a">
          <Latex>{"$x + $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={Y1}
          onChange={updateY1}
        />
        <label className="math" htmlFor="b">
          <Latex>{"$y + $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={C1}
          onChange={updateC1}
        />
        <label className="math" htmlFor="b">
          <Latex>{"$= 0, $"}</Latex>
        </label>
        <br />
        <div style={{ height: "0rem", width: "100%" }} />
        <input
          className="small_box"
          type="number"
          size={1}
          value={X2}
          onChange={updateX2}
        />
        <label className="math" htmlFor="a">
          <Latex>{"$x + $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={Y2}
          onChange={updateY2}
        />
        <label className="math" htmlFor="b">
          <Latex>{"$y + $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={C2}
          onChange={updateC2}
        />
        <label className="math" htmlFor="b">
          <Latex>{"$ = 0\\ $"}</Latex>
        </label>
        <div style={{ height: "0rem", width: "100%" }} />
        <button type="submit">Solve</button>
      </form>
      <div className="solution">{Solution?.solutionElement}</div>
      {Solution?.isSolved ? <button onClick={closeBtn}>Close</button> : null}
    </article>
  );
}
