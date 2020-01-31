class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :type, :team_id, :guess_count, :draw_count

  def type
    :player
  end
end
