class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :type, :team_id, :guess_count, :draw_count, :email_verified

  def type
    :player
  end

  def email_verified
    object.email_verified?
  end
end
