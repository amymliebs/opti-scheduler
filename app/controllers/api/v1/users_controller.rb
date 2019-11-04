class Api::V1::UsersController < ApiController
  before_action :authenticate_user!

  def index
    render json: current_user
  end

  def create
    user = User.find(params[:id])
    if user.save(user_params)
      render json: user
    else
      render json: user.errors
    end
  end

  def edit
    render json: user
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: user.errors
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
