import React, {useState} from 'react';
import {Heading, Text, Pane} from 'evergreen-ui';

export const InfoPanel = (props) => {
  return (
    <Pane
      elevation={2}
      background={'white'}
      margin={'10px'}
      padding={'5px'}
      height={'10vh'}
    >
      <Heading size={600}>{props.title}</Heading>
      <Text>{props.info}</Text>
    </Pane>
  )
}