import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(res=>res.json())
    .then(queries=>{
      console.log(queries);
      setQuestions(queries)})
  },[])

  function handleDelete(query){
    console.log(query);
    let questionsLeft = questions.filter(question=>question.id !== query.id);
    setQuestions(questionsLeft)
  }

  function handleNewAnswer(newAnswer){
    console.log(newAnswer);
    console.log('hey');
    const newRes = questions.map(question=>{
      if(newAnswer.id === question.id){
        return newAnswer
      }else {
        return question
      }
    })
    console.log(newRes);
    setQuestions(newRes)
  }
  // console.log('hey');

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question=><QuestionItem 
        question={question} key={question.id} 
        onDeleteQuestion={handleDelete} 
        onChangeAnswer = {handleNewAnswer}/>)}
      </ul>
    </section>
  );
}

export default QuestionList;