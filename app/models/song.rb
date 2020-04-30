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
  validates :title, :song_url, :description, :genre, :user_id, presence: true

  has_one_attached :audio_file

  has_one_attached :image
end
