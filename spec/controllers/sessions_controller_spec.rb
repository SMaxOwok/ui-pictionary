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

    context 'when invalid email' do
      it 'does not change the session' do
        expect do
          post :create, params: { email: 'some@thing.else' }
        end.to_not change { session[:player_id] }
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
