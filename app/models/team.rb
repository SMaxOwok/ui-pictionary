class Team < ApplicationRecord
  # Associations
  belongs_to :game
  has_many :players, dependent: :nullify

  # Callbacks
  after_commit :broadcast!

  private

  def broadcast!
    ActionCable.server.broadcast "team:#{id}",
                                 ActiveModelSerializers::SerializableResource.new(self).as_json
  end
end
