# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_02_182531) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "game_transition_events", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "game_id"
    t.datetime "transition_at", null: false
    t.string "transition_to", null: false
    t.boolean "ran", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_transition_events_on_game_id"
  end

  create_table "game_transitions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "to_state", null: false
    t.jsonb "metadata", default: {}
    t.integer "sort_key", null: false
    t.uuid "game_id", null: false
    t.boolean "most_recent", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id", "most_recent"], name: "index_game_transitions_parent_most_recent", unique: true, where: "most_recent"
    t.index ["game_id", "sort_key"], name: "index_game_transitions_parent_sort", unique: true
  end

  create_table "games", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "singleton_guard", default: 0, null: false
    t.string "words", default: [], array: true
    t.integer "round_count", default: 0, null: false
    t.jsonb "current_round", default: {}, null: false
    t.jsonb "previous_round", default: {}, null: false
    t.index ["singleton_guard"], name: "index_games_on_singleton_guard", unique: true
  end

  create_table "players", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "team_id"
    t.citext "email", null: false
    t.string "name", null: false
    t.integer "guess_count", default: 0, null: false
    t.integer "draw_count", default: 0, null: false
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "teams", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "game_id", null: false
    t.integer "score", default: 0, null: false
    t.text "draw_order", default: [], array: true
    t.string "name", null: false
    t.integer "palette", default: 0, null: false
    t.integer "position", null: false
    t.index ["game_id"], name: "index_teams_on_game_id"
  end

  add_foreign_key "game_transitions", "games"
end
