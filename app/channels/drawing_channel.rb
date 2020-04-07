class DrawingChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'drawing_channel'
  end

  def draw(data)
    Channels::BroadcastMessageJob.perform_now 'drawing_channel', data['plots']
  end

  def save(data)
    Games::SaveDrawing.run! word: data['word'], image: data['image']
  end

  def unsubscribed; end
end
