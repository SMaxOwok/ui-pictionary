module Games
  class GuessWord < ActiveInteraction::Base
    string :word
    record :player
    record :game, default: -> { Game.instance }

    validates :word, presence: true

    def execute
      if correct_guess?
        update_current_round
        update_scores
      end

      Channels::BroadcastMessageJob.perform_later 'game_channel',
                                                  payload
    end

    private

    def current_word
      @current_word ||= game.current_round['current_word']
    end

    def correct_guess?
      word.strip.downcase == current_word
    end

    def payload
      {
          type: 'guess',
          message: word,
          playerId: player.id,
          isCorrect: correct_guess?
      }
    end

    # TODO: Backfill words from default list to ensure there are always words
    def update_current_round
      # Push the word to correct guesses
      game.current_round['guessed_words'] << word

      # Subtract the word from the remaining words
      game.words = game.words - game.current_round['guessed_words']

      # Set a new current word for the round
      game.current_round['current_word'] = game.words.sample

      game.save
    end

    def update_scores
      update_team_score
      update_player_score
      update_artist_score
    end

    def update_team_score
      player.team.update score: player.team.score + 1
    end

    def update_player_score
      player.update guess_count: player.guess_count + 1
    end

    def update_artist_score
      artist = Player.find(game.current_round['artist'])
      return unless artist.present?

      artist.update draw_count: artist.draw_count + 1
    end
  end
end
