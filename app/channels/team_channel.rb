class TeamChannel < ApplicationCable::Channel
  def subscribed
    stream_from "team:#{params[:id]}"
  end

  def unsubscribed; end
end
