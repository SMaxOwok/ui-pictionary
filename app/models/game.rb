class Game < ApplicationRecord
  # Associations
  has_many :game_transitions, autosave: false, dependent: :destroy
  has_many :teams
  has_many :players, through: :teams

  # Validations
  validates :singleton_guard, inclusion: [0], uniqueness: true

  # Callbacks
  after_commit :broadcast!

  delegate :can_transition_to?, :current_state, :history, :last_transition,
           :transition_to!, :transition_to, :in_state?, to: :state_machine

  def broadcast!
    ActionCable.server.broadcast 'game_channel',
                                 ActiveModelSerializers::SerializableResource.new(self).as_json
  end

  def winner
    return nil unless teams.any?
    return nil if teams.pluck(:score).uniq.length <= 1

    teams.order(score: :desc).first
  end

  def state_machine
    @state_machine ||= Games::StateMachine.new(self, transition_class: GameTransition)
  end

  class << self
    def instance
      first_or_create(singleton_guard: 0)
    end
  end
end
