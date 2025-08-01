---
title: How I learned rpsec
categories: blog
layout: post
---

**Rspec learning resources**

I believe that the best way to get a grasp of testing  in general and *rspec* is to start from scratch a project and start writing down each test, that way you'll be able to see what happens if you forget to close either a `context` block or an `it` block or even more intricate subjects like what's the difference between `describe` and `context`.

While developing a freelance project I wanted to add testing as a way to push myself to learn more about testing and also give *rspec* a try and by doing it I learned how to use gems like: [faker](https://github.com/faker-ruby/faker), [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers), [factory_bot](https://github.com/thoughtbot/factory_bot_rails) and finally [rspec](https://github.com/rspec/rspec-rails). 🎲

You'll additionally acquire:

-- how to read the output of the test suite in the console.

-- difference between `create` and `build` [more details.](https://stackoverflow.com/questions/14098031/whats-the-difference-between-the-build-and-create-methods-in-factorygirl); 

```json
# build doesn't persist 
user = build(:user, name: "John")
expect(user.name).to eq("John")

# create does persist 
user = create(:user, name: "Jane")
expect(user.persisted?).to be true
```
-- How to include Devise's test helpers

```json
class PostsControllerTest < ActionController::TestCase
  config.include Devise::Test::ControllerHelpers, type: :requests
end

```
[blog](https://henrytabima.github.io/rails-setup/docs/devise/test-helpers);

-- difference between `fixtures` and `factories`;

-- and finally learn how to integrate FactoryBot with RSpec [link](https://github.com/thoughtbot/factory_bot/blob/main/GETTING_STARTED.md#configure-your-test-suite).

```json
class Test::Unit::TestCase
  include FactoryBot::Syntax::Methods
end
```

<ins>Here are also another resources that I followed in order to cement more my knowledge.</ins>

- 2 hours long video from Type Fast a Youtube channel that makes rails tutorials. The video is very thorough. Covers model, requests, background job testing and system tests. [Fairly comprehensive starter guide to RSpec](https://www.youtube.com/watch?v=BXaMRm1FDa8&list=PPSV)

- 1 hour long rspec tutorial from Type Fast was well (it's more on the setup for an app) [testing setup with rspec](https://www.youtube.com/watch?v=D889P37r3bc&list=PPSV)

- How to test models [CJ Avila](https://www.youtube.com/watch?v=Spogv4o8haM&list=PPSV)

- How to use factory_bot [Deanin, short tutorial](https://www.youtube.com/watch?v=7JdyQEcZ7F8&list=PPSV)

- Full marathon of rspec tutorial (reading not video) from syntax, how to test a model and installing rspec [Remi rspec tutorials](https://remimercier.com/series/rspec/)

- The Complete Guide to Rails Testing by Jason Swett [link](The Complete Guide to Rails Testing)

Learn by doing is the best way to learn rspec DSL, development stack, learn what to test and why it's important to test and avoid technical debt.

So give it a try, it wont be difficult after all.

Lately, I have completed a few books on testing, inclding [Professional Rails Testing by Jason Swett](/2025/02/05/professional-rails-testing.html), [Hands-On Test Driven Development by Greg Donald](/2025/03/16-hands-on-tdd-rails.html), [Effective Testing with RSpec by Myron Marston and Ian Dees](/2025/04/11-effective-testing-with-rspec.html) and even attended a [testing workshop by Lucian Ghinda](https://goodenoughtesting.com/).


