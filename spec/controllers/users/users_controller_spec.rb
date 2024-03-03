require 'rails_helper'

RSpec.describe Users::UsersController, type: :controller do
  describe 'GET #show_by_email' do
    let(:user) { create(:user, email: 'test@example.com') }

    it 'returns http success' do
      get :show_by_email, params: { email: user.email }
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct user data' do
      get :show_by_email, params: { email: user.email }
      expect(JSON.parse(response.body)['email']).to eq(user.email)
    end

    it 'returns http not found for non-existent user' do
      get :show_by_email, params: { email: 'nonexistent@example.com' }
      expect(response).to have_http_status(:not_found)
    end
  end
end
