class CreateTimeslots < ActiveRecord::Migration[5.2]
  def change
    create_table :timeslots do |t|
      t.string :slot, null: false
      t.belongs_to :event, index: true
      t.timestamps
    end
  end
end
