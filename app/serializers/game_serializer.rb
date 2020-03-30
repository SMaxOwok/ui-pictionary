class GameSerializer < ActiveModel::Serializer
  attributes :id, :current_state, :words, :round_count, :type, :winner_id,
             :team_ids, :transition_to, :transition_at, :current_round, :previous_round,
             :ready_player_ids, :guessed_words

  delegate :next_transition, to: :object
  delegate :transition_to, :transition_at, to: :next_transition, allow_nil: true

  def type
    :game
  end

  def winner_id
    return nil unless object.winner.present?

    object.winner.id
  end
end
