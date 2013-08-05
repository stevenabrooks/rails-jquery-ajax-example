# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

task1 = Task.create( name: 'Walk the dog.', completed: false, position: 1 )
task2 = Task.create( name: 'Take out the trash.', completed: false, position: 2 )
task3 = Task.create( name: 'Wash the dishes.', completed: true, position: 3 )