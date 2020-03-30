class AddGuessedWordsToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :guessed_words, :string, array: true, default: []
  end
end
