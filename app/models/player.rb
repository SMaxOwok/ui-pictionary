class Player < ApplicationRecord
  # Associations
  belongs_to :team, required: false, touch: true

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true

  # Callbacks
  after_commit :broadcast!

  def abandon_team!
    update team_id: nil
  end

  private

  def broadcast!
    ActionCable.server.broadcast "player:#{id}",
                                 ActiveModelSerializers::SerializableResource.new(
                                   self
                                 ).as_json
  end
end
