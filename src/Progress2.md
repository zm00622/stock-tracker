// In regards to updating the stock based off the user input, the following code does not work but I feel as though it gets me closer. I'm still trying figure out the appropriate lifecycle method and get my syntax right. componentDidUpdate does not seem to work and I am exploring other options.

import React from 'react';
import Plot from 'react-plotly.js';
// import Form from './ticker2.js';
// import Ticker from './ticker.js';

class Stock extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      StockSymbol: '',
      // InputBoxValue: '',
    }

  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {

  const pointerToThis = this;
  console.log(pointerToThis);
  const API_KEY = process.env.API_KEY;
  let StockSymbol = 'TSLA'; // This needs to have {} props syntax
  let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
  let stockChartXValuesFunction = [];
  let stockChartYValuesFunction = [];

  fetch(API_Call)
    .then(
      function(response) {
        return response.json();
      }
    )
    .then(
      function(data) {
        console.log(data);

        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
        }

        // console.log(stockChartXValuesFunction);
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction
        });
      } )
  }


  render() {

    function handleSubmit (e) {
         e.preventDefault()
         var StockSymbol = document.getElementById("InputBox").value;
         document.getElementById("DisplayText").innerHTML=StockSymbol;

       //  Add code for inproper input error here
       }

    return (
      <div>
        <h1>React Stock Market App</h1>
        <form onSubmit={this.handleSubmit}>
          <h1>Enter your Ticker</h1>
          <input id="InputBox" type="text"></input>
          <button>Submit</button>
          <h3 id="DisplayText"></h3>
        </form>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              // fill: 'tozeroy',
              mode: 'lines+markers',
              marker: {
                color: '#08cf98',
                symbol: "cross-thin"
              },
            }
          ]}
          layout={
            {
              width: 720,
              height: 440,
              title: '100 Day Chart for Ticker "TSLA"',
              paper_bgcolor: "#F2F2F2",
              plot_bgcolor: "#36474f",
              xaxis: {
                color: "#08cf98",
              },
              yaxis: {
                color: "#08cf98"
              },
              margin: {
                pad: 20,
              },
              font: {
                color: "#08cf98",
              },
            }
          }
        />
      </div>
    )
  }
}

export default Stock;
