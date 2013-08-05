class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
    	t.integer :id
    	t.string :name
    	t.boolean :completed
      t.timestamps
    end
  end
end
