import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import requestProductionsApi from "../services/api/productions";
import styled from "styled-components";
import Header from "../components/Header";
import Production from "../components/Production";
import Footer from "../components/Footer";

function Collection() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userProductions, setUserProductions] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    setLoading(true);
    const promise = requestProductionsApi.watchedList(token);
    promise.then((response) => {
      setUserProductions(response.data);
      setLoading(false);
    });
    promise.catch((err) => {
      alert("Houve um erro na requisição");
      setLoading(false);
      console.log(err);
    });
  }, [token, change]);

  return (
    <>
      <Header />
      <Body>
        {loading ? (
          <>
            <p>Carregando as produções...</p>
          </>
        ) : (
          <>
            <DisplayProd>
              {userProductions.length > 0 ? (
                userProductions.map((production) => {
                  return <Production data={production} change={change} setChange={setChange} />;
                })
              ) : (
                <>
                  <p>Não há produções assistidas</p>
                </>
              )}
            </DisplayProd>
          </>
        )}
      </Body>
      <Footer />
    </>
  );
}

export default Collection;

const DisplayProd = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
`;

const Body = styled.div`
  margin-top: 100px;
  margin-bottom: 80px;
`;
