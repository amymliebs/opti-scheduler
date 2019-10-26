class Api::V1::EventsController < ApiController
  def index
    render json: Event.all
  end
end
