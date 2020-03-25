class VerificationsController < ApplicationController
  def create
    outcome = Players::Verify.run player: current_user,
                                  verification_token: params[:verification_token]

    if outcome.valid?
      render json: {}, status: :created
    else
      render json: { errors: outcome.errors }, status: :unprocessable_entity
    end
  end
end
