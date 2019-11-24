class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'game_channel'
  end

  def transition_game(data)
    Game.instance.transition_to data['status'].to_sym
  end

  def unsubscribed; end
end
