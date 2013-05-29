Battleship::Application.routes.draw do

  root to: 'battle#play'

  post '/nuke' => 'battle#nuke'

end
