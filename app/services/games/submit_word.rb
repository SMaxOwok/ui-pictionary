module Games
  class SubmitWord < ActiveInteraction::Base
    string :word

    validates :word, presence: true

    delegate :words, to: :game

    def execute
      return if words.include? adjusted

      game.words << adjusted
      game.save
    end

    private

    def adjusted
      @adjusted ||= word.strip.downcase
    end

    def game
      @game ||= Game.instance
    end
  end
end
