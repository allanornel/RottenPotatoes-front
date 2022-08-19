import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import requestWatchedApi from "../services/api/watched";

function Production({ data, change, setChange }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  function handleWatched(id) {
    const request = requestWatchedApi.toggleWatched(token, id);
    request.then(() => {
      setChange(!change);
    });
  }

  function redirectProdPage(id) {
    navigate(`/production/${id}`);
  }

  return (
    <Container>
      <h1 onClick={() => redirectProdPage(data.id)}>{data.name} </h1>
      <p>{data.type}</p>
      <div onClick={() => handleWatched(data.id)}>{data.watched ? <AiFillEye icon="fa-solid fa-eye" /> : <AiOutlineEyeInvisible />}</div>
      <img src={data.image_url} alt="" onClick={() => redirectProdPage(data.id)} />
      <p>{data.release} </p>
    </Container>
  );
}

export default Production;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: gray;
  border-radius: 5px;
  padding: 20px;
  margin-right: 40px;
  margin-top: 20px;
  position: relative;
  width: 220px;

  h1 {
    font-weight: 700;
  }
  img {
    height: 200px;
    width: 150px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  div {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 52px;
    margin-right: 35px;
  }
`;
