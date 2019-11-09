Rails.application.routes.draw do
  root 'static_pages#index'

  get '/', to: 'static_pages#index'
  get '/events', to: 'static_pages#index'
  get '/events/new', to: 'static_pages#index'
  get '/events/:event_code/invitees/:invitee_code', to: 'static_pages#index'
  get '/events/:event_code', to: 'static_pages#index'
  get '/thankyou', to: 'static_pages#index'

  patch '/events/:event_code/create_schedule', to: 'static_pages#index'
  post '/events/:event_code/send_reminder', to: 'static_pages#index'

  devise_for :users, :controllers => { :registrations => :registrations }

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :show, :create, :destroy] do
        resources :invitees, only: [:show, :update]
        member do
          patch :create_schedule
          post :send_reminder
        end
      end
    end
  end
end
