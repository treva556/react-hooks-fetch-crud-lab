import React from "react";

function QuestionItem({ question, onDeleteQuestion, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"DELETE",
    })
    .then(res=>res.json())
    .then(()=>
      onDeleteQuestion(question)
      // console.log('Deleted!')
    )    
  }

  function handleUpdateAnswer(e){
    console.log(e.target.value);
    console.log(question);
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "correctIndex": e.target.value
      })
    })
    .then(res=>res.json())
    .then(updatedAnswer => 
      // console.log(updatedAnswer)
      onChangeAnswer(updatedAnswer)
    )
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onClick={handleUpdateAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;