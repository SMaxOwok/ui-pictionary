class GameSerializer < ActiveModel::Serializer
  attributes :id, :current_state, :words, :round_count, :type, :team_ids

  def type
    :game
  end
end
