IvanTheTerriblesBlog::Application.routes.draw do

  resources :posts do
    resources :comments
  end

  resources :comments
  resources :replies

  root :to => 'posts#index'

end

