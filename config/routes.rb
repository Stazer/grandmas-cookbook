Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#show'

  resources :recipes, only: [:index, :create, :update, :destroy]
end
