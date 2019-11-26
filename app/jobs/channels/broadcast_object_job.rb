module Channels
  class BroadcastObjectJob < ActiveJob::Base
    queue_as :default
    sidekiq_options retry: 0

    def perform(channel, broadcastable, include: [])
      ActionCable.server.broadcast channel,
                                   ActiveModelSerializers::SerializableResource.new(
                                     broadcastable, include: include
                                   ).as_json
    end
  end
end
