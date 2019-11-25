class GameSerializer < ActiveModel::Serializer
  attributes :id, :current_state, :words, :round_count, :type, :winner_id,
             :team_ids

  def type
    :game
  end

  def winner_id
    return nil unless object.winner.present?

    object.winner.id
  end
end
