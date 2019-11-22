class SessionsController < ApplicationController
  def create
    player = Player.find_by(email: params[:email])

    if player.present?
      session[:player_id] = player.id

      render json: current_user, status: :created
    else
      render json: { error: 'Invalid email' }, status: :unprocessable_entity
    end
  end

  def destroy
    current_user.abandon_team!

    session[:player_id] = nil

    render json: {}, status: :ok
  end
end
