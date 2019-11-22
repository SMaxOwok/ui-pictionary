import React from 'react'

import Easel from 'components/Easel';
import subscribedToDrawingChannel from 'components/hoc/subscribedToDrawingChannel';

class Spectator extends React.Component {
  render () {
    return (
      <div className='Spectator'>
        <Easel
          drawable={false}
          header='The other team is drawing'
          {...this.props}
        />
      </div>
    );
  }
}

export default subscribedToDrawingChannel(Spectator);
