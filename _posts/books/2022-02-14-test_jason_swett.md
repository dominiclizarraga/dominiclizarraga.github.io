---
categories:
  - book
layout: book
title: "The Beginner’s Guide to Rails Testing Jason Swett"
publisher: 
published: "2022"
author: Jason Swett.
rating: 5.0
---

Here I wrote the parts I considered most important from this book, Jason goes from explaining different types of tests, which ones he uses, DSL, how to think on testing from a specification perspective not validation, make testing a habit that compound down the road and increase productivity even though it feels in the begining that it deters you from coding faster.

1. [Introduction](#chapter-1)
2. [Intro to Testing Principles](#chapter-2)
3. [Rails Testing Tools](#chapter-3)
4. [Your First Practice Tests](#chapter-4)

###  Chapter 1 Introduction {#chapter-1}

Who this book is for, what’s in this book and how to use this book

### Chapter 2 Fundamentals: Intro to Testing Principles {#chapter-2}

First I capture what to do in the form of a test. Then I follow my own instructions by getting the test to pass. Then I repeat. This is a much lighter cognitive burden than if I were to juggle these different mental jobs and allows me to be productive for longer because I don’t run out of mental energy as early in the day.

The first truth is that it’s impossible to write a piece of code cleanly on the first try. Some amount of refactoring, typically a lot of refactoring, is necessary in order to get the code into a reasonably good state.

The second truth is that it’s impossible to do non-trivial refactorings without having automated tests. The feedback cycle is just too long when all the testing is done manually. Either that or the risk of refactoring without testing afterward is just too large to be justified.

“What level of test coverage should I shoot for?” is one of the questions most commonly asked by beginners to Rails testing.

My answer is that you shouldn’t shoot for a particular level of test coverage. I recommend that instead you make testing a habitual part of your development workflow. A healthy level of test coverage will flow from there.

All software has bugs, but if you feel like the rate of new bugs appearing in production is unacceptably high, it may be a symptom of too little test coverage.

The only alternative to using automated tests, aside from not testing at all, is to test manually.

Infrequent deployments can arise as a symptom of too few tests for a couple different reasons. One possible reason is that the need for manual testing bottlenecks the deployment timing. If it takes two days for manual testers to do a full regression test on the application, you can of course only deploy a fully-tested version of your application once every two days at maximum.

Inability to refactor or make big changes.

Testing != TDD

TDD is a specific kind of testing practice where you write the tests before you write the code that makes the test pass.

### Chapter 3 Fundamentals: Rails Testing Tools {#chapter-3}

A common Rails testing question is which testing framework to use. RSpec and Minitest are the two options that most people are deciding between.

Most of us don’t have much choice as to whether to use RSpec or Minitest at work.

For better or worse, it’s my experience and the experience of most Rails developers I’ve talked with that most commercial projects use RSpec. (Note how I said most commerical projects. Most commercial projects use RSpec and most OSS Ruby projects, in my experience, use Minitest. I do not know why this is the way it is.)

What does this mean? My take is that this means if your goal is to get a Rails job, learning RSpec over Minitest will give you a higher probability that your skills match the tech stack that’s used at any particular company

RSpec and Minitest differ syntactically but they don’t really have meaningful conceptual differences.

I’ll explain what the major tools are but I want to preface it by saying that the most important thing to learn to be a successful tester is testing principles, not testing tools.

- RSpec. RSpec is a test framework. A test framework is what gives us a structure for writing our tests as well as the ability to run our tests.

- Factory Bot. One of the challenges of Rails testing is generating test data. There are two common ways of generating test data in Rails tests: fixtures and factories.
  
  - Fixtures typically take the form of one or more YAML files with some hard-coded data. The data is translated into database records one time, before any of the tests are run, and then deleted afterward. (This happens in a separate test database instance of course.)
  
  - With factories, database data is generated specifically for each test. Instead of loading all the data once at the beginning and deleting it at the end, data is inserted before each test case and then deleted before the next test case starts. (More precisely, the data isn’t deleted, but rather the test is run inside a database transaction and the data is never committed in the first place, but that’s a mechanical detail that’s not important right now.)

I tend to prefer factories because I like having my data generation right inside my test, close to where the test is happening. With fixtures the data setup is too distant from where the test happens.

- Capybara. Some Rails tests only exercise Ruby code. Other tests actually open up a browser and simulate user clicks and keystrokes. Simulating user input this way requires us to use some sort of tool to manipulate the browser. Capybara is a library that uses Ruby to wrap a driver (usually the Selenium driver), letting us simulate clicks and keystrokes using convenient Ruby methods.

- VCR and WebMock. One principle of testing is that tests should be deterministic, meaning they run the same way every time no matter what. When an application’s behavior depends on external services (e.g. a third-party API like Stripe) it makes it harder to have deterministic tests. The tests can be made to fail by an internet connection failure or a temporary outage of the external service.

  - VCR can let us run our tests against the real external service, but capture all the service’s responses in local files so that subsequent test runs don’t talk to the external service but rather just go off of the saved responses. That way, even if the internet connection fails or the service goes down, the tests still work

The different kinds of RSpec tests and when to use each: 

The eight types of RSpec specs

• Model specs
• System specs
• Request specs
• Helper specs
• View specs
• Routing specs
• Mailer specs
• Job specs

Jason usage:

• Model specs always
• System specs always
• Request specs rarely
• Helper specs rarely
• View specs never
• Routing specs never
• Mailer specs never
• Job specs never

- Model spec

I use model specs to test my models’ methods. When I do so, I tend to use a test-first approach and write a failing test before I add a new line of code so that I’m sure every bit of code in my model is covered by a test.

- System spec

System specs are the only type of test that give me confidence my whole application really works.

Even though system specs are indispensable, they’re not without drawbacks. System specs are somewhat “heavy”

- Request spec

I tend not to use request specs much because in most cases they would be redundant to my system specs. If I have system specs covering all my features, then of course a broken controller would fail one or more of my tests, making tests specifically for my controllers unnecessary.

I also try to keep my controllers sufficiently simple as to not call for tests of their own.

There are just three scenarios in which I do use request specs. 

1. If I’m working on a legacy project with fat controllers, sometimes I’ll use request specs to help me harness and refactor all that controller code. 

2. If I’m working on an API-only Rails app, then system specs are physically impossible and I drop down to request specs instead. 

3. if it’s just too awkward or expensive to use a system spec in a certain case then I’ll use a request spec instead.

View and routing spec

I find view specs and routing specs to be redundant to system specs. If something is wrong with one of my views or routes, it’s highly likely that one of my system specs will catch the problem.

What are all the Rails testing tools and how do I use them?

RSpec is a test framework. A test framework is what gives us a structure for writing our tests as well as the ability to run our tests.

How do I add tests to an existing Rails project?

If you have little testing experience, I would suggest getting some practice on a fresh Rails app before trying to introduce testing to the existing Rails project you want to add tests to. Adding tests to an existing project is a distinct skill from writing tests for new projects.

If you’re already comfortable with testing

1) develop a shared vision with your team,
  To improve test coverage, a team must first create a shared vision. They need to agree on what “good testing” means for them, choose the tools and approach they’ll use, and define clear goals and steps to reach their desired level of testing.

2) start with what’s easiest, then
  When introducing tests to an untested codebase, don’t start with the most important or complex features, as those are usually hardest to test. Also, requiring tests for every new change can be impractical because new code often depends on untested parts. Instead, begin with the easiest areas—like simple CRUD operations—to build basic testing habits and infrastructure. This creates a foundation (“a beachhead”) to gradually expand test coverage later.

3) expand your test coverage
  After establishing tests for simple features, gradually move on to more complex ones. This step-by-step approach makes it easier to achieve solid test coverage than starting with the hardest or most valuable parts right away. With the foundational principles and tools in place, it’s time to begin writing your first practice tests.

### Chapter 4 Fundamentals: Your First Practice Tests {#chapter-4}

I’ll describe it in three parts:

1. An application template that can add all the necessary gems and configuration
2. My setup process (commands I run to create a new Rails app)
3. A breakdown of the gems I use

Template: 
Application template I created that will do two things: 
  1) install a handful of testing-related gems and 
  2) add a config file that will tell RSpec not to generate certain types of files

