require 'sidekiq/api'

module Games
  class StateMachine
    include Statesman::Machine

    state :initialized, initial: true
    state :setup
    state :pre_draw
    state :drawing
    state :completed

    transition from: :initialized, to: :setup
    transition from: :setup, to: [:pre_draw, :completed]
    transition from: :pre_draw, to: [:drawing, :completed]
    transition from: :drawing, to: [:pre_draw, :completed]
    transition from: :completed, to: [:initialized]

    after_transition { |object| object.broadcast! }

    after_transition(from: :completed, to: :initialized) do
      Games::Reset.run!
    end

    after_transition(to: :setup) do
      # TODO: timer
    end

    after_transition(to: :pre_draw) do |object|
      object.update round_count: object.round_count + 1

      # TODO: timer
    end

    after_transition(to: :drawing) do |object|
      # object.final_round? ? 'completed' : 'pre_draw'

      # TODO: timer
    end
  end
end
