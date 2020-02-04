The following code was an attempt at getting Stock.js to display the stock that the user inputs as the ticker. Unfortunately, this code did not work. I am still trying to figure out how to get the StockSymbol to equal the user input.


import React from 'react';
import Plot from 'react-plotly.js';



class Stock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
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
    let StockSymbol = document.getElementById("InputBox").value;
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
      // var InputBoxValue = document.getElementById("InputBox").value;
      // document.getElementById("DisplayText").innerHTML=InputBoxValue;
    //
    //   // Add code for inproper input error here
    }

    return (
      <div>
        <h1>React Stock Market App</h1>
        <form onSubmit={handleSubmit}>
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
