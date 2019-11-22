class GameSerializer < ActiveModel::Serializer
  has_many :teams

  attributes :current_state, :words, :round_count
end
