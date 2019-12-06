module Games
  class Transition < ActiveInteraction::Base
    string :state
    time :at
    record :game, default: -> { Game.instance }

    def execute
      # TODO: This is horrible, but it's working.  Make sure to improve these
      # attribute assignments.
      ActiveRecord::Base.transaction do
        game.tap do |obj|
          obj.assign_attributes(attributes(obj)) if new_round?
          obj.current_round['current_word'] = current_word if drawing?
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

    def attributes(object)
      {}.tap do |hash|
        hash[:round_count] = object.round_count + 1
        hash[:previous_round] = object.current_round
        hash[:current_round] = compose(Rounds::Initialize, game: object)
      end
    end

    def current_word
      game.words << (word_list - game.words).sample while game.words.length < 20
      game.words.sample
    end

    def word_list
      @word_list ||= YAML.load_file Rails.root.join('app', 'services', 'games', 'word_list.yml')
    end
  end
end
