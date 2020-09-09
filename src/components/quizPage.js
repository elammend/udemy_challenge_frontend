import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { QuizStoreContext } from "../stores/QuizStore";
import { useObserver } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";
import "./cssModules.css";

const Quiz = props => {
  let initialIndex = 0;
  if (props.location.linkProps) {
    initialIndex = props.location.linkProps.index;
  }
  const store = React.useContext(QuizStoreContext);
  const [questionIndex, setIndex] = React.useState(initialIndex);

  const [optionCss, setCss] = React.useState({});

  const highlightAnswer = (questionIndex, letterResponse) => {
    optionCss[questionIndex] = {};
    optionCss[questionIndex][letterResponse] = "#46CB18";
    setCss({ ...optionCss });
  };

  useEffect(() => {
    store.responses.map((letter, index) => highlightAnswer(index, letter));
    // eslint-disable-next-line
  }, []);

  const QuestionView = () => {
    const addResponse = (index, letterResponse) => {
      store.saveQuestionResponse(index, letterResponse);
    };

    const renderQuestions = questionIndex => {
      const currentOptions = store.questions[questionIndex].options;
      const letterOptions = Object.keys(currentOptions);
      return letterOptions.map(letter => {
        return (
          <div
            onClick={() => {
              addResponse(questionIndex, letter);
              highlightAnswer(questionIndex, letter);
            }}
            style={{
              display: "inline-block",
              background: optionCss[questionIndex]
                ? optionCss[questionIndex][letter]
                : ""
            }}
            className="box clickable"
            key={letter}
          >
            {`${letter}) `}
            {currentOptions[letter]}
          </div>
        );
      });
    };

    return useObserver(() =>
      store.questions.length >= 1 ? (
        <div className="quizView">
          <div className="question">
            Question #{questionIndex + 1} of {store.questions.length}
          </div>
          <div className="question">
            {store.questions[questionIndex].question}
          </div>
          <div className="wrapper">{renderQuestions(questionIndex)}</div>
        </div>
      ) : (
        <div>loading...</div>
      )
    );
  };

  const BackButton = () => {
    return questionIndex > 0 ? (
      <button
        className="backButton "
        onClick={() => setIndex(questionIndex - 1)}
      >
        back
      </button>
    ) : null;
  };

  const NextButton = () => {
    return useObserver(() =>
      questionIndex < store.questions.length - 1 ? (
        <button
          className="nextButton "
          onClick={() => setIndex(questionIndex + 1)}
        >
          next
        </button>
      ) : null
    );
  };
  const ReviewButton = () => {
    return useObserver(() =>
      questionIndex < store.questions.length - 1 ? (
        <Link className="submitButton" to="/review">
          <button className="submitButton">review answers!</button>
        </Link>
      ) : null
    );
  };
  const FinalReviewButton = () => {
    return useObserver(() =>
      questionIndex === store.questions.length - 1 ? (
        <Link className="nextButton" to="/review">
          <button style={{ height: "100%", width: "100%" }}>review!</button>
        </Link>
      ) : null
    );
  };

  return (
    <div className="container">
      <Link to="/">
        <button className="homeButton ">
          <span>home</span>{" "}
        </button>
      </Link>
      <QuestionView />

      <Link to="/review"></Link>
      <FinalReviewButton />
      <NextButton />
      <BackButton />
      <ReviewButton />
    </div>
  );
};

export default Quiz;
