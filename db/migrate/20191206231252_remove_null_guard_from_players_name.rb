class RemoveNullGuardFromPlayersName < ActiveRecord::Migration[5.2]
  def change
    change_column :players, :name, :string, null: true
  end
end
