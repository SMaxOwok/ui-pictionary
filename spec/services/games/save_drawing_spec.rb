require 'rails_helper'

RSpec.describe Games::SaveDrawing do
  let!(:game) { FactoryBot.create(:game) }

  it 'adds the drawing to the gallery' do
    expect do
      described_class.run word: 'a word',
                          image: 'data:image/png;base64,etc...'
      game.reload
    end.to change game, :gallery
  end

  describe 'the drawing' do
    let(:word) { 'rowan' }
    let(:image) { 'data:image/png;base64,etc...' }

    before(:each) do
      described_class.run word: word, image: image
      game.reload
    end

    it 'has a key matching the word' do
      expect(game.gallery).to have_key word
    end

    it 'has an artist value' do
      expect(game.gallery[word]).to have_key 'artist'
    end

    it 'has a string dataURI image value' do
      expect(game.gallery.dig(word, 'image')).to eq image
    end
  end
end
