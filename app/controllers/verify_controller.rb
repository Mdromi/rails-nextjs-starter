class VerifyController < ApplicationController
    skip_before_action :redirect_if_unverified
  
    def new
      @user = current_user
      render json: { user: @user }, status: :ok
    end
  
    def create
      current_user.send_pin!
      render json: { message: "Verification code has been sent to your email address." }, status: :ok
    end
  
    def edit
      @user = current_user
      render json: { user: @user }, status: :ok
    end
  
    def update
      code = "#{params[:pin_0]}#{params[:pin_1]}#{params[:pin_2]}#{params[:pin_3]}"
      @user = current_user
      if Time.now > current_user.pin_sent_at.advance(minutes: 60)
        render json: { error: "Your PIN has expired. Please request another." }, status: :unprocessable_entity
      elsif code.to_i == current_user.pin
        current_user.update(verified: true)
        render json: { message: "Your email address has been verified!" }, status: :ok
      else
        render json: { error: "The code you entered is invalid." }, status: :unprocessable_entity
      end
    end
end
  