class AddRsvpStatusToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :rsvp_status, :string, null: false, default: "Schedule pending"
  end
end
