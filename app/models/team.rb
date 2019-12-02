class Team < ApplicationRecord
  # Associations
  belongs_to :game, inverse_of: :teams
  has_many :players,
           inverse_of: :team,
           dependent: :nullify,
           after_remove: :touch_player!

  # Validations
  validates :name, presence: true

  # Callbacks
  after_commit :broadcast!

  # Enums
  enum palette: { primary: 0, secondary: 1 }

  private

  # TODO: Not the most efficient right now, but we have to make sure the player is
  # rebroadcast _after_ the :team_id has been cleared.
  def touch_player!(player)
    player.touch
  end

  def broadcast!
    Channels::BroadcastObjectJob.perform_later "team:#{id}",
                                               self,
                                               include: %w[players]
  end
end
