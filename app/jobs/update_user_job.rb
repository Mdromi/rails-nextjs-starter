class UpdateUserJob < ApplicationJob
    queue_as :default
  
    def perform(user)
      user.update(verified: true)
    end
end
