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

 chapter 4 is about writing manifold tests 
