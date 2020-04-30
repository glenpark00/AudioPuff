Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create, :index, :show, :update] do 
      resources :songs, only: [:create, :show, :update, :destroy, :index]
    end
    get 'song-search', to: 'songs#song_search'
    get 'exists', to: 'users#user_exists?'
    resource :session, only: [:create, :destroy]
  end
end