class Game < ApplicationRecord

  # Validations
  validates :singleton_guard, inclusion: [0], uniqueness: true

  class << self
    def instance
      first_or_create(singleton_guard: 0)
    end
  end
end
