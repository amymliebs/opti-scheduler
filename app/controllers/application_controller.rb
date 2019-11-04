class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  protected

  def authenticate_user!
    if user_signed_in?
      super
    elsif request.original_fullpath == new_user_registration_path
      super
    elsif request.original_fullpath == user_session
      super
    elsif request.original_fullpath == new_user_session_path
      super
    elsif request.original_fullpath == new_user_password_path
      super
    else
      redirect_to welcome_path if request.original_fullpath != welcome_path
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :role])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:first_name, :last_name, :role])
  end
end
