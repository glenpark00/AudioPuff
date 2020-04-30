# Because SoundCloud's way of showing the user's profile page includes taking their profile_url and having that be the "wildcard" instead of users/:id; find out later on how to change the show and index methods to use profile_url as the wildcard (probably still have to somehow put it in params)

class Api::UsersController < ApplicationController
  def create
    @user = User.new(create_user_params)
    profile_id = ProfileId.create
    @user.profile_url = 'user' + profile_id[:id].to_s
    @user.display_name = 'User' + profile_id[:id].to_s
    if @user.save
      login!(@user)
      render :display
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # The index controller method will eventually be used for searching users that match some criteria; instead of using User.all, you'll probably have to create your own ActiveRecord User model method to query for specific results; you'll likely use the query string params as the input for that method, and you'll use a .where() with username LIKE 'substring%' SQL method
  def index
    @users = User.all
    render :index
  end
 
  def show
    @user = User.find_by(id: params[:id])
    if @user 
      render :show
    else
      render json: ['User not found'], status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(update_user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def user_exists?
    user = User.where("email = ? OR profile_url = ?", params[:identifier], params[:identifier])[0]
    if user
      render json: true
    else
      render json: false
    end
  end

  protected
  def create_user_params
    params.require(:user).permit(:email, :age, :gender, :password, :profile_url, :display_name)
  end

  def update_user_params
    params.require(:user)
      .permit(:display_name, :profile_url, :first_name, :last_name, :city, :country, :bio)
  end
end