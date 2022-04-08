import CarForm from "../components/CarFrom";
import LogoContainer from "../components/LogoContainer";

function Homepage() {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
      }}
    >
      <LogoContainer />
      <CarForm />
    </div>
  );
}

export default Homepage;
