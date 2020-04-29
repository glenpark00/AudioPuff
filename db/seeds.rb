# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demo = User.create({ profile_url: "puffy2", display_name: "Puff", email: "puf@gmail.com", age: 23, gender: "Male", password: "password" })
user1 = User.create({ profile_url: "glen", display_name: "Glen", email: "glen@gmail.com", age: 24, gender: "Male", password: "password" })
user2 = User.create({ profile_url: "katie", display_name: "Katie", email: "kt@gmail.com", age: 23, gender: "Female", password: "password" })