require 'rails_helper'

RSpec.describe Player, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:player)).to be_valid
  end

  it 'is invalid without an email' do
    expect(FactoryBot.build(:player, email: nil)).to_not be_valid
  end

  describe '#fetch' do
    context 'when player exists' do
      let!(:subject) { FactoryBot.create(:player) }

      it 'returns the existing player' do
        expect(Player.fetch(subject.email)).to eq subject
      end

      it 'is case-insensitive' do
        expect(Player.fetch(subject.email.upcase)).to eq subject
      end
    end

    context 'when player does not exist' do
      it 'creates a new player' do
        expect { Player.fetch('new@example.com') }.to change { Player.count }.by 1
      end
    end
  end
end
