class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games, id: :uuid do |t|
      t.integer :singleton_guard, null: false, default: 0, index: { unique: true }
      t.string :words, array: true, default: []
    end
  end
end
