class Api::SongsController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]

  def create 
    @song = Song.new(song_params)
    @song.user_id = params[:user_id].to_i
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.find_by(id: params[:id])
    if @song
      render :show
    else
      render json: ['Song not found'], status: 404
    end
  end

  def update
    @song = Song.find_by(id: params[:id])
    if @song.update(song_params)
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def destroy
    @song = Song.find_by(id: params[:id])
    @song.destroy
    render json: ['Song successfully deleted']
  end

  def index
    @songs = Song.where('user_id = ?', params[:user_id])
    render :index
  end

  def song_search

  end

  protected
  def song_params
    params.require(:song).permit(:title, :song_url, :genre, :description)
  end

  def require_login
    render json: ['You must be logged in to perform that action'], status: 403 unless logged_in?
  end
end
