# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

demo = User.create({ profile_url: "puffy2", display_name: "Puff", email: "puf@gmail.com", age: 23, gender: "Male", password: "password", first_name: "Puffy", last_name: "Cloud", city: "San Francisco", country: "USA" })
demo.profile_image.purge
demo.profile_image.attach(io: open('https://audiopuff-seeds.s3-us-west-1.amazonaws.com/image_2.jpg'), filename: 'image_2.jpg')

user1 = User.create({ profile_url: "glen", display_name: "Glen", email: "glen@gmail.com", age: 24, gender: "Male", password: "password", first_name: "Glen", last_name: "Park", city: "San Francisco", country: "USA" })
user1.profile_image.purge
user1.profile_image.attach(io: open('https://audiopuff-seeds.s3-us-west-1.amazonaws.com/image_3.jpg'), filename: 'image_3.jpg')

user2 = User.create({ profile_url: "katie", display_name: "Katie", email: "kt@gmail.com", age: 23, gender: "Female", password: "password", first_name: "Katie", last_name: "Shin", city: "San Francisco", country: "USA" })
user2.profile_image.purge
user2.profile_image.attach(io: open('https://audiopuff-seeds.s3-us-west-1.amazonaws.com/image_4.jpg'), filename: 'image_4.jpg')
