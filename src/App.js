import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Landing from "./components/landing";
import Quiz from "./components/quizPage";
import Review from "./components/review";
import Results from "./components/results";
import { QuizStoreContext } from "./stores/QuizStore";
import { getBackendQuestions } from "./api";

const App = () => {
  const store = React.useContext(QuizStoreContext);
  const history = useHistory();
  const quizName = "default2"; // there is another one called default; try replacing value with "default"
  useEffect(() => {
    store.setQuestionsFromAPI(getBackendQuestions(quizName));
    store.quizName = quizName;
    window.onbeforeunload = function () {
      return "Are you sure to leave this page?";
    };

    //if reloaded, send user back to landing page
    if (window.performance) {
      if (performance.navigation.type === 1) {
        history.push("/");
      }
    }
  });

  return (
    <React.Fragment>
      <Route path="/" exact component={Landing} />
      <Route path="/quiz" exact component={Quiz} />
      <Route path="/review" exact component={Review} />
      <Route path="/results" exact component={Results} />
    </React.Fragment>
  );
};

export default App;
