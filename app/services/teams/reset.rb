module Teams
  class Reset < ActiveInteraction::Base
    record :team

    def execute
      ActiveRecord::Base.transaction do
        reset!
      end
    end

    private

    def reset!
      reset_attributes!

      # Right now we are individually removing players because they need
      # to receive broadcasts to update themselves in state.
      eject_players!

      team.save
    end

    def reset_attributes!
      team.score = 0
      team.draw_order = []
    end

    def eject_players!
      team.players.find_each(&:abandon_team!)
    end
  end
end
