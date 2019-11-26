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
  end
end
