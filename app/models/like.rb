# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  song_id    :string           not null
#  user_id    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
  validates :user_id, uniqueness: { scope: :song_id }

  belongs_to :song,
    primary_key: :id,
    foreign_key: :song_id,
    class_name: 'Song'

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'
end
