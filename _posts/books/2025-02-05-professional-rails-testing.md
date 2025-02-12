---
categories:
  - book
layout: book
title: "Professional Rails Testing"
publisher: 
published: "2024"
author: Jason Swett.
rating: 5.0
---

This book has two parts, the first one goes over principles of testing, the second is about the tools you can use to test your code base.

The first chapter is about what you can expect from the book, why the author chose Rspec over Minitest and the ways you can reach out to Jason Swett.

The 2nd chapter aims to lay out what a test is, in this case the author rejects the idea that tests are verifications, rather they are specifications and with this definition the objective of testing goes from “make sure the code worked” to “enforce the code behave as specified”.

He also provides an example of a manufacturing site where all of its finished products behave the same way because they meet their design specifications due to its production system therefore it produces that same throughput always.

 He also shares that the main challenge is to switch developer’s mindset from verification to a specification, this will entail moving from “capabilities” to “scenarios”.

 the next examples are going to be capabilities:

 the user can update their email address
 the user can sign in
 the user can reset their password

 on the other hand we have scenarios, for instance:
 when the user signs in with a valid credentials, the dashboard page will show up
 when the user attempts to sign in with invalid credentials and error message is shown

A specification is a statement of how some aspect of a software product should behave. Again departing from the scenario point of view and we can break it down to the following:

Scenario:  when a user enters a valid email and password combination into the email and password fields, then clicks ‘sign in’

Expectation: the user dashboards page is shown

This is a style that the author has conceived and he denotes that it makes sense to him but it is not a golden rule, in other words “under such-and-such a scenario, we expect such-and-such behavior”

The author describes with an example of a parser program the same pattern of a scenario and expectation and it goes step by step from creating the file, adding some boilerplate, starting with some comments in order to remove the writer’s block and finally he quotes the ‘arrange act and assert’ phases.


Small recap:
Scenario (what to test, we can remember this with words like “when” or “given”)
Expectation (We can remember with the keyword “then”)
Setup, exercise and assertion ( arrange act and assert)

<div>
  <img 
    src="/graphics/projects/arrange_act_assert.jpg" 
    alt="arrange, act, assert" 
    style="border-radius: 0.375rem; height: 350px; width: 350px; display: block; margin: auto;"
  />
  <p style="text-align: center; font-size: 14px;">
    Source: <a href="https://miro.medium.com/v2/resize:fit:1024/1*LydRMERQr4qGAV9MggoxOw.jpeg" target="_blank">Medium</a>
  </p>
</div>

Chapter 3 is about TTD (test driven development) he briefly describes what it is, pointing out why it is often called the ‘red, green, refactor loop’,  what do those colors mean? and finally the importance of refactoring the code you wrote.

Red: Firstly we start with deciding “what to do” and then “doing it” (this reduces cognitive load) keeping in mind that a test is an executable and “specification”. 
We first write the test so we set out the ‘specification’ and then we write the code to fulfill given a specification.
Something important here is to run the test so we can clear out any false positives on the code, by running it and getting the red color we make sure that it is failing.

Importance of the green color and as the author quotes ‘Kent Beck’ you can make any ‘sins code’ in order to make the code pass, this means to write crappy code but make sure that you pass from red color to green color.

Also the author describes that if the whole system is covered by testing, we can refactor the system code as much as we want without too much fear that refactoring will introduce regressions. It is not an absolute warranty but it provides high degree of well justified confidence.

The author also said that he focuses on writing just enough code to make the current failure message go away, maybe not passing the whole test but just a small bit of it. 

And finally ‘refactor’ this is where all the mess is cleaned up, duplication is removed  maybe some optimization is added and here the author again shares one of his personal exercises that once he have passed the testing he hold off and give himself sometime to forget about the problem because it is very embedded in his brain and the refactor is not going to be very effective, instead he takes some time and then comes back and address the exact pain

Here is one statement about TDD  that I liked “ the main reason for practicing TDD  is to go faster and be more productive in simpler terms you want to decrease the radio of effort invested to Value produced”

TTD also encourages modular, loosely coupled design,  less mental effort,  more enjoyable workflow, fewer bugs, documentation,  feedback loops (most important I personally think!)

Here is the feedback loop that TDD can create:
 specify an objective
 devise a test that can be performed to see if #1 is done
 perform the test device in step 2
 do some work toward the objective ( wright a line of code)
 repeat steps three and four until the test passes
 repeat from step one with a new objective

Some notes from the author that I think are worth is when you write a line of code it is going to help us the message failure to go away so we can avoid coding speculatively and this will help us lower the mental burden in each step of this feedback loop,

Lastly the author closes this chapter by comparing the ‘manual testing‘ versus the TDD that as much as you practice it, you'll get more fluent and it will become a great time saver

Chapter 4 is about writing meaningful tests. The author states that having tests is better than not having tests but not always writing tests are equally good tests are more valuable when they are meaningful.

A test is Meaningful if it tests not just means to ends but ends themselves.

When we are testing something we can focus either on means or ends, for example if we test a staple by just examining if it has all the right parts and just trying to staple 3 sheets of paper.  By making sure that it has all the right parts it doesn't mean we are testing the ends. On the contrary, if we staple 3, then 12, 20 and we can affirm that we can continually do this activity, that's when we test the ends.

When it comes to testing model associations it would be more meaningful to make assertions on the behaviors that these associations enable.

Another great example is that airplanes engines can be tested even without attaching the engines to an airplane.

How to decide what kind of test drive, here we only have cost and benefits, we want to achieve satisfactory test coverage while incurring the smallest cost possible.

System tests are the only type of test that proves that all the parts of your system are successfully working together without system tests. We could theoretically have a web application with a fully passing suite of unit tests even if the application is unable to successfully serve a single request.

