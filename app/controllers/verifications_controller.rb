class VerificationsController < ApplicationController
  def show
    VerificationMailer.verification_email(current_user).deliver_later

    render json: {}, status: :ok
  end

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
