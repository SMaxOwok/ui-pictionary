require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'application#index'

  resource :me, only: [:update], controller: :me

  resource :sessions, only: [:create, :destroy]

  mount ActionCable.server, at: '/cable'
  mount Sidekiq::Web, at: '/sidekiq'
end
