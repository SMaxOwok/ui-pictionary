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
    transition from: :setup, to: %i[pre_draw completed]
    transition from: :pre_draw, to: %i[drawing completed]
    transition from: :drawing, to: %i[pre_draw completed]
    transition from: :completed, to: [:initialized]

    before_transition do |object|
      object.game_transition_events.destroy_all
    end

    after_transition(from: :completed, to: :initialized) do
      Games::Reset.run!
    end

    after_transition(to: :setup) do
      Games::Transition.run! state: :pre_draw, at: Time.current + 30.seconds
    end

    after_transition(to: :pre_draw) do |object|
      Games::Transition.run! state: :drawing,
                             at: Time.current + 15.seconds,
                             game_attributes: {
                               round_count: object.round_count + 1
                             }
    end

    after_transition(to: :drawing) do |object|
      next_state = object.final_round? ? :completed : :pre_draw
      Games::Transition.run! state: next_state, at: Time.current + 60.seconds
    end

    # Not sure if this is needed yet, but it will clear the timers for now.
    after_transition(to: :completed) do |object|
      object.game_transition_events.destroy_all
      object.reload.touch
    end
  end
end
