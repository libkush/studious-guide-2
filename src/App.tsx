import "./App.css";
import "katex/dist/katex.min.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Search from "./components/Search";
import REAL_NUMBERS from "./components/real_numbers";
import POLYNOMIALS from "./components/polynomials";
import QUADRATIC_EQUATIONS from "./components/quadratic_equations";
import LINEAR_EQATIONS from "./components/linear_equations";
import COORDINATE_GEOMETRY from "./components/coordinate";
import { setColorTheme } from "./utils";

const present = localStorage.getItem("theme") ?? "dark";
document.documentElement.setAttribute("class", present);

const colorPreset = localStorage.getItem("color-scheme") ?? "orange";
setColorTheme(colorPreset);

function App() {
  return (
    <div>
      <Search />
      <Navbar />
      <div className="spacer" />
      <main>
        <Home />
        <REAL_NUMBERS />
        <POLYNOMIALS />
        <LINEAR_EQATIONS />
        <QUADRATIC_EQUATIONS />
        <COORDINATE_GEOMETRY />
        <About />
      </main>
    </div>
  );
}

export default App;
