---
title: OOP Sandi Metz - week 1
categories: blog
layout: post
---

I've started a 12-week walkthrough of [Practical Object-Oriented Design Course](https://sandimetz.com/courses) by Sandi Metz, and we're reading the first two chapters of [99 botles](https://sandimetz.com/99bottles)

Here are the highlights from the first session:

We were tasked to complete as much possible the coding and make all tests pass within 15 mins. The test was about singing the [99 bottles of beer song](https://www.99-bottles-of-beer.net/lyrics.html) which is a song counting down bottles of beer.

> SIDE NOTE: I asked chatGPT about this song after I solved the excercise which is wrong. My mentor has always told me to figure out as much as I can on the domain model! And since it was the 1st time i kknew about this song I missed very important details, for instance: knowing the highest number possible is 99 and the lowest is 0. It may have changed my approach.

The minitests expected a concatenated string and at a first glance I idetified that numbers and a few words were changing as we were counting-down.

I tried to follow conventions like short classes, short methods and so on. so firstly I made sure I was outputting the correct string and then pinpointed the numbers that needed the counting-down and came up with the method name `bottle_count_phrase` because it was meant for toggling from the words`bottle`, `bottles` and `no more bottles` (`0`, `1` or `> 1 (greater than 1)` respectively) and the integer change by substracting 1.

I tried the first version and worked, so I advanced to the next test, until I faced the pronoun that changes ("one" or "it"), after identifing the possible variables, in this case only 2, I procced to firstly write down an if statemtn that later became a ternary operator.

With these possibles paths and having the 4 tests in green this was my solution:

```ruby
class Bottles
  def verse(characters)
    song(characters)
  end

  def song(number_of_bottles)
    "#{bottle_count_phrase(number_of_bottles)} of beer on the wall, " +
    "#{bottle_count_phrase(number_of_bottles)} of beer.\n" +
    "Take #{removal_pronoun(number_of_bottles -= 1)} down and pass it around, " +
    "#{bottle_count_phrase(number_of_bottles)} of beer on the wall.\n"
  end

  def bottle_count_phrase(number_of_bottles_remaining)
    if number_of_bottles_remaining == 0
      "no more bottles"
    elsif number_of_bottles_remaining == 1
      "#{number_of_bottles_remaining} bottle"
    else
      "#{number_of_bottles_remaining} bottles"
    end
  end

  def removal_pronoun(number_of_bottles)
    number_of_bottles >= 1 ? "one" : "it"
  end
```

After this excercise we are encourage to see Sandi's solution which is the following:

```ruby
case number
when 0
  "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n"
when 1
  "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n"
when 2
  "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n"
else
  "#{number} bottles of beer on the wall, #{number} bottles of beer.\nTake one down and pass it around, #{number-1} bottles of beer on the wall.\n"
end
```

As soon as I saw it, felt like my mentor was talking to me again:

- Understand the domain
- Stare at the input, see what changes in the output
- Devise how to achieve those modifications (do i need an array, hash or counter variable to store any type of result?)
- If outcome is expected, then improve

Where I'm getting with this is that if I knew that we were only to receive integers as inputs and that the song based on that input, was always going to be the same except the pronouns and numbers, I could have hardcoded the solution (not saying it's an easy approach to come up with) but I apporach it with a more flexible design with interpolation and conditionals but definetely I overcomplicated the solution.

Something that I notice in this course as in the [Efective testing with RSpec by Myron Marston and Ian Dees](/2025/04/11/effective-testing-with-rspec.html) is that authors encourage to tackle test one by one even though it souns obvios to avoid cluterring your temrinal with errors sometimes we want to see the full picture but their approach is very effective.

Lesson learned, read througly the problem, understand the inputs, outputs, if possible make a hand-written drawing, understand what changes, do i need a data structure? and lastly if the result is the expected, refine it. It also reminds me of the [PEDAC method](https://medium.com/launch-school/solving-coding-problems-with-pedac-29141331f93f).