import React, {useState} from 'react';
import {Text, Pane, Autocomplete, TextInput} from 'evergreen-ui';

const AutocompleteSearch = (props) => {
  return (
    <Autocomplete 
      title={'Stocks'} 
      onChange={(item) => props.handler(item)} 
      items={props.options}
    >
      {
        (props) => {
          return (
            <TextInput 
              style={{background: '#DDEBF7'}}
              placeholder={'Search for a stock...'} 
              value={props.inputValue} 
              innerRef={props.getRef}
              {...props.getInputProps()}
            />
          );
        }
      }
    </Autocomplete>
  )
}

export const AppBar = (props) => {
  return (
    <Pane 
      background={'tint2'}
      height={40}
      padding={'3px'}
      background={'#B7D4EF'}
    >
      <Pane float={"left"}
        display={"flex"}
        textAlign={"right"}
        overflow={"hidden"}
        flex={1}
        marginRight={8}>
          <div style={{height: 28, display: "flex", flex: 1, alignItems: "center"}}>
            <Text className={"vanish-large"} marginLeft={'5px'}>Stock Ticker Dash</Text>
          </div>  
        </Pane>
        <Pane float={'right'} marginRight={'5px'}>
          <AutocompleteSearch options={props.options} handler={props.handler}/>
        </Pane>
    </Pane>
  )
}