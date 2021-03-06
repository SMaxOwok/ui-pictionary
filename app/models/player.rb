class Player < ApplicationRecord
  # Associations
  belongs_to :team,
             inverse_of: :players,
             required: false,
             touch: true

  # Scopes
  scope :top_guessers, -> { order(guess_count: :desc).limit(5) }
  scope :top_drawers, -> { order(draw_count: :desc).limit(5) }

  # Validations
  validates :email, presence: true, uniqueness: true

  # Callbacks
  before_create :set_verification_token!
  after_create :send_verification_email!
  after_commit :broadcast!, unless: :skip_broadcast, if: :persisted?

  attr_accessor :skip_broadcast

  def abandon_team!
    return unless team.present?

    team.remove_player!(self)
  end

  def email_verified?
    verified_at.present?
  end

  # Hack to force after_add method to be called, obviously not the most efficient.
  def team_id=(team_id)
    if team_id.nil?
      self.team_id = nil
    else
      Team.find(team_id).players << self
    end
  end

  private

  def broadcast!
    Channels::BroadcastObjectJob.perform_now "player:#{id}", self
  end

  def set_verification_token!
    self.verification_token = SecureRandom.urlsafe_base64(4).upcase
  end

  def send_verification_email!
    VerificationMailer.verification_email(self).deliver_later
  end

  class << self
    def fetch(email)
      find_or_create_by(email: email) if email.present?
    end
  end
end
