# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  profile_url     :string           not null
#  email           :string           not null
#  display_name    :string           not null
#  age             :integer          not null
#  gender          :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string           default(""), not null
#  last_name       :string           default(""), not null
#  city            :string           default(""), not null
#  country         :string           default(""), not null
#  bio             :text             default(""), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
