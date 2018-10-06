class AddColumnTimestamp < ActiveRecord::Migration
  def change
    add_column :messages, :timestamp, :integer, limit: 21
  end
end
