# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_02_181000) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "likes", force: :cascade do |t|
    t.string "song_url", null: false
    t.string "user_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["song_url", "user_url"], name: "index_likes_on_song_url_and_user_url", unique: true
    t.index ["song_url"], name: "index_likes_on_song_url"
    t.index ["user_url"], name: "index_likes_on_user_url"
  end

  create_table "profile_ids", force: :cascade do |t|
  end

  create_table "songs", force: :cascade do |t|
    t.string "title", null: false
    t.string "song_url", null: false
    t.text "description", default: "", null: false
    t.string "genre", null: false
    t.string "user_url", null: false
    t.integer "duration", null: false
    t.string "waveform", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_url", "song_url"], name: "index_songs_on_user_url_and_song_url", unique: true
    t.index ["user_url", "title"], name: "index_songs_on_user_url_and_title", unique: true
    t.index ["user_url"], name: "index_songs_on_user_url"
  end

  create_table "users", force: :cascade do |t|
    t.string "profile_url", null: false
    t.string "email", null: false
    t.string "display_name", null: false
    t.integer "age", null: false
    t.string "gender", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "city", default: "", null: false
    t.string "country", default: "", null: false
    t.text "bio", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["profile_url"], name: "index_users_on_profile_url", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
