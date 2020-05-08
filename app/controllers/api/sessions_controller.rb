class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:identifier],
      params[:user][:password]
    )
    if @user
      login!(@user)
      render 'api/users/display'
    else
      render json: ['This password is incorrect.'], status: 401
    end
  end

  def destroy
    if logged_in?
      logout!
      render json: ['Successfully logged out']
    else
      render json: ['Invalid action'], status: 404
    end
  end
end
