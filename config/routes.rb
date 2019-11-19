Rails.application.routes.draw do
  root to: 'application#index'

  mount ActionCable.server, at: '/cable'
end
