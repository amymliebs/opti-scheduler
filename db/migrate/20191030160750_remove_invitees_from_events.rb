class RemoveInviteesFromEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :invitees, :text
  end
end
