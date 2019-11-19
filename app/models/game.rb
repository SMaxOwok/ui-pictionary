class Game < ApplicationRecord
  # Validations
  validates :singleton_guard, inclusion: [0], uniqueness: true

  delegate :can_transition_to?, :transition_to!, :transition_to, :current_state,
           to: :state_machine

  def state_machine
    @state_machine ||= Games::StateMachine.new(self)
  end

  class << self
    def instance
      first_or_create(singleton_guard: 0)
    end
  end
end
