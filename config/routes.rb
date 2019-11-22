Rails.application.routes.draw do
  root to: 'application#index'

  resource :sessions, only: [:create, :destroy]

  mount ActionCable.server, at: '/cable'
end
