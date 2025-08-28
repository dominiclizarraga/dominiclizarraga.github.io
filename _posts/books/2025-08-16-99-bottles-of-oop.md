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



Summary 

questions on domain, and value/cost

### Test Driving Shameless Green {#chapter-2}

[Your notes for chapter 2]

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