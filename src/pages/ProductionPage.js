import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import requestProductionsApi from "../services/api/productions";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";
import requestWatchedApi from "../services/api/watched";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import requestReviewApi from "../services/api/review";

function ProductionPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  const [createReviewStatus, setCreateReviewStatus] = useState(false);
  const [createReview, setCreateReview] = useState({ rating: "", ratingComment: "" });
  useEffect(() => {
    const response = requestProductionsApi.getProductionById(token, id);
    response.then((res) => {
      setData(res.data);
    });
  }, [change, token, id]);

  function handleWatched(id) {
    const request = requestWatchedApi.toggleWatched(token, id);
    request.then(() => {
      setChange(!change);
    });
  }
  function handleInputs(e, property) {
    setCreateReview({ ...createReview, [property]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCreateReviewStatus(true);
    const promise = requestReviewApi.insertReview(token, id, createReview);
    promise.then((response) => {
      setCreateReview({ rating: "", ratingComment: "" });
      setCreateReviewStatus(false);
      setChange(!change);
    });
    promise.catch((e) => {
      alert(e.response.data);
      console.log(e.response.data);
      setCreateReviewStatus(false);
    });
  }

  return (
    <>
      <Header />
      {data.length === 0 ? (
        <></>
      ) : (
        <Body>
          <h1>{data.name} </h1>
          <h2>{data.type}</h2>
          <div onClick={() => handleWatched(data.id)}>{data.watched ? <AiFillEye icon="fa-solid fa-eye" /> : <AiOutlineEyeInvisible />}</div>
          <img src={data.image_url} alt="" />
          <p>{data.release} </p>
          <p>{data.description}</p>
          <p>Assistido por {data._count.Watched} pessoas</p>
          <Reviews>
            <CreateReview>
              <form onSubmit={handleSubmit}>
                <h1>Poste sua Avaliação:</h1>
                <p>Nota: (1 a 5)</p>
                <input
                  type="number"
                  value={createReview.rating}
                  onChange={(e) => handleInputs(e, "rating")}
                  required
                  disabled={createReviewStatus}
                  min="1"
                  max="5"
                />
                <p>Comentário do Review:</p>
                <input
                  type="text"
                  value={createReview.ratingComment}
                  onChange={(e) => handleInputs(e, "ratingComment")}
                  placeholder="Opcional"
                  disabled={createReviewStatus}
                />
                <button disabled={createReviewStatus}>Postar Avaliação</button>
              </form>
            </CreateReview>
            {data.Review.length > 0 ? (
              <>
                {data.Review.map((review) => {
                  return (
                    <Review>
                      <DivFlex>
                        <img src={review.user.picture} alt="Profile"></img>
                        <h2>{review.user.username}</h2>
                      </DivFlex>
                      <p>Rating: {review.rating}</p>
                      <p>{review.ratingComment}</p>
                    </Review>
                  );
                })}
              </>
            ) : (
              <P>Não há reviews para essa produção. Seja o primeiro :)</P>
            )}
          </Reviews>
        </Body>
      )}
      <Footer />
    </>
  );
}

export default ProductionPage;

const Body = styled.div`
  margin-bottom: 80px;
  margin-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 200px;
    height: 300px;
  }
`;

const Reviews = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const Review = styled.div`
  background-color: slategray;
  border-radius: 5px;
  width: 80vw;
  margin-bottom: 15px;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  p {
    margin-bottom: 5px;
  }
`;

const P = styled.p`
  text-align: center;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  margin-left: 50px;
`;

const CreateReview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  form * {
    margin-bottom: 10px;
  }

  h1 {
    font-size: 20px;
  }

  button {
    background-color: gray;
    border-radius: 6px;
  }
`;

const DivFlex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
