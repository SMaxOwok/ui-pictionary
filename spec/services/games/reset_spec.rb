require 'rails_helper'

RSpec.describe Games::Reset do
  let!(:game) do
    game = FactoryBot.create(:game).tap do |object|
      object.words = %w[one two three]
      object.round_count = 9
    end

    game.transition_to! :setup
    game
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

  describe 'the teams' do
    it 'has two teams' do
      expect { running_the_interaction! }.to_not change(game.teams, :size).from(2)
    end

    it 'has a "Researchers" team' do
      running_the_interaction!

      expect(game.teams.find_by(name: 'Researchers')).to be_present
    end

    it 'has a "Participants" team' do
      running_the_interaction!

      expect(game.teams.find_by(name: 'Participants')).to be_present
    end
  end

  describe 'its transitions' do
    it 'destroys all transitions' do
      expect { running_the_interaction! }.to change(game.game_transitions, :count).to(0)
    end
  end
end
