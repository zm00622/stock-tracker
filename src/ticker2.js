import React from 'react';
// import Stock from './Stock.js';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state        = { ticker2: '' } ;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ ticker2: event.currentTarget.value });
  }

  render() {
    return (
      <div>
        <h1>Enter your Ticker</h1>
        <input type="text" onChange={ this.handleChange } />
      </div>
    );
  }
}



//
// import React from 'react';
// import Person from './Person';
//
// export default class Form extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state        = { name: '' } ;
//     this.handleChange = this.handleChange.bind(this);
//   }
//
//   handleChange(event) {
//     this.setState({ name: event.currentTarget.value });
//   }
//
//   render() {
//     return (
//       <div>
//         <input type="text" onChange={ this.handleChange } />
//         <Person name={ this.state.name } />
//       </div>
//     );
//   }
// }





// <form onSubmit={handleSubmit}>
//   <h1>Enter your Ticker</h1>
//   <input id="InputBox" type="text"></input>
//   <button>Submit</button>
//   <h3 id="DisplayText"></h3>
// </form>
