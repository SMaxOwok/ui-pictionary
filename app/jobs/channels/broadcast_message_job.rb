module Channels
  class BroadcastMessageJob < ActiveJob::Base
    queue_as :default
    sidekiq_options retry: 0

    def perform(channel, message)
      ActionCable.server.broadcast channel, message
    end
  end
end
