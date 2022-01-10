import EUCLID_DIVISION_ALGORITHM from "./Questions/euclid_division_algorithm";
import LCM_AND_HCF from "./Questions/lcm_hcf";
// import PROOF_OF_IRRATIONALITY from "./Questions/prove_irrationality";

export default function REAL_NUMBERS() {
  return (
    <section id="real_numbers" className="grid gap-16">
      <EUCLID_DIVISION_ALGORITHM />
      <LCM_AND_HCF />
      {/* <PROOF_OF_IRRATIONALITY /> */}
    </section>
  );
}
