---
title: Good enough testing workshop | notes
categories: blog
layout: post
---
Recently, I attended a workshop by Lucian Ghinda called [Good Enough Testing](https://goodenoughtesting.com/). The workshop was a great experience, and I learned a lot about testing in Ruby on Rails.

Here are my notes from the workshop:

- How do you know how many tests are enough?
- How do you know if your tests are covering enough business logic?
- When do you stop testing based on risk and time?
- What kind of bugs are you trying to catch?
- what does mean to test a feature?

We tend to write test on habit or gut feeling. This can be systematic.

Taking into consideration the context, we choose coverage criteria (what we pay attention to), and this will drive the test design and test cases we write so we can cover what's important with minimum effort.

In other words: considering the level of risk, we define test coverage that will drive the test design so that we can achieve 100% coverage with the minimum number of test cases.

Objectives of workshop:
- Model the universe of all possible test cases.
- Define the test coverage that is the most important in the context
- Identify the minimum number of test cases to achieve 100% of coverage.

Do this in a systematic way.

4 test design techniques. 
Equivalence partitioning
Bounday value analysis
Decision table
State transition