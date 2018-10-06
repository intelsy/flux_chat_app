module Api
  class StatusesController < ApplicationController

    def index
      @status = user_signed_in?
      render json: @status
    end

  end
end
