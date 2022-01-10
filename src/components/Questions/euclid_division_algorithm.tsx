import { useCallback, useState, useEffect, useMemo } from "react";
import { smallKidsDivide } from "../../utils";
import Latex from "react-latex-next";
import { Solution1Object, error1 } from "../../utils";

export default function EUCLID_DIVISION_ALGORITHM() {
  const [Solution, solved] = useState<Solution1Object>();
  const [a, setAValue] = useState<number>();
  const [b, setBValue] = useState<number>();

  const errorElement = useMemo(
    () => (
      <div className="error">
        <h2>I ran out of ink ¯\_(ツ)_/¯</h2>
      </div>
    ),
    []
  );

  const solve = useCallback(async () => {
    if (!a || !b) return;
    let steps: string[] = [];

    function hcf(a: number, b: number, output = false): number | string {
      if (a === 0) return b;

      // prettier-ignore
      if (output) {
       steps.push(`
           ${Math.max(a, b)} = ${Math.min(a, b)}\\times 
           ${smallKidsDivide(a, b)} + ${Math.max(a, b) % Math.min(a, b)}\n
         `
       );
          hcf(Math.max(a, b) % Math.min(a, b), Math.min(a, b), true);
     }
      return hcf(Math.max(a, b) % Math.min(a, b), Math.min(a, b));
    }

    hcf(a, b, true);

    return solved({
      isSolved: true,
      solutionElement: (
        <div>
          <div className="card">
            <h2>Solution</h2>
            <h3>
              <Latex>{"$Using\\ Euclid's\\ Division\\ Algorithm$"}</Latex>
            </h3>
            <p>
              {steps &&
                steps.map((step, i) => (
                  <span key={i}>
                    <Latex>{`$${step}$`}</Latex>
                    <br />
                  </span>
                ))}
              <br />
              <Latex>{`$\\therefore\\ HCF = ${hcf(a, b, false)}$`}</Latex>
            </p>
          </div>
        </div>
      ),
    });
  }, [a, b, solved]);

  const updateA = useCallback(
    (e: any) => {
      if (
        parseInt(e.target.value) >= 1000000000 ||
        parseInt(e.target.value) < 0
      )
        return error1("division", solved, errorElement);
      setAValue(parseInt(e.target.value));
    },
    [solved, setAValue, errorElement]
  );

  const updateB = useCallback(
    (e: any) => {
      if (
        parseInt(e.target.value) >= 1000000000 ||
        parseInt(e.target.value) < 0
      )
        return error1("division", solved, errorElement);
      setBValue(parseInt(e.target.value));
    },
    [solved, setBValue, errorElement]
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
    <article id="division" className="question">
      <h2 className="statement">
        Q. Find the HCF of the following numbers using Euclid's Division
        Algorithm
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="number"
          size={1}
          maxLength={5}
          value={a}
          min="1"
          onChange={updateA}
        />
        <label className="dark:text-white" htmlFor="a">
          <Latex>{"$,\\ $"}</Latex>
        </label>
        <input
          type="number"
          size={1}
          maxLength={5}
          value={b}
          min="1"
          onChange={updateB}
        />
        <label className="dark:text-white" htmlFor="b">
          <Latex>{"$\\ $"}</Latex>
        </label>
        <button type="submit">Solve</button>
      </form>
      <div className="solution">{Solution?.solutionElement}</div>
      {Solution?.isSolved ? <button onClick={closeBtn}>Close</button> : null}
    </article>
  );
}
