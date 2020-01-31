require 'rails_helper'

RSpec.describe Games::Reset do
  let!(:game) do
    game = FactoryBot.create(:game, words: %w[one two three], round_count: 8)

    game.transition_to! :setup
    game.transition_to! :pre_draw
    game.reload
  end

  def running_the_interaction!
    described_class.run!
    game.reload
  end

  describe 'its attributes' do
    describe ':words' do
      it 'resets to empty array' do
        expect { running_the_interaction! }.to change(game, :words).to([])
      end
    end

    describe ':round_count' do
      it 'resets to 0' do
        expect { running_the_interaction! }.to change(game, :round_count).to(0)
      end
    end
  end

  describe 'its rounds' do
    let(:expected) do
      { 'artist' => nil, 'team' => nil, 'current_word' => nil, 'guessed_words' => [], 'skips' => 2 }
    end

    it 'resets :current_round to defaults' do
      expect { running_the_interaction! }.to change(game, :current_round).to(expected)
    end

    it 'resets :previous_round to defaults' do
      game.transition_to! :drawing
      game.transition_to! :pre_draw
      game.reload

      expect { running_the_interaction! }.to change(game, :previous_round).to(expected)
    end
  end

  describe 'its transitions' do
    it 'destroys all transitions' do
      expect { running_the_interaction! }.to change(game.game_transitions, :count).to(0)
    end
  end
end
