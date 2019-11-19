require 'rails_helper'

RSpec.describe Games::StateMachine do
  let!(:game) { FactoryBot.create(:game) }

  it 'is initially :initialize' do
    expect(game.current_state).to eq 'initialized'
  end
end
