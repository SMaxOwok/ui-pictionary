class CreateGameTransitions < ActiveRecord::Migration[5.2]
  def change
    create_table :game_transitions, id: :uuid do |t|
      t.string :to_state, null: false
      t.jsonb :metadata, default: {}
      t.integer :sort_key, null: false
      t.uuid :game_id, null: false
      t.boolean :most_recent, null: false
      t.timestamps null: false
    end

    add_foreign_key :game_transitions, :games

    add_index(:game_transitions,
              %i[game_id sort_key],
              unique: true,
              name: 'index_game_transitions_parent_sort')
    add_index(:game_transitions,
              %i[game_id most_recent],
              unique: true,
              where: 'most_recent',
              name: 'index_game_transitions_parent_most_recent')
  end
end
