import React from "react";
import { useLocalStore } from "mobx-react";

export const QuizStoreContext = React.createContext();

const QuizStoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    quizName: "",
    questions: [],
    responses: [],
    setQuestions: list => {
      store.questions = list.slice();
      store.responses = new Array(list.length);
    },
    initializeResponses: list => {
      store.responses = new Array(store.questions.length);
    },
    saveQuestionResponse: (questionIndex, answer) => {
      store.responses[questionIndex] = answer;
    },
    setQuestionsFromAPI: async apiFuncCall => {
      try {
        const list = await apiFuncCall;
        store.setQuestions(list.data.data.questions);
        store.initializeResponses();
      } catch (error) {
        console.error(error);
      }
    },
    get responseObject() {
      return store.responses;
    }
  }));

  return (
    <QuizStoreContext.Provider value={store}>
      {children}
    </QuizStoreContext.Provider>
  );
};

export default QuizStoreProvider;
