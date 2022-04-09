import CarForm from "../components/CarFrom";
import LogoContainer from "../components/LogoContainer";
import { useEffect, useState } from "react";
import ResultContainer from "../components/ResultContainer";
import UserServices from "../services/UserServices";
import Address from "../Address";

function Homepage() {
  const [carResult, setCarResult] = useState({
    score: null,
    best_cards: [],
  });
  const [userData, setUserData] = useState({
    days: "",
    km: "",
    price: "",
    photovoltaics: "",
    userAddress: new Address("", "", "", ""),
    maxDistance: "",
    body: "",
    brands: [],
    destAddress: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    UserServices.postCarForm(userData)
      .then((res) => res.json())
      .then((res) => setCarResult(res));
    console.log(userData);
    event.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
      }}
    >
      <LogoContainer />
      <CarForm
        userData={userData}
        setUserData={setUserData}
        handleSubmit={handleSubmit}
      />
      {carResult.score && <ResultContainer {...carResult} />}
    </div>
  );
}

export default Homepage;
