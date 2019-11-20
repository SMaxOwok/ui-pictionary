class Game < ApplicationRecord
  # Associations
  has_many :game_transitions, autosave: false, dependent: :destroy

  # Validations
  validates :singleton_guard, inclusion: [0], uniqueness: true

  delegate :can_transition_to?, :current_state, :history, :last_transition,
           :transition_to!, :transition_to, :in_state?, to: :state_machine

  def state_machine
    @state_machine ||= Games::StateMachine.new(self, transition_class: GameTransition)
  end

  class << self
    def instance
      first_or_create(singleton_guard: 0)
    end
  end
end
