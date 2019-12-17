require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'application#index'

  resource :me, only: [:update], controller: :me
  post 'ready', to: 'me#set_ready', as: :set_ready
  post 'unready', to: 'me#set_unready', as: :set_unready

  resource :sessions, only: [:create, :destroy]

  mount ActionCable.server, at: '/cable'
  mount Sidekiq::Web, at: '/sidekiq'
end
