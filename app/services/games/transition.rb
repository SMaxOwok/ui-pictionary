module Games
  class Transition < ActiveInteraction::Base
    string :state
    time :at
    record :game, default: -> { Game.instance }

    def execute
      ActiveRecord::Base.transaction do
        game.tap do |obj|
          obj.assign_attributes attributes
          obj.game_transition_events.new transition_to: state,
                                         transition_at: at
        end.save

        game
      end
    end

    private

    def new_round?
      game.current_state == 'pre_draw'
    end

    def drawing?
      game.current_state == 'drawing'
    end

    def attributes
      {}.tap do |hash|

        if new_round?
          hash[:round_count] = game.round_count + 1
          hash[:previous_round] = game.current_round
          hash[:words] = game.words - game.current_round['guessed_words']
          hash[:current_round] = compose(Rounds::Initialize, game: game)
        end
      end
    end
  end
end
