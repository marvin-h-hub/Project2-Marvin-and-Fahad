import React, {useState} from 'react';
import Plot from 'react-plotly.js';
import {Pane, Text} from 'evergreen-ui';

export const StockPanel = (props) => {
  return (
    <Pane 
      elevation={2}
      background={'white'}
    >
      <Plot data={props.data} layout={{title: props.title}}/>
    </Pane>
  )
}