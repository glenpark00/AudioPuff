# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  song_url   :string           not null
#  user_url   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
  # attr_accessor :song_url, :user_url

  validates :user_url, uniqueness: { scope: :song_url }

  belongs_to :song,
    primary_key: :song_url,
    foreign_key: :song_url,
    class_name: 'Song'

  belongs_to :user,
    primary_key: :profile_url,
    foreign_key: :user_url,
    class_name: 'User'
end
