class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players, id: :uuid do |t|
      t.belongs_to :team, type: :uuid
      t.citext :email, null: false
      t.string :name, null: false
      t.integer :guess_count, null: false, default: 0
      t.integer :draw_count, null: false, default: 0
    end
  end
end
