require 'rails_helper'

RSpec.describe Games::SubmitWord do
  let!(:game) { FactoryBot.create(:game) }

  it 'is invalid without a word' do
    expect(described_class.run word: '').to_not be_valid
  end

  context 'when word has not yet been submitted' do
    it 'adds the word to the word list' do
      expect do
        described_class.run word: 'new word'
        game.reload
      end.to change(game, :words).from([]).to(['new word'])
    end
  end

  context 'when word has already been submitted' do
    before(:each) { game.update words: ['new word'] }

    it 'does not the word to the word list' do
      expect do
        described_class.run word: 'new word'
        game.reload
      end.to_not change(game, :words)
    end
  end
end
