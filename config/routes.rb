Rails.application.routes.draw do
  root 'static_pages#index'

  get '/welcome', to: 'static_pages#index'
  get '/', to: 'static_pages#index'
  get '/events/new', to: 'static_pages#index'
  get '/events/:event_code/invitees/:invitee_code', to: 'static_pages#index'
  get '/events/:event_code', to: 'static_pages#index'
  get '/thankyou', to: 'static_pages#index'
  get '*', to: 'static_pages#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :show, :create, :destroy] do
        resources :invitees, only: [:show, :update]
      end
    end
  end
end
