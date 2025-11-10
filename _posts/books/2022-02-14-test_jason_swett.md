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
14. [Factory Bot: Introduction](#chapter-14)
15. [Factory Bot: Getting Started](#chapter-15)
16. [Factory Bot: Build Strategies and Faker](#chapter-16)
17. [Factory Bot: Advanced Usage](#chapter-17)
18. [RSpec Syntax: Introduction](#chapter-18)
31. [Model specs: Introduction](#chapter-31)
32. [Model specs: Tutorial, Part One](#chapter-32)
33. [Model Specs: Tutorial, Part Two](#chapter-33)

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

I’ll describe how to set up a new Rails application for testing in three parts:

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

You can see the code that will be run within your app if you go to the next link <a href="https://raw.githubusercontent.com/jasonswett/testing_application_template/master/application_template.rb" target="_blank">https://raw.githubusercontent.com/jasonswett/testing_application_template/master/application_template.rb</a>

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

When collision on attribute `first_name` arise due to uniqueness, we use `Faker`:

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

After I initialize my Rails app, <b>I usually create a walking skeleton by deploying my application to a production and staging environment and adding one small feature, for example the ability to sign in.</b>

Building the sign-in feature will prompt me to write my first tests. By working in this way I front-load all the difficult and mysterious work of the project’s early life.

A Rails testing “hello world” using RSpec and Capybara

Jason encourages the reader to start a rails app and add a controller and a test to have a quick win.

```ruby
# step 1:
rails new my_project -T -d postgresql -m https://raw.githubusercontent.com/jasonswett/testing_application_template/master/application_template.rb

# step 2:
$ rails g controller hello_world index

# step 3: within the view app/views/hello_world/index.html.erb add the following:
Hello, world!

# step 4: boot up rails server and go to the url ` open http://localhost:3000/hello_world/index`
$ rails server

# step 5: create the next file spec/hello_world_spec.rb
require 'rails_helper'

RSpec.describe 'Hello world', type: :system do
    describe 'index page' do
      it 'shows the right content' do
      visit hello_world_index_path
      expect(page).to have_content('Hello, world!')
    end
  end
end

# step 6: run the test !
rspec spec/hello_world_spec.rb
```

Here is a Jason explanation on what we just wrote as a test:

```ruby
# This pulls in the config from spec/rails_helper.rb
# that's needed in order for the test to run.
require 'rails_helper'
# RSpec.describe, or just describe, is how all RSpec tests start.
# The 'Hello world' part is an arbitrary string and could have been anything.
# In this case we have something extra in our describe block, type: :system.
# The type: :system setting does have a functional purpose. It's what
# triggers RSpec to bring Capybara into the picture when we run the test.
RSpec.describe 'Hello world', type: :system do
  describe 'index page' do
  it 'shows the right content' do
    # This is where Capybara starts to come into the picture. "visit" is a
    # Capybara method. hello_world_index_path is just a Rails routing
    # helper method and has nothing to do with RSpec or Capybara.
    visit hello_world_index_path
    # The following is a mix of RSpec syntax and Capybara syntax. "expect"
    # and "to" are RSpec, "page" and "have_content" are Capybara. Newcomers
    # to RSpec and Capybara's English-sentence-like constructions often
    # have difficulty remembering when two words are separated by a dot or
    # an underscore or parenthesis, myself included. Don't worry, you'll
    # get familiar over time.
    expect(page).to have_content('Hello, world!')
    end
  end
end
```

<b>Before trusting a passing test, you must first see it fail to confirm it’s actually testing what you think it is. A test that passes even when the code is broken is a false positive. By intentionally breaking the feature and ensuring the test fails, you verify that the test correctly distinguishes between working and broken behavior.</b>

```ruby
# change the text in the view  app/views/hello_world/index.html.erb
Jello, world!
```

When we run our test now it should see it fail with an error message like expected to find
text "Hello, world!" in "Jello, world!".

### Chapter 14 Factory Bot: Introduction {#chapter-14}

What Factory Bot is

One of the biggest challenges to a new tester is the question of how to generate test data. Most features in a web application will require you to have some certain database records in place first, but it’s not always clear the best way to bring those records into existence. There are multiple ways to accomplish this.

<b>For users of RSpec, the de facto standard way to create test data is to use a tool called Factory Bot. Factory Bot is a Ruby library that allows for convenient generation of database data for tests.</b>

There are three ways to generate test data in Rails:

- Manually
- Factories
- Fixtures

Let’s first explore manual creation.

Manual data creation can be convenient enough if you only have a few attributes on a model and no dependencies.

```ruby
valid_payment_type = PaymentType.new(name: 'Visa')
invalid_payment_type = PaymentType.new(name: '')
```

But now let’s say we have the idea of an `Order` which is made up of multiple `LineItems` and `Payments`, each of which has a `PaymentType`.

```ruby
order = Order.create!(
  line_items: [
    LineItem.create!(name: 'Electric dog polisher', price_cents: 40000)
  ],
  payments: [
    Payment.create!(
      amount_cents: 40000,
      payment_method: PaymentMethod.create!(name: 'Visa')
    )
  ]
)
```

That’s annoying. This is where factories come in handy.

Factories

<b>The idea with a factory is basically that you have a method/function that generates
new class instances for you.</b>

Here’s an example of how the setup for an `Order` instance might look if we used a factory, specifically `Factory Bot`.

```ruby
order = FactoryBot.create(
  :order, # 👈 model Order
  line_items: [FactoryBot.create(:line_item, price_cents: 40000)], # 👈 associations with LineItems
  payments: [FactoryBot.create(:payment, amount_cents: 40000)]# 👈 associations with Payments
)
```

In this case we’re specifying only the details that are relevant to the test. We don’t care about the line item name or the payment method. As long as we have a payment total that matches the line item total, that’s all where care about.

Fixtures

Typically fixtures are expressed in terms of YAML files.

```yml
# orders.yml
payments_equal_line_item_total:
  # no attributes needed

# line_items.yml
electric_dog_polisher:
  order: payments_equal_line_item_total
  name: 'Electric dog polisher'
  price_cents: 40000

# payment_methods.yml
visa:
  name: 'Visa'

# payments.yml
first:
  order: payments_equal_line_item_total
  payment_method: visa
  amount_cents: 40000
```

Once the fixture data is established, instantiating an object that uses the data is as simple as referring to the key for that piece of data:

```ruby
order = orders(:payments_equal_line_item_total)
```

Which is best?

Summary

Manual Data Generation
- Quickly becomes tedious but useful for small, simple cases
- Benefits: clarity and low overhead

Factories vs Fixtures
The author prefers `factories` for several reasons:
- Test data specification and usage are close together in the code
- With fixtures, the setup is hidden in YAML files, making it tedious to verify what data is being generated
- Fixtures often lead teams to create a large, complicated "world of data" reused across all tests

Testing Philosophy
- Prefers starting each test with a clean slate
- Generates only the bare minimum data needed per test
- Makes tests easier to understand

Practical Recommendation
- `Factories are the go-to method` and general recommendation
- Acknowledges the fixture issues are usage problems, not inherent flaws
- Open to using fixtures for specific use cases (e.g., fixed baseline data like payment types)
- Both approaches could be combined in a project when appropriate

The key takeaway: `factories` are preferred for their transparency and encouraging minimal, test-specific data generation, but the author remains pragmatic about using the right tool for the situation.

### Chapter 15 Factory Bot: Getting started {#chapter-15}

To install `Factory Bot`, add the factory_bot_rails gem to the `:development`, `:test` group of your `Gemfile`.

```ruby
group :development, :test do
  gem 'factory_bot_rails'
end
```

Factory definitions:

```ruby
user = FactoryBot.create(:user)
```
Notice how we don’t have to specify anything at all about the record’s attributes. We only had to pass in :user as an argument. Factory Bot will automatically take care of the details for the user record based on the instructions we specify in the user factory.

```ruby
FactoryBot.define do
  factory :user do
    first_name { 'John' }
    last_name { 'Smith' }
    email { 'john.smith@example.com' }
  end
end
```

As you may have guessed, `:user` maps to our `User` model (assuming we have one) and `first_name`, `last_name` and `email` all map to attributes in the `User` model.

Below is a more detailed explanation of what each part of the factory definition does.

```ruby
# FactoryBot is the name of a class.
# "define" is a class method on the FactoryBot class.
FactoryBot.define do
  # "factory" is a method. It takes, as an argument, the name of the factory
  # we're defining. By convention, the argument we pass gets matched up with
  # an ActiveRecord class, e.g. :user gets matched up with User.
  factory :user do
    # Each attribute in our ActiveRecord model can have a corresponding line
    # in our factory definition. In this case, first_name, last_name and
    # email are all dynamically-defined methods. Each of these methods
    # takes a block which supplies the value of the attribute.
    first_name { 'John' }
    last_name { 'Smith' }
    email { 'john.smith@example.com' }
  end
end
```

Where to put factory definitions

I put all my `factory definitions` in `spec/factories` and I generally use a convention of putting just one `factory` in each file. For example, if I were to have a `factory` for a `Product` model, I would put it in `spec/factories/products.rb`.

There’s unfortunately a problem with our configuration: if we do `FactoryBot.create(:user)` again, we’ll just get an exact duplicate with all the same attribute values, which is of course often not desirable.

We’ll address this issue later on though.

### Chapter 16. Factory Bot: Build Strategies and Faker {#chapter-16}

For creating objects using `Factory Bot`, there are two main methods offered: `create` and `build`. Let’s take a look at each, continuing to use our `User` factory as an example.

- If we were to run `FactoryBot.create(:user)`, it would return a persisted instance of a
`User` model. 

- If we were to run `FactoryBot.build(:user)`, it would return an unpersisted
instance of a `User` model.

<b>Whenever possible, we’re going to favor `.build` over `.create`, as persisting to the database is one of the slowest operations in our tests.</b>

If we go to the terminal and instantiate the next model with different methods:

```ruby
# we try out `.create`
=> user = FactoryBot.create(:user)
=> user.persisted? # true
=> user.id # an ID value 45700

# then we try out `.build`
> user = FactoryBot.build(:user)
> user.persisted? # false
> user.id # nil
```

Using Factory Bot with Faker

There’s a problem with using hard-coded values in `factory definitions`. What if our `users` table had a unique constraint on the `email` column? In that case, the first usage of `FactoryBot.create(:user)` would work fine, but the second time we did it, the database wouldn’t allow the duplicate record to be created, and we’d have a problem.

Here’s an example of how that would go using `Faker`:

```ruby
FactoryBot.define do
  factory :user do
    first_name { 'John' }
    last_name { 'Smith' }
    email { Faker::Internet.email }
  end
end
```

`Faker::Internet.email` will return values like `kris@hoeger.io` or `marionstroman@hamill.io`. I find these sorts of values nicer to work with than a hard-coded value with a number or hash slapped on the end of it.

Entire `Factory` for `User` model using `Faker`.

```ruby
FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
  end
end
```

### Chapter 17 Factory Bot: Advanced Usage {#chapter-17}

Nested factories

Sometimes you want to be able to create records that are 95% the same as the “default” but
have one or two small differences.

- Physician user example

The Problem:
- 30 tests need regular users
- 6 tests need physician users (users with `role` set to `'physician'`)
- How do you handle this variation without problems?

Three Options Evaluated

1. Set role individually in each test ❌
   - Bad: Code duplication
   - If physician user requirements change, you'd need to update all 6 places
   - Maintenance nightmare

2. Make all users physician users by default ❌
   - Bad: Misleading and violates best practices
   - Creates unnecessary setup data for 30 tests that don't need it
   - Test maintainers can't tell which setup data is actually necessary
   - Principle: Create the minimum amount of setup data and no more

3. Create a nested factory that inherits from the base user factory ✅
   - This is the right answer
   - No duplication
   - Doesn't modify the default factory
   - Clear and maintainable
   - In Factory Bot, this is called "nested factories"

Key Testing Principle
Tests should only include the minimum necessary setup data. Extraneous data misleads future maintainers who can't distinguish between essential and superfluous setup.

```ruby
# Normal Factory for User model
FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    password { Faker::Internet.password }
  end
end

# Nested factory

FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    password { Faker::Internet.password }

    factory :physician_user do
      role { 'physician' }
    end
  end
end

# Usage of that nested Factory
FactoryBot.create(:physician_user)
```

Traits

<b>Traits solve a similar problem to the one nested factories solve, but in a different way. With nested factories, you’re defining a child factory inside an existing factory, with the child factory inheriting from the parent factory.

With traits, you’re defining additional qualities that can optionally be added to an existing
object.</b>


```ruby
# Normal Factory for User model
FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    password { Faker::Internet.password }
  end
end

# Traits
FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    password { Faker::Internet.password }

    trait :with_name do
      first_name { "John" }
      last_name { "Smith" }
    end

    trait :with_phone_number do
      phone_number { "(555) 555-5555" }
    end
  end
end

# Usage of that Traits
FactoryBot.create(:user, traits: [:with_name, :with_phone_number]).
```

When to use `traits` versus nested `factories`

My method is pretty simple: If the `factory` I’m considering has something, I use a `trait`. If the `factory` is something, I use a `nested` factory. Let’s look at a concrete example.

“Has” example (trait)

```ruby
# The user is still conceptually a regular old `user`. The only difference is that this user happens to have a value for its `phone_number` attribute.
FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    password { Faker::Internet.password }

    trait :with_phone_number do
      phone_number { "(555) 555-5555" }
    end
  end
end

# Usage of that Traits
FactoryBot.create(:user, :with_phone_number)
```

“Is” example (nested factory)

```ruby
# A `physician` user has different capabilities from a regular `user` and is used in different ways from a regular `user`.
FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    password { Faker::Internet.password }

    factory :physician_user do
      role { 'physician' }
    end
  end
end

# Usage of that nested Factory
FactoryBot.create(:physician_user)
```

Callbacks

Imagine you need to create a `User` record that has a `Message` associated with it. This is an option:

```ruby
user = FactoryBot.create(:user)
create(:message, user: user)
```

But if you need to create such `users` over and over, your code could get repetitive. You can create a more convenient way to meet your needs by using <b>callbacks</b>.

Below is a concrete example. We have a `:user` factory and then, inside that, a nested
factory called `:user_with_message`.

```ruby
FactoryBot.define do
  factory :user do
    username { Faker::Internet.username }
    password { Faker::Internet.password }

    factory :user_with_message do
      after(:create) do |user|
        create(:message, user: user)
      end
    end
  end
end
```

When `FactoryBot.create(:user_with_message)` is run, everything happens that would happen when `FactoryBot.create(:user)` is run, plus the stuff in the `after(:create)` callback is executed.

The various callback types:

• `after(:create)` - called after a factory is saved (via FactoryBot.create)
• `after(:build)` - called after a factory is built (via FactoryBot.build or FactoryBot.create)
• `before(:create)` - called before a factory is saved (via FactoryBot.create)
• `after(:create)` - called after a factory is saved (via FactoryBot.create)
• `after(:stub)` - called after a factory is stubbed (via FactoryBot.build_stubbed)

Transient attributes

Transient attributes are values that are passed into the `factory` but not directly set on the object’s attributes.

PDF file attachment example

Let’s say we have an `InsuranceDeposit` class that has PDF file attachments.

```ruby
class InsuranceDeposit
  has_many_attached :pdf_files
end
```

An example without using `transient` attributes

```ruby
insurance_deposit = create(:insurance_deposit)
# This setup is noisy and hard to understand
file = Tempfile.new
pdf = Prawn::Document.new
pdf.text "my arbitrary PDF content"
pdf.render_file file.path

insurance_deposit.pdf_files.attach(
  io: File.open(file.path),
  filename: "file.pdf"
)
```

This way is non-ideal because a) the code is hard to understand and b) if we use these steps end more than one place, we’ll have duplication

An example with transient attributes

```ruby
FactoryBot.define do
  factory :insurance_deposit do
    transient do
      pdf_content { "" }
    end

    after(:create) do |insurance_deposit, evaluator|
      file = Tempfile.new
      pdf = Prawn::Document.new
      pdf.text evaluator.pdf_content
      pdf.render_file file.path

      insurance_deposit.pdf_files.attach(
        io: File.open(file.path),
        filename: "file.pdf"
        )
    end
  end
end

# usage of transient
create(:insurance_deposit, pdf_content: "my arbitrary PDF content")
```

This is much tidier than the original. If we want to see how `pdf_content` works, we can open up the `insurance_deposit` factory and have a look.

### Chapter 18. RSpec Syntax: Introduction {#chapter-18}

### Chapter 31. Model Specs: Introduction {#chapter-31}

The purpose of model specs

<b>Model specs are for testing the behavior of your application.</b> This may sound obvious, but many programmers seem to misunderstand the meaning of “behavior” and instead test the implementation of their application’s features, which unfortunately misses the point of testing altogether. Let’s talk about the difference between testing implementation and testing behavior.

Implementation vs. behavior

An example of an implementation test might be: “Does the Patient model have a `has_many :payment_entries` association?” If you look at `patient.rb` and it contains the line `has_many :payment_entries`, then the test passes.

An example of a behavior test might be <b>“When I add a payment entry for $50 for a patient, does the patient’s balance decrease by $50?”</b> To perform this test you might check the patient’s balance, see that it’s $80, then enter a $50 payment into the system and finally navigate to the patient’s profile and verify that the patient’s balance is now $30 instead of $80.

If you’ve verified that adding a $50 payment entry decreases a patient’s balance by $50, then you’ve also verified that a `has_many :payment_entries` association exists , since the feature can’t work without the `payment_entries` association. So having an additional test solely for the `payment_entries` association would be redundant and superfluous.

Notice how the behavior test has nothing to do with how the feature is actually coded. We don’t care how it works, we only care that it works.

Common errors of testing implementation instead of behavior

• Verifying that validations exist
• Verifying that associations exist
• Verifying that a class responds to certain methods
• Verifying that callbacks exist
• Verifying that a database table has certain columns and indexes

These are all examples of testing implementation rather than behavior. All such tests are quite frankly, pointless. Instead of testing these things directly, it’s more helpful to test the behaviors that these things enable.

The value of loose coupling

One benefit of testing behavior rather than implementation is loose coupling. Two things are loosely coupled to the degree that you can change one without having to change the other.

If you write tests that test implementation, you’ve guaranteed tight coupling. Loose coupling is only possible with tests that test behavior.

Testing that a model responds to certain methods

```ruby
it { expect(factory_instance).to respond_to(:public_method_name) }
```

There’s negligible value in simply testing that a model responds to a method. Better to test that that method does the right thing.

Testing for the presence of callbacks

```ruby
it { expect(user).to callback(:calculate_some_metrics).after(:save) }
it { expect(user).to callback(:track_new_user_signup).after(:create) }
```

Don’t verify that the callback got called. Verify that you got the result you expected the callback to produce.

Tips for writing valuable RSpec tests

<b>Here’s how I tend to write model specs: for every method I create on a model, I try to poke at that method from every possible angle and make sure it returns the desired result.</b>

For example, I recently added a feature in an application that made it impossible to schedule an appointment for a patient who has been inactivated. So I wrote three test cases: 
- one where the patient is active (expect success), 
- one where the patient is inactive (expect an error to get added to the object), 
- and one where the patient was missing altogether (expect a different error on the object).

### Chapter 32. Model Specs: Tutorial, Part One {#chapter-32}

It may seem obvious what a Rails model is. To many Rails developers, the model is the MVC layer that talks to the database.
But in my experience, there are actually a lot of different conceptions as to what Rails models are, and not all of them agree with each other. I think it’s important for us to firmly establish what a Rails model is before we start talking about how to test Rails models.

<b>To me, a model is an abstraction that represents a small corner of reality in a simplified way.</b> Models exist to make it easier for a programmer to think about and work with the concepts in a program. Models are not a Rails idea or even an OOP idea. A model could be represented in any programming language and in any programming paradigm.

Why model specs are different from other types of specs

Because models aren’t a Rails idea but rather a programming idea, testing models in Rails isn’t that conceptually different from testing models in any other language or framework. In a way this is a great benefit to a learner because it means that if you know how to test models in one language, your testing skills will easily translate to any other language.

System specs are relatively easy to get started with because you can more or less follow a certain step-by-step formula for writing system specs for CRUD features and be well on your way. There’s not as much of a step-by-step formula for writing model tests

The tutorial

Here are the things you can expect to have a better understanding of after completing this tutorial.

1. How to come up with test cases for a model based on the model’s desired behavior.
2. How to translate those test cases into actual working test code, in a methodical and repeatable manner.
3. How to use a test-first approach to make it easier both to write the tests and to write the application code.

The scenario

We want our phone number model to be able to take phone numbers in any of the following formats:

555-856-8075
(555) 856-8075
+1 555 856 8075

And strip them down to look like this:

5558568075

Our `PhoneNumber` class won’t know anything about databases, it will just be responsible for converting a “messy” phone number to a normalized one.

Our first test

A big part of the art of model testing is coming up with various scenarios and deciding how our code should behave under those scenarios.

The first scenario we’ll test here is: “When we have a phone number where the digits are separated by dashes, the dashes should all get stripped out.”

```ruby
require_relative './phone_number.rb'

RSpec.describe PhoneNumber do
  # test for scenario 1
  context "phone number contains dashes" do
    it "strips out the dashes" do
    phone_number = PhoneNumber.new("555-856-8075")


    expect(phone_number.value).to eq("5558568075")
    end
  end

  # test for scenario 2
  context "phone number contains parentheses" do
    it "strips out the non-numeric characters" do
      phone_number = PhoneNumber.new("(555) 856-8075")

      expect(phone_number.value).to eq("5558568075")
    end
  end

  # test for scenario 3
  context "phone number contains country code " do
    it "strips out the country code" do
    phone_number = PhoneNumber.new("+1 555 856 8075")

    expect(phone_number.value).to eq("5558568075")
    end
  end
end

class PhoneNumber
  attr_reader :value

  EXPECTED_NUMBER_OF_DIGITS = 10
  def initialize(value)
    @value = value.gsub(/\D/, "").split("").last(EXPECTED_NUMBER_OF_DIGITS).join
  end
end
```

### Chapter 33. Model Specs: Tutorial, Part Two {#chapter-33}

