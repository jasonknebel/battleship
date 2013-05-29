class BattleController < ApplicationController
  include HTTParty
  require 'json'

  def nuke
    request = {id: session[:game_id], x: params[:x], y: params[:y]}

    begin
      response = self.class.post('http://battle.platform45.com/nuke', 
        body: request.to_json)
      response['success'] = true
    rescue
      response = {success: false, message: 'problem contacting platform45'}
    end

    render json: response
  end

end
