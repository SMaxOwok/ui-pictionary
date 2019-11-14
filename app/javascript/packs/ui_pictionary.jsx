import React from 'react'
import ReactDOM from 'react-dom'
import GameContainer from 'components/GameContainer';

import 'theme/theme.scss'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <GameContainer />,
    document.body.appendChild(document.createElement('main')),
  )
});
