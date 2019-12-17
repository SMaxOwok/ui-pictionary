class MeController < ApplicationController
  def update
    current_user.assign_attributes user_params

    if current_user.save
      render json: current_user, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def set_ready
    game.ready_player_ids << current_user.id

    if game.save
      render json: {}, status: :ok
    else
      render json: { errors: 'Could not set player ready' }, status: :unprocessable_entity
    end
  end

  def set_unready
    game.ready_player_ids.delete current_user.id

    if game.save
      render json: {}, status: :ok
    else
      render json: { errors: 'Could not set player unready' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:me).permit(:team_id, :name)
  end

  def game
    @game ||= Game.instance
  end
end
