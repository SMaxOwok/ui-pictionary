require 'rails_helper'

RSpec.describe Players::Verify do
  let(:player) { FactoryBot.create(:player) }

  context 'when valid verification token' do
    it 'sets the player\'s :verified_at' do
      expect do
        described_class.run player: player,
                            verification_token: player.verification_token
      end.to change(player, :verified_at).from(nil).to(be_present)
    end
  end

  context 'when invalid verification token' do
    it 'does not set the player\'s :verified_at' do
      expect do
        described_class.run player: player,
                            verification_token: 'ABCDEF'
      end.to_not change(player, :verified_at)
    end
  end
end
