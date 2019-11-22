class PlayerSerializer < ActiveModel::Serializer
  belongs_to :team

  attributes :id, :email, :name, :type

  def type
    :player
  end
end
