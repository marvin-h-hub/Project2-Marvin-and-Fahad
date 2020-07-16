import React, {useState, useEffect} from 'react';
import {Icon, Pane, Text, ScatterPlotIcon} from 'evergreen-ui';
import { AppBar, StockPanel, InfoPanel } from '../../components';
const axios = require('axios').default;

export const Stocks = (props) => {
  const [stockData, setStockData] = useState({});
  const [tickerNames, setTickerNames] = useState(['NYSE', 'GOOGL', 'AIG-US']);
  const tickerInfo = {};

  const handleTickerChange = async (tickerName) => {
    console.log('here');
    const req = await axios.get(`http://localhost:5000/${tickerName}`);
    const {data} = req;
    if (!data) {
      return ;
    }
    // TODO: choose which data to get
    const date = Object.values(data.Date || {});
    let stockName = Object.values(data.company_name || {});
    stockName = stockName && stockName[0];
    const closingPrice = Object.values(data['Closing Price']);
    const sales = Object.values(data['Sales']);
    const ebit = Object.values(data['EBIT']);
    const eps = Object.values(data['EPS']);
    const stockDataA = [
      {
        x: date,
        y: closingPrice,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'}
      }
    ];
    const stockDataB = [
      {
        x: date,
        y: sales,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'blue'}
      }
    ];
    const stockDataC = [
      {
        x: date,
        y: ebit,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'green'}
      }
    ];
    const stockDataD = [
      {
        x: date,
        y: eps,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'yellow'}
      }
    ];
    setStockData({
      selectedStock: tickerName,
      stockName,
      stockDataA,
      stockDataB,
      stockDataC,
      stockDataD,
    });
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/stock-names`)
      .then(req => {
        const items = req.data && req.data.ticker || {};
        const tickerNames= Object.values(items);
        setTickerNames(tickerNames);
      });
  }, []);
  if (!stockData.selectedStock) {
    return (
      <Pane>
        <Pane marginBottom={'5px'}>
          <AppBar handler={handleTickerChange} options={tickerNames}/>
        </Pane>
        <Pane marginX={'auto'} marginY={'auto'} alignItems={'center'}>
          <Pane margin={'auto'} display={'block'}><Icon icon={'series-search'} size={70} color={'muted'}/></Pane> 
          <Pane display={'block'} margin={'auto'}><Text>Search for a stock to begin</Text></Pane>
          
        </Pane>
      </Pane>
    )
  }
  return (
    <Pane>
      <Pane marginBottom={'5px'}>
        <AppBar handler={handleTickerChange} options={tickerNames}/>
      </Pane>
      <Pane display={'flex'}>
        <Pane flex={1}>
          <InfoPanel 
            title={stockData.selectedStock} 
            info={stockData.stockName}
          />
        </Pane>
      </Pane>
      <Pane display={'float'} margin={'10px'}>
        <Pane float={'left'}>
          <StockPanel 
            data={stockData.stockDataA}
            title={`${stockData.selectedStock} - Closing Price`}
          />
        </Pane>
        <Pane float={'right'}>
          <StockPanel
            data={stockData.stockDataB}
            title={`${stockData.selectedStock} - Sales`}
          />
          </Pane>
          <Pane float={'left'}>
            <StockPanel
            data={stockData.stockDataC}
            title={`${stockData.selectedStock} - EBIT`}
          />
        </Pane>
        <Pane float={'right'}>
          <StockPanel
            data={stockData.stockDataD}
            title={`${stockData.selectedStock} - EPS`}
          />
          </Pane>
        </Pane>
      </Pane>
  )
}