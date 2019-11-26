module Games
  class TransitionJob < ActiveJob::Base
    queue_as :default
    sidekiq_options retry: 0

    def perform(new_state)
      return unless new_state.present?

      Game.instance.transition_to new_state
    end
  end
end
