class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.string :song_url, null: false
      t.string :user_url, null: false
      t.timestamps
    end

    add_index :likes, [:song_url, :user_url], unique: true
    add_index :likes, :song_url
    add_index :likes, :user_url
  end
end
