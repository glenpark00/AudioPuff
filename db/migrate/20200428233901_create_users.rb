class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :profile_url, null: false
      t.string :email, null: false
      t.string :display_name, null: false
      t.integer :age, null: false, greater_than_or_equal_to: 15
      t.string :gender, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :first_name, null: false, default: '' 
      t.string :last_name, null: false, default: ''
      t.string :city, null: false, default: ''
      t.string :country, null: false, default: ''
      t.text :bio, null: false, default: ''
      t.timestamps
    end
    add_index :users, :profile_url, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
