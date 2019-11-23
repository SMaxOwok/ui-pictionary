class AddNameAndPaletteToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :name, :string, null: false
    add_column :teams, :palette, :integer, null: false, default: 0
  end
end
