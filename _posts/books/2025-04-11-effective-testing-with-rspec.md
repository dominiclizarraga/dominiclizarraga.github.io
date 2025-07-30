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


1. [Getting started with RSpec.](#chapter-1)
2. [From writing specs to running them.](#chapter-2)
3. [The RSpec way.](#chapter-3)
4. [Starting On the Outside: Acceptance Specs.](#chapter-4)
5. [Testing in isolation: Unit specs.](#chapter-5)
6. [Getting real: Integration specs.](#chapter-6)
5. [pending.](#chapter-5)
5. [pending.](#chapter-5)

### Part I — Chapter 1. Getting Started. {#chapter-1}

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

BDD brings the emphasis to where it is supposed to be: <b> your code's behavior. </b> 

RSpec is a productive Ruby test framework. we say productive because everything about it, its style, api, libraries, and settings are designed to support you as you write great software.

We have a specific definition of effective here, <b>does this test pay for the cost of writing and running it?</b> A good test will provide at least one of these benefits:

- design guidance:  helping you distill all those fantastic ideas in your head into running, maintainable code

- safety net: finding errors in your code before your customers do

- documentation:capturing the behavior of a working system to help it's maintainers 

As you follow along through the examples in this book, you will practice several habits that will help you test effectively:

When you describe precisely what you want your program to do, you avoid being too strict ( and failing when an irrelevant detail changes)  or too lax (and getting false Confidence from incomplete tests).

By writing your specs to report failure at the right level of detail, you give just enough information to find the cause of the problem, without drawing in excessive output.

By clearly separating essential test code from noisy setup code, you communicate what's exactly expected of the application, and you avoid repeating unnecessary detail.

When you reorder, profile, and filter your specs, you unearth order dependencies, slow tests and incomplete work.

Installing RSpec.

It is made of three independent ruby gems:

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

The book starts with the very simple example of building a sandwich. What's the most important property of a sandwich? the bread? the condiments? No, the most important thing about a sandwich is that it should taste good.

RSpec uses the words `describe` a `it` to express concepts in a conversational format:

- “Describe an ideal sandwich”
- “First, it is delicious” 

```ruby
01-getting-started/01/spec/sandwich_spec.rb
RSpec.describe “An ideal sandwich” do
  it “is delicious” do
    # developers work this way with RSpec all the time; they start with an outline and fill it in as they go. 
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
This file defines your test, known in RSpec as your specs, <b>short for a specification (because they specify the desired behavior of your code)</b>. The outer `describe` block creates an example group – an example group defines what you are testing, in this case, a sandwich, and keeps related specs together.

The nested block, the one beginning with `it`, is an example of the sandwich’s use. As you write specs, you will tend to keep each example focused on one particular size of behavior you are testing.

>This first paragraphs reminds me of Jason Swett's book on how many times he stresses to the readers that tests are a specifications not validations! I was able to count at least 8 times that he mentions that for example:
<b>A specification is a statement of how some aspect of a software product should behave.</b> 
<b>Remember that testing is about a specification, not verification. </b> 
<b>A test suite is a structured collection of behavior specifications.</b> 

Differences between tests, specs and examples:

• A test validates that a bit of code is working properly. 
• A spec describes the desired behavior of a bit of code. 
• An example shows how a particular API is intended to be used.

In the bits of code that we wrote we can clearly see the pattern arrange/act/assert.

The last line with the `expect` keyword is the assertion in other test frameworks. Let’s look at the RSpec methods we’ve used:

• `RSpec.describe` creates an example group (set of related tests).
• `it` creates an example (individual test).
• `expect` verifies an expected outcome (assertion).

Up to this point this spec serves two purposes: documenting what your sandwich should do and checking that the sandwich does what it is supposed to. (Lovely, isn’t it? 🤌) 

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

Here we can see that RSpec gives us a detailed report showing us the line of code where the error occurred, and the description of the problem, in this case sandwich has not been initialized.

With this we are following Red/Green/Refactor development practice essential to TDD and BDD. With this workflow, you’ll make sure each example catches failing or missing code before you implement the behavior you’re testing.

The next step after writing a failing spec is to make it pass.

```ruby 
# add to the top of the file 
`Sandwich = Struct.new(:taste, :toppings)`  # more about [Structs official docs](https://rubyapi.org/3.4/o/struct) and [Stackoverflow](https://stackoverflow.com/questions/25873672/ruby-class-vs-struct)
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

To avoid the repetitiveness that the prior code shows, let's start using what we described previously hooks, helper methods, let. 

Hooks

The first thing that we will try in our test Suite is a before hook, which will run automatically before each example. (it reminds me to [ActiveRecord callbacks](https://guides.rubyonrails.org/active_record_callbacks.html)) 

```ruby
RSpec.describe "An ideal sandwich" do
  before { @sandwich = Sandwich.new("delicious", []) } 
  it "is delicious" do
    taste = @sandwich.taste

    expect(taste).to eq("delicious")
  end

  it "lets me add toppings" do
    @sandwich.toppings << "cheese"
    toppings = @sandwich.toppings

    expect(toppings).not_to be_empty
  end
end
```

The setup code is shared across specs, but the individual Sandwich instance is not. Every example gets its own sandwich. That means that you can add toppings as you do in the second spec, with the confidence that the changes won't affect other examples.

<div style="text-align: center;">RSpec keeps track of all the hooks you have registered. Each time RSpec is about to start running one of your examples, it will run any `before` hooks that apply.  `hooks` are great for running, setup code that has real-world side effects. If you need to clear out a test database before each example, a hook is a great place to do so.</div>

<div style="text-align: center;">Here are some drawbacks from `hooks`:  First, If you misspelled `@sandwich`, Ruby will silently return `nil` instead of aborting with a failure right away. The result is typically a confusing error message. Second, to refactor your specs to use instance variables, you have had to go through the entire file and replace `sandwich` with `@sandwich`. Finally, when you initialize an instance variable maybe `before hook`, you pay the cost of that setup time for all the examples in the group even if some of them never use the instance variable. That is inefficient and can be quite noticeable.</div>

 Let's try a different approach. (a more traditional Ruby approach)

RSpec does a lot for us; it is easy to forget that it is just playing Ruby underneath. Each example group is a ruby class, which means that we can define methods on it. 

```ruby
RSpec.describe "An ideal sandwich" do
  def sandwich
    @sandwich ||= Sandwich.new("delicious", [])
  end
  it "is delicious" do
    taste = sandwich.taste

    expect(taste).to eq("delicious")
  end

  it "lets me add toppings" do
    sandwich.toppings << "cheese"
    toppings = sandwich.toppings

    expect(toppings).not_to be_empty
  end
end
```
A typical Ruby implementation might look something like the one we just wrote which uses memoization.

This pattern is pretty easy to find in Ruby but it is not without its pitfalls. the `||=` operator works by seeing if `@sandwich` is falsey, that is, `false` or `nil`, before creating a new `@sandwich`. That means that it won't work if we are actually trying to store something `falsey`.

Sharing objects with `let`

RSpec gives us an alternative construct, `let`. Which handles the edge case that we previously discussed with `memoization`.

You can think of `let` as assigning a name — in this case, `:sandwich` — to the result of a block. This block is lazily evaluated, meaning RSpec will only run it the first time `:sandwich` is accessed within an example. The result is then memoized (cached) for the remainder of that example.

Our recommendation is to use these code-sharing techniques where they improve maintainability, lesson noise, and increase clarity. 

```ruby
RSpec.describe "An ideal sandwich" do
  let (:sandwich) { Sandwich.new("delicious", []) } # [let official docs](https://rspec.info/features/3-13/rspec-core/helper-methods/let/)
  it "is delicious" do
    taste = sandwich.taste

    expect(taste).to eq("delicious")
  end

  it "lets me add toppings" do
    sandwich.toppings << "cheese"
    toppings = sandwich.toppings

    expect(toppings).not_to be_empty
  end
end
```
[Claude convo about let](https://claude.ai/chat/b5733d6a-d842-406b-83bc-d7ebc98008b5)

At the end of the chapter there is a “Your turn” section where the author encouraged you to respond a couple of questions and for the first chapter they asked the following:
 Which of the three ways to reduce duplication that we have shown to you do you like the best for this example? Why? Can you think of situations where the others might be a better option?

As all good engineering questions it depends as we have seen the first one which was the before hook, it is very clean, it reads good however we saw that it has some drawbacks, like it would return `nil` if the instance variable is misspelled  and all the refactor gymnastics that it implies for refactoring just one file even when the instance variable is not used in a group example. Then the `helper method` has the memoization problem and finally they `let` alternative covers those issues. 

Some extra coding for solidifying `let` knowledge:

```ruby
RSpec.describe "An ideal sandwich" do
  let(:sandwich) { Sandwich.new("delicious", []) }
  
  it "is delicious" do
    puts "Example 1 - Sandwich object_id: #{sandwich.object_id}"
    # Example 1 - Sandwich object_id: 1232
    taste = sandwich.taste
    expect(taste).to eq("delicious")
  end

  it "lets me add toppings" do
    puts "Example 2 - Sandwich object_id: #{sandwich.object_id}"
    # Example 2 - Sandwich object_id: 1240
    sandwich.toppings << "cheese"
    toppings = sandwich.toppings
    expect(toppings).not_to be_empty
  end
end

# within same group example

it "uses the same object within one example" do
  puts "First call: #{sandwich.object_id}"
  # First call: 1248
  sandwich.toppings << "cheese"
  
  puts "Second call: #{sandwich.object_id}"  # Same object!
  # Second call: 1248
  expect(sandwich.toppings).to include("cheese")  # Cheese is still there
end
```
A recap of Chapter 1: We explored the `describe` block, which is called on a group of examples, and the `it` block, which is called an example (or a test case in some other testing frameworks). We covered the `expect` keyword. We also looked at the Arrange-Act-Assert pattern. We thoroughly read through test failures and what they mean.

We understood that testing serves two purposes: documenting what the code should do, and checking that the code does what it’s supposed to do. We explored how to negate an expectation, and how to test collections such as arrays and hashes. Finally, we saw three different ways of reducing code in tests: `hooks`, Ruby helper methods, and the `let` construct.

### Part I — Chapter 2. From writing specs to running them. {#chapter-2}

```ruby
# Add the next file 01-getting-started/01/spec/coffee_spec.rb
class Coffee
  def ingridients
    @ingridients ||= []
  end

  def add(ingridient)
    ingridients << ingridient
  end

  def price
    1.00
  end
end

RSpec.describe "A cup of coffee" do
  let(:coffee) { Coffee.new }
  it "costs $1" do
    expect(coffee.price).to eq(1)
  end

  context "with milk" do
    before { coffee.add :milk }

    it "costs $1.25" do
      expect(coffee.price).to eq(1.25)
    end
  end
end
```
And in this chapter we explore the `--format documentation`
```ruby
➜  rspec-book git:(master) bundle exec rspec 01-getting-started/01 --format documentation

A cup of coffee
  costs $1
  with milk
    costs $1.25 (FAILED - 1)

An ideal sandwich
  is delicious
  lets me add toppings

Failures:

  1) A cup of coffee with milk costs $1.25
     Failure/Error: expect(coffee.price).to eq(1.25)
     
       expected: 1.25
            got: 1.0
     
       (compared using ==)
     # ./01-getting-started/01/spec/coffee_spec.rb:25:in 'block (3 levels) in <top (required)>'

Finished in 0.01762 seconds (files took 0.08827 seconds to load)
4 examples, 1 failure

Failed examples:

rspec ./01-getting-started/01/spec/coffee_spec.rb:24 # A cup of coffee with milk costs $1.25
```
Another suggestion from the book is adding the [gem coderay](https://github.com/rubychan/coderay) which highlights with different colors the line that is failing. This is particularly useful when dealing with complex tests suites.
`bundle exec rspec 01-getting-started/01 -fd` (see the `expect` and `1.25`)

<div><img src='/../graphics/projects/coderay_gem_syntax_highlight.png' alt='highlight_syntax_by_coderay_gem' style="width:400px;"/></div>

Another tool that is shown in this chapter is how to identify a slow test by adding `--profile n` (n is the number of offenders we’d like to see)

```ruby 
# 01-getting-started/01/spec/slow_spec.rb
RSpec.describe "The sleep() method" do
  it("can sleep for 0.1 seconds") { sleep 0.1 }
  it("can sleep for 0.2 seconds") { sleep 0.2 }
  it("can sleep for 0.3 seconds") { sleep 0.3 }
  it("can sleep for 0.4 seconds") { sleep 0.4 }
  it("can sleep for 0.5 seconds") { sleep 0.5 }
end

# $ bundle exec rspec 01-getting-started/01 -fd --profile 2
The sleep() method
  can sleep for 0.1 seconds
  can sleep for 0.2 seconds
  can sleep for 0.3 seconds
  can sleep for 0.4 seconds
  can sleep for 0.5 seconds

Top 2 slowest examples (0.90852 seconds, 58.8% of total time):
  The sleep() method can sleep for 0.5 seconds
    0.50321 seconds ./01-getting-started/01/spec/slow_spec.rb:6
  The sleep() method can sleep for 0.4 seconds
    0.40531 seconds ./01-getting-started/01/spec/slow_spec.rb:5


Finished in 1.54 seconds (files took 0.0894 seconds to load)
5 examples, 0 failures
```
Also this chapter covers how to run specific tests when you don’t need to run the whole test suite (from directories, to files to even just examples).

```ruby 
$ rspec spec/unit/specific_spec.rb # Load just one spec file
$ rspec spec/unit spec/foo_spec.rb # Or mix and match files and directories
```

Example for running examples that contains word “milk” (searches are
case-sensitive)

```ruby
$ bundle exec rspec 01-getting-started/01 -e milk -fd 
Run options: include {full_description: /milk/}

A cup of coffee
  with milk
    costs $1.25 (FAILED - 1)

Failures:

  1) A cup of coffee with milk costs $1.25
     Failure/Error: expect(coffee.price).to eq(1.25)
     
       expected: 1.25
            got: 1.0
     
       (compared using ==)
     # ./01-getting-started/01/spec/coffee_spec.rb:25:in 'block (3 levels) in <top (required)>'

Finished in 0.0128 seconds (files took 0.06799 seconds to load)
1 example, 1 failure
```
And if you need to run only one example or test case, you can pass `rspec 01-getting-started/01/spec/coffee_spec.rb:25` and RSpec will run the example that starts on that line.

Rerunning Everything That Failed

There is one RSpec command that allows you to run just exactly the failing specs, this is pretty useful as the last command because you avoid running the whole test suite and you can fix one spec, rerun it, fix the next one and so on let's dive in 

```ruby
# here we can see that same error is being brought up, example: `with milk costs $1.25`
➜  rspec-book git:(master) ✗ bundle exec rspec 01-getting-started/01/
.F.......

Failures:

  1) A cup of coffee with milk costs $1.25
     Failure/Error: expect(coffee.price).to eq(1.25)
     
       expected: 1.25
            got: 1.0
     
       (compared using ==)
     # ./01-getting-started/01/spec/coffee_spec.rb:29:in 'block (3 levels) in <top (required)>'

Finished in 1.55 seconds (files took 0.08332 seconds to load)
9 examples, 1 failure

Failed examples:

rspec ./01-getting-started/01/spec/coffee_spec.rb:28 # A cup of coffee with milk costs $1.25

```
Then we add the command `--only-failures` at the end and this will ask us for a path to write the last run diagnosis, in this case we added:

```ruby
➜ rspec-book git:(master) ✗ bundle exec rspec 01-getting-started/01/ --only-failures

To use `--only-failures`, you must first set `config.example_status_persistence_file_path`.

#  add this config line

RSpec.configure do |config|
  config.example_status_persistence_file_path = 'spec/examples.txt'
end
```
Which will add a spec/examples.txt file with details as the following:

example_id                                         | status | run_time        |
-------------------------------------------------- | ------ | --------------- |
./01-getting-started/01/spec/coffee_spec.rb[1:1]   | passed | 0.00064 seconds |
./01-getting-started/01/spec/coffee_spec.rb[1:2:1] | failed | 0.01486 seconds |
./01-getting-started/01/spec/sandwich_spec.rb[1:1] | passed | 0.00007 seconds |
./01-getting-started/01/spec/sandwich_spec.rb[1:2] | passed | 0.00163 seconds |
./01-getting-started/01/spec/slow_spec.rb[1:1]     | passed | 0.10517 seconds |
./01-getting-started/01/spec/slow_spec.rb[1:2]     | passed | 0.20549 seconds |
./01-getting-started/01/spec/slow_spec.rb[1:3]     | passed | 0.30431 seconds |
./01-getting-started/01/spec/slow_spec.rb[1:4]     | passed | 0.40278 seconds |
./01-getting-started/01/spec/slow_spec.rb[1:5]     | passed | 0.50561 seconds |

Finally, when we re-run the `--only-failures` it will search for that “failed status” and run only that one! You can see it below:

```ruby
➜  rspec-book git:(master) ✗ bundle exec rspec 01-getting-started/01/ --only-failures
Run options: include {last_run_status: "failed"} 👈
F

Failures:

  1) A cup of coffee with milk costs $1.25
     Failure/Error: expect(coffee.price).to eq(1.25)
     
       expected: 1.25
            got: 1.0
     
       (compared using ==)
     # ./01-getting-started/01/spec/coffee_spec.rb:29:in 'block (3 levels) in <top (required)>'

Finished in 0.01276 seconds (files took 0.08701 seconds to load)
1 example, 1 failure
Failed examples:

rspec ./01-getting-started/01/spec/coffee_spec.rb:28 # A cup of coffee with milk costs $1.25
```

The usage of command `rspec –next-failure`

```ruby
rspec-book git:(master) ✗ bundle exec rspec 02-running-specs
# above command created spec/tea_examples.txt
example_id                          | status | run_time        |
----------------------------------- | ------ | --------------- |
./02-running-specs/tea_spec.rb[1:1] | failed | 0.0001 seconds  |
./02-running-specs/tea_spec.rb[1:2] | failed | 0.00005 seconds |

02-running-specs/tea_spec.rb
class Tea
end

RSpec.configure do |config|
  config.example_status_persistence_file_path = 'spec/tea_examples.txt'
end

RSpec.describe "Tea" do
  let(:tea) { Tea.new }
  it "tastes like Earl Grey" do
    expect(tea.flavor).to be :earl_grey
  end

  it "is hot" do
    expect(tea.temperature).to be > 200.0
  end
end

➜  rspec-book git:(master) ✗ bundle exec rspec 02-running-specs           
FF

Failures:

  1) Tea tastes like Earl Grey
     Failure/Error: expect(tea.flavor).to be :earl_grey
     
     NoMethodError:
       undefined method 'flavor' for an instance of Tea
     # ./02-running-specs/tea_spec.rb:11:in 'block (2 levels) in <top (required)>'

  2) Tea is hot
     Failure/Error: expect(tea.temperature).to be > 200.0
     
     NoMethodError:
       undefined method 'temperature' for an instance of Tea
     # ./02-running-specs/tea_spec.rb:15:in 'block (2 levels) in <top (required)>'

Finished in 0.00362 seconds (files took 0.08398 seconds to load)
2 examples, 2 failures

Failed examples:

rspec ./02-running-specs/tea_spec.rb:10 # Tea tastes like Earl Grey
rspec ./02-running-specs/tea_spec.rb:14 # Tea is hot

```

Then we add the option `–next-failure` and it will only run the very next failure, not the whole test suite.

```ruby
$ bundle exec rspec 02-running-specs --next-failure
Run options: include {last_run_status: "failed"}
F

Failures:

  1) Tea tastes like Earl Grey
     Failure/Error: expect(tea.flavor).to be :earl_grey
     
     NoMethodError:
       undefined method 'flavor' for an instance of Tea
     # ./02-running-specs/tea_spec.rb:11:in 'block (2 levels) in <top (required)>'

Finished in 0.00049 seconds (files took 0.08649 seconds to load)
1 example, 1 failure

Failed examples:

rspec ./02-running-specs/tea_spec.rb:10 # Tea tastes like Earl Grey
```

This chapter focused on how specs should look and how they can be run.
It began with the introduction of the `context` block, which is an alias for `describe`. However, it has a more specific and useful purpose: it's often used for phrases that describe a particular state or condition of the object being tested.

We learned about the command `rspec --format documentation` or `--f d`, which separates group examples from individual examples and adds indentation to visually show nesting—such as one or two levels deep.

We also explored the gem called coderay, which adds color to test output, making it easier to scan for failures. Additionally, we covered the command `rspec --profile 2`, which helps identify the slowest-running tests.

Next, we learned about the `rspec --example word` command, which allows us to run only the group examples or examples that match the given word.

Then, we explored how to run a specific test by including the line number in the command, like so:
`rspec ./spec/coffee_spec.rb:25`.

We also discovered a very useful command: `rspec --only-failures`. This runs only the tests that failed in the previous run by using a file that stores the status of each example.

We then looked into running tests in focused mode—allowing us to run only specific `context`, `it`, or `describe` blocks by tagging them. We can assign custom tags and then pass those tags when running rspec to filter the examples accordingly.

Another feature we explored was how to sketch out the test suite when you have more ideas in mind than time to implement them. You can use an `it` block with just a description (without a body), which RSpec treats as `pending`. You can also mark tests as incomplete using `pending`, `skip`, or `xit`.

Finally, we covered the `--next-failure` command, which runs only the next failing test from the previous run.

| Command                                 | Description                                                                 |
|-----------------------------------------|-----------------------------------------------------------------------------|
| rspec --format documentation            | Displays test output with indentation to show nesting of examples.         |
| rspec --profile 2                       | Shows the 2 slowest-running tests to help identify performance bottlenecks.|
| rspec --example word                    | Runs only the examples that match the given word.                          |
| rspec ./spec/filename_spec.rb:25        | Runs only the test located on line 25 of the specified file.               |
| rspec --only-failures                   | Runs only the tests that failed in the previous run.                       |
| rspec --next-failure                    | Runs the next failing test from the last run.                              |

### Part I — Chapter 3. The RSpec Way. {#chapter-3}

All these prior  features of RSpec are designed to make certain habits easy:
• Writing examples that clearly spell out the expected behavior of the code
• Separating common setup code from the actual test logic
• Focusing on just what you need to do to make the next spec pass

Writing specs isn’t the goal of using RSpec—it’s the benefits those specs provide. Let’s talk about those benefits now; they’re not all as obvious as “specs catch bugs.”

- Specs increase confidence in your project
	• The “happy path” through a particular bit of code behaves the way you want it to.
• A method detects and reacts to an error condition you’re anticipating.
• That last feature you added didn’t break the existing ones.
• You’re making measurable progress through the project.
- Eliminating fear
	- With broad test coverage, developers find out early if new code is breaking existing features. 
- Enabling refactoring
- Without a good set of specs, refactoring is a daunting task.
- Our challenge as developers is to structure our projects so that big changes are easy and predictable. As Kent Beck says, “for each desired change, make the change easy (warning: this may be hard), then make the easy change.”
- Guiding design
- If you write your specs before your implementation, you’ll be your own first client.
- As counterintuitive as it may sound, one of the purposes of writing specs is to cause pain—or rather, to make poorly designed code painful.
- Sustainability
- RSpec may slow initial development but ensures faster, safer future changes—unless the project is small, static, or disposable.
- Documenting behavior.
- Transforming your workflow
	- Each run of your suite is an experiment you’ve designed in order to validate (or refute) a hypothesis about how the code behaves.
- You get fast, frequent feedback when something doesn’t work, and you can change course immediately

Running the entire suite
Consider the difference between a test suite taking 12 seconds and one taking 10 minutes. After 1,000 runs, the former has taken 3 hours and 20 minutes. The latter has cumulatively taken nearly 7 days.

Deciding what not to test
Every behavior you specify in a test is another point of coupling between your tests and your project code. That means you’ll have one more thing you’ll have to fix if you ever need to change your implementation’s behavior.

If you do need to drive a UI from automated tests, try to test in terms of your problem domain (“log in as an administrator”) rather than implementation details (“type admin@example.com into the third text field”).

Another key place to show restraint is the level of detail in your test assertions. Rather than asserting that an error message exactly matches a particular string (“Could not find user with ID 123”), consider using substrings to match just the key parts (“Could not find user”). Likewise, don’t specify the exact order of a collection unless the order is important. 

### Part II — Building an app with RSpec.

### Part II — Chapter 4. Building an App With RSpec. {#chapter-4}

In this chapter authors decide to build an expense tracker app where users can add/search expenses.

It will use [Sinatra](https://sinatrarb.com/) as router and not rails since we don't need background workers, mailers, views, asset pipelie and so on.

We need a small JSON APIs and Sinatra will do the job.

<b>Acceptance specs => which checks the behavior of the application as a whole. By the end of the chapter, we’ll have the skeleton of a live app and a spec to test it (It makes me think like a smoke check for the core flow.)</b>

Also, we used a "outside-in development" which means start working at outermost layer (the HTTP request/response cycle) and work your way inward to the classes and methods that contain the logic.

Create a directory and add `bundler`

```ruby
# 04-acceptance-specs/

# add ENV['RACK_ENV'] = 'test' to spec_helper.rb

# add bundler as package manager
`bundle init`

# then in the Gemfile file add the next gems
gem "rspec", "~> 3.13"
gem "coderay" # easy-to-read, syntax-highlighted
gem 'rack-test' # provide an API for tests
gem 'sinatra' # implement the web application

# then run `bundle install` and `bundle exec rspec --init`, which will create:
`.rspec` # contains rspec command line flags
`spec/spec_helper.rb` # contains configuration options

```

It’s easy to feel overwhelmed as we’re deciding what to test first. Where do we start?

 <b>What’s thecore of the project? What’s the one thing we agree our API should do? It should faithfully save the expenses we record.</b>

We’re only going to use two of the most basic features of HTTP in these examples:
• A `GET` request reads data from the app.
• A `POST` request modifies data.

First testing run 🏃

```ruby
require 'rack/test'
require 'json'

module ExpenseTracker
  RSpec.describe 'Expense Tracker API' do
    include Rack::Test::Methods

    it 'records submitted expenses' do
      coffee = {
      'payee' => 'Starbucks',
      'amount' => 5.75,
      'date' => '2025-06-10'
      }
      post '/expenses', JSON.generate(coffee) # This will simulate an HTTP POST request (it's a Rack::Test helper)
    end
  end
end
```

In the console we run `bundle exec rspec 04-acceptance-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb` and we get the next error:

```ruby
F

Failures:

  1) Expense Tracker API records submitted expenses
     Failure/Error: post '/expenses', JSON.generate(coffee)
     
     NameError:
       undefined local variable or method 'app' for #<RSpec::ExampleGroups::ExpenseTrackerAPI:0x000000011e93b538>
     # ./04-acceptance-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb:14:in 'block (2 levels) in <module:ExpenseTracker>'

Finished in 0.00161 seconds (files took 0.15436 seconds to load)
1 example, 1 failure

Failed examples:

rspec ./04-acceptance-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb:8 # Expense Tracker API records submitted expenses
```

Given error tells us that we cannot use `app` because we have not defined it yet, so let's add it (temporaly with a ruby helper method.)

```ruby
# 04-acceptance-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb
    def app
      ExpenseTracker::API.new
    end

    it 'records submitted expenses' do
      ...
    end
# 04-acceptance-specs/01/expense_tracker/app/api.rb
require 'sinatra/base'
require 'json'

module ExpenseTracker
  class API < Sinatra::Base # This class defines the barest skeleton of a Sinatra app.
  end
end
```

Now, by adding `ExpenseTracker::API` and the `app` method we’re verifying only that the `POST` request completes without crashing the app.

Let's check the response

```ruby
F

Failures:

  1) Expense Tracker API records submitted expenses
     Failure/Error: expect(last_response.status).to eq(200)
     
       expected: 200
            got: 404
     
       (compared using ==)
     # ./04-acceptance-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb:21:in 'block (2 levels) in <module:ExpenseTracker>'

Finished in 0.02102 seconds (files took 0.20637 seconds to load)
1 example, 1 failure
```

We need to add the route for this:

```ruby
# 04-acceptance-specs/01/expense_tracker/app/api.rb
  post '/expenses' do
  end
```

Let's fill the body of the response, we start from the testing, in this case parsing the `response`
```ruby
# 04-acceptance-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb
  it 'records submitted expenses' do
    coffee = {
      'payee' => 'Starbucks',
      'amount' => 5.75,
      'date' => '2017-06-10'
    }

    post '/expenses', JSON.generate(coffee)
    p last_response
    expect(last_response.status).to eq(200)

    parsed = JSON.parse(last_response.body) 👈
    expect(parsed).to include('expense_id' => a_kind_of(Integer)) 👈
  end
```

Then in our API we are going to fool the response with the following:
```ruby
  # 04-acceptance-specs/01/expense_tracker/app/api.rb
  post '/expenses' do
    JSON.generate('expense_id' => 42)
  end
```

And as we're inspecting the `last_response` we can see the `@body` contains the hash with key as `expense_id` and value as `42`.

```ruby
-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb
#<Rack::MockResponse:0x000000011db1ba48 @original_headers={"content-type" => "text/html;charset=utf-8", "content-length" => "17", "x-xss-protection" => "1; mode=block", "x-content-type-options" => "nosniff", "x-frame-options" => "SAMEORIGIN"}, @errors="", @status=200, @headers={"content-type" => "text/html;charset=utf-8", "content-length" => "17", "x-xss-protection" => "1; mode=block", "x-content-type-options" => "nosniff", "x-frame-options" => "SAMEORIGIN"}, @writer=#<Method: Rack::MockResponse(Rack::Response::Helpers)#append(chunk) /Users/dominiclizarraga/.rbenv/versions/3.4.2/lib/ruby/gems/3.4.0/gems/rack-3.1.16/lib/rack/response.rb:359>, @block=nil, @body=["{\"expense_id\":42}"], @buffered=true, @length=17, @cookies={}>
```

Saving expenses is all fine and good, but it’d be nice to retrieve them. Let's fetch expenses by date.

Let's start by adding more expenses:

```ruby
# within the example 'records submitted expenses' add these 2 hashes
    it 'records submitted expenses' do
      zoo = post_expense(
        'payee' => 'Zoo',
        'amount' => 15.25,
        'date' => '2017-06-10'
      )
  
      groceries = post_expense(
        'payee' => 'Whole Foods',
        'amount' => 95.20,
        'date' => '2017-06-11'
      )
  
      coffee = post_expense(
        'payee' => 'Starbucks',
        'amount' => 5.75,
        'date' => '2017-06-10'
      )

      get '/expenses/2017-06-10'
      expect(last_response.status).to eq(200)

      expenses = JSON.parse(last_response.body)
      expect(expenses).to contain_exactly(coffee, zoo)
    end
```

And as you may see we added the `post_expense(expense)` method, so add it within `describe` block:

```ruby
  def post_expense(expense)
    post '/expenses', JSON.generate(expense)
    expect(last_response.status).to eq(200)

    parsed = JSON.parse(last_response.body)
    expect(parsed).to include('expense_id' => a_kind_of(Integer))
    expense.merge('id' => parsed['expense_id'])
  end
```

When you run the test suite `bundle exec rspec 04-acceptance-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb` you should see an error like this:

```ruby
Failures:

  1) Expense Tracker API records submitted expenses
     Failure/Error: expect(expenses).to contain_exactly(coffee, zoo)
     
       expected collection contained:  [{"amount" => 5.75, "date" => "2017-06-10", "id" => 42, "payee" => "Starbucks"}, {"amount" => 15.25, "date" => "2017-06-10", "id" => 42, "payee" => "Zoo"}]
       actual collection contained:    []
       the missing elements were:      [{"amount" => 5.75, "date" => "2017-06-10", "id" => 42, "payee" => "Starbucks"}, {"amount" => 15.25, "date" => "2017-06-10", "id" => 42, "payee" => "Zoo"}]
     # ./04-acceptance-specs/01/expense_tracker/spec/expense_tracker_api_spec.rb:47:in 'block (2 levels) in <module:ExpenseTracker>'

Finished in 0.0305 seconds (files took 0.2402 seconds to load)
1 example, 1 failure
```

And the API endpoint we should enable is the following (`GET '/expenses/:date'`)

```ruby
# 04-acceptance-specs/01/expense_tracker/app/api.rb
module ExpenseTracker
  class API < Sinatra::Base
    post '/expenses' do
      JSON.generate('expense_id' => 42)
    end

    get '/expenses/:date' do 
      JSON.generate([])
    end
  end
end
```

Now, we can mark the test_case as pending by adding right after the `it` block `pending 'Need to persist expenses'` this will change the red color from our terminal to a more friendly yellow.

And with this warning we can add a webserver gem, in this case add `gem 'rackup'`, `gem 'webrick'` to Gemfile and create a file:
```ruby
 # 04-acceptance-specs/01/expense_tracker/config.ru # new file 🚨
  require_relative 'app/api'
  run ExpenseTracker::API.new

# run `cd 04-acceptance-specs/01/expense_tracker` and from that directory [NOT rspec-book] run `bundle exec rackup`
# this will boot up a webserver 
➜  expense_tracker git:(master) ✗ bundle exec rackup

[2025-07-23 14:29:17] INFO  WEBrick 1.9.1
[2025-07-23 14:29:17] INFO  ruby 3.4.2 (2025-02-15) [arm64-darwin24]
[2025-07-23 14:29:17] INFO  WEBrick::HTTPServer#start: pid=6213 port=9292
::1 - - [23/Jul/2025:14:29:59 -0400] "GET /expenses/2017-06-10 HTTP/1.1" 200 2 0.0063
 ```

In another terminal you can try out your server with the following command:

```ruby
➜  rspec-book git:(master) ✗ curl localhost:9292/expenses/2017-06-10 -w "\n"
[] # this is due to our 04-acceptance-specs/01/expense_tracker/app/api.rb GET route ✅
```
To recap of this chapter we began a project about tracking expenses that will register and search them, with only 2 actions. We set up `bundler` since we need more libraries than RSpec, such as Sinatra, SQlite, Rack, WEBrick, etc.

We started with an outside-in approach where we defined the outer layer of the app in this case the `POST` endpoint. We were encouraged to think deeply about the public API and what type of data we wanted back as a response. Then we started building the classes, and we made progress by clearing one error at a time. We used two new matchers `include`, `a_kind_of` and `contain_exactly` which we didn't use but was mentioned and lastly we refactored an method for persisting a Hash of expenses and booted up the web server with `bundle exec rackup`. It's important to mention that all these requests are simulated.

### Part II — Chapter 5. Testing in isolation: Unit specs. {#chapter-5}

In this chapter we're going to be picking up where we left off: the HTTP routing layer.

Unit tests typically involve isolating a class or method from the rest of the code. The result is faster tests and easier-to-find errors.

We’ll use unit spec to refer to the fastest, most isolated set of tests for a particular project.

With the unit tests in this chapter, you won’t be calling methods on the API class directly. Instead, you’ll still be simulating HTTP requests through the Rack::Test interface. <a href="https://rhnh.net/2012/12/20/how-i-test-rails-applications/" target="_blank">Xavier Shay article about how he tests rails apps</a>

Your tests for any particular layer—from customer-facing code down to low-level model classes—should drive that layer’s public API. <b>You’ll find yourself making more careful decisions about what does or doesn’t go into the API.</b>

The behavior we want to see is - what happens when an API call succeeds and when it fails.

<div style="text-align: center;">Unit tests are great for test all the conditional branches and edge cases very fast on the other hand if we do it with acceptance/integration would be too inefficient.</div>

```ruby
# create a file spec/unit/app/api_spec.rb
require_relative '../app/api'

module ExpenseTracker
  RSpec.describe API do
    describe 'POST /expenses' do
      context 'when the expense is successfully recorded' do
        it 'returns the expense id'
        it 'responds with a 200 (OK)'
      end

      context 'when the expense fails validation' do
        it 'returns an error message'
        it 'responds with a 422 (Unprocessable entity)'
      end
    end
  end
end
```
Hit the console with `bundle exec rspec 04-acceptance-specs/01/expense_tracker/app/api_spec.rb` all tests shoudl appear as "pending".

We are still modeling the API so we want something like this:

```ruby
result = @ledger.record({ 'some' => 'data' })
result.success? # => a Boolean
result.expense_id # => a number
result.error_message # => a string or nil
```

Remember, we're testing the API class, not the bahavior.

This is the perfect spot for `test doubles`. A test double is an object that stands in for another one during a test. 

To create a stand-in for an instance of a particular class, you’ll use RSpec’s `instance_double` method, and pass it the name of the class you’re imitating. <a href="https://martinfowler.com/bliki/TestDouble.html" target="_blank">Martin Fowler's article about test double</a>


Add the follwoing code to file `04-acceptance-specs/01/expense_tracker/spec/unit/api_spec.rb`

```ruby
require_relative '../app/api'
require 'rack/test'

module ExpenseTracker
  RecordResult = Struct.new(:success?, :expense_id, :error_message)

  RSpec.describe API do
    include Rack::Test::Methods

    def app
      API.new(ledger: ledger)
    end

    let(:ledger) { instance_double('ExpenseTracker::Ledger') }

    describe 'POST /expenses' do
      context 'when the expense is successfully recorded' do
        it 'returns the expense id'
        it 'responds with a 200 (OK)'
      end

      context 'when the expense fails validation' do
        it 'returns an error message'
        it 'responds with a 422 (Unprocessable entity)'
      end
    end
  end
end
```

As with the acceptance specs, you’ll be using `Rack::Test` to route HTTP requests to the API class. Eventually, we'll move the `RecordResult` class into the codebase.

<b>The seam between layers is where integration bugs hide. Using a simple value object like a `RecordResult` or `Struct` between layers makes it easier to isolate code and trust your tests.</b> <a href="https://www.destroyallsoftware.com/talks/boundaries" target="_blank">Article related to catching bugs between layers.</a>

🔦 If you feel a bit lost here is a summary of the 3 files we have written in chapter 5. 🔎

`api.rb`: Defines a thin HTTP API (Sinatra app). It’s the boundary/interface between the outside world and your app logic.

- Parse incoming HTTP requests

- Forward them to your application logic (Ledger object)

- Return an HTTP response (JSON with status codes)

It's like a router/controller in Rails.

`api_spec.rb`: Tests the API in isolation using test doubles, to control its behavior and avoid hitting the database or real logic.

This is a unit test for your API layer.

You’re using an `instance_double` of `Ledger` to isolate the API layer and check:

- Does the API route call ledger.record?

- Does it return the expected response if ledger.record is successful?

- What happens if ledger.record fails?

`expense_tracker_spec.rb`: <b>Acceptance-level (end-to-end) spec.</b> It tests the whole system, using real logic (no doubles), to ensure the full behavior works.

- It sends POST requests with expense data.

- It sends a GET request to retrieve expenses for a given day.

- It checks whether the correct data is returned.

- It tests the full stack: HTTP → Sinatra → Ledger → persistence.

`initialize(ledger:)`: Adds dependency injection so the API can be wired up with either real objects (in end-to-end tests) or test doubles (in unit tests).

```ruby
# 04-acceptance-specs/01/expense_tracker/spec/unit/api_spec.rb

require_relative '../../app/api'
require 'rack/test'

module ExpenseTracker
  RecordResult = Struct.new(:success?, :expense_id, :error_message)

  RSpec.describe API do
    include Rack::Test::Methods

    def app
      API.new(ledger: ledger)
    end

    let(:ledger) { instance_double('ExpenseTracker::Ledger') }

    describe 'POST /expenses' do
      context 'when the expense is successfully recorded' do
        it 'returns the expense id' do
          expense = { 'some' => 'data' }

          allow(ledger).to receive(:record)
                       .with(expense)
                       .and_return(RecordResult.new(true, 417, nil))

          post '/expenses', JSON.generate(expense)
          parsed = JSON.parse(last_response.body)
          expect(parsed).to include('expense_id' => 417)
        end

        it 'responds with a 200 (OK)'
      end

      context 'when the expense fails validation' do
        it 'returns an error message'
        it 'responds with a 422 (Unprocessable entity)'
      end
    end
  end
end
```
The `allow` method configures the test double's behavior: when the calle in this case the `API` class invokes `.record` the double will return a new `RecordResult` instance.

Also, please notice that the `expense` hash doesn't contain real data, this is ok since the whole point of the Ledger test double is that it will return a canned success or failure response.

If we run the test at this point we get the following:

```ruby
Failures:

  1) ExpenseTracker::API POST /expenses when the expense is successfully recorded returns the expense id
     Failure/Error: expect(parsed).to include('expense_id' => 417)
     
       expected {"expense_id" => 42} to include {"expense_id" => 417}
       Diff:
       @@ -1 +1 @@
       -"expense_id" => 417,
       +"expense_id" => 42,
       
     # ./04-acceptance-specs/01/expense_tracker/spec/unit/api_spec.rb:27:in 'block (4 levels) in <module:ExpenseTracker>'

Top 4 slowest examples (0.03167 seconds, 91.4% of total time):
...
```

Let's handle success and failure of the request in the `api.rb`

```ruby
require_relative '../../app/api'
require 'rack/test'

module ExpenseTracker
  RecordResult = Struct.new(:success?, :expense_id, :error_message)

  RSpec.describe API do
    include Rack::Test::Methods

    def app
      API.new(ledger: ledger)
    end

    let(:ledger) { instance_double('ExpenseTracker::Ledger') }

    
    describe 'POST /expenses' do
      context 'when the expense is successfully recorded' do
        let(:expense) { { 'some' => 'data' } }
        
        before do
          allow(ledger).to receive(:record)
                        .with(expense)
                        .and_return(RecordResult.new(true, 417, nil))
        end

        it 'returns the expense id' do
          post '/expenses', JSON.generate(expense)
          parsed = JSON.parse(last_response.body)
          expect(parsed).to include('expense_id' => 417)
        end

        it 'responds with a 200 (OK)' do
          post '/expenses', JSON.generate(expense)
          expect(last_response.status).to eq(200)
        end
      end

      context 'when the expense fails validation' do
        let(:expense) { { 'some' => 'data' } }
        
        before do
          allow(ledger).to receive(:record)
                        .with(expense)
                        .and_return(RecordResult.new(false, 417, "Expense incomplete"))
        end

        it 'returns an error message' do
          post '/expenses', JSON.generate(expense)

          parsed = JSON.parse(last_response.body)
          expect(parsed).to include('error' => 'Expense incomplete')
        end

        it 'responds with a 422 (Unprocessable entity)' do
          post '/expenses', JSON.generate(expense)
          expect(last_response.status).to eq(422)
        end
      end
    end
  end
end
```

These refactored specs report "just the facts" of the expected behavior.


As a recap If you ever need to see the full backtrace, you still can; just pass the --backtrace or -b flag to RSpec.

dependency injection DI in ruby

test double

verifying doubles
### Part II — Chapter 6. Getting real. Integration specs. {#chapter-6}

### Part III — RSpec Core.

### Part III — Chapter 7. Structuring code examples. {#chapter-7}

### Part III — Chapter 8. Slicing and dicing specs with metadata. {#chapter-8}

### Part III — Chapter 9. Configuring RSpec. {#chapter-9}

### Part IV — RSpec expectations.

### Part IV — Chapter 10. Exploring RSpec expectations. {#chapter-10}

### Part IV — Chapter 11. Matchers included in RSpec expectations. {#chapter-11}

### Part IV — Chapter 12. Creating custom matchers. {#chapter-12}

### Part V — RSpec mocks.

### Part V — Chapter 13. Understanding test doubles. {#chapter-13}

### Part V — Chapter 14. Customizing test doubles. {#chapter-14}

### Part V — Chapter 15. Using test doubles effectively. {#chapter-15}







