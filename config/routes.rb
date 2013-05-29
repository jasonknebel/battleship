Battleship::Application.routes.draw do

  root to: 'battle#home'
  get '/play' => 'battle#play'
  get '/reset' =>'battle#reset'

  post '/nuke' => 'battle#nuke'
  post '/register' => 'battle#register'

end
