export const guessWord = (payload) => ({
  type: 'GUESS_WORD',
  payload
});

export const flushGuesses = () => ({
  type: 'FLUSH_GUESSES'
});

export default {
  guessWord,
  flushGuesses
}
