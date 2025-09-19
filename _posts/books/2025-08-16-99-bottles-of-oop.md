---
categories:
  - book
layout: book
title: "99 bottles of OOP"
publisher: "Potato Canyon Software, LLC"
published: "2017"
author: Sandi Metz, Katrina Owen & TJ Stankus
rating: 5.0
---

1. [Rediscovering Simplicity](#chapter-1)
2. [Test Driving Shameless Green](#chapter-2)
3. [Unearthing Concepts](#chapter-3)
4. [Practicing Horizontal Refactoring](#chapter-4)
5. [Separating Responsibilities](#chapter-5)
6. [Achieving Openness](#chapter-6)
7. [Manufacturing Intelligence](#chapter-7)
8. [Developing a Programming Aesthetic](#chapter-8)
9. [Reaping the Benefits of Design](#chapter-9)

### Introduction.

Writing code is the process of <b>working your way to the next stable end point, not the end point itself.</b> You don’t know the answer in advance, but instead, you are seeking it.

This book documents every step down every path of code, and so provides a guided-tour of the decisions made along the way. It not only shows how good code looks when it’s done, it reveals the thoughts that produced it.

### Rediscovering Simplicity {#chapter-1}

Experience has taught you that most code will someday change, and you've begun to craft it in anticipation of that day. Complexity seems both natural and inevitable.

Where you once optimized code for understandability, you now focus on its changeability. Your code is less concrete but more abstract -you've made it initially harder to understand in hopes that it will ultimately be easier to maintain.

OOD doesn’t claim to be free; it merely asserts that its benefits outweigh its costs.

Design decisions inevitably involve trade-offs. There’s always a cost. For example, if you’ve duplicated a bit of code in many places, the Don’t Repeat Yourself (DRY) principle tells you to extract the duplication into a single common method and then invoke this new method in place of the old code. DRY is a great idea, but that doesn’t mean it’s free.

The price you pay for DRYing out code is that the invoker of the new method no longer knows the result, only the message it should send. If you’re willing to pay this price, that is, you are willing to be ignorant of the actual behavior, the reward you reap is that when the behavior changes, you need alter your code in only one place.

Example:

```ruby
# before DRY
class Invoice
  def total_in_cents
    (line_items.sum(&:price) * 100).to_i
  end

  def discount_in_cents
    (discount.amount * 100).to_i
  end
end

# after DRY

class Invoice
  def total_in_cents
    convert_to_cents(line_items.sum(&:price))
  end

  def discount_in_cents
    convert_to_cents(discount.amount)
  end

  private

  def convert_to_cents(amount)
    (amount * 100).to_i
  end
end

```
- `total_in_cents` no longer shows how the conversion happens.

- Whoever calls `total_in_cents` only knows: “I send a message `convert_to_cents`” they don’t directly know that it multiplies by 100 and converts to integer.

- So if later someone asks: “Wait, does this return a float or an integer?” — you can’t see that directly in the `total_in_cents` method anymore. You must chase down into `convert_to_cents` to know.

Did you divide one large class into many small ones? You can now reuse the new classes independently of one another, but it’s no longer obvious how they fit together for the original case.

Have you injected a dependency instead of hard-coding the class name of a collaborator? The receiver can now freely depend on new and previously unforeseen objects, but it must remain ignorant of their actual class.

The examples above change code by increasing its level of abstraction.

DRYing out code inserts a level of indirection between the place that uses behavior and the place that defines it.

Breaking one large class into many forces the creation of something new to embody the relationship between the pieces.

Injecting a dependency transforms the receiver into something that depends on an abstract role rather than a concrete class.

Design is thus about picking the right abstractions. If you choose well, your code will be expressive, understandable and flexible.

<table>
 <thead>
   <tr>
     <th>Benefits</th>
     <th>Cons</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td colspan="2"><strong>DRY (Don't Repeat Yourself)</strong></td>
   </tr>
   <tr>
     <td>
       • Eliminates code duplication<br>
       • Single source of truth for behavior<br>
       • Easier maintenance - change in one place<br>
       • Reduces bugs from inconsistent implementations
     </td>
     <td>
       • Adds level of indirection between usage and definition<br>
       • Can make code harder to understand<br>
       • May create premature abstractions<br>
       • Debugging requires jumping between files/methods
     </td>
   </tr>
   <tr>
     <td colspan="2"><strong>Dependency Injection</strong></td>
   </tr>
   <tr>
     <td>
       • Enables flexible composition with unforeseen objects<br>
       • Improves testability with mock objects<br>
       • Reduces coupling between classes<br>
       • Supports polymorphism and duck typing
     </td>
     <td>
       • Receiver must remain ignorant of actual class types<br>
       • Increases complexity of object construction<br>
       • Can make dependencies less obvious<br>
       • Requires abstract thinking about roles vs. classes
     </td>
   </tr>
   <tr>
     <td colspan="2"><strong>Single Responsibility Principle (Divide Large Classes)</strong></td>
   </tr>
   <tr>
     <td>
       • Classes can be reused independently<br>
       • Easier to test individual components<br>
       • More focused, cohesive responsibilities<br>
       • Simpler to understand each piece in isolation
     </td>
     <td>
       • No longer obvious how pieces fit together<br>
       • Requires new abstractions to coordinate parts<br>
       • Can lead to over-engineering<br>
       • May scatter related logic across multiple files
     </td>
   </tr>
 </tbody>
</table>

However, if you get the abstractions wrong, your code will be convoluted, confusing, and costly.

Unfortunately, abstractions are hard, and even with the best of intentions, it’s easy to get them wrong.

Early abstractions are often not quite right, and therefore they create a catch-22. You can’t create the right abstraction until you fully understand the code, but the existence of the wrong abstraction may prevent you from ever doing so. 

<b>This suggests that you should not reach for abstractions, but instead, you should resist them until they absolutely insist upon being created.</b>

This book is about finding the right abstraction.

### 1.1. Simplifying Code

The code you write should meet two often-contradictory goals. <b>It must remain concrete enough to be understood while simultaneously being abstract enough to allow for change.</b>

Code can range on a spectrum from very concrete (one long, detailed procedure) to very abstract (many tiny classes and methods). <b>The best solutions usually aren’t at the extremes but somewhere in the middle, where the code is both understandable and easy to change. The programmer’s job is to find that balance.</b>

This section discusses four different solutions to the "99 Bottles of Beer" problem.

### 1.1.1. Incomprehensibly Concise

```ruby
class Bottles
  def song
    verses(99, 0)
  end

  def verses(hi, lo)
    hi.downto(lo).map {|n| verse(n) }.join("\n")
  end

  def verse(n)
    "#{n == 0 ? 'No more' : n} bottle#{'s' if n != 1}" +
    " of beer on the wall, " +
    "#{n == 0 ? 'no more' : n} bottle#{'s' if n != 1} of beer.\n" +
    "#{n > 0 ? "Take #{n > 1 ? 'one' : 'it'} down and pass it around"
     : "Go to the store and buy some more"}, " +
    "#{n-1 < 0 ? 99 : n-1 == 0 ? 'no more' : n-1} bottle#{'s' if n-1 != 1}"+
    " of beer on the wall.\n"
  end
end
```

This first solution embeds a great deal of logic into the verse string. The code above performs a neat trick. It manages to be concise to the point of incomprehensibility while simultaneously retaining loads of duplication.

Consistency (in conditionals)

The style of the conditionals is inconsistent. Most use the `ternary` form, other statements are made conditional by adding a trailing `if`.

Every time the style of the conditionals changes, the reader has to press a mental reset button and start thinking anew.

Duplication

The code duplicates both data and logic. Having multiple copies of the strings "of beer" and "on the wall" isn’t great, but at least string duplication is easy to see and understand. Logic, however, is harder to comprehend than data, and duplicated logic is doubly so.

Names

The most obvious point to be made about the names in the verse method is that there aren’t any. The verse string contains embedded logic. Each bit of logic serves some purpose, and it is up to you to construct a mental map of what these
purposes might be.

This code would be easier to understand if it did not place that burden upon you.

Creating a method requires identifying the code you’d like to extract and deciding on a method name. This, in turn, requires naming the concept, and naming things is just plain hard. In the case above, it’s especially hard. This code not only contains many hidden concepts, but those concepts are mixed together. Combining many ideas into a small section of code makes it difficult to isolate and name any single concept.

When you first write a piece of code, you obviously know what it does. Therefore, during initial development, the price you pay for poor names is relatively low. <b>However, code is read many more times than it is written, and its ultimate cost is often very high and paid by someone else.</b>

<i>Code is also charged with doing what it’s supposed to do now as well as being easy to alter so that it can do more later.</i>

1. How difficult was it to write?
2. How hard is it to understand?
3. How expensive will it be to change?

Code is easy to understand when it clearly reflects the problem it’s solving, and thus openly exposes that problem’s domain

If this solution would be openly exposed the "99 Bottles" domain, a brief glance at the code would answer these questions:

1. How many verse variants are there?
2. Which verses are most alike? In what way?
3. Which verses are most different, and in what way?
4. What is the rule to determine which verse comes next?

<b>These questions reflect core concepts of the problem</b>, yet none of their answers are apparent in this solution. The number of variants, the difference between the variants, and the algorithm for looping are distressingly obscure. This code does not reflect its domain, and therefore you can infer that it was difficult to write and will be a challenge to change. 

### 1.1.2. Speculatively General

This next solution errs in a different direction. It does many things well but can’t resist indulging in unnecessary complexity. 

```ruby
class Bottles
  NoMore = lambda do |verse|
    "No more bottles of beer on the wall, " +
    "no more bottles of beer.\n" +
    "Go to the store and buy some more, " +
    "99 bottles of beer on the wall.\n"
  end

  LastOne = lambda do |verse|
    "1 bottle of beer on the wall, " +
    "1 bottle of beer.\n" +
    "Take it down and pass it around, " +
    "no more bottles of beer on the wall.\n"
  end

  Penultimate = lambda do |verse|
    "2 bottles of beer on the wall, " +
    "2 bottles of beer.\n" +
    "Take one down and pass it around, " +
    "1 bottle of beer on the wall.\n"
  end

  Default = lambda do |verse|
    "#{verse.number} bottles of beer on the wall, " +
    "#{verse.number} bottles of beer.\n" +
    "Take one down and pass it around, " +
    "#{verse.number - 1} bottles of beer on the wall.\n"
  end

  def song
    verses(99, 0)
  end

  def verses(finish, start)
    (finish).downto(start).map {|verse_number|
      verse(verse_number) }.join("\n")
  end

  def verse(number)
    verse_for(number).text
  end

  def verse_for(number)
    case number
    when 0 then Verse.new(number, &NoMore)
    when 1 then Verse.new(number, &LastOne)
    when 2 then Verse.new(number, &Penultimate)
    else Verse.new(number, &Default)
    end
  end
end

class Verse
  attr_reader :number
  def initialize(number, &lyrics)
    @number = number
    @lyrics = lyrics
  end

  def text
    @lyrics.call self
  end
end
```

To summarize, sending `verse(number)` to an instance of `Bottles` invokes `verse_for(number)`, which uses the value of `number` to select the correct `lambda` on which to create and return an instance of `Verse`. The `verse` method then sends text to the returned `Verse`, which in turn sends `call` to the `lambda`, passing `self` as an argument. This invokes the `lambda`, which may or may not actually use the argument that was passed. 

This example answers better the next questions in comparison to first example:

1. How many verse variants are there?
There are four verse variants (look at the constants).

2. Which verses are most alike? In what way?
Verses 3-99 are most alike (as evidenced by the fact that all are produced by the Default variant).

3. Which verses are most different? In what way?
Verses 0, 1 and 2 are clearly different from 3-99, although it’s not obvious in what way.

4. What is the rule to determine which verse should be sung next?
Buried deep within the NoMore lambda is a hard-coded "99," which might cause one to infer that verse 99 follows verse 0.

Now, the value/cost questions:

1. How difficult was it to write?
There’s far more code here than is needed to pass the tests. This unnecessary code took time to write.

2. How hard is it to understand?
The many levels of indirection are confusing. Their existence implies necessity, but you could study this code for a long time without discerning why they are needed.

3. How expensive will it be to change?
The mere fact that indirection exists suggests that it’s important. You may feel compelled to understand its purpose before making changes.

As you can see from these answers, <i>this solution does a good job of exposing core concepts, but does a bad job of being worth its cost.</i>

The code does two basic things. First, it defines templates for each kind of verse (lines 2-28), and second, it chooses the appropriate template for a specific verse number and renders that verse’s lyrics (lines 39-63).

Notice that the verse templates contain all of the information needed to answer the domain questions.

But it’s not the templates that are costly; it’s the code that chooses a template and renders the lyrics for a verse. This choosing/rendering code is overly complicated

### 1.1.3. Concretely Abstract

This solution valiantly attempts to name the concepts in the domain:

```ruby
class Bottles
  def song
    verses(99, 0)
  end

  def verses(bottles_at_start, bottles_at_end)
    bottles_at_start.downto(bottles_at_end).map do |bottles|
      verse(bottles)
    end.join("\n")
  end

  def verse(bottles)
    Round.new(bottles).to_s
  end
end

class Round
  attr_reader :bottles

  def initialize(bottles)
    @bottles = bottles
  end

  def to_s
    challenge + response
  end

  def challenge
    bottles_of_beer.capitalize + " " + on_wall + ", " +
    bottles_of_beer + ".\n"
  end

  def response
    go_to_the_store_or_take_one_down + ", " +
    bottles_of_beer + " " + on_wall + ".\n"
  end

  def bottles_of_beer
    "#{anglicized_bottle_count} #{pluralized_bottle_form} of #{beer}"
  end

  def beer
    "beer"
  end

  def on_wall
    "on the wall"
  end

  def pluralized_bottle_form
    last_beer? ? "bottle" : "bottles"
  end

  def anglicized_bottle_count
    all_out? ? "no more" : bottles.to_s
  end

  def go_to_the_store_or_take_one_down
    if all_out?
      @bottles = 99
      buy_new_beer
    else
      lyrics = drink_beer
      @bottles -= 1
      lyrics
    end
  end

  def buy_new_beer
    "Go to the store and buy some more"
  end

  def drink_beer
    "Take #{it_or_one} down and pass it around"
  end

  def it_or_one
    last_beer? ? "it" : "one"
  end

  def all_out?
    bottles.zero?
  end

  def last_beer?
    bottles == 1
  end
end
```
This solution is characterized by having many small methods. This is normally a good thing, but somehow in this case it’s gone badly wrong. Have a look at how this solution does on the domain questions:

1. How many verse variants are there?
It’s almost impossible to tell.

2. Which verses are most alike? In what way?
Ditto.

3. Which verses are most different? In what way?
Ditto.

4. What is the rule to determine which verse should be sung next?
Ditto.

Value/cost questions.

1. How difficult was it to write?
Difficult. This clearly took a fair amount of thought and time.

2. How hard is it to understand?
The individual methods are easy to understand, but despite this, it’s tough to get a sense of the entire song. The parts don’t seem to add up to the whole.

3. How expensive will it be to change?
While changing the code inside any individual method is cheap, in many cases, one simple change will cascade and force many other changes.

It’s obvious that the author of this code was committed to doing the right thing, and that they carefully followed the Red, Green, Refactor style of writing code. It looks as though these strings were refactored into separate methods at the first sign of duplication.

<b>DRY reduces change costs by eliminating duplication, but increases understanding costs through indirection.</b> Use DRY when the savings from easier maintenance outweigh the complexity of following abstract layers.

The `beer` method centralizes the drink name in one location. To change from "beer" to "Kool-Aid," you only modify line 42, avoiding scattered string updates throughout the codebase.

But then look at these other method names, and how many time they're used:

```ruby
def bottles_of_beer
def buy_new_beer
def drink_beer
def last_beer?
```

This small change in requirements forces a change in many places, which is exactly the problem DRY promises to avoid.

When you name a method `beer` that returns "beer," you tie the method name to its current implementation. This breaks when you change the implementation to return "Kool-Aid." <b>You should name methods not after what they do, but after what they mean, what they represent in the context of your domain. </b>The method should be called `beverage` because that's what it represents in the song's context - one level of abstraction higher than the specific implementation.

```ruby
# from
def beverage
 "beer"
end

# to:
def beverage
  "Kool-Aid"
end
```
<b>Therefore, one lesson to be gleaned from this solution is that you should name methods after the concept they represent rather than how they currently behave. However, notice that even if you edited the code to improve every method name, this code still isn’t quite right.</b>

Changing the name of the beer method to beverage makes it easy to replace the string "beer" with the string "Kool-Aid" but does nothing to improve this code’s score on the domain questions.

### 1.1.4. Shameless Green

None of the solutions shown thus far do very well on the value/cost questions. First example (Incomprehensibly Concise), cares only for terseness (brevity). 

Second example (Speculatively General) tries for extensibility but achieves unwarranted complexity (too much lambdas usage). 

The heart of the third example (Concretely Abstract) is in the right place, but it can’t get its feet out of the mud (too many methods, difficult to follow).

<b>Speculatively General and Concretely Abstract were both written with an eye toward reducing future costs. The failure here is not bad intention—it’s insufficient patience. </b>

This next example is patient and so provides an antidote for all that has come before.

```ruby
class Bottles
  def song
    verses(99, 0)
  end

  def verses(upper, lower)
    upper.downto(lower).map {|i| verse(i)}.join("\n")
  end

  def verse(number)
    case number
    when 0
      "No more bottles of beer on the wall, " +
      "no more bottles of beer.\n" +
      "Go to the store and buy some more, " +
      "99 bottles of beer on the wall.\n"
    when 1
      "1 bottle of beer on the wall, " +
      "1 bottle of beer.\n" +
      "Take it down and pass it around, " +
      "no more bottles of beer on the wall.\n"
    when 2
      "2 bottles of beer on the wall, " +
      "2 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "1 bottle of beer on the wall.\n"
    else
      "#{number} bottles of beer on the wall, " +
      "#{number} bottles of beer.\n" +
      "Take one down and pass it around, " +
      "#{number-1} bottles of beer on the wall.\n"
    end
  end
end
```

The most immediately apparent quality of this code is how very simple it is. The code is gratifyingly easy to comprehend. 

Domain questions.

1. How many verse variants are there?
Clearly, four.

2. Which verses are most alike? In what way?
3-99, where only the verse number varies.

3. Which verses are most different? In what way?
0, 1 and 2 are different from 3-99, though figuring out how requires parsing strings with your eyes.

4. What is the rule to determine which verse should be sung next?
This is still not explicit. The 0 verse contains a deeply buried, hard-coded 99.

Value/cost questions:

1. How difficult was this to write?
It was easy to write.

2. How hard is it to understand?
It is easy to understand.

3. How expensive will it be to change?
It will be cheap to change. Even though the verse strings are duplicated, if one verse changes it’s easy to keep the others in sync.

<b>By the criteria that have been established, Shameless Green is clearly the best solution, yet almost no one writes it.</b>

Most programmers have a powerful urge to do more, but sometimes it’s best to stop right here.

<b>When you DRY out duplication or create a method to name a bit of code, you add levels of indirection that make it more abstract. In theory these abstractions make code easier to understand and change, but in practice they often achieve the opposite.</b> One of the biggest challenges of design is knowing when to stop, and deciding well requires making judgments about code.

### 1.2. Judging Code

You judge code constantly. Writing code requires making choices; the choices you make reflect personal, internalized criteria.

### 1.2.1. Evaluating Code Based on Opinion

Just as "Everybody complains about the weather but nobody does anything about it", everyone has an opinion about what good code looks like, but those opinions usually don’t tell us what action to take to create it. Here are a few definitions of clean code.

<div class="quote-box">
  <p>I like my code to be elegant and efficient.</p>
  <p>— Bjarne Stroustrup<br>inventor of C++</p>
</div>

<div class="quote-box">
  <p>Clean code is … full of crisp abstractions …</p>
  <p>— Grady Booch<br>author of Object Oriented Analysis and Design with Applications</p>
</div>

<div class="quote-box">
  <p>Clean code was written by someone who cares.</p>
  <p>— Michael Feathers<br>author of Working Effectively with Legacy Code</p>
</div>

Your own definition probably follows along these same lines. <b>Any pile of code can be made to work; good code not only works, but is also simple, understandable, expressive and changeable.</b>

The problem with these definitions is that although they accurately describe how good code looks once it’s written, they give no help with achieving this state, and provide little guidance for choosing between competing solutions.

Since form follows function, good code can also be defined simply, and somewhat circularly, as that which provides the highest value for the lowest cost.

Our sense of elegance, expressiveness and simplicity is an outgrowth of our experiences when reading and modifying code. Code that is easy to understand and a pleasure to extend naturally feels simple and elegant.

### 1.2.2. Evaluating Code Based on Facts

Measures that rise to become metrics are backed by research that has stood the test of time. They’ve been scrutinized by many people over many years. You can think of metrics as crowd-sourced opinions about the quality of code.

This section examines three different metrics: Source Lines of Code, Cyclomatic Complexity, and ABC

Source Lines of Code

This one number has been used to predict the total effort needed to develop software, to measure the productivity of those who write it, and to predict the cost of maintaining it.

The metric has the advantage of being easily garnered and reproduced, but suffers from many flaws.

Using SLOC to predict the development effort needed for a new project is done by counting the SLOC of existing projects for which total effort is known, deciding which of those existing projects the new project most resembles, and then running a cost estimation model to make the prediction.

Measuring programmer productivity by counting lines of code assumes that all programmers write equally efficient code.

While the cost of maintenance is related to the size of an application, the way in which code is organized also matters. It is cheaper to maintain a well-designed application than it is to maintain a pile of spaghetti-code.

Cyclomatic Complexity

In 1976, Thomas J. McCabe, Sr. published "A Complexity Measure":

> What is needed is a mathematical technique that will provide a quantitative basis for modularization and allow us to identify software modules that will be difficult to test or maintain.

Think of this algorithm as a little machine that ponders your code and then maps out all the possible routes through every combination of every branch of every conditional. A method with many deeply nested conditionals would score very high, while a method with no conditionals at all would score 0.

Cyclomatic complexity neither predicts application development time nor measures programmer productivity.

Cyclomatic complexity sounds great, and it’s easy to see that it could be useful, but it views the world of code through a narrow lens.

Assignments, Branches and Conditions (ABC) Metric

The problem with cyclomatic complexity is that it doesn’t take everything into account. Code does more than just evaluate conditions; it also assigns values to variables and sends messages. These things add up, and as you do more and more of each, your code becomes increasingly difficult to understand.

In 1997, twenty-one years after the unveiling of cyclomatic complexity, Jerry Fitzpatrick published "Applying the ABC Metric to C, C++, and Java". His ABC stands for assignments, branches and conditions, where:

- Assignments is a count of variable assignments.
- Branches counts not branches of an if statement (as one could forgivably infer) but branches of control, meaning function calls or message sends.
- Conditions counts conditional logic.

ABC is a measure of complexity. Highly complex code is difficult to understand and change, therefore ABC scores are a proxy for code quality. High scores suggest that code will be hard to test and expensive to maintain.

Summary 

<table>
 <thead>
   <tr>
     <th>Step</th>
     <th>Principle</th>
     <th>Description</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>1</td>
     <td><strong>Start Shameless Green</strong></td>
     <td>Write the simplest code that works, even if it has duplication. Don't try to be clever or anticipate future needs.</td>
   </tr>
   <tr>
     <td>2</td>
     <td><strong>Tolerate Duplication</strong></td>
     <td>Let duplicate code exist until you fully understand the problem domain. Duplication is often better than the wrong abstraction.</td>
   </tr>
   <tr>
     <td>3</td>
     <td><strong>Resist Premature Abstraction</strong></td>
     <td>Don't create abstractions until they "absolutely insist upon being created." Wait until the pattern becomes obvious and painful.</td>
   </tr>
   <tr>
     <td>4</td>
     <td><strong>Name for the Domain, Not Implementation</strong></td>
     <td>When you do abstract, name methods/classes after what they <em>represent</em> in your problem space (<code>beverage</code> not <code>beer</code>), not their current behavior.</td>
   </tr>
   <tr>
     <td>5</td>
     <td><strong>Optimize for Change, Not Cleverness</strong></td>
     <td>Make code easy to understand and modify by future you. Simple, clear code beats concise, clever code every time.</td>
   </tr>
   <tr>
     <td>6</td>
     <td><strong>Ask the Domain Questions</strong></td>
     <td>Before changing anything, evaluate if your code clearly reveals: How many variants exist? Which parts are most alike/different? What are the core rules and patterns?</td>
   </tr>
   <tr>
     <td>7</td>
     <td><strong>Ask the Value/Cost Questions</strong></td>
     <td>For any solution, honestly assess: How difficult was it to write? How hard is it to understand? How expensive will it be to change?</td>
   </tr>
   <tr>
     <td colspan="3"><strong>The Golden Rule:</strong> If your code doesn't clearly answer the domain questions or fails the value/cost test, step back toward simplicity. The right abstractions will emerge naturally when you understand the problem deeply enough.</td>
   </tr>
 </tbody>
</table>

### Test Driving Shameless Green {#chapter-2}

The Shameless Green solution consists of intention-revealing, working software, and is the result of writing simple code to pass a series of presupplied tests.

The provenance of the code that was written in Chapter 1 is obvious, but the tests appeared without explanation. It is now time to take a step back, and investigate how to create tests that lead to Shameless Green.

### 2.1. Understanding Testing

The practice of writing tests before writing code became known as test-driven development
(TDD). In its simplest form, TDD works like this:

1. Write a test.
Because the code does not yet exist, this test fails. Test runners usually display failing tests in red.

2. Make it run.
Write the code to make the test pass. Test runners commonly display passing tests in green.

3. Make it right.
Each time you return to green, you can refactor any code into a better shape, confident that it remains correct if the tests continue to pass.

The ideas of testing, and of testing first, have won the hearts and minds of programmers. However, a commitment to writing tests doesn’t make this easy. TDD presents a never-ending challenge. You must repeatedly decide which test to write next, how to arrange code so that the test passes, and how much refactoring to do once it does. Each decision requires judgment and has consequences.

If your TDD judgment is not yet fully developed, it’s reasonable to temporarily adopt that of a master. Here’s an excellent guiding principle:

> Quick green excuses all sins. — Kent Beck

Green means safety. Green indicates that, at least as evidenced by the tests at hand, you understand the problem. Green is the wall at your back that lets you move forward with confidence. Getting to green quickly simplifies all that follows.

<b>Because the initial goal is more about reaching green than writing perfect code, the refactoring step sometimes removes duplication and other times retains it.</b>

The plan is to create tests that thoroughly describe the "99 Bottles" problem, and then to solve the problem with the implementation known as Shameless Green. 

<b>The Shameless Green solution strives for maximum understandability but is generally unconcerned with changeability</b>

This chapter concentrates on creating the tests and writing simple code to pass them. Future chapters refactor the resulting code to improve the design.

### 2.2. Writing the First Test

The first test is often the most difficult to write. At this point, you know the least about whatever it is you intend to do. Your problem is a big, fuzzy, amorphous blob, and it’s challenging to reach in and carve off a single piece.

It feels important to choose well, because where you start informs how you’ll proceed, and ultimately determines where you’ll end.

In the beginning, you have ideas about the problem but actually know very little. Your ideas may turn out to be correct, but it’s just as possible that time will prove them wrong. You can’t figure out what’s right until you write some tests, at which time you may realize that the best course of action is to throw everything away and start over.

Therefore, the purpose of some of your tests might very well be to prove that they represent bad ideas. Learning which ideas won’t work is forward progress, however disappointing it may be in the moment.

So while it is important to consider the problem and to sketch out an overall plan before writing the first test, don’t overthink it.

If you were to sketch out a public Application Programming Interface (API) for "99 Bottles," it might look like this:

- `verse(n)` Return the lyrics for the verse number n
- `verses(a, b)` Return the lyrics for verses numbered a through b
- `song` Return the lyrics for the entire song

This API allows others to request a single verse, a range of verses, or the entire song.

Now that you have a plan for the API, there are a number of possibilities for the first test. You could write a test for the entire song, for a series of contiguous verses, or for any single verse.

Let's  begin by testing a single verse:

```ruby
class BottlesTest < Minitest::Test
  def test_the_first_verse
    expected =
      "99 bottles of beer on the wall, " +
      "99 bottles of beer.\n" +
      "Take one down and pass it around, " +
      "98 bottles of beer on the wall.\n"
    assert_equal expected, Bottles.new.verse(99)
  end
end
```

The simple test above assumes a Bottles class with a verse(n) method that returns the 99th verse when called with 99.

This test, like all tests, contains three parts:

- Setup Create the specific environment required for the test. (Arrange)
- Do Perform the action to be tested. (Act)
- Verify Confirm the result is as expected. (Assert)

Running that test produces this error:

```ruby
1) Error:
  BottlesTest#test_the_first_verse:
  NameError: uninitialized constant BottlesTest::Bottles
  test/bottles_test.rb:16:in `test_the_first_verse'
```

TDD tells you to write the simplest code that will pass this test. The above error states that the Bottles class does not yet exist.

```ruby
class Bottle
end
```

Because you wrote the test, you can confidently predict that running it a second time will now produce the following error:

```ruby
1) Error:
  BottlesTest#test_the_first_verse:
  NoMethodError: undefined method `verse' for #<Bottles:0x007fde360741f0>
  test/bottles_test.rb:16:in `test_the_first_verse'
```

Then, add `verse` method:

```ruby
class Bottle
  def verse
  end
end
```

Run tests again:

```ruby
1) Error:
  BottlesTest#test_the_first_verse:
  ArgumentError: wrong number of arguments (1 for 0)
  /Users/skm/Projects/books/99bottles/lib/bottles.rb:6:in `verse'
  test/bottles_test.rb:16:in `test_the_first_ver
```

Then, add the argument that we missed:

```ruby
class Bottle
  def verse(_)
  end
end
```

Run tests again:

```ruby
1) Failure:
  BottlesTest#test_the_first_verse [test/bottles_test.rb:16]:
  --- expected
  +++ actual
  @@ -1,3 +1 @@
  -"99 bottles of beer on the wall, 99 bottles of beer.
  -Take one down and pass it around, 98 bottles of beer on the wall.
  -"
  +nil
```

Minitest shows the difference between expected and actual output by prefixing the expected
with '-' and the actual with '+'. Therefore, you can interpret:

Minitest expected…

- "99 bottles of beer on the wall, 99 bottles of beer." followed by a newline, followed by
- "Take one down and pass it around, 98 bottles of beer on the wall." followed by another 
  newline"

but instead got `nil`.

Copy the expected output into the verse method:

```ruby
class Bottle
  def verse(_)
    "99 bottles of beer on the wall, " +
    "99 bottles of beer.\n" +
    "Take one down and pass it around, " +
    "98 bottles of beer on the wall.\n"
  end
end
```

The API says that verse takes an argument, but you can make this first test pass without actually using it. Therefore, the argument continues to be named "_" in line 2 above.

Although this code passes the test, it clearly doesn’t solve the entire problem. As a matter of fact, writing a second test will break it. 

You as the writer of tests know that the `verse` method must eventually take the value of its argument into account, but you as the writer of code must act in ignorance of this fact. When doing TDD, you toggle between wearing two hats. 

- While in the "writing tests" hat, you keep your eye on the big picture and work your way forward with the overall plan in mind.

- When in the "writing code" hat, you pretend to know nothing other than the requirements specified by the tests at hand. Thus, although each individual test is correct, until all are written, the code is incomplete.

### 2.3. Removing Duplication

Now that the first test passes, you must decide what to test next.











### Unearthing Concepts {#chapter-3}

[Your notes for chapter 3]

### Practicing Horizontal Refactoring {#chapter-4}

[Your notes for chapter 4]

### Separating Responsibilities {#chapter-5}

[Your notes for chapter 5]

### Achieving Openness {#chapter-6}

[Your notes for chapter 6]

### Manufacturing Intelligence {#chapter-7}

[Your notes for chapter 7]

### Developing a Programming Aesthetic {#chapter-8}

[Your notes for chapter 8]

### Reaping the Benefits of Design {#chapter-9}

[Your notes for chapter 9]
T