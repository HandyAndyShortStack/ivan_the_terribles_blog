# Fixing the Terrible Blog

This is not so much fixing as greasing the wheels.  I am trying to reach the largest blog posts / time possible.

## First Step: Evaluation

By default, this blog serves up all the blog posts and all the comments on one page.  This seems like a good place to optimize, as the number of blog posts is high.  I conjecture that serving a high number of blog posts on one page will cut down on network overhead somewhere down the line.

### Percieved Bottleneck
*Rails is doing things every time the page is loaded*

Rails takes time to do things like talk to the database and render stuff.  This is unacceptible if I want to win the ultimate prize.

#### Solution
*Cache the posts#index page.*

#### Result
*Well, I should start doing benchmarks*

## Second Step: Getting Some Benchmarks

I decided to install miniprofiler and include this in the pages controller index:

```ruby
Rack::MiniProfiler.authorize_request
```

Since this did not work and I cannot easily find out how to make it work in production, I am going to switch gears a bit.  Caching only works in production by default, but it seems like it may be easier to get caching working in development than it will be to get miniprofiler to run in production.  

### Uncertainness

There are many differences production and development.  If I am going to switch to development mode, I will need to change a lot of asset compilation and delivery settings.  Also I already went to the trouble of getting shit loading to work on the production database.  

### Resolution

Miniprofiler WILL WORK!  I WILL MAKE IT WORK!!

#### First Problem:

My assets are not being loaded because rails is looking for them in app/assets rather than in the public/assets directory where rake assets:precompile spits them out

##### Solution:

in config/environments/production.rb:
```ruby
config.serve_static_assets = true
```
This will be a problem when deploying to heroku, as heroku hates static assets.

#### Second Problem:

Miniprofiler still does not show up, even with the javascript being served properly.  I need to get miniprofiler into the JS somehow.

##### Solution:

Well it works now on non-cached pages for no apparent reason.  Moving on.

#### Third Problem:

Miniprofiler is still not showing up on the posts#index page.  I am fairly certain that this is because the page is cached, and is not being served with the proper JS.

##### Solution:

Expiring the cached copy will make miniprofiler run on every cache miss.  I will have to use new relic to get cache hit metrics.

