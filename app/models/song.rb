# == Schema Information
#
# Table name: songs
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  song_url    :string           not null
#  description :text             default(""), not null
#  genre       :string           not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Song < ApplicationRecord
  validates :title, :song_url, :genre, :user_url, presence: true
  validates :title, uniqueness: { scope: :user_url }
  validates :song_url, uniqueness: { scope: :user_url }

  belongs_to :user,
    primary_key: :profile_url,
    foreign_key: :user_url,
    class_name: 'User'

  has_one_attached :audio_file

  has_one_attached :image_file
end
