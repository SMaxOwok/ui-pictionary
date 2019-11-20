class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_for Game.instance
  end

  def transition_game(data)
    Game.instance.transition_to data['status'].to_sym
    GameChannel.broadcast_to 'game_channel', { status: Game.instance.current_state }
  end

  def unsubscribed; end
end
