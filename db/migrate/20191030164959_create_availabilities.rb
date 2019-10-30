class CreateAvailabilities < ActiveRecord::Migration[5.2]
  def change
    create_table :availabilities do |t|
      t.string :status, null: false, default: "available"
      t.belongs_to :timeslot, null: false
      t.belongs_to :invitee, null: false
      t.timestamps
    end
  end
end
