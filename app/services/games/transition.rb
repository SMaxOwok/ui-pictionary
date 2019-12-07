module Games
  class Transition < ActiveInteraction::Base
    string :state
    time :at
    record :game, default: -> { Game.instance }

    def execute
      # TODO: This is horrible, but it's working.  Make sure to improve these
      # attribute assignments.
      ActiveRecord::Base.transaction do
        if new_round?
          assign_game_attributes!
          assign_round_attributes!
        end

        set_current_word! if drawing?
        build_transition_event!

        game.save
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

    def assign_game_attributes!
      game.round_count += 1
    end

    def assign_round_attributes!
      game.previous_round = game.current_round
      game.current_round = compose(Rounds::Initialize, game: game)
    end

    def set_current_word!
      game.words << (word_list - game.words).sample while game.words.length < 20

      game.current_round['current_word'] = game.words.sample
    end

    def build_transition_event!
      game.game_transition_events.new transition_to: state,
                                      transition_at: at
    end

    def word_list
      @word_list ||= YAML.load_file Rails.root.join('app', 'services', 'games', 'word_list.yml')
    end
  end
end
