class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.string :song_url, null: false
      t.text :description, null: false, default: ''
      t.string :genre, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    add_index :songs, :user_id
    add_index :songs, [:user_id, :song_url], unique: true
  end
end
