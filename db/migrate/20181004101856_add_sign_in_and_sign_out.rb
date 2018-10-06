class AddSignInAndSignOut < ActiveRecord::Migration
  def change
    add_column :users, :sign_out, :integer
    add_column :users, :sign_in, :integer
  end
end
