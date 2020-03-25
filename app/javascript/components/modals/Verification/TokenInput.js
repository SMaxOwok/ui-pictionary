import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';

const TOKEN_LENGTH = new Array(6).fill(0);

// Shout-out Portland React JS
// https://codedaily.io/tutorials/65/Create-a-Segmented-Auto-Moving-SMS-Code-Verification-Input-in-React
export default class TokenInput extends PureComponent {
  static propTypes = {
    token: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  state = { focused: false };
  input = React.createRef();

  get characters() {
    return [...this.props.token.split('')];
  }

  get selectedCharacter() {
    if (this.characters.length < TOKEN_LENGTH.length) return this.characters.length;

    return TOKEN_LENGTH.length - 1;
  }

  get hideInput() {
    return this.props.token.length >= TOKEN_LENGTH.length;
  }

  handleClick = () => {
    this.input.current.focus();
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleChange = event => {
    if (this.characters >= TOKEN_LENGTH.length) return null;

    const value = (this.props.token + event.target.value.toUpperCase());
    this.props.onChange(value);
  };

  handleDelete = event => {
    if (event.keyCode !== 8) return null;

    const value = this.props.token.slice(0, this.props.token.length - 1);
    this.props.onChange(value);
  };

  render() {
    return (
      <div className="TokenInput" onClick={this.handleClick}>
        {TOKEN_LENGTH.map((char, index) => {
          return (
            <div className="TokenInput__character" key={index}>
              {this.characters[index]}
            </div>
          );
        })}

        <input
          ref={this.input}
          value=""
          className="TokenInput__input"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyUp={this.handleDelete}
          style={{
            // This is awkward. I would love a better solution.
            left: `${this.selectedCharacter * 83}px`,
            opacity: this.hideInput ? 0 : 1
          }}
        />
      </div>
    )
  }
}
