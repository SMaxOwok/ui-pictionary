class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams, id: :uuid do |t|
      t.belongs_to :game, type: :uuid, null: false
      t.integer :score, null: false, default: 0
      t.text :draw_order, array: true, default: []
    end
  end
end
