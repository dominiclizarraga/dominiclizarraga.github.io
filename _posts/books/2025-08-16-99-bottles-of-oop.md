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

Writing code is the process of working your way to the next stable end point, not the end point itself. You don’t know the answer in advance, but instead, you are seeking it.

This book documents every step down every path of code, and so provides a guided-tour of the decisions made along the way. It not only shows how good code looks when it’s done, it reveals the thoughts that produced it.

### Rediscovering Simplicity {#chapter-1}

Experience has taught you thatmost code will someday change, and you've begun to craft it in anticipation of that day. Complexity seems both natural and inevitable.

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

- Whoever calls total_in_cents only knows: “I send a message `convert_to_cents`”—they don’t directly know that it multiplies by 100 and converts to integer.

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

The code you write should meet two often-contradictory goals. It must remain concrete enough to be understood while simultaneously being abstract enough to allow for change.

Code can range on a spectrum from very concrete (one long, detailed procedure) to very abstract (many tiny classes and methods). The best solutions usually aren’t at the extremes but somewhere in the middle, where the code is both understandable and easy to change. The programmer’s job is to find that balance.

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

Code is also charged with doing what it’s supposed to do now as well as being easy to alter so that it can do more later.

1. How difficult was it to write?
2. How hard is it to understand?
3. How expensive will it be to change?

Code is easy to understand when it clearly reflects the problem it’s solving, and thus openly exposes that problem’s domain

If this solution would be openly exposed the "99 Bottles" domain, a brief glance at the code would answer these questions:

1. How many verse variants are there?
2. Which verses are most alike? In what way?
3. Which verses are most different, and in what way?
4. What is the rule to determine which verse comes next?

These questions reflect core concepts of the problem, yet none of their answers are apparent in this solution. The number of variants, the difference between the variants, and the algorithm for looping are distressingly obscure. This code does not reflect its domain, and therefore you can infer that it was difficult to write and will be a challenge to change. 

### 1.1.2. Speculatively General



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