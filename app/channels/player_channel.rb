class PlayerChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player:#{params[:id]}"
  end

  def unsubscribed; end
end
