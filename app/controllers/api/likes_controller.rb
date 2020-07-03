class Api::LikesController < ApplicationController
  def create
    like = Like.new(like_params)
    if like.save
      render json: ['Successful like'], status: 200
    else
      render json: ['Unsuccessful like'], status: 422
    end
  end

  def destroy
    like = Like.find_by(like_params)
    if like.destroy
      render json: ['Successful unlike'], status: 200
    else
      render json: ['Unsuccessful unlike'], status: 422
    end
  end

  def like_params
    params.permit(:song_url, :user_url)
  end
end
