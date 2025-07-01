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
2. [From writing specs to running them.](#chapter-2)
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

### Part I — From writing specs to running them. {#chapter-2}

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

There is one RSpec command that allows you to run just exactly the fail specs, this is pretty useful as the last command because you avoid running the whole test rate and you can fix one spec, rerun it, fix the next one and so on let's dive in 

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

➜  rspec-book git:(master) ✗ bundle exec rspec 01-getting-started/01/ --only-failures

To use `--only-failures`, you must first set `config.example_status_persistence_file_path`.
```
Then we add the command `--only-failures` at the end and this will ask us for a path to write the last run diagnosis, in this case we added:

```ruby
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

### Part II — Building an App With RSpec. {#chapter-2}

### Part III — RSpec Core. {#chapter-3}

### Part IV — RSpec Expectations. {#chapter-4}

### Part V — RSpec Mocks. {#chapter-5}



