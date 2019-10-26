class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :event_name, null: false
      t.text :event_description
      t.date :event_date
      t.date :rsvp_date
      t.string :access_code, index: true, unique: true
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