Something that I have seen has always been trivial is % of test coverage and the author suggests the following:

	 What if we use a minimum number of system tests, perhaps one for the happy path and one or two more for the failure cases and then use fast unit tests for all the edge cases?  This way we will get a reasonable level of confidence that our system works as a whole.

Then we have: how to test models (POROs),  requests, background jobs, mailer specs, helper specs, view specs and view components.

Also we have a very important question “when to write a test and went to not”, remember that testing is not about right or wrong but about cost and benefits here are five questions:

1.  Is the behavior likely to ever break?
2.  If the behavior were to fail, would it fail silently?
3.  if the behavior were to fail, would it fail frequently?
4.  if the behavior were to fail, would the consequence be severe?
5.  Is the test easy to write?

 If any of the answers to these questions is a yes, I write the test. If and only if all of the answers are negative I do skip the test.

The aggregate benefit of tests. It is common to want to get some sort of 80/20  benefit by only covering the most important 20% of the codebase tests.  I think this way of thinking focuses on the benefit of individual tests while missing the aggregate benefit of tests. Remember cost and benefits of testing can be refactoring with no fear, gaining speed for development without even thinking Dusty's part of the code base is tested well enough? 

In a model do we need to test every method,  again remember that we covered every Behavior not every method.

Chapter 5. Writing understandable tests.

Tests are more than just a safety net to catch regressions. A test suite can serve as a guidebook to a system, showing what the system’s parts are, how the parts relate to each other, which ideas are more and less important, and of course, how are the parts of the system are supposed to behave

 A test suite is a structured collection of behavior specifications, and can also serve as the backbone for a systems design.

 It is common to think of a system's code as its essence and the tests as something secondary.  I invite you to think of it the other way around. A system’s code shows what the system does, but the system's application code does not have the last word.  Because an application tests are specifications, whatever the test specifies is, by definition, correct.

 So far we have mostly focused on writing new tests and writing them. but in a production application, in addition to being written and run, tests often need to be understood and modified. 

Abstraction is the art of hiding distracting details and emphasizing essential information.

Test code is responsible for jobs that vary widely in the relevance to the high level meaning of the test.
1 test data has to be created.
2 dependencies have to be initialized.
3 code has to be finagled into the right state.
4 assertions have to be made, etc.

Here is a testing code example:

Before:

RSpec.describe "Creating Comment", type: :feature, js: true do
  let(:user) { create(:user) }
  let(:raw_comment) { Faker::Lorem.paragraph }
let(:article) do
  create(:article, user_id: user.id, show_comments: true)
end
  
  before { sign_in user }
  
  it "User replies to a comment" do
    create(:comment, commentable_id: article.id, user_id: user.id)
    
    visit article.path.to_s
    
    find(".toggle-reply-form").click
    find(
      :xpath, 
        “//div[@class=’actions’]/form[@class=’new_comment’]/textarea”).set(raw_comment)

    find(
      :xpath, 
        “//div[contains(@class, ’reply-actions’)]/input[@name=’commit’]).click

    expect(page).to have_text(raw_comment)
  end
end

The “it” block should describe how it (the system) should behave. To me the way this test description is written is a sign that this test is not the result of a clearly thought out specification

The next step is to think about the one or the given,  in this case when user submits a reply to a comment or not article ( a scenario)  the body of the reply shows up on the article's page ( expectation)

After (with better description):

```ruby 
RSpec.describe “Creating Comment”, type: :feature, js: true do 
  context "user submits a reply to a comment on an article” do
    it “shows the reply on the article’s page” do
    end
  end
end
```


If an abstraction does not give you the slightest clue of what it is doing without looking at its content, Then it is a pretty poor abstraction. When a test is full of distracting details, simply moving the details behind methods is not necessarily an improvement; careful thought must be given to what abstractions the methods represent and why they are helpful. 

```ruby 
RSpec.describe "Creating Comment", type: :feature, js: true do
  before { sign_in user }

  it "User replies to a comment" do
    create_setup_data
    submit_comment
    expect_correct_comment
  end

  def create_setup_data
    let(:user) { create(:user) }
    let(:raw_comment) { Faker::Lorem.paragraph }
    let(:article) do
      create(:article, user_id: user.id, show_comments: true)
    end
  end

  def submit_comment
    create(:comment, commentable_id: article.id, user_id: user.id)
    visit article_path.to_s
    find(".toggle-reply-form").click
    
    find(
      :xpath,
      "//div[@class='actions']/form[@class='new_comment']/textarea"
    ).set(raw_comment)
    
    find(
      :xpath,
      "//div[contains(@class, 'reply-actions')]/input[@name='commit']"
    ).click
  end

  def expect_correct_comment
    expect(page).to have_text(raw_comment)
  end
end
```

The author also speaks about scoping (arranging app’s files) and gives a relevant example of an appointment model 

```ruby
ls -1 spec/models
appointment_spec.rb
invoice_spec.rb
patient_spec.rb
user_spec.rb

ls -1 app/models
appointment.rb
invoice.rb
patient.rb
user.rb
```
The `rails g scaffold appointment` command gave the developers to containers to put stuff in, one called app/models/appointment.rband another called spec/models/appointment.rb Slowly over time, each of these containers group, a few lines of code at a time, into a monster.
How do we fix this? by slicing up the model code into a smaller, more cohesive pieces for instance: 
The recurrence logic moved into an object called `RecurrenceRule` which lives in `app/models/recurrence_rule.rb` or even better with namespace `Schedule::RecurrenceRule` and lives at `app/models/schedule/recurrence_rule.rb`

Cohesion


