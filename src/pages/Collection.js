import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

import useAuth from "../hooks/useAuth";
import requestProductionsApi from "../services/api/productions";
import requestWatchedApi from "../services/api/watched";
import styled from "styled-components";

function Collection() {
  const { token } = useAuth();
  const [userProductions, setUserProductions] = useState([]);
  const [toggleWatched, setToogleWatched] = useState(false);

  function handleWatched(id) {
    requestWatchedApi.toggleWatched(token, id);
    setToogleWatched(!toggleWatched);
  }

  useEffect(() => {
    const promise = requestProductionsApi.watchedList(token);
    promise.then((response) => {
      console.log(response);
      setUserProductions(response.data);
    });
  }, [token, toggleWatched]);

  return (
    <>
      {userProductions.length > 0 ? (
        userProductions.map((production) => {
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
    </>
  );
}

export default Collection;

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
