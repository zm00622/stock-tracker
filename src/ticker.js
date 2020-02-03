import ReactDOM from 'react-dom';
import React from 'react';

class TickerSubmit extends React.Component {

function ticker() {

  const handleSubmit = (e) => {
    e.preventDefault();
    var InputBoxValue = document.getElementById("InputBox").value;
    document.getElementById("users-ticker").innerHTML=InputBoxValue;
    // code for error
  };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Enter your name and see it displayed below!</h1>
          <input id="InputBox" type="text"></input>
          <button>Submit</button>
          <h3 id="users-ticker"></h3>
        </form>
      </div>
    );
  }
}

export default TickerSubmit;
