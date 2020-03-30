module Games
  class Reset < ActiveInteraction::Base
    record :game, default: -> { Game.instance }

    def execute
      ActiveRecord::Base.transaction do
        reset!
      end
    end

    private

    def reset!
      reset_teams!
      reset_attributes!
      reset_state!
      reset_events!

      game.save
    end

    def reset_teams!
      game.teams.each do |team|
        compose Teams::Reset, team: team
      end
    end

    def reset_events!
      GameTransitionEvent.destroy_all
    end

    def reset_attributes!
      game.words = []
      game.guessed_words = []
      game.ready_player_ids = []
      game.round_count = 0
      game.reset_round(:current_round)
      game.reset_round(:previous_round)
    end

    def reset_state!
      game.game_transitions.destroy_all
    end
  end
end
