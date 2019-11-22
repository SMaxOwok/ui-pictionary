class PlayerSerializer < ActiveModel::Serializer
  belongs_to :team

  attributes :id, :email, :name
end
