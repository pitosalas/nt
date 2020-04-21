require 'sinatra/base'

module Test
	
	# get timeline of fan who follows star
	def get_test_timeline(star, fan)
		timeline = []
		if Follow.find_by(followee_id: star, follower_id: fan).nil?
			timeline
		else
			timeline = Tweet.where(user_id: star).order(created_at: :desc).first(50)  
		end
	end

	# get test tweet with given tweet ids
	def get_test_tweet(tweet_ids)
		data = Tweet.where(id: tweet_ids)
	end
	
	# tweet
	def make_tweet(content, id)
        tweet = Tweet.create(tweet: content, user_id: id)
        return tweet
    end

	# check follow relation
    def check_follow(star, fan)
        return !Follow.find_by(followee_id: star, follower_id: fan).nil?
    end

	# create follow relation
    def follow_user(star, fan)
        Follow.create(followee_id: star, follower_id: fan)
        User.increment_counter(:followee_number, fan)
        User.increment_counter(:follower_number, star)
    end
end
