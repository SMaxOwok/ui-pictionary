class AddReadyPlayersToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :ready_player_ids, :text, array: true, default: [], null: false
  end
end
