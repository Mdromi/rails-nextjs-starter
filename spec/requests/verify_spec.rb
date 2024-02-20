require 'rails_helper'

RSpec.describe VerifyController, type: :controller do
  let(:user) { create(:user) }

  before { allow(controller).to receive(:current_user).and_return(user) }

  describe 'GET #new' do
    it 'returns the current user' do
      get :new
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(user.to_json)
    end
  end

  describe 'POST #create' do
    it 'sends a verification code to the user email' do
      expect(user).to receive(:send_pin!)
      post :create
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['message']).to eq("Verification code has been sent to your email address.")
    end
  end

  describe 'GET #edit' do
    it 'returns the current user' do
      get :edit
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(user.to_json)
    end
  end

  describe 'PUT #update' do
    context 'when the pin has expired' do
      it 'renders an error message' do
        user.update(pin_sent_at: 2.hours.ago)
        put :update, params: { pin_0: '1', pin_1: '2', pin_2: '3', pin_3: '4' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['error']).to eq("Your PIN has expired. Please request another.")
      end
    end

    context 'when the pin is valid' do
      it 'marks the email as verified' do
        user.update(pin: '1234')
        put :update, params: { pin_0: '1', pin_1: '2', pin_2: '3', pin_3: '4' }
        user.reload
        expect(user.verified).to be_truthy
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['message']).to eq("Your email address has been verified!")
      end
    end

    context 'when the pin is invalid' do
      it 'renders an error message' do
        user.update(pin: '1234')
        put :update, params: { pin_0: '5', pin_1: '6', pin_2: '7', pin_3: '8' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['error']).to eq("The code you entered is invalid.")
      end
    end
  end
end
