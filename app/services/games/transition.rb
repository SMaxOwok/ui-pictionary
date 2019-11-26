module Games
  class Transition < ActiveInteraction::Base
    symbol :state
    time :at
    hash :game_attributes, default: {}, strip: false

    def execute
      ActiveRecord::Base.transaction do
        Game.instance.tap do |game|
          game.assign_attributes game_attributes
          game.game_transition_events.new transition_to: state.to_s,
                                          transition_at: at
        end.save

        Game.instance
      end
    end
  end
end
