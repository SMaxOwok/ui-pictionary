class TeamSerializer < ActiveModel::Serializer
  has_many :players

  attributes :id, :score, :draw_order, :name, :palette, :type

  def type
    :team
  end
end
