class TeamSerializer < ActiveModel::Serializer
  has_many :players

  attributes :id, :score, :draw_order
end
