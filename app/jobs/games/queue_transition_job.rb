module Games
  class QueueTransitionJob < ActiveJob::Base
    queue_as :default
    sidekiq_options retry: 0

    def perform(state, at)
      Games::Transition.run! state: state, at: at
    end
  end
end
