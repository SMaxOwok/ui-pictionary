FactoryBot.define do
  factory :team do
    sequence(:name) { |n| "Team-#{n}" }
    game
  end
end
