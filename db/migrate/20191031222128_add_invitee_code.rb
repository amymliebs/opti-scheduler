class AddInviteeCode < ActiveRecord::Migration[5.2]
  def change
    add_column :invitees, :invitee_code, :string, index: true, unique: true
  end
end
