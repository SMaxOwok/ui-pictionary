import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SubmissionInput from 'components/SubmissionInput';
import Word from 'components/Word';

export default class Setup extends Component {
  static propTypes = {
    gameChannel: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };

  state = { wordList: [] };

  get wordCount() {
    return this.gameWords.length;
  }

  get gameWords() {
    return this.props.game.words;
  }

  handleWordSubmit = word => {
    this.props.gameChannel.submitWord(word);

    this.addToWordList(word);
  };

  addToWordList(word) {
    if (!word) return null;
    const adjusted = word.toLowerCase().trim();

    this.setState(state => {
      const wordList = [...state.wordList];
      if (this.gameWords.includes(adjusted)) return { wordList };

      wordList.push(adjusted);

      return { wordList };
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser && !this.props.currentUser) {
      this.setState({ wordList: [] });
    }
  }

  render () {
    return (
      <div className='Setup'>

        <div className='Setup__word-count'>
          {this.wordCount} {this.wordCount === 1 ? 'word' : 'words'} submitted
        </div>

        <div className='Setup__submissions'>
          <div className='Setup__submissions__label'>
            Your words
          </div>

          <div className='Setup__submissions__prompt'>
            Try to be unique and clever, you sneaky devil
          </div>

          <div className='Setup__submissions__word-list'>
            {this.state.wordList.map(word => (
              <Word key={word} word={word} />
            ))}
          </div>
        </div>

        <SubmissionInput onSubmit={this.handleWordSubmit} />
      </div>
    );
  }
}
