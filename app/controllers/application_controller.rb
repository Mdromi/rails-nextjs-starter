class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :redirect_if_unverified

  def redirect_if_unverified
    return unless current_user && !current_user.verified?

    render json: { error: "Please verify your email address" }, status: :unauthorized
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :avatar, :role])
  end

  def current_user
    @current_user ||= authorize_request
  end

  private

  def authorize_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header.present?
    return nil unless token
    puts "token #{token}"
    begin
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
      User.find(jwt_payload['sub'])
    rescue JWT::DecodeError => e
      nil
    end
  end
end