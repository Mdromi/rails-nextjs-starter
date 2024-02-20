FactoryBot.define do
    factory :user do
      email { 'test@example.com' }
      password { 'password' }
      # Add other attributes as needed
    end
end