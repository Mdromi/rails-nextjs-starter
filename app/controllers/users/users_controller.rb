class Users::UsersController < ApplicationController
    # GET /users/:email
    def show_by_email
      email = params[:email]
  
      # Use safe navigation (&.) to avoid errors if email param is nil
      user = User.find_by(email: email)
  
      if user
        render json: user, status: :ok
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    rescue StandardError => e
      # Use a more specific error class instead of a blanket rescue
      render json: { error: e.message }, status: :internal_server_error
    end
  end
  