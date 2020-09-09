import React from "react";
import { Link, useHistory } from "react-router-dom";
import { QuizStoreContext } from "../stores/QuizStore";
import "mobx-react-lite/batchingForReactDom";

const Review = () => {
  const store = React.useContext(QuizStoreContext);
  const history = useHistory();

  const goToQuestion = index => {
    history.push({
      pathname: "/quiz",
      linkProps: { index: index }
    });
  };
  const questionAnswer = index => {
    const letterAnswer = store.responses[index];
    const wordAnswer = store.questions[index].options[letterAnswer];
    return letterAnswer ? `${letterAnswer}) ${wordAnswer}` : "empty";
  };

  const renderTableEntries = () => {
    return store.questions.map((qObject, index) => (
      <tr
        key={index}
        className="clickable questionLink"
        onClick={() => {
          goToQuestion(index);
        }}
      >
        <td>
          {index + 1}) {qObject.question}
        </td>
        <td>{questionAnswer(index)}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <span
        className="quizView "
        style={{ fontSize: "large", textAlign: "center" }}
      >
        click on a question to revise
      </span>
      <table className="quizView">
        <tbody>
          <tr>
            <th>Question</th>
            <th>Answer</th>
          </tr>
          {renderTableEntries()}
        </tbody>
      </table>
      <Link to="/">
        <button className="homeButton">home</button>
      </Link>
      {/* <Link to="/quiz">
        <button>go to quiz and revise</button>
      </Link> */}
      <Link className="submitButton" to="/results">
        <button className="submitButton">submit!</button>
      </Link>
    </div>
  );
};

export default Review;
