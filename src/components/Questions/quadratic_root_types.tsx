import { useCallback, useState, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import { Solution1Object, error1 } from "../../utils";

export default function ROOT_TYPE() {
  const [a, setAValue] = useState<number>();
  const [b, setBValue] = useState<number>();
  const [c, setCValue] = useState<number>();

  const [Solution, solved] = useState<Solution1Object>();

  const errorElement = useMemo(
    () => (
      <div className="error">
        <h2>You're worse than my math teacher . . .</h2>
      </div>
    ),
    []
  );

  const solve = useCallback(async () => {
    if ((!a && a !== 0) || (!b && b !== 0) || (!c && c !== 0)) return;

    const D = b * b - 4 * a * c;
    const answer =
      D < 0
        ? `$$The\\ equation\\ has\\ no\\ real\\ roots\\ (\\because\\ D < 0)$$`
        : D === 0
        ? `$$The\\ equation\\ has\\ identical\\ real\\ roots\\ (\\because\\ D = 0)$$`
        : `$$The\\ equation\\ has\\ 2\\ distinct\\ real\\ roots\\ (\\because\\ D > 0)$$`;

    return solved({
      isSolved: true,
      solutionElement:
        // prettier-ignore
        <div className="card">
          <h2>Solution</h2>
          <p>
            <Latex>{`$Discriminant\\ (D) = b^{2}-4ac$`}</Latex>
            <br /><br />
            <Latex>{`$In\\ the\\ given\\ equation,\\ a = ${a},\\ b = ${b},\\ c = ${c}$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore\\ D = ${b}^{2}-4(${a})(${c})$`}</Latex>
            <br /><br />
            <Latex>{`$\\therefore\\ D = ${D}$`}</Latex>
            <Latex>{answer}</Latex>
          </p>
        </div>,
    });
  }, [a, b, c, solved]);

  const updateA = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("quadratic_root_types", solved, errorElement);
      setAValue(parseInt(e.target.value));
    },
    [solved, setAValue, errorElement]
  );

  const updateB = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("quadratic_root_types", solved, errorElement);
      setBValue(parseInt(e.target.value));
    },
    [solved, setBValue, errorElement]
  );

  const updateC = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 1000 || parseInt(e.target.value) <= -1000)
        return error1("quadratic_root_types", solved, errorElement);
      setCValue(parseInt(e.target.value));
    },
    [solved, setCValue, errorElement]
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
    <article id="quadratic_root_types" className="question">
      <h2 className="statement">
        Q. Identify the nature of roots of the following Quadratic Equation
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
