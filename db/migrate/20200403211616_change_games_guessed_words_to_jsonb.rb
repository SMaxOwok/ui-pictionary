class ChangeGamesGuessedWordsToJsonb < ActiveRecord::Migration[5.2]
  def change
    remove_column :games, :guessed_words, :string, array: true, default: []
    add_column :games, :gallery, :jsonb, null: false, default: {}
  end
end
