class AddRoundsToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :current_round, :jsonb, default: {}, null: false
    add_column :games, :previous_round, :jsonb, default: {}, null: false
  end
end
