require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  let(:player) { FactoryBot.create(:player) }

  describe '#create' do
    context 'when valid email' do
      it 'sets the player ID in session' do
        expect do
          post :create, params: { email: player.email }
        end.to change { session[:player_id] }.to(player.id)
      end
    end
  end

  describe '#destroy' do
    context 'when player is logged in' do
      before(:each) { post :create, params: { email: player.email } }

      it 'destroys the session' do
        expect { delete :destroy }.to change { session[:player_id] }.from(player.id).to(nil)
      end
    end
  end
end
