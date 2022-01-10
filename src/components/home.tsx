import "../App.css";

const Home = () => {
  return (
    <section id="home">
      <h1>Hi, Let's get started</h1>
      <br />
      <br />
      <nav className="home-nav">
        <a className="button" href="#real_numbers">
          Real Numbers
        </a>
        <a className="button" href="#polynomials">
          Polynomials
        </a>
        <a className="button" href="#linear_equations">
          Linear Equations
        </a>
        <a className="button" href="#quadratic_equations">
          Quadratic Equations
        </a>
        <a className="button" href="#ap">
          Arithmetic Progression
        </a>
        <a className="button" href="#coordinate">
          Coordinate Geometry
        </a>
      </nav>
      <p>
        This app is made to help you solve boring mathematics questions. To get
        started, just go to the required sections and find your desired question
        template. Put the values in place of blank inputs to solve the questions
        with complete solutions. You can use this website as a PWA (install it
        as an app) and use it offline too.
      </p>
      <p>
        <b>Note:</b> Automated solutions may not simplify some fractional
        answers or parenthesis, you are required to do it yourself. Utmost care
        has been taken while programming questions, however if any bugs cause
        the solution to be wrong, please report it to me.
      </p>
      <br />
    </section>
  );
};

export default Home;
