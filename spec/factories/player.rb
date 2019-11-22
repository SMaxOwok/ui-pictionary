FactoryBot.define do
  factory :player do
    sequence(:email) { |n| "pictionary-#{n}@example.com" }
    name { 'Pictionary User' }
  end
end
