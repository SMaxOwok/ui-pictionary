class SessionsController < ApplicationController
  def create
    player = Player.find_by(email: params[:email])

    if player.present?
      session[:player_id] = player.id
      render json: {}, status: :created
    else
      render json: 'Invalid email', status: :unprocessable_entity
    end
  end

  def destroy
    session[:player_id] = nil

    render json: {}, status: :deleted
  end
end
