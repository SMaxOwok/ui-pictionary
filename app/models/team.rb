class Team < ApplicationRecord
  # Associations
  belongs_to :game, inverse_of: :teams
  has_many :players,
           dependent: :nullify,
           after_remove: :touch_player!

  # Validations
  validates :name, presence: true

  # Callbacks
  after_commit :broadcast!

  # Enums
  enum palette: { primary: 0, secondary: 1 }

  private

  def broadcast!
    Channels::BroadcastObjectJob.perform_later "team:#{id}",
                                               self,
                                               include: %w[players]
  end

  def touch_player!(player)
    player.reload.touch
  end
end
