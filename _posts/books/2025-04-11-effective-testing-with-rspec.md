---
categories:
  - book
layout: book
title: "Effective testing with RSpec"
publisher: "The Pragmatic Programmers"
published: "2017"
author: Myron Marston and Ian Dees.
rating: 5.0
---

Recently, I participated in a very competitive interview. When I submitted the code challenge, I felt my weakest area was the testing suite. Even though feedback was not available, being honest with myself and seeing some posts from the reviewers, I decided to dive deeper into testing. 

I picked up books like [Professional Rails Testing by Jason Swett](/2025/02/05/professional-rails-testing.html), [Hands-On Test Driven Development by Greg Donald](/2025/03/16-hands-on-tdd-rails.html), Effective Testing with RSpec by Myron Marston and Ian Dees and even attended a [testing workshop by Lucian Ghinda](https://goodenoughtesting.com/).

I had practiced testing before, but I felt it was time to level up and get it closer to the same standard as the rest of my code.

Here are the notes, examples, and quotes that stood out to me while reading.


1. [Installing RSpec.](#chapter-1)
2. [pending.](#chapter-2)
3. [pending.](#chapter-3)
4. [pending.](#chapter-4)
5. [pending.](#chapter-5)



### Part I — Getting Started. {#chapter-1}

Picture of the book!

The forward is written by Tom Stewart author of [Understanding Computation](https://computationbook.com/) And he expresses something that picked my curiosity: 

> After all, the big challenge of test-driven development is not knowing how to write tests, but knowing how to listen to them. For your tests to be worth the bites they are written in, they must be able to speak to you about how well the underlying program is designed and implemented and, crucially, you must be able to hear them. The words and ideas baked into RSpec are carefully chosen to heighten your sensitivity to this kind of feedback. As you play with its expressive little pieces you will develop a test for what a good test looks like, and the occasional stumble over a test that now seems harder or uglier or way more annoying than necessary will start you on a journey of discovery that leads to a better design for that part of your code base.”

In the introduction we see different quotes like our tests are broken again! Why does the suite take so long to run? What value are we getting from this test anyway?
No matter whether you are new to automated tests or helping using them for years, this book will help you write more effective tests. by effective, we mean tests that give you more value than the time spent writing them.

This book you will learn RSpec  in three phases:

Part I: Introductory exercises to get you acquainted with respect
Part II: A work example spanning several chapters, so that you can see RSpecin action on a meaningful sized project
Part III-V:  A series of deep dives into specific aspects of RSpec, which will have you get the most out of RSpec

RSpec and behavior driven development:

RSpec bills itself as a Behavior Driven Development (BDD) test framework. I would like to take a moment to talk about our use of that term, along with the related term, Test Driven Development (TDD).

With TDD, you write each test case just before implementing the next bit of behavior. When you have a well written test, you wind up with more maintainable code. you can make changes with the confidence that your test suite will let you know if you have broken something.

It is about the way they enable fearless improvements to your design.

BDD brings the emphasis to where it is supposed to be: <strong> your code's behavior. </strong> 

Respect is a productive Ruby test framework. we say productive because everything about it, its style, api, libraries, and settings are designed to support you as you write great software.

We have a specific definition of effective here, does this test pay for the cost of writing and running it? a good test will provide at least one of these benefits:

- design guidance:  helping you distill all those fantastic ideas in your head into running, maintainable code

- safety net: finding errors in your code before your customers do

- documentation:capturing the behavior of a working system to help it's maintainers 

As you follow along through the examples in this book, you will practice several habits that will help you test effectively:

 when you describe precisely what you want your program to do, you avoid being too strict ( and failing when an irrelevant detail changes)  or to lacks open parentheses and getting false Confidence from incomplete tests).

 by writing your specs to report failure at the right level of detail, you give just enough information to find the house of the problem, without drawing in excessive output.

 but clearly separating essential test code from noisy setup code, you communicate what's exactly expected of the application, and you avoid repeating unnecessary detail.

 when you reorder, profile, and filter your specs, you unearth order dependencies, slow tests and incomplete work.

Installing RSpec.

 it is made of three independent ruby gems:

`rspec-core`:  is the overall test harness that runs your specs.

`rspec-expectations`:  provides a readable, powerful Syntax for checking properties of your code.

`rspec-mocks`:  makes it easy to isolate the code you are testing from the rest of the system.

```ruby
➜  rspec-book rbenv local 3.4.2
➜  rspec-book rbenv rehash
➜  rspec-book ruby -v
ruby 3.4.2 (2025-02-15 revision d2930f8e7a) +PRISM [arm64-darwin24]
➜  rspec-book bundle init
Writing new Gemfile to /Users/dominiclizarraga/code/dominiclizarraga/rspec-book/Gemfile
➜  rspec-book bundle add rspec
Fetching gem metadata from https://rubygems.org/...
Resolving dependencies...
Fetching gem metadata from https://rubygems.org/.
Fetching diff-lcs 1.6.2
Fetching rspec-support 3.13.4
Installing rspec-support 3.13.4
Installing diff-lcs 1.6.2
Fetching rspec-core 3.13.4
Fetching rspec-expectations 3.13.5
Fetching rspec-mocks 3.13.5
Installing rspec-core 3.13.4
Installing rspec-expectations 3.13.5
Installing rspec-mocks 3.13.5
Fetching rspec 3.13.1
Installing rspec 3.13.1
```

Note: The book suggests to use `gem install rspec` however I think it's important to remember that, that command will install the library globally to that Ruby version so if you want to avoid that and narrow the impact that this installation may have, I suggest to create its own directory and use `bundle init`  which will create a `Gemfile` and then you can add `rspec gem` to the  `Gemfile` or use `bundle add rspec`. This will set this `rspec` version only to this project.

Let’s write our first spec 😁

The book starts with the very simple example of building a sandwich.  what's the most important property of a sandwich? the bread? the condiments? no, the most important thing I probably sandwich is that it should taste good.

```ruby
01-getting-started/01/spec/sandwich_spec.rb
RSpec.describe “An ideal sandwich” do
  it “is delicious” do
    # developers work this way with Rspec all the time; they start with an outline and fill it in as they go. 
  end
end

```
Then let’s add the classes and methods

```ruby
01-getting-started/01/spec/sandwich_spec.rb
RSpec.describe “An ideal sandwich” do
  it “is delicious” do
    sandwich = sandwich.new(“it’s delicious”, [])

    taste = sandwich.taste

    expect(sandwich). to eq(“it’s delicious”)
  end
end

```
This file defines your test, known in RSpec as your specs, short for a specification (because they specify the desired behavior of your code). The outer `describe` block creates an example group – an example group defines what you are testing, in this case, a sandwich, and keeps related specs together.

The nested block, the one beginning with `it`, is an example of the sandwich’s use. As you write specs, you will tend to keep each example focused on one particular size of behavior you are testing.

>This first paragraphs reminds me of Jason Sweat's book how many times he reminds the reader that tests are a specifications not validations I was able to count at least 8 times that he mentions that for example:
<b>A specification is a statement of how some aspect of a software product should behave.</b> 
<b>Remember that testing is about a specification, not verification. </b> 
<b>A test suite is a structured collection of behavior specifications.</b> 

Differences between tests, specs and examples:

• A test validates that a bit of code is working properly. 
• A spec describes the desired behavior of a bit of code. 
• An example shows how a particular API is intended to be used.

In the bits of code that we wrote we can clearly see the pattern arrange/act/assert

The last line with the `expect` keyword is the assertion in other test frameworks. Let’s look at the RSpec methods we’ve used:

• `RSpec.describe` creates an example group (set of related tests).
• `it` creates an example (individual test).
• `expect` verifies an expected outcome (assertion).

Up to this point this spec serves two purposes: documenting what your sandwich should do and checking that the sandwich does what it is supposed to.

Let’s run the test and see what happens. (We’ll start reading common error tests)

```ruby
$ ➜  rspec-book git:(master) ✗ bundle exec rspec 01-getting-started/01/spec/sandwich_spec.rb

F

Failures:

  1) An ideal sandwich is delicious
     Failure/Error: sandwich = Sandwich.new("delicious", [])
     
     NameError:
       uninitialized constant Sandwich
     # ./01-getting-started/01/spec/sandwich_spec.rb:8:in 'block (2 levels) in <top (required)>'

Finished in 0.00539 seconds (files took 0.09368 seconds to load)
1 example, 1 failure

Failed examples:

rspec ./01-getting-started/01/spec/sandwich_spec.rb:6 # An ideal sandwich is delicious
```

With this we are following Red/Green/Refactor development practice essential to TDD and BDD. With this workflow, you’ll make sure each example catches failing or missing code before you implement the behavior you’re testing.

The next step after writing a failing spec is to make it pass.

```ruby 
# add to the top of the file 
`Sandwich = Struct.new(:taste, :toppings)`
# re-run the tests
```

You should see now a green dot “.” and 0 failures

```ruby
➜  rspec-book git:(master) ✗ bundle exec rspec 01-getting-started/01/spec/sandwich_spec.rb

.

Finished in 0.00578 seconds (files took 0.07271 seconds to load)
1 example, 0 failures
```

Let’s add a second spec!

```ruby
Sandwich = Struct.new(:taste, :toppings)
RSpec.describe "An ideal sandwich" do
  it "is delicious" do
    # Developers work this way with RSpec all the time; they start with an outline and fill it in as they go
    sandwich = Sandwich.new("delicious", [])

    taste = sandwich.taste

    expect(taste).to eq("delicious")
  end

  it "lets me add toppings" do
    # Developers work this way with RSpec all the time; they start with an outline and fill it in as they go
    sandwich = Sandwich.new("delicious", [])

    sandwich.toppings << "cheese"
    toppings = sandwich.toppings

    expect(toppings).not_to be_empty
  end
end
```
This example shows 2 new features, check for falsehood (using `.not_to` instead of `.to`) and check for data structure attributes

But also they are repetitive, let’s introduce 3 new RSpec features:

• RSpec `hooks` run automatically at specific times during testing.
• `Helper methods` are regular Ruby methods; you control when these run.
• RSpec’s `let` construct initializes data on demand.

It’s kind of repetitive 



### Part II — Building an App With RSpec. {#chapter-2}

### Part III — RSpec Core. {#chapter-3}

### Part IV — RSpec Expectations. {#chapter-4}

### Part V — RSpec Mocks. {#chapter-5}



