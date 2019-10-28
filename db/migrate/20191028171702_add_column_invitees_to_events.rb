class AddColumnInviteesToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :invitees, :text
  end
end
