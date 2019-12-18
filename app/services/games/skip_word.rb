module Games
  class SkipWord < ActiveInteraction::Base
    record :game, default: -> { Game.instance }

    delegate :words, :current_round, to: :game

    def execute
      return unless current_round['skips'].positive?

      current_round['current_word'] = new_word
      current_round['skips'] -= 1

      game.save
    end

    private

    def new_word
      (words - [current_round['current_word']]).sample
    end
  end
end
