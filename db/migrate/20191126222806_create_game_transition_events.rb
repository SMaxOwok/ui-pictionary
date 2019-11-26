class CreateGameTransitionEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :game_transition_events, id: :uuid do |t|
      t.belongs_to :game, type: :uuid
      t.datetime :transition_at, null: false
      t.string :transition_to, null: false
      t.boolean :ran, null: false, default: false

      t.timestamps
    end
  end
end
