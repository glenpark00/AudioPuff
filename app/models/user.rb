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
class User < ApplicationRecord
  validates :profile_url, :email, :session_token, presence: true, uniqueness: true
  validates :display_name, :age, :gender, :password_digest, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_one_attached :profile_image

  has_many :songs,
    primary_key: :profile_url,
    foreign_key: :user_url,
    class_name: 'Song'

  has_many :likes,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'Like'

  has_many :liked_songs,
    through: :likes,
    source: :song

  has_many :followerRecords,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'Follow'

  has_many :followers,
    through: :followerRecords,
    source: :follower

  has_many :followingRecords,
    primary_key: :id,
    foreign_key: :follower_id,
    class_name: 'Follow'

  has_many :followings,
    through: :followingRecords,
    source: :user

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
