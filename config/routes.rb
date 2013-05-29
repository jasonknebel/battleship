Battleship::Application.routes.draw do

  root to: 'battle#home'
  get '/play' => 'battle#play'

  post '/nuke' => 'battle#nuke'
  post '/register' => 'battle#register'

end
