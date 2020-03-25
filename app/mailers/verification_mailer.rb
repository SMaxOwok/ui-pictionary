class VerificationMailer < ApplicationMailer
  def verification_email(player)
    @player = player

    mail(to: player.email, subject: 'Verify your email address')
  end
end
