class CreateInvitees < ActiveRecord::Migration[5.2]
  def change
    create_table :invitees do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, null: false, default: ""
      t.text :note
      t.belongs_to :event, index: true
      t.timestamps
    end
  end
end
