require 'csv'
require 'json'

countries = {}
# CSV.foreach("eff_v_official_retirement_age.csv") do |row|
#   countries[row[0]] = 0
# end

f = open('life_expectancy.csv', "r:UTF-8")
CSV.foreach(f) do |row|
  countries[row[0]] = row[1]# unless countries[row[0]].nil?
end

puts countries.to_json

