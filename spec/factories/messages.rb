FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/4/86a145626482049c4f2e89f863fbc68b.jpg")}
    user
    group
  end
end