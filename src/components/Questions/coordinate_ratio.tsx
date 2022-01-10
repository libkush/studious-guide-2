import { useState, useCallback, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import { Solution2Object, numFormat, error2 } from "../../utils";
import Fraction from "fraction.js";

export default function COORDINATE_RATIO() {
  const [X1, setX1] = useState<number>();
  const [X2, setX2] = useState<number>();
  const [Y1, setY1] = useState<number>();
  const [Y2, setY2] = useState<number>();
  const [X3, setX3] = useState<number>();
  const [Y3, setY3] = useState<number>();

  const [Solution, solved] = useState<Solution2Object>();

  const error1Element = useMemo(
    () => (
      <div className="error">
        <h2>Oops! My ruler isn't so long</h2>
      </div>
    ),
    []
  );

  const error2Element = useMemo(
    () => (
      <div className="error">
        <h2>The points are not colinear</h2>
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

    if ((1 / 2) * (X1 * (Y2 - Y3) + X2 * (Y3 - Y1) + X3 * (Y1 - Y2)) !== 0) {
      return error2("coordinate-ratio", solved, error2Element);
    }

    // prettier-ignore
    const xElement = (X2 > X3)
      ? (
          <p>
            <Latex>{`$Let\\ the\\ ratio\\ be\\ k:1$`}</Latex>
            <br /><br />
            <Latex>{`$x = \\frac{mx_{2}+nx_{1}}{m+n}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore ${X3} = \\frac{${X2}k${numFormat(X1)}}{k+1}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore ${X3}k${numFormat(X3)} = ${X2}k${numFormat(X1)}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore ${-X1}${numFormat(X3)} = ${X2}k${numFormat(-X3)}k$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore ${X3 - X1} = ${X2 - X3}k$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore \\frac{${X3 - X1}}{${X2 - X3}} = k$`}</Latex>
            <br /><br />
            <Latex>{`$The\\ ratio\\ is\\ ${new Fraction((X3 - X1) / (X2 - X3)).n}:${new Fraction((-X1 + X3) / (X2 - X3)).d}$`}</Latex>
          </p>
        )
      : (
          <p>
            <Latex>{`$Let\\ the\\ ratio\\ be\\ k:1$`}</Latex>
            <br /><br />
            <Latex>{`$x = \\frac{mx_{2}+nx_{1}}{m+n}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore ${X3} = \\frac{${X2}k${numFormat(X1)}}{k+1}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore ${X3}k${numFormat(X3)} = ${X2}k${numFormat(X1)}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore ${X3}k${numFormat(-X2)}k = ${-X3}${numFormat(X1)}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore ${X3 - X2}k = ${(X1 - X3)}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore k = \\frac{${X1 - X3}}{${X3 - X2}}$`}</Latex>
            <br /><br />
            <Latex>{`$The\\ ratio\\ is\\ ${new Fraction((X1 - X3)/(X3 - X2)).n}:${new Fraction((X1 - X3)/(X3 - X2)).d}$`}</Latex>
          </p>      
        );

    // prettier-ignore
    const yElement = (Y2 > Y3)
      ? (
        <p>
          <Latex>{`$Let\\ the\\ ratio\\ be\\ k:1$`}</Latex>
          <br /><br />
          <Latex>{`$y = \\frac{my_{2}+ny_{1}}{m+n}$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore ${Y3} = \\frac{${Y2}k${numFormat(Y1)}}{k+1}$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore ${Y3}k${numFormat(Y3)} = ${Y2}k${numFormat(Y1)}$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore ${-Y1}${numFormat(Y3)} = ${Y2}k${numFormat(-Y3)}k$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore ${Y3 - Y1} = ${Y2 - Y3}k$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore \\frac{${Y3 - Y1}}{${Y2 - Y3}} = k$`}</Latex>
          <br /><br />
          <Latex>{`$The\\ ratio\\ is\\ ${new Fraction((Y3 - Y1) / (Y2 - Y3)).n}:${new Fraction((-Y1 + Y3) / (Y2 - Y3)).d}$`}</Latex>
        </p>
      )
      : (
        <p>
          <Latex>{`$Let\\ the\\ ratio\\ be\\ k:1$`}</Latex>
          <br /><br />
          <Latex>{`$y = \\frac{my_{2}+ny_{1}}{m+n}$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore ${Y3} = \\frac{${Y2}k${numFormat(Y1)}}{k+1}$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore ${Y3}k${numFormat(Y3)} = ${Y2}k${numFormat(Y1)}$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore ${Y3}k${numFormat(-Y2)}k = ${-Y3}${numFormat(Y1)}$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore ${Y3 - Y2}k = ${(Y1 - Y3)}$`}</Latex>
          <br /><br />
          <Latex>{`$\\therefore k = \\frac{${Y1 - Y3}}{${Y3 - Y2}}$`}</Latex>
          <br /><br />
          <Latex>{`$The\\ ratio\\ is\\ ${new Fraction((Y1 - Y3) / (Y3 - Y2)).n}:${new Fraction((Y1 - Y3) / (Y3 - Y2)).d}$`}</Latex>
        </p>
      );

    return solved({
      isSolved: true,
      solution1Element:
        // prettier-ignore
        <div className="card">
          <h2>Using Abscissa</h2>
          {xElement}
        </div>,
      solution2Element:
        // prettier-ignore
        <div className="card">
          <h2>Using Ordinate</h2>
          {yElement}
        </div>,
    });
  }, [X1, X2, Y1, Y2, X3, Y3, error2Element, solved]);

  const updateX1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error2("coordinate-ratio", solved, error1Element);
      setX1(parseInt(e.target.value));
    },
    [setX1, solved, error1Element]
  );

  const updateX2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error2("coordinate-ratio", solved, error1Element);
      setX2(parseInt(e.target.value));
    },
    [setX2, solved, error1Element]
  );

  const updateY1 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error2("coordinate-ratio", solved, error1Element);
      setY1(parseInt(e.target.value));
    },
    [setY1, solved, error1Element]
  );

  const updateY2 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error2("coordinate-ratio", solved, error1Element);
      setY2(parseInt(e.target.value));
    },
    [setY2, solved, error1Element]
  );

  const updateX3 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error2("coordinate-ratio", solved, error1Element);
      setX3(parseInt(e.target.value));
    },
    [setX3, solved, error1Element]
  );
  const updateY3 = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100 || parseInt(e.target.value) <= -100)
        return error2("coordinate-ratio", solved, error1Element);
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
    <article id="coordinate-ratio" className="question">
      <h2 className="statement">
        Q. Find the ratio in which the line joining the following points are
        divided by
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
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
        <label className="math">
          <Latex>{"$,\\ $"}</Latex>
        </label>
        <input
          className="small_box"
          type="number"
          size={1}
          value={Y3}
          onChange={updateY3}
        />
        <label className="math">
          <Latex>{"$)\\ $"}</Latex>
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
      <div className="solution">
        {Solution?.solution1Element}
        {Solution?.solution2Element}
      </div>
      {Solution?.isSolved ? <button onClick={closeBtn}>Close</button> : null}
    </article>
  );
}
