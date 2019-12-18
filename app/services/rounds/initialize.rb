module Rounds
  class Initialize < ActiveInteraction::Base
    record :game

    delegate :round_count, :teams, :words, to: :game

    def execute
      {
        team: team.id,
        artist: artist,
        current_word: nil,
        guessed_words: [],
        skips: 2
      }.with_indifferent_access
    end

    private

    def artist
      return nil unless team.draw_order.length.positive?

      position = (round_count / 2)
      position -= 1 if round_count.even?

      return team.draw_order[position] if position < team.draw_order.length

      position -= ((position / team.draw_order.length) * team.draw_order.length)
      team.draw_order[position]
    end

    def team
      @team ||= Team.find_by(position: round_count.even? ? 1 : 0)
    end
  end
end
