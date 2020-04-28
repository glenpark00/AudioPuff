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
class User < ApplicationRecord
  validates :profile_url, :email, :session_token, presence: true, uniqueness: true
  validates :display_name, :age, :gender, :password_digest, presence: true
  # You're going to need to add a default and presence validation for the image urls, not including it now in db or model to make seeding easier
  validates :password, length: { minimum: 6 }, allow_nil: true

  before_validation :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(identifier, password) 
    user = User.where("email = ? OR profile_url = ?", identifier, identifier)[0]
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  protected
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
