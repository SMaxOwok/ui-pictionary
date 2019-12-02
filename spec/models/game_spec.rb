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

  describe '#set_default_rounds!' do
    context 'when round info is present' do
      let(:subject) do
        FactoryBot.create(:game).tap do |game|
          game.current_round = { artist: '2', current_word: 'word', guessed_words: [] }
          game.previous_round = { artist: '1', current_word: 'word', guessed_words: %w(one two) }
        end
      end

      it 'does not change the rounds' do
        expect { subject.__send__(:set_round_defaults!) }.to not_change(subject, :current_round)
                                                               .and not_change(subject, :previous_round)
      end
    end

    context 'when rounds are blank' do
      let(:subject) { FactoryBot.build(:game, current_round: {}, previous_round: {}) }

      it 'sets the correct keys' do
        expect { subject.__send__(:set_round_defaults!) }.to change(subject, :current_round)
                                                               .and change(subject, :previous_round)
      end
    end
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
