class AddPhoneToInvitees < ActiveRecord::Migration[5.2]
  def change
    add_column :invitees, :phone, :string
  end
end
