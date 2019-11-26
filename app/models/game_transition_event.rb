class GameTransitionEvent < ApplicationRecord
  # Relationships
  belongs_to :game

  after_create :touch_game!

  # TODO: We can lighten the queue, if I can figure out how to get
  # this timing to work correctly.
  # Sets the cron job to run at the minute
  # def at
  #   transition_at.strftime('%H:%S')
  # end

  # Runs the job every second
  def frequency
    1.second
  end

  # Returns early unless the actually trigger time has passed
  def transition_game!
    return if ran?
    return unless Time.current >= transition_at

    Games::TransitionJob.perform_now transition_to
    update ran: true
  end

  private

  def touch_game!
    game.touch
  end
end
