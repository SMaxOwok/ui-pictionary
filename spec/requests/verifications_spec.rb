require "rails_helper"

RSpec.describe "Verifications API", type: :request do
  let(:player) { FactoryBot.create(:player) }

  describe 'verifies a player' do
    before(:each) do
      sign_in_as(player)
      post verifications_path, params: params
    end

    describe 'the response' do
      context 'when valid verification_token' do
        let(:params) {{ verification_token: player.verification_token }}

        it 'has a 204 CREATED status code' do
          expect(response).to have_http_status(:created)
        end
      end

      context 'when invalid verification_token' do
        let(:params) {{ verification_token: 'ABCDEF' }}

        it 'has a 422 UNPROCESSABLE ENTITY status code' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'has an error message' do
          expect(parsed_response.dig(:errors, :verification_token)).to be_present
        end
      end
    end
  end
end
