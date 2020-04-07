module Games
  class SaveDrawing < ActiveInteraction::Base
    string :word
    string :image
    record :game, default: -> { Game.instance }

    def execute
      game.gallery[word] = data

      game.skip_broadcast
      game.save
    end

    private

    def data
      {
        artist: artist,
        image: image
      }
    end

    def artist
      player = Player.find_by(id: game.current_round['artist'])
      return nil unless player.present?

      player.name
    end
  end
end
