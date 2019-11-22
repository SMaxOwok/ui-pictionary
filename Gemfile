source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.7'

gem 'active_model_serializers', '~> 0.10'
gem 'js-routes', '~> 1.4'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.3'
gem 'react-rails', '~> 2.6'
gem 'redis', '~> 4.0'
gem 'sass-rails', '~> 5.0'
gem 'statesman', '~> 4.1'
gem 'webpacker', '~> 4.2'

group :development, :test do
  gem 'pry-rails', '~> 0.3'
end

group :test do
  gem 'factory_bot_rails', '~> 5.1'
  gem 'rspec-rails', '~> 3.8'
end

group :development do
  gem 'spring'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
