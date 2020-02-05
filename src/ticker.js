import React from 'react';

class Ticker extends React.Component {

function (props) {

  function handleSubmit (e) {
    e.preventDefault()
    let InputBoxValue = document.getElementById("InputBox").value;
    document.getElementById("DisplayText").innerHTML=InputBoxValue;

  // Add code for inproper input error here
  }

  return (
    <div>
      <h1>React Stock Market App</h1>
      <form onSubmit={props.handleSubmit}>
        <h1>Enter your Ticker</h1>
        <input id="InputBox" type="text"></input>
        <button>Submit</button>
        <h3 id="DisplayText"></h3>
      </form>
    </div>
  )
}
}

export default Ticker;
