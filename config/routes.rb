Rails.application.routes.draw do
  root 'static_pages#index'

  get '/events', to: 'static_pages#index'
  get '/events/new', to: 'static_pages#index'
  get '/events/:id/invitees/:id', to: 'static_pages#index'
  get '/events/:id', to: 'static_pages#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :show, :create, :destroy] do
        resources :invitees, only: [:show, :edit]
      end
    end
  end
end
