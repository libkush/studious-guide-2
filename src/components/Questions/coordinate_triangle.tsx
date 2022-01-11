import { useState, useCallback, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import { Solution1Object, numFormat, error1 } from "../../utils";

export default function COORDINATE_TRIANGLE() {
  const [X1, setX1] = useState<number>();
  const [X2, setX2] = useState<number>();
  const [Y1, setY1] = useState<number>();
  const [Y2, setY2] = useState<number>();
  const [X3, setX3] = useState<number>();
  const [Y3, setY3] = useState<number>();

  const [Solution, solved] = useState<Solution1Object>();

  const error1Element = useMemo(
    () => (
      <div className="error">
        <h2>This is too much!</h2>
      </div>
    ),
    []
  );

  const error2Element = useMemo(
    () => (
      <div className="error">
        <h2>The points are colinear</h2>
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
      (!X3 && X3 !== 0) ||
      (!Y3 && Y3 !== 0)
    )
      return;

    if ((1 / 2) * (X1 * (Y2 - Y3) + X2 * (Y3 - Y1) + X3 * (Y1 - Y2)) === 0)
      return error1("coordinate-ratio", solved, error2Element);

    const area = (1 / 2) * (X1 * (Y2 - Y3) + X2 * (Y3 - Y1) + X3 * (Y1 - Y2));

    return solved({
      isSolved: true,
      solutionElement:
        // prettier-ignore
        <div className="card">
          <h2>Using Section Formula</h2>
          <p>
            <Latex>{`$Area\\ of\\ triangle = \\frac{1}{2}|[x_{1}(y_{2}-y_{3})+x_{2}(y_{3}-y_{1})+x_{3}(y_{1}-y_{2})]|$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore Area (A) = \\frac{1}{2}|[${X1}(${Y2}${numFormat(-Y3)})${numFormat(X2)}(${Y3}${numFormat(-Y1)})${numFormat(X3)}(${Y1}${numFormat(-Y2)})]|$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore A = \\frac{1}{2}|[${X1}(${Y2-Y3})${numFormat(X2)}(${Y3-Y1})${numFormat(X3)}(${Y1-Y2})]|$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore A = \\frac{1}{2}|(${X1*(Y2-Y3)}${numFormat(X2*(Y3-Y1))}${numFormat(X3*(Y1-Y2))})|$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore A = \\frac{1}{2}|(${2*area})|$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore A = ${area > 0 ? area : -area}$`}</Latex>
          </p>
        </div>,
    });
  }, [X1, X2, Y1, Y2, X3, Y3, error2Element, solved]);

  const updateX1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-triangle", solved, error1Element);
      setX1(parseInt(e.target.value));
    },
    [setX1, solved, error1Element]
  );

  const updateX2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-triangle", solved, error1Element);
      setX2(parseInt(e.target.value));
    },
    [setX2, solved, error1Element]
  );

  const updateY1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-triangle", solved, error1Element);
      setY1(parseInt(e.target.value));
    },
    [setY1, solved, error1Element]
  );

  const updateY2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-triangle", solved, error1Element);
      setY2(parseInt(e.target.value));
    },
    [setY2, solved, error1Element]
  );

  const updateX3 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-triangle", solved, error1Element);
      setX3(parseInt(e.target.value));
    },
    [setX3, solved, error1Element]
  );
  const updateY3 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-triangle", solved, error1Element);
      setY3(parseInt(e.target.value));
    },
    [setY3, solved, error1Element]
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
    <article id="coordinate-triangle" className="question">
      <h2 className="statement">
        Q. Find the area of the triangle with coordinates
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label className="math">
          <Latex>{"$($"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={X1}
          onChange={updateX1}
        />
        <label className="math">
          <Latex>{"$,\\ $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={Y1}
          onChange={updateY1}
        />
        <label className="math">
          <Latex>{"$),\\ $"}</Latex>
        </label>
        <label className="math">
          <Latex>{"$($"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={X2}
          onChange={updateX2}
        />
        <label className="math" htmlFor="a">
          <Latex>{"$,\\ $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={Y2}
          onChange={updateY2}
        />
        <label className="math" htmlFor="b">
          <Latex>{"$),\\ $"}</Latex>
        </label>
        <label className="math">
          <Latex>{"$($"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={X3}
          onChange={updateX3}
        />
        <label className="math" htmlFor="a">
          <Latex>{"$,\\ $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={Y3}
          onChange={updateY3}
        />
        <label className="math" htmlFor="b">
          <Latex>{"$)$"}</Latex>
        </label>
        <div style={{ height: "0rem", width: "100%" }} />
        <button type="submit">Solve</button>
      </form>
      <div className="solution">{Solution?.solutionElement}</div>
      {Solution?.isSolved ? <button onClick={closeBtn}>Close</button> : null}
    </article>
  );
}
