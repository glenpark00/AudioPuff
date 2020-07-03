# == Schema Information
#
# Table name: songs
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  song_url    :string           not null
#  description :text             default(""), not null
#  genre       :string           not null
#  user_url    :string           not null
#  duration    :integer          not null
#  waveform    :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'test_helper'

class SongTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
