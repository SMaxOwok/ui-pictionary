namespace :sidekiq do
  task :restart do
    on roles(:app) do
      execute 'sudo /bin/systemctl restart sidekiq.service'
    end
  end

  after 'deploy:cleanup', 'sidekiq:restart'
end
