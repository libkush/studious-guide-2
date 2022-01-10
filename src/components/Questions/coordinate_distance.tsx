import { useState, useCallback, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import {
  Solution1Object,
  formatSquareRoot,
  error1,
  isSquare,
} from "../../utils";

export default function COORDINATE_DISTANCE() {
  const [X1, setX1] = useState<number>();
  const [X2, setX2] = useState<number>();
  const [Y1, setY1] = useState<number>();
  const [Y2, setY2] = useState<number>();

  const [Solution, solved] = useState<Solution1Object>();

  const errorElement = useMemo(
    () => (
      <div className="error">
        <h2>I ran out of graph paper ¯\_(ツ)_/¯</h2>
      </div>
    ),
    []
  );

  const solve = useCallback(async () => {
    if (
      (!X1 && X1 !== 0) ||
      (!X2 && X2 !== 0) ||
      (!Y1 && Y1 !== 0) ||
      (!Y2 && Y2 !== 0)
    )
      return;

    if (isSquare((X2 - X1) ** 2 + (Y2 - Y1) ** 2))
      return solved({
        isSolved: true,
        solutionElement:
          // prettier-ignore
          <div className="card">
          <h2>Using Distance Formula</h2>
          <p>
            <Latex>{`$Distance\\ (D) = \\sqrt{(x_{2}-x_{1})^2 + (y_{2}-y_{1})^2}$`}</Latex>
            <br /><br />
            <Latex>{`$D = \\sqrt{(${X2}-${X1})^2 + (${Y2}-${Y1})^2}$`}</Latex>
            <br /><br />
            <Latex>{`$D = \\sqrt{(${X2 - X1})^2 + (${Y2 - Y1})^2}$`}</Latex>
            <br /><br />
            <Latex>{`$D = \\sqrt{${(X2 - X1) ** 2} + ${(Y2 - Y1) ** 2}}$`}</Latex>
            <br /><br />
            <Latex>{`$D = \\sqrt{${(X2 - X1) ** 2 + (Y2 - Y1) ** 2}}$`}</Latex>
              <br /><br />
              <Latex>{`$D = ${Math.sqrt((X2 - X1) ** 2 + (Y2 - Y1) ** 2)}$`}</Latex>
          </p>
        </div>,
      });

    return solved({
      isSolved: true,
      solutionElement:
        // prettier-ignore
        <div className="card">
          <h2>Using Distance Formula</h2>
          <p>
            <Latex>{`$Distance\\ (D) = \\sqrt{(x_{2}-x_{1})^2 + (y_{2}-y_{1})^2}$`}</Latex>
            <br /><br />
            <Latex>{`$D = \\sqrt{(${X2}-${X1})^2 + (${Y2}-${Y1})^2}$`}</Latex>
            <br /><br />
            <Latex>{`$D = \\sqrt{(${X2 - X1})^2 + (${Y2 - Y1})^2}$`}</Latex>
            <br /><br />
            <Latex>{`$D = \\sqrt{${(X2 - X1) ** 2} + ${(Y2 - Y1) ** 2}}$`}</Latex>
            <br /><br />
            <Latex>{`$D = \\sqrt{${(X2 - X1) ** 2 + (Y2 - Y1) ** 2}}$`}</Latex>
            <br /><br />
            <Latex>{`$D = ${formatSquareRoot((X2 - X1) ** 2 + (Y2 - Y1) ** 2).outer}\\sqrt{${formatSquareRoot((X2 - X1) ** 2 + (Y2 - Y1) ** 2).inner}}$`}</Latex>
          </p>
        </div>,
    });
  }, [X1, X2, Y1, Y2, solved]);

  const updateX1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-distance", solved, errorElement);
      setX1(parseInt(e.target.value));
    },
    [setX1, solved, errorElement]
  );

  const updateX2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-distance", solved, errorElement);
      setX2(parseInt(e.target.value));
    },
    [setX2, solved, errorElement]
  );

  const updateY1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-distance", solved, errorElement);
      setY1(parseInt(e.target.value));
    },
    [setY1, solved, errorElement]
  );

  const updateY2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error1("coordinate-distance", solved, errorElement);
      setY2(parseInt(e.target.value));
    },
    [setY2, solved, errorElement]
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
    <article id="coordinate-distance" className="question">
      <h2 className="statement">
        Q. Find the distance between following points on the cartesian plane
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
        <label className="math" htmlFor="a">
          <Latex>{"$,\\ $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={Y1}
          onChange={updateY1}
        />
        <label className="math" htmlFor="b">
          <Latex>{"$)$"}</Latex>
        </label>
        <div style={{ height: "0rem", width: "100%" }} />
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
