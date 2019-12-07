import React, { PureComponent } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt, faEdit, faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

export default class HowToPlay extends PureComponent {
  render() {
    return (
      <div className='HowToPlay'>
        <div className='HowToPlay__title'>
          <FontAwesomeIcon icon={faBook} />
          How to play
        </div>

        <ul className='HowToPlay__list'>
          <li className='HowToPlay__list-item'>
            <div className='HowToPlay__list-item__header'>
              <FontAwesomeIcon icon={faQuestionCircle} />
              Game
            </div>
            <div className='HowToPlay__list-item__copy'>
              {`Each game is played over ten 60 second rounds and the team with \
                the most points wins the game (or draw if there is a tie).`}
            </div>
          </li>
          <li className='HowToPlay__list-item'>
            <div className='HowToPlay__list-item__header'>
              <FontAwesomeIcon icon={faEdit} />
              Drawing
            </div>
            <div className='HowToPlay__list-item__copy'>
              {`When it’s your turn to draw, your goal is to help your team guess as many words as possible \
                by drawing the word displayed to you. When they guess correctly, your team will score a point \
                and new word will appear for you to draw.`}
            </div>
            <div className='HowToPlay__list-item__copy'>
              You can also clear your canvas and skip as many words as you need.
            </div>
          </li>
          <li className='HowToPlay__list-item'>
            <div className='HowToPlay__list-item__header'>
              <FontAwesomeIcon icon={faCommentAlt} />
              Guessing
            </div>
            <div className='HowToPlay__list-item__copy'>
              {`When you’re guessing, your goal is to try to guess the drawing correctly. Every time your \
                team guesses correctly your team earns a point and a new word will appear to the person drawing.`}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
