class Api::V1::HealthController < ApplicationController
    def index
        render json: { message: 'Hello from Rails API!' }
    end
end
