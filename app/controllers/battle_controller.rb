class BattleController < ApplicationController
  include HTTParty
  require 'json'

  def play
    if !session[:game_id] then 
      redirect_to root_path, :alert => 'no game id'
    end
  end

  def reset
    reset_session
    redirect_to root_path
  end

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


  def register

    reset_session
    request = {name: params[:name], email: params[:email]}

    begin
      response = self.class.post('http://battle.platform45.com/register',
        body: request.to_json)
      response['success'] = true
      # response = {"id"=>"2154", "x"=>3, "y"=>4, "success"=>true}
      session[:game_id] = response['id']
    rescue
      response = {success: false, message: 'problem contacting platform45'}
    end

    render json: {:csrfToken => form_authenticity_token}.merge(response)

  end


end
