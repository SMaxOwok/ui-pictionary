require 'clockwork'
require 'clockwork/database_events'
require_relative './config/boot'
require_relative './config/environment'

module Clockwork
  Clockwork.manager = DatabaseEvents::Manager.new

  # TODO: See if these should be backgrounded or not.
  sync_database_events model: GameTransitionEvent, every: 5.seconds do |event|
    event.transition_game!

    event.destroy if event.ran?
  end
end
