import COORDINATE_DISTANCE from "./Questions/coordinate_distance";
import COORDINATE_RATIO from "./Questions/coordinate_ratio";
import COORDINATE_SEGMENT from "./Questions/coordinate_segment";
import COORDINATE_TRIANGLE from "./Questions/coordinate_triangle";

export default function COORDINATE_GEOMETRY() {
  return (
    <section id="coordinate" className="grid gap-16">
      <COORDINATE_DISTANCE />
      <COORDINATE_SEGMENT />
      <COORDINATE_RATIO />
      <COORDINATE_TRIANGLE />
    </section>
  );
}
