class Api::UsersController < ApplicationController
  def create
    @user = User.new(create_user_params)
    profile_id = ProfileId.create
    @user.profile_url = 'user' + profile_id[:id].to_s
    @user.display_name = 'User' + profile_id[:id].to_s
    @user.profile_image.attach(io: File.open(Rails.root.join('app', 'assets', 'images', 'default_profile_image.jpg')), filename: 'default_profile_image.jpg')
    if @user.save
      login!(@user)
      render :display
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.with_attached_profile_image.all
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
    @users = [User.find_by(id: params[:id])]
    @songs = []
    if params[:user][:profile_image] == 'null'
      params[:user][:profile_image] = @users[0].profile_image
    end
    old_profile_url = @users[0].profile_url
    if @users[0].update(update_user_params)
      new_profile_url = params[:user][:profile_url]
      if new_profile_url != old_profile_url
        @old_songs = Song.where('user_url = ?', old_profile_url)
        @old_songs.each do |song|
          if song.update({ user_url: new_profile_url })
            @songs.push(song)
          end
        end
      end
      render 'api/songs/index'
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

  def display
    @user = User.find_by(id: params[:id])
    if @user
      render :display
    else
      render json: ['User not found'], status: 404
    end
  end

  protected
  def create_user_params
    params.require(:user).permit(:email, :age, :gender, :password, :profile_url, :display_name)
  end

  def update_user_params
    params.require(:user)
      .permit(:display_name, :profile_url, :first_name, :last_name, :city, :country, :bio, :profile_image)
  end
end