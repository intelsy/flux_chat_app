Rails.application.routes.draw do
  get 'users/index'
  get 'users/show'

  devise_for :users,
  controllers: { confirmations: 'confirmations', registrations: 'registrations', sessions: 'users/sessions'}
  resources :users, :only => [:index, :show]

  namespace :api, { format: 'json' } do
    resources :messages
    resources :statuses
  end

  resources :messages
  root 'messages#index'
end
