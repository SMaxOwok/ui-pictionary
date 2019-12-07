class MeController < ApplicationController
  def update
    current_user.assign_attributes user_params

    if current_user.save
      render json: current_user, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:me).permit(:team_id, :name)
  end
end
