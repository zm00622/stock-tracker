import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = process.env.API_KEY;
    let StockSymbol = 'TQQQ';
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
        }
      )
  }

  render() {
    return (
      <div>

        <h1>React Stock Market App</h1>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: '#08cf98'},
            }
          ]}
          layout={
            {
              width: 720,
              height: 440,
              title: '100 Day Chart for Ticker "TQQQ"',
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


// DEFAULT_CHART_CONFIG = { {modeBarButtons: [ 'sendDataToCloud' ] } }

// config = {
//   Stock.newPlot({showSendToCloud: true})
// }
