class GameTransition < ApplicationRecord
  # Associations
  belongs_to :game, inverse_of: :game_transitions

  # Validations
  validates :to_state, inclusion: { in: Games::StateMachine.states }

  # Callbacks
  after_destroy :update_most_recent, if: :most_recent?

  private

  def update_most_recent
    last_transition = game.game_transitions.order(:sort_key).last
    return unless last_transition.present?

    last_transition.update_column(:most_recent, true)
  end
end
