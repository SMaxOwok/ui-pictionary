class LeaderboardController < ApplicationController
  def show
    render json: {
      guessers: ActiveModelSerializers::SerializableResource.new(
        Player.top_guessers, each_serializer: PlayerSerializer
      ),
      drawers: ActiveModelSerializers::SerializableResource.new(
        Player.top_drawers, each_serializer: PlayerSerializer
      )
    }
  end
end
