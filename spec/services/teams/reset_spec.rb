require 'rails_helper'

RSpec.describe Games::Reset do
  let!(:team) do
    FactoryBot.create(:team).tap do |object|
      object.players << FactoryBot.build(:player)
      object.players << FactoryBot.build(:player)
      object.score = 14
      object.draw_order = object.players.shuffle
    end
  end

  def running_the_interaction!
    described_class.run! team: team
    team.reload
  end

  describe 'its attributes' do
    describe ':players' do
      it 'resets to empty array' do
        expect { running_the_interaction! }.to change(team, :players).to([])
      end
    end

    describe ':score' do
      it 'resets to 0' do
        expect { running_the_interaction! }.to change(team, :score).to(0)
      end
    end

    describe ':order' do
      it 'resets to empty array' do
        expect { running_the_interaction! }.to change(team, :draw_order).to([])
      end
    end
  end
end
