namespace :clockwork do
  task :restart do
    on roles(:app) do
      execute 'sudo /bin/systemctl restart clockwork.service'
    end
  end
  
  after 'deploy:cleanup', 'clockwork:restart'
end
