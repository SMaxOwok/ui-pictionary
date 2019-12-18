require 'rails_helper'

RSpec.describe Rounds::Initialize do
  let!(:game) { FactoryBot.create(:game, words: %w[one two three]) }

  before do
    game.teams.first.players << [
      FactoryBot.build(:player),
      FactoryBot.build(:player)
    ]

    game.teams.last.players << [
      FactoryBot.build(:player),
      FactoryBot.build(:player)
    ]
  end

  describe 'the resulting round' do
    let(:subject) { described_class.run! game: game }

    before(:each) do
      game.teams.each { |team| Teams::SetDrawOrder.run! team: team }
    end

    it 'has an artist' do
      expect(subject['artist']).to be_present
    end

    it 'has a team' do
      expect(subject['team']).to be_present
    end

    it 'has a current_word' do
      expect(subject['current_word']).to be_present
    end

    it 'has an empty array for guessed_words' do
      expect(subject['guessed_words']).to eq []
    end

    it 'has two skips' do
      expect(subject['skips']).to eq 2
    end
  end
end
