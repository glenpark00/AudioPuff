# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

demo = User.create({ profile_url: "puffy2", display_name: "Puff", email: "puf@gmail.com", age: 23, gender: "Male", password: "password", first_name: "Puffy", last_name: "Cloud", city: "San Francisco", country: "USA" })
demo.profile_image.attach(io: open('https://audiopuff-seeds.s3-us-west-1.amazonaws.com/image_2.jpg'), filename: 'image_2.jpg')

user1 = User.create({ profile_url: "glen", display_name: "Glen", email: "glen@gmail.com", age: 24, gender: "Male", password: "password", first_name: "Glen", last_name: "Park", city: "San Francisco", country: "USA" })
user1.profile_image.attach(io: open('https://audiopuff-seeds.s3-us-west-1.amazonaws.com/image_3.jpg'), filename: 'image_3.jpg')

user2 = User.create({ profile_url: "katie", display_name: "Katie", email: "kt@gmail.com", age: 23, gender: "Female", password: "password", first_name: "Katie", last_name: "Shin", city: "San Francisco", country: "USA" })
user2.profile_image.attach(io: open('https://audiopuff-seeds.s3-us-west-1.amazonaws.com/image_4.jpg'), filename: 'image_4.jpg')

user_photos = ['https://audiopuff-seeds.s3-us-west-1.amazonaws.com/user_images/u_image_1.jpg', 'https://audiopuff-seeds.s3-us-west-1.amazonaws.com/user_images/u_image_2.jpg', 'https://audiopuff-seeds.s3-us-west-1.amazonaws.com/user_images/u_image_3.jpg', 'https://audiopuff-seeds.s3-us-west-1.amazonaws.com/user_images/u_image_4.jpg', 'https://audiopuff-seeds.s3-us-west-1.amazonaws.com/user_images/u_image_5.jpg', 'https://audiopuff-seeds.s3-us-west-1.amazonaws.com/user_images/u_image_6.jpg', 'https://audiopuff-seeds.s3-us-west-1.amazonaws.com/user_images/u_image_7.jpg']

7.times do
  user = User.create({
    profile_url: Faker::Internet.unique.username(specifier: 8),
    display_name: Faker::Name.unique.name,
    email: Faker::Internet.safe_email,
    age: Faker::Number.within(range: 15..100),
    gender: Faker::Gender.type,
    password: 'password',
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    city: "San Francisco",
    country: 'USA'
  })
  user.profile_image.attach(io: open(user_photos.shift), filename: 'u_image.jpg')
end

i = 1
u_id = 1
song_image_url_frag = 'https://audiopuff-seeds.s3-us-west-1.amazonaws.com/song_images/s_image_' # needs 'n.jpg'
song_audio_url_frag = 'https://audiopuff-seeds.s3-us-west-1.amazonaws.com/audio_files/audio_' # needs 'n.mp3'
while i <= 50
  song = Song.create({
    title: Faker::Book.unique.title,
    song_url: Faker::Internet.unique.domain_word,
    duration: Faker::Number.within(range: 80..200),
    genre: 'None',
    created_at: Faker::Date.in_date_period(month: 5),
    user_id: u_id
  })
  song.image_file.attach(io: open(song_image_url_frag + i.to_s + '.jpg'), filename: 's_image.jpg')
  song.audio_file.attach(io: open(song_audio_url_frag + i.to_s + '.mp3'), filename: 's_image.jpg')
  i += 1
  u_id += 1 if i % 5 == 1
end