module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      contents = params[:contents]
      from = params[:from]
      timestamp = params[:timestamp]

      @message = Message.new(contents: contents, from: from, timestamp: timestamp)
      respond_to do |format|
        if @message.save
          format.html { render :nothing => true }
          format.json { render :nothing => true, text: "Test" }
          # format.html { redirect_to @message, notice: 'Message was successfully created.' }
          # format.json { render :show, status: :created, location: @message }
        else
          format.html { render :new }
          format.json { render json: @message.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  private
    def message_params
      params.require(:message).permit( :contents, :from, :timestamp)
    end
end

# show.json.jbuilder
# json.extract! @message, :contents, :from, :timestamp
