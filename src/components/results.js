import React, { useEffect, useState } from "react";
import { sendBackendAnswers } from "../api";
import { QuizStoreContext } from "../stores/QuizStore";
import { Link } from "react-router-dom";
const Results = () => {
  const store = React.useContext(QuizStoreContext);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await sendBackendAnswers(store.quizName, store.responses);
      setScore(res.data.data.score);
    };
    fetchResults();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div
        className="landingButton"
        style={{ fontSize: "130%", bottom: "50px" }}
      >
        You achieved {score != null ? score * 100 : "loading..."}% ! <br></br>
        {score * 100 < 100
          ? "if you want a higher score, study harder and come back"
          : "Great job!"}
      </div>
      <br></br>
      <Link
        onClick={() => {
          store.initializeResponses();
        }}
        className="landingButton"
        to="/"
      >
        <button style={{ fontSize: "150%" }}> reset quiz </button>
      </Link>
    </div>
  );
};

export default Results;
