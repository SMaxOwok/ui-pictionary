class AddRoundCountToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :round_count, :integer, null: false, default: 0
  end
end
