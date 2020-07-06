class Api::FollowsController < ApplicationController
  def create
    follow = Follow.new(follow_params)
    if follow.save
      render json: ['Successful follow'], status: 200
    else
      render json: ['Unsuccessful follow'], status: 422
    end
  end

  def destroy
    follow = Follow.find_by(follow_params)
    if follow.destroy
      render json: ['Successful unfollow'], status: 200
    else
      render json: ['Unsuccessful unfollow'], status: 422
    end
  end

  def follow_params
    params.permit(:user_id, :follower_id)
  end
end
