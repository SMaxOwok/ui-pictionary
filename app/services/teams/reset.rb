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

      team.save
    end

    def reset_attributes!
      team.players = []
      team.score = 0
      team.draw_order = []
    end
  end
end
