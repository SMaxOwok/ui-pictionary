class PlayerChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player:#{params[:id]}"
  end

  def unsubscribed
    player = Player.find_by(id: params[:id])

    player.abandon_team! if player.present?
  end
end