```ruby
gem_group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'capybara'
  gem 'webdrivers'
  gem 'faker'
end

initializer 'generators.rb', <<-CODE
  Rails.application.config.generators do |g|
    g.test_framework :rspec,
    fixtures: false,
    view_specs: false,
    helper_specs: false,
    routing_specs: false,
    request_specs: false,
    controller_specs: false
  end
CODE

after_bundle do
  generate 'rspec:install'
end
```

Setup process: 

When I run `rails new`, I always use the `-T` flag for “skip test files” because I always use `RSpec` instead of the `Minitest` that Rails comes with by default. Also, incidentally, I always use `PostgreSQL`. This choice of course has little to do with testing but I’m including it for completeness.

 I’m also using the `-m` flag so I can pass in my application template.

```ruby
rails new my_project -T -d postgresql \ 
  -m https://raw.githubusercontent.com/\
  jasonswett/testing_application_template\
  /master/application_template.rb
```

The Gems:

- `rspec-rails`: The rspec-rails gem is the version of the RSpec gem that’s specifically fitted to Rails
- `factory_bot_rails`: Factory Bot is a tool for generating test data.
- `capybara`: Capybara is a tool for writing acceptance tests, i.e. tests that interact with the browser and simulate clicks and keystrokes.
- `webdrivers`: In order for Selenium to work with a browser, Selenium needs drivers.
- `faker`: By default, Factory Bot (the tool for generating test data) will give us factories that look something like this:

```ruby
FactoryBot.define do
  factory :customer do
    first_name { "MyString" }
    last_name { "MyString" }
    email { "MyString" }
  end
end
```

When collision on attribute `first_name` arise due to uniqueness:

```ruby
FactoryBot.define do
  factory :customer do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
  end
end
```

I also often end up adding the `VCR` and `WebMock` gems when I need to test functionality that makes external network requests.

Next steps

After I initialize my Rails app, I usually create a walking skeleton by deploying my application to a production and staging environment and adding one small feature, for example the ability to sign in. Building the sign-in feature will prompt me to write my first tests. By working in this way I front-load all the difficult and mysterious work of the project’s early life.

