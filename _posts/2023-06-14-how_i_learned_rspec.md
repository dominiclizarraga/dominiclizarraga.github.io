---
title: How I learned rpsec
categories: blog
layout: post
---

**Rspec learning resources**

The best way to get a grasp of testing and *rspec* in general is to start from scratch a project and start writing down each test, that way you'll be able to see what happens if you forget to close either a `context` block or `it` block or even more intricate subjects like what's the difference between `describe` and `context`.

While developing a freelance project I wanted to add testing as a way to push myself to learn more about testing and also give *rspec* a try and by doing it I learned how to use gems like: [faker](https://github.com/faker-ruby/faker), [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers), [factory_bot](https://github.com/thoughtbot/factory_bot_rails) and finally [rspec](rspec-rails). 🎲

You'll additionally acquire the difference between `create` and `build` [more details.](https://stackoverflow.com/questions/14098031/whats-the-difference-between-the-build-and-create-methods-in-factorygirl); how to integrate devise  with rspec [blog](https://henrytabima.github.io/rails-setup/docs/devise/test-helpers) or difference between `fixtures` and `factories` and finally what does <mark>config.include FactoryBot::Syntax::Methods</mark> actually do?

```json
# build doesn't persist 
user = build(:user, name: "John")
expect(user.name).to eq("John")

# create does persist 
user = create(:user, name: "Jane")
expect(user.persisted?).to be true
```

<ins>Here are also another resources that I followed in order to cement more my knowledge.</ins>

- 2 hours long video from Type Fast a Youtube channel that makes rails tutorials. The video is very thorough. [Fairly comprehensive starter guide to RSpec](https://www.youtube.com/watch?v=BXaMRm1FDa8&list=PPSV)

- 1 hour long rspec tutorial from Type Fast was well (it's more on the setup for an app) [testing setup with rspec](https://www.youtube.com/watch?v=D889P37r3bc&list=PPSV)

- How to test models [CJ Avila](https://www.youtube.com/watch?v=Spogv4o8haM&list=PPSV)

- How to use factory_bot [Deanin, short tutorial](https://www.youtube.com/watch?v=7JdyQEcZ7F8&list=PPSV)

- Full marathon of rspec tutorial (reading not video) from syntax, to model and isntalling [Remi rspec tutorials](https://remimercier.com/series/rspec/)

- The Complete Guide to Rails Testing by Jason Swett [link](The Complete Guide to Rails Testing)