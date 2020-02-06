import React from 'react';
import Plot from 'react-plotly.js';
// import Ticker from './ticker.js';

class Stock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    }
  }

 fetchStock() {

     const pointerToThis = this;
     console.log(pointerToThis);
     const API_KEY = process.env.API_KEY;
     let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${document.getElementById("ticker").value}&outputsize=compact&apikey=${API_KEY}`;
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

     return (
       <div>
         <h1>React Stock Market App</h1>
           <h1>Enter your Ticker</h1>
           <input id="ticker" class="ticker-input-box" type="text"></input>
           <br></br>
           <button class="ticker-submit-btn" id="submit" onClick={this.fetchStock.bind(this)}>Enter</button>
           <h3 id="DisplayText"></h3>
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
               title: '100 Day Chart (Daily Opens)',
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
         <h6>This app was created by Zary G. Manning</h6>
         <h6>The stock API was provided by Alpha Vantage and the chart library by Plotly. Source code can be found here: https://github.com/zm00622/stock-tracker</h6>
       </div>
     )
   }
 }

 export default Stock;





// Attempt at changing modeBarButtons to add functionality and different charts
// DEFAULT_CHART_CONFIG = { {modeBarButtons: [ 'sendDataToCloud' ] } }

// config = {
//   Stock.newPlot({showSendToCloud: true})
// }
