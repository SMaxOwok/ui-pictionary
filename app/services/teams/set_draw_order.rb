module Teams
  class SetDrawOrder < ActiveInteraction::Base
    record :team

    def execute
      team.update draw_order: team.players.pluck(:id).shuffle
    end
  end
end
