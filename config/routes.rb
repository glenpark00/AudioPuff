Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create, :index, :show, :update] do 
      resources :songs, only: [:index]
    end
    resources :songs, only: [:create, :update, :destroy]

    get 'user-display/:id', to: 'users#display'
    get 'exists', to: 'users#user_exists?'
    get 'users/profile/:profile_url', to: 'users#get_by_profile_url'

    get ':profile_url/:song_url', to: 'songs#show'
    get 'songs/:id/file', to: 'songs#fetch_song_file'
    get 'songs', to: 'songs#all_songs'
    get 'song-search', to: 'songs#song_search'
    resource :session, only: [:create, :destroy]
  end
end