class Team < ApplicationRecord
  # Associations
  belongs_to :game, inverse_of: :teams
  has_many :players,
           inverse_of: :team,
           dependent: :nullify,
           after_add: :append_player_to_draw_order!,
           after_remove: :remove_player_from_draw_order!

  # Validations
  validates :name, presence: true

  # Callbacks
  before_create :set_position!
  after_commit :broadcast!, if: :persisted?

  # Enums
  enum palette: { primary: 0, secondary: 1 }

  def remove_player!(player)
    players.delete player
  end

  private

  def remove_player_from_draw_order!(player)
    draw_order.delete player.id

    save
    reload
  end

  def append_player_to_draw_order!(player)
    draw_order << player.id

    save
    reload
  end

  def broadcast!
    Channels::BroadcastObjectJob.perform_now "team:#{id}",
                                             self,
                                             include: %w[players]
  end

  # Zero-indexed position so we can do even/odd round assignments
  def set_position!
    return if position.present?

    self.position = self.class.count
  end
end
