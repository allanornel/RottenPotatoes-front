import { useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import requestProductionsApi from "../services/api/productions";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import requestWatchedApi from "../services/api/watched";

function Home() {
  const { token } = useAuth();
  const [productions, setProductions] = useState([]);
  const [toggleWatched, setToogleWatched] = useState(false);
  useEffect(() => {
    const promise = requestProductionsApi.list(token);
    promise.then((response) => {
      setProductions(response.data);
    });
  }, [token, toggleWatched]);

  function handleWatched(id) {
    requestWatchedApi.toggleWatched(token, id);
    setToogleWatched(!toggleWatched);
  }

  return (
    <>
      <DisplayProd>
        {productions.length > 0 ? (
          productions.map((production) => {
            return (
              <Prod>
                <h1>{production.name} </h1>
                <p>{production.type}</p>
                <div onClick={() => handleWatched(production.id)}>
                  {production.watched ? <AiFillEye icon="fa-solid fa-eye" /> : <AiOutlineEyeInvisible />}
                </div>
                <img src={production.image_url} alt="" />
                <p>{production.release} </p>
                <p> {production.description} </p>
              </Prod>
            );
          })
        ) : (
          <>
            <p>Loading Productions...</p>
          </>
        )}
      </DisplayProd>
    </>
  );
}

const DisplayProd = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 50px;
  margin-top: 100px;
  margin-right: 50px;
`;

const Prod = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: pink;
  margin-right: 40px;
  margin-top: 20px;
  position: relative;

  h1 {
    font-weight: 700;
  }
  img {
    height: 200px;
    width: 150px;
    margin-top: 10px;
  }

  div {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 25px;
    margin-right: 5px;
  }
`;

export default Home;
