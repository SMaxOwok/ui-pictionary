require 'rails_helper'

RSpec.describe Player, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:player)).to be_valid
  end

  it 'is invalid without an email' do
    expect(FactoryBot.build(:player, email: nil)).to_not be_valid
  end

  it 'is invalid without a name' do
    expect(FactoryBot.build(:player, name: nil)).to_not be_valid
  end
end
