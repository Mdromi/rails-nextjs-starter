Rails.application.routes.draw do
  # devise_for :users
  # Devise routes
  devise_for :users, path: '', path_names: {
  sign_in: 'login',
  sign_out: 'logout',
  registration: 'signup',
}, controllers: {
  sessions: 'users/sessions',
  registrations: 'users/registrations'
}


  # Custom email verification routes
  scope :verify do
    get '/', to: 'verify#edit', as: 'verify'
    get '/new', to: 'verify#new', as: 'new_verify'
    put '/update', to: 'verify#update', as: 'update_verify'
    post '/resend', to: 'verify#create', as: 'resend_verify'
  end

   # Route to get user by email
  #  get '/users/:email', to: 'users#show_by_email'
  # resources :users, controller: 'users/users'
  namespace :users do
    get '/:email', to: 'users#show_by_email'
  end
  #  resources :users, only: [] do
  #   get 'show_by_email', on: :collection
  # end
  

  # namespace :api, defaults: { format: 'json' } do
  #   namespace :v1 do
  #     resources :health, only: [:index]
  #     resources :registration
  #     resources :sessions
  #     resources :password_reset
  #     resources :password
  #   end
  # end

  resources :health, only: [:index], controller: 'health/health'


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
