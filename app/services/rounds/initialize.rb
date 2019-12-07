module Rounds
  class Initialize < ActiveInteraction::Base
    record :game

    delegate :round_count, :teams, :words, to: :game

    def execute
      {
        team: team.id,
        artist: artist,
        current_word: nil,
        guessed_words: []
      }.with_indifferent_access
    end

    private

    def artist
      position = round_count / 2

      if position >= team.draw_order.length
        adjusted = (team.draw_order.length % position) - 1

        team.draw_order[adjusted]
      else
        team.draw_order[position]
      end
    end

    def team
      @team ||= Team.find_by(position: round_count % 2)
    end
  end
end
