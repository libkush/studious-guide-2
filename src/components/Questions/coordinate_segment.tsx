import { useState, useCallback, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import { Solution1Object, numFormat, formatDecimal, error1 } from "../../utils";

export default function COORDINATE_SEGMENT() {
  const [X1, setX1] = useState<number>();
  const [X2, setX2] = useState<number>();
  const [Y1, setY1] = useState<number>();
  const [Y2, setY2] = useState<number>();
  const [m, setM] = useState<number>();
  const [n, setN] = useState<number>();

  const [Solution, solved] = useState<Solution1Object>();

  const errorElement = useMemo(
    () => (
      <div className="error">
        <h2>This is too much!</h2>
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
      (!m && m !== 0) ||
      (!n && n !== 0)
    )
      return;

    return solved({
      isSolved: true,
      solutionElement:
        // prettier-ignore
        <div className="card">
          <h2>Using Section Formula</h2>
          <p>
            <Latex>{`$Let\\ the\\ required\\ point\\ be\\ P(x,\\ y)$`}</Latex>
            <br /><br />
            <Latex>{`$x = \\frac{mx_{2}+nx_{1}}{m+n},\\ y = \\frac{my_{2}+ny_{1}}{m+n}$`}</Latex>
            <br /><br />
            <Latex>{`$x = \\frac{${m}(${X2})+${n}(${X1})}{${m}${numFormat(n)}},\\ y = \\frac{${m}(${Y2})+${n}(${Y1})}{${m}${numFormat(n)}}$`}</Latex>
            <br /><br />
            <Latex>{`$x = \\frac{${m*X2}${numFormat(n*X1)}}{${m+n}},\\ y = \\frac{${m*Y2}${numFormat(n*Y1)}}{${m+n}}$`}</Latex>
            <br /><br />
            <Latex>{`$x = \\frac{${m*X2+n*X1}}{${m+n}},\\ y = \\frac{${m*Y2+n*Y1}}{${m+n}}$`}</Latex>
            <br /><br />
            <Latex>{`$x = ${formatDecimal(((m*X2+n*X1)/(m+n)).toString(10))},\\ y = ${formatDecimal(((m*Y2+n*Y1)/(m+n)).toString(10))}$`}</Latex>
            <br /><br />
            <Latex>{`$P = (${formatDecimal(((m*X2+n*X1)/(m+n)).toString(10))},\\ ${formatDecimal(((m*Y2+n*Y1)/(m+n)).toString(10))})$`}</Latex>
          </p>
        </div>,
    });
  }, [X1, X2, Y1, Y2, m, n, solved]);

  const updateX1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-segment", solved, errorElement);
      setX1(parseInt(e.target.value));
    },
    [setX1, solved, errorElement]
  );

  const updateX2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-segment", solved, errorElement);
      setX2(parseInt(e.target.value));
    },
    [setX2, solved, errorElement]
  );

  const updateY1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-segment", solved, errorElement);
      setY1(parseInt(e.target.value));
    },
    [setY1, solved, errorElement]
  );

  const updateY2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-segment", solved, errorElement);
      setY2(parseInt(e.target.value));
    },
    [setY2, solved, errorElement]
  );

  const updateM = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-segment", solved, errorElement);
      setM(parseInt(e.target.value));
    },
    [setM, solved, errorElement]
  );
  const updateN = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-segment", solved, errorElement);
      setN(parseInt(e.target.value));
    },
    [setN, solved, errorElement]
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
    <article id="coordinate-segment" className="question">
      <h2 className="statement">
        Q. The following points are divided in the ratio
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          className="small_box"
          type="number"
          size={1}
          value={m}
          onChange={updateM}
        />
        <label className="math">
          <Latex>{"$\\ :\\ $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={n}
          onChange={updateN}
        />
        <label className="math">
          <Latex>{"$\\ $"}</Latex>
        </label>
        <label className="math">
          <h2 className="statement">
            on the cartesian plane.
            <br />
          </h2>
        </label>
        <div style={{ height: "0rem", width: "100%" }} />
        <label className="math">
          <Latex>{"$($"}</Latex>
        </label>
        <input className="small_box" size={1} value={X1} onChange={updateX1} />
        <label className="math" htmlFor="a">
          <Latex>{"$,\\ $"}</Latex>
        </label>
        <input className="small_box" size={1} value={Y1} onChange={updateY1} />
        <label className="math" htmlFor="b">
          <Latex>{"$)$"}</Latex>
        </label>
        <div style={{ height: "0rem", width: "100%" }} />
        <label className="math">
          <Latex>{"$($"}</Latex>
        </label>
        <input className="small_box" size={1} value={X2} onChange={updateX2} />
        <label className="math" htmlFor="a">
          <Latex>{"$,\\ $"}</Latex>
        </label>
        <input className="small_box" size={1} value={Y2} onChange={updateY2} />
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
