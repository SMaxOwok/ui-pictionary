class Game < ApplicationRecord
  # Associations
  has_many :game_transitions, autosave: false, dependent: :destroy
  has_many :teams,
           -> { order(position: :asc) },
           inverse_of: :game,
           dependent: :destroy
  has_many :players, through: :teams
  has_many :game_transition_events,
           -> { order(transition_at: :desc) }
  has_one :next_transition,
          class_name: 'GameTransitionEvent'

  # Validations
  validates :singleton_guard, inclusion: [0], uniqueness: true

  # Callbacks
  before_create :initialize_teams!
  before_save :set_round_defaults!
  after_commit :broadcast!

  delegate :can_transition_to?, :current_state, :history, :last_transition,
           :transition_to!, :transition_to, :in_state?, to: :state_machine

  def final_round?
    round_count == 9
  end

  def winner
    return nil unless teams.any?
    return nil if teams.pluck(:score).uniq.length <= 1

    teams.order(score: :desc).first
  end

  def state_machine
    @state_machine ||= Games::StateMachine.new(self, transition_class: GameTransition)
  end

  def reset_round(round_key)
    self[round_key] = {
      artist: nil, team: nil, word: nil, guessed_words: []
    }
  end

  private

  def broadcast!
    Channels::BroadcastObjectJob.perform_later 'game_channel',
                                               self,
                                               include: %w[teams teams.players]
  end

  def initialize_teams!
    teams << Team.new(name: 'Researchers')
    teams << Team.new(name: 'Participants', palette: 'secondary')
  end

  def set_round_defaults!
    reset_round(:current_round) if current_round.blank?
    reset_round(:previous_round) if previous_round.blank?
  end

  class << self
    def instance
      first_or_create(singleton_guard: 0)
    end
  end
end
