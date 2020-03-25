module RequestHelpers
  def sign_in_as(user)
    return nil unless user.present?

    post sessions_path(user), params: { email: user.email }
  end

  def parsed_response
    JSON.parse(response.body).with_indifferent_access
  end

  RSpec.configure do |c|
    c.include RequestHelpers, type: :request
  end
end
