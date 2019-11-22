class TeamSerializer < ActiveModel::Serializer
  has_many :players

  attributes :id, :score, :draw_order, :type

  def type
    :team
  end
end
