class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'game_channel'
  end

  def transition_game(data)
    Game.instance.transition_to data['status'].to_sym
  end

  def submit_word(data)
    return unless data['word'].present?

    Games::SubmitWord.run! word: data['word']
  end

  def guess_word(data)
    return unless data['word'].present?

    Games::GuessWord.run! word: data['word'], player: data['player_id']
  end

  def unsubscribed; end
end
