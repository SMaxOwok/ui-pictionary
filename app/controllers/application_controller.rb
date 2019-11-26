class ApplicationController < ActionController::Base
  def index; end

  def current_user
    if session[:player_id]
      @current_user ||= Player.find(session[:player_id])
    else
      @current_user = nil
    end
  rescue ActiveRecord::RecordNotFound
    @current_user = nil
  end
  helper_method :current_user
end
