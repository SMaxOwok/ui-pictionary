class AddEmailVerificationToPlayers < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :verified_at, :datetime
    add_column :players, :verification_token, :string
  end
end
