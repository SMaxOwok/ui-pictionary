class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :type, :team_id

  def type
    :player
  end
end
