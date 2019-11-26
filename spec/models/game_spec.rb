require 'rails_helper'

RSpec.describe Game, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:game)).to be_valid
  end

  it 'is a singleton' do
    FactoryBot.create(:game)
    expect(FactoryBot.build(:game)).to_not be_valid
  end

  it 'is created with two teams' do
    game = FactoryBot.create(:game)

    expect(game.teams.size).to eq 2
  end

  describe '#instance' do
    context 'when Game doesn\'t exist' do
      it 'creates a new game' do
        expect { Game.instance }.to change { Game.count }.by(1)
      end
    end

    context 'when Game does exist' do
      let!(:game) { FactoryBot.create(:game) }

      it 'returns the game' do
        expect(Game.instance).to eq game
      end
    end
  end
end
