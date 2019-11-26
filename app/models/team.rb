class Team < ApplicationRecord
  # Associations
  belongs_to :game, inverse_of: :teams
  has_many :players, dependent: :nullify

  # Validations
  validates :name, presence: true

  # Callbacks
  after_commit :broadcast!

  # Enums
  enum palette: { primary: 0, secondary: 1 }

  private

  def broadcast!
    ActionCable.server.broadcast "team:#{id}",
                                 ActiveModelSerializers::SerializableResource.new(
                                   self, include: %w[players]
                                 ).as_json
  end
end
