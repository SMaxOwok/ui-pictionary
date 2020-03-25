module Players
  class Verify < ActiveInteraction::Base
    record :player
    string :verification_token

    def execute
      if valid_token?
        verify_player!
      else
        errors.add(:verification_token, 'is invalid')
      end

      player
    end

    private

    def valid_token?
      player.verification_token == verification_token
    end

    def verify_player!
      player.update(verified_at: Time.current)
    end
  end
end
