class AddColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :profilePicture, :string
    add_column :users, :userId, :integer
  end
end
