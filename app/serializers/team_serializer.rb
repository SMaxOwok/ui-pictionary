class TeamSerializer < ActiveModel::Serializer
  has_many :players

  attributes :id, :score, :draw_order, :name, :palette, :type

  def type
    :team
  end

  # TODO: Investigate -- This is returning the integer value on Heroku only.
  def palette
    object.palette.to_s
  end
end
