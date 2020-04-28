class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :profile_url, null: false
      t.string :email, null: false
      t.string :profile_image_url
      t.string :header_image_url
      t.integer :age, greater_than_or_equal_to: 15
      t.string :gender, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :first_name
      t.string :last_name
      t.string :city
      t.string :country
      t.text :bio
      t.timestamps
    end

    add_index :users, :profile_url, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end