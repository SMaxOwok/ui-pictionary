import React from 'react'

import Easel from 'components/Easel';

export default class Spectator extends React.Component {
  render () {
    return (
      <div className='Spectator'>
        <Easel
          drawable={false}
        />
      </div>
    );
  }
}
