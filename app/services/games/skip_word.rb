module Games
  class SkipWord < ActiveInteraction::Base
    record :game, default: -> { Game.instance }

    delegate :words, :current_round, to: :game

    def execute
      current_round['current_word'] = new_word

      game.save
    end

    private

    def new_word
      (words - [current_round['current_word']]).sample
    end
  end
end
