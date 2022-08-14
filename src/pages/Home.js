import { useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import requestProductionsApi from "../services/api/productions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Production from "../components/Production";

function Home() {
  const { token } = useAuth();
  const [productions, setProductions] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    const promise = requestProductionsApi.list(token);
    promise.then((response) => {
      setProductions(response.data);
    });
  }, [token, change]);
  console.log(productions);
  return (
    <>
      <Header />
      <DisplayProd>
        {productions.map((prod) => {
          return <Production data={prod} change={change} setChange={setChange} />;
        })}
      </DisplayProd>
      <Footer />
    </>
  );
}

export default Home;

const DisplayProd = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  margin-top: 100px;
  margin-right: 50px;
  margin-bottom: 80px;
`;
