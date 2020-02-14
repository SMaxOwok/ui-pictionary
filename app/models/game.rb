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
  before_save :set_round_defaults!, :maybe_start_game!
  after_commit :broadcast!, if: :persisted?

  delegate :can_transition_to?, :current_state, :history, :last_transition,
           :transition_to!, :transition_to, :in_state?, to: :state_machine

  def final_round?
    round_count == 10
  end

  def winner
    return nil unless teams.any?
    return nil if teams.pluck(:score).uniq.length <= 1

    teams.unscoped.order(score: :desc).first
  end

  def state_machine
    @state_machine ||= Games::StateMachine.new(self, transition_class: GameTransition)
  end

  def reset_round(round_key)
    self[round_key] = {
      artist: nil, team: nil, current_word: nil, guessed_words: [], skips: 2
    }
  end

  def startable?
    return false unless current_state == 'initialized'

    total_player_count >= 4
  end

  private

  # TODO: I know this is horrendously hacky right now.  Deal with it.
  def maybe_start_game!
    return unless startable?

    if total_player_count > ready_player_ids.length
      game_transition_events.destroy_all
    else
      return if game_transition_events.exists? transition_to: 'setup'

      game_transition_events.new transition_to: 'setup',
                                 transition_at: Time.current + 10.seconds
    end
  end

  def total_player_count
    teams.inject(0) { |acc, team| acc += team.players.size }
  end

  def broadcast!
    Channels::BroadcastObjectJob.perform_now 'game_channel',
                                             self,
                                             include: %w[teams teams.players]
  end

  def initialize_teams!
    return if teams.any?

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
