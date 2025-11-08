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

Here I wrote the parts I considered most important from this book, Jason goes from explaining different types of tests, which ones he uses, DSL, how to think on testing from a specification perspective

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

Model spec

I use model specs to test my models’ methods. When I do so, I tend to use a test-first approach and write a failing test before I add a new line of code so that I’m sure every bit of code in my model is covered by a test.

System spec

System specs are the only type of test that give me confidence my whole application really works.

Even though system specs are indispensable, they’re not without drawbacks. System specs are somewhat “heavy”

Request spec
I tend not to use request specs much because in most cases they would be redundant to my system specs. If I have system specs covering all my features, then of course a broken controller would fail one or more of my tests, making tests specifically for my controllers unnecessary.

I also try to keep my controllers sufficiently simple as to not call for tests of their own.

There are just three scenarios in which I do use request specs. First: If I’m working on a legacy project with fat controllers, sometimes I’ll use request specs to help me harness and refactor all that controller code. Second: If I’m working on an API-only Rails app, then system specs are physically impossible and I drop down to request specs instead. Lastly, if it’s just too awkward or expensive to use a system spec in a certain case then I’ll use a request spec instead.

View and routing spec

I find view specs and routing specs to be redundant to system specs. If something is wrong with one of my views or routes, it’s highly likely that one of my system specs will catch the problem.

What are all the Rails testing tools and how do I use them?

RSpec is a test framework. A test framework is what gives us a structure for writing our tests as well as the ability to run our tests.

One of the challenges of Rails testing is generating test data.

There are two common ways of generating test data in Rails tests: fixtures and factories.

Fixtures typically take the form of one or more YAML files with some hardcoded data. The data is translated into database records one time, before any of the tests are run, and then deleted afterward. (This happens in a separate test database instance of course.)

With factories, database data is generated specifically for each test. Instead of loading all the data once at the beginning and deleting it at the end, data is inserted before each test case and then deleted before the next test case starts.

One principle of testing is that tests should be deterministic, meaning they run the same way every time no matter what.

Capybara: Some Rails tests only exercise Ruby code. Other tests actually open up a browser and simulate user clicks and keystrokes.

VCR and WebMock: One principle of testing is that tests should be deterministic, meaning they run the same way every time no matter what. When an application’s behavior depends on external services (e.g. a thirdparty API like Stripe) it makes it harder to have deterministic tests. The tests can be made to fail by an internet connection failure or a temporary outage of the external service.

VCR can let us run our tests against the real external service, but capture all the service’s responses in local files so that subsequent test runs don’t talk to the external service but rather just go off of the saved responses. That way, even if the internet connection fails or the service goes down, the tests still work.

What keeps them (Rails devs) in the habit of writing tests consistently?

Laziness, fear, and pride.

Mental energy. If I write a feature without using tests, I’m often juggling the “deciding what to do” work and the “actually doing it” work at the same time, which has a cognitive cost more than twice as much as performing those two jobs separately in serial. When I build a feature with the aid of tests, the tests allow me to separate the “deciding what to do” work from the “actually doing it” work.

it’s not possible to have clean, understandable code without having automated tests.

Pains that tell you your test coverage might be insufficient?

Too many bugs.

Inability to refactor or make big changes

When a change has a large footprint, like a Rails version upgrade or a broad refactoring, it’s basically impossible to gain sufficient confidence of the safety of the change without having a solid automated test suite. So on codebases without good test coverage, these types of improvements tend not to happen.

How do I set up a new Rails project for testing?

Start rails with template: https://guides.rubyonrails.org/rails_application_templates.html


```ruby
rails new my_project -T -d postgresql \ -m https://raw.githubusercontent.com/jasonswett/testing_application_template/master/applicatiOnce
```

How do I add tests to an existing Rails project?

If you have little testing experience, I would suggest getting some practice on a fresh Rails app before trying to introduce testing to the existing Rails project you want to add tests to. Adding tests to an existing project is a distinct skill from writing tests for new projects