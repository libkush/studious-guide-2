import { useCallback, useState, useEffect, useMemo } from "react";
import { primeFactors, removeDuplicates } from "../../utils";
import Latex from "react-latex-next";
import { Solution2Object, error2 } from "../../utils";

export default function LCM_AND_HCF() {
  const [a, setAValue] = useState<number>();
  const [b, setBValue] = useState<number>();
  const [Solution, solved] = useState<Solution2Object>();

  interface factorization {
    number: number;
    exponent: number;
  }

  const errorElement = useMemo(
    () => (
      <div className="error">
        <h2>Whoa! I don't have enough time for factorizing that</h2>
      </div>
    ),
    []
  );

  const solve = useCallback(async () => {
    if (!a || !b) return;

    function HCFnotation(
      x: factorization[],
      y: factorization[]
    ): factorization[] {
      function findCommonPrimes(a: number[], b: number[]) {
        var ai = 0,
          bi = 0;
        var result = [];

        while (ai < a.length && bi < b.length) {
          if (a[ai] < b[bi]) {
            ai++;
          } else if (a[ai] > b[bi]) {
            bi++;
          } else {
            result.push(a[ai]);
            ai++;
            bi++;
          }
        }
        return result[0] ? result : [1];
      }

      const xFactors = x.map((factor) => factor.number);
      const yFactors = y.map((factor) => factor.number);

      const commonPrimes = findCommonPrimes(xFactors, yFactors);

      const commonFactors: factorization[] = [];
      commonPrimes.forEach((prime) => {
        const xi = xFactors.indexOf(prime);
        const yi = yFactors.indexOf(prime);
        commonFactors.push({
          number: prime,
          exponent: Math.min(x[xi]?.exponent ?? 1, y[yi]?.exponent ?? 1),
        });
      });
      return commonFactors;
    }

    function LCMnotation(
      x: factorization[],
      y: factorization[]
    ): factorization[] {
      const xFactors = x.map((factor) => factor.number);
      const yFactors = y.map((factor) => factor.number);

      const allPrimes = removeDuplicates(xFactors.concat(yFactors));

      const allFactors: factorization[] = [];
      allPrimes.forEach((prime) => {
        const xi = xFactors.indexOf(prime);
        const yi = yFactors.indexOf(prime);

        allFactors.push({
          number: prime,
          exponent: Math.max(x[xi]?.exponent ?? 1, y[yi]?.exponent ?? 1),
        });
      });

      return allFactors;
    }

    const aFactorization = primeFactors(a);
    const bFactorization = primeFactors(b);
    const HCF = HCFnotation(aFactorization, bFactorization);
    const LCM = LCMnotation(aFactorization, bFactorization);

    let HCFvalue = 1;
    let LCMvalue = 1;
    HCF.forEach((factor) => {
      HCFvalue = HCFvalue * factor.number ** factor.exponent;
    });
    LCM.forEach((factor) => {
      LCMvalue = LCMvalue * factor.number ** factor.exponent;
    });

    const aFactorizedString = aFactorization
      .map((factor) => `${factor.number}^{${factor.exponent}}`)
      .join(`\\times`);
    const bFactorizedString = bFactorization
      .map((factor) => `${factor.number}^{${factor.exponent}}`)
      .join(`\\times`);
    const HCFstring = HCF.map(
      (factor) => `${factor.number}^{${factor.exponent}}`
    ).join(`\\times`);
    const LCMstring = LCM.map(
      (factor) => `${factor.number}^{${factor.exponent}}`
    ).join(`\\times`);

    const FactorizedElement = () => {
      return (
        <span className="dark:text-white">
          <Latex>{`$${a.toString()} = ` + aFactorizedString + `$`}</Latex>
          <br />
          <Latex>{`$${b.toString()} = ` + bFactorizedString + `$`}</Latex>
        </span>
      );
    };
    const HCFelement = () => {
      return (
        <span className="dark:text-white">
          <Latex>{`$\\therefore HCF = ` + HCFstring + `$`}</Latex>
        </span>
      );
    };
    const LCMelement = () => {
      return (
        <span className="dark:text-white">
          <Latex>{`$\\therefore LCM = ` + LCMstring + `$`}</Latex>
        </span>
      );
    };

    solved({
      isSolved: true,
      solution1Element: (
        <div className="card">
          <h2>Finding LCM</h2>
          <p>
            <FactorizedElement />
            <br />
            <br />
            <LCMelement />
            <br />
            <Latex>{`$\\therefore LCM = ${LCMvalue}$`}</Latex>
          </p>
        </div>
      ),
      solution2Element: (
        <div className="card">
          <h2>Finding HCF</h2>
          <p>
            <FactorizedElement />
            <br />
            <br />
            <HCFelement />
            <br />
            <Latex>{`$\\therefore HCF = ${HCFvalue}$`}</Latex>
          </p>
        </div>
      ),
    });
  }, [a, b, solved]);

  const updateA = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100000 || parseInt(e.target.value) < 0)
        return error2("lcm-hcf", solved, errorElement);
      setAValue(parseInt(e.target.value));
    },
    [setAValue, solved, errorElement]
  );

  const updateB = useCallback(
    (e: any) => {
      if (parseInt(e.target.value) >= 100000 || parseInt(e.target.value) < 0)
        return error2("lcm-hcf", solved, errorElement);
      setBValue(parseInt(e.target.value));
    },
    [setBValue, solved, errorElement]
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
    <article id="lcm-hcf" className="question">
      <h2 className="statement">
        Q. Find the LCM & HCF of the following numbers using Prime Factorization
        Method
      </h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="number"
          size={1}
          maxLength={5}
          min="1"
          value={a}
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
          {" "}
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
