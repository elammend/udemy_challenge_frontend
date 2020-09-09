import axios from "axios";

export const getBackendQuestions = quizName => {
  return axios.get(
    `https://morning-springs-56307.herokuapp.com/quizes?name=${quizName}`
  );
};

export const sendBackendAnswers = (quizName, answerList) => {
  return axios.post(
    `https://morning-springs-56307.herokuapp.com/quizes?name=${quizName}`,
    {
      answers: answerList
    }
  );
};
