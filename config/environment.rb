
ENV['RACK_ENV'] ||= "development"
ENV['DB_HOST'] = "gigatwitter-db-postgresql-do-user-7074878-0.db.ondigitalocean.com"
ENV['DB_PASSWORD'] = "iyajy1kgp2nczrpi"

require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'])

ActiveRecord::Base.establish_connection(ENV['RACK_ENV'].to_sym)

Elasticsearch::Model.client = Elasticsearch::Client.new(
    log: true
  )

# SearchClient = Elasticsearch::Client.new(
#   url: ApplicationConfig["ELASTICSEARCH_URL"],
#   retry_on_failure: 5,
#   request_timeout: 30,
#   adapter: :typhoeus,
#   log: Rails.env.development?,
# )

require_all 'app'

unless ENV['RACK_ENV'] == 'development'
	require 'rack-timeout'
	use Rack::Timeout, service_timeout: 9
end

# configure :development do
# #  db = URI.parse(ENV['DATABASE_URL'] || 'postgres:///localhost/mydb')	

# 	ActiveRecord::Base.establish_connection(
# 		:adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
# 		:host     => db.host,
# 		:username => db.user,
# 		:password => db.password,
# 		:database => db.path[1..-1],
# 		:encoding => 'utf8'
# 	)
	
# end
