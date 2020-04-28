# == Schema Information
#
# Table name: users
#
#  id                :bigint           not null, primary key
#  profile_url       :string           not null
#  email             :string           not null
#  profile_image_url :string
#  header_image_url  :string
#  age               :integer
#  gender            :string           not null
#  password_digest   :string           not null
#  session_token     :string           not null
#  first_name        :string
#  last_name         :string
#  city              :string
#  country           :string
#  bio               :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
