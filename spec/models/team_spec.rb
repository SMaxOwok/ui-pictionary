require 'rails_helper'

RSpec.describe Team, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:team)).to be_valid
  end
end
