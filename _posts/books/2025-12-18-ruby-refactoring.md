---
categories:
  - book
layout: book
title: "Refactoring Ruby"
publisher: "Adison Wesley"
published: "2010"
author: William C. Wake, Kevin Rutherford
rating: 5.0
---

0. [Preface](#preface)
1. [Refactoring Example](#chapter-1)
2. [The Refactoring Cycle](#chapter-2)
4. [The Refactoring Practice](#chapter-4)
5. [Measurable Smells](#chapter-5)



### Preface. {#preface}

What Is This Book About?

Refactoring is the art of improving the design of existing code and was introduced to the world by Martin Fowler in Refactoring. Fowler’s book provides dozens of detailed mechanical recipes, each of which describes the steps needed to change one (usually small) aspect of a program’s design without breaking anything or changing any behavior.

But to be skilled in refactoring is to be skilled not only in safely and gradually changing code’s design, but also in fi rst recognizing where code needs improvement. The agile community has adopted the term code smell to describe the anti-patterns in software design, the places where refactoring is needed.

The aim of this book, then, is to help you practice recognizing the smells in existing Ruby code and apply the most important refactoring techniques to eliminate those smells.

For each smell we describe
• What to Look For: cues that help you spot it
• Why This Is a Problem: the undesirable consequences of having code with this
smell
• When to Leave It: the trade-offs that may reduce the priority of fi xing it
• How It Got This Way: notes on how it happened
• What to Do: refactorings to remove the smell
• What to Look for Next: what you may see when the smell has been removed

PART I The Art of Refactoring

### Refactoring Example. {#chapter-1}

### Refactoring Practice.{#chapter-4}

Consider acquiring the Refactoring, Ruby edition since the exercises in this book touch on perhaps half of the refactorings cataloged in the Fields book.

Practice Refactoring:

- Build refactoring into your routine.
- Build testing into your routine. Refactoring has two mechanisms: refactorings that are systematic and safe, and a supply of tests to verify that the transformations have been done correctly.
- Take small steps. Often, noticing a smell is relatively easy, compared with working out how to get “there” from “here.” Practice breaking up the larger refactorings (such as Tease Apart Inheritance) into small, safe steps.
- Get help from others.
- Add to the refactoring catalog.

Exercises to try:

- Scavenger Hunt/Smell of the Week.
- Re-Refactor: Pick a good-sized piece of code (either your own, or one of the larger examples in the back of this book would work). Each day, start from the initial version, and refactor as far as you can in ten minutes.
- Just Refactor: Pick or develop a project.
- Inhale/Exhale: Find code demonstrating some smell. Apply a refactoring that addresses it.
- Defactoring/Malfactoring: “Defactoring” and “malfactoring” are names we use for malicious refactoring: worsening the design of existing code.
- Follow Your Nose: Pick a code smell in a good-sized project.
- Harmonizing: Many of the code smells described in this book are fundamentally about some kind of duplication: identical code, similar code, code with similar structure, code with similar effects. Duplication isn’t always obvious, and sometimes the code needs to be changed to reveal it.
- Refactoring Kata: A kata is a martial arts exercise that you repeat every day, for practice and to help get into the rhythm of the art.

For this chapter the closing questions are the following:

A. For the Extract Method, list each smell it can help to fix. (Hint: Use the What to Do sections for each
smell catalogued in Part II,“Code Smells,” later in this book.)

B. Which refactorings fix the most smells?

C. Which refactorings aren’t mentioned by any of the smells? Why not?

D. Does this list suggest any other smells we haven’t covered?

That concludes our brief overview of the art of refactoring. It’s now time to address the specifics.

As we mentioned in Chapter 2, “The Refactoring Cycle,” <b>perhaps the most difficult part of the refactoring cycle is in recognizing code that needs to be refactored.</b> Part II, “Code Smells,” looks in detail at all of the common and some of the not so common code smells; by doing the exercises you’ll learn how to recognize and eliminate them.

PART II Code Smells

### Measurable Smells. {#chapter-5}

Most metrics seem to correlate with length, so we tend to worry about size first (usually noticeable as a Large Module or Long Method).

Metrics are indicators, not absolutes. It’s very easy to get into the trap of making numbers without addressing the total complexity. So don’t refactor just for a better number; make sure it really improves your code.

The smells in this chapter are the easiest to identify. They’re not necessarily the easiest to fix.

Pay attention when things feel like they’re getting too big. In this chapter we’ll cover the following smells:

- Comments, in which the code includes text to explain what’s happening
- Long Method, in which a method is too long to be manageable
- Large Module, in which a class or module is too large to represent a meaningful abstraction
- Long Parameter List, in which a method needs too much information in order to get its job done

### Comments

What to Look For
- The code contains a comment. (Some IDEs make these more obvious by colorcoding comments.)

Why This Is a Problem
- Flexibility: Any comment that explains the code must be kept in step if the code is changed.
- Duplication: Most comments can be reflected just as well in the code itself. For example, the goal of a method can often be communicated as well through its name as it can through a comment.
- Communication: Comments that say something slightly different than the code create cognitive drag or even mistrust and slow the reader down.

When to Leave It
Don’t delete comments that are pulling their own weight such as rdoc API documentation. Some comments can be particularly helpful—those that tell why something is done a particular way (or why it wasn’t), or those that cite algorithms that are not obvious (where a simpler algorithm won’t do).

How It Got This Way
Comments may be present for the best of reasons: The author realizes that something isn’t as clear as it could be and adds a comment.

What to Do
- When a comment explains a code fragment, you can often use `Extract Method` to pull the fragment out into a separate method. The comment will often suggest a name for the new method.

- When a comment explains what a method does (better than the method’s name!), use `Rename Method` using the comment as the basis of the new name.

- When a comment explains preconditions, consider using `Introduce Assertion` to replace the comment with code.

What to Look for Next

- Duplication: Often the code fragments broken out of along method will do similar things in similar ways; it may be possible to identify some duplication among them.

- Abstraction: Creating names for code blocks helps to relate the design to the application’s domain. Review the names in the area you changed for consistency

### Long Method

What to Look For

- A method has a large number of lines. (We’re immediately suspicious of any method with more than five lines.)

Why This Is a Problem

- Flexibility: A `Long Method` is guaranteed to be a `Greedy Method` at least two
responsibilities are coupled together in one place, which in turn leads to `Divergent Change`.

- Testability: It can be difficult to isolate individual behaviors of a Long Method for testing; and if a method does too much it may also be difficult to create fixtures that contain enough context for the method to work properly.

When to Leave It

It may be that a somewhat longer method is just the best way to express something. (Like almost all smells, the length is a warning sign, not a guarantee of a problem.)

How It Got This Way

You can think of it as the Columbo syndrome. Columbo was the TV detective who always had “just one more thing.” A method starts down a path and, rather than break the flow or identify the helper classes, the author adds one more thing. Code is often easier to write than it is to read, so there’s a temptation to write fragments that are too big.

What to Do

- Use • `Extract Method` to break up the method into smaller pieces. Look for comments or white space delineating interesting fragments. You want to extract methods that are semantically meaningful, not just introduce a function call every seven lines.

- You may find other refactorings (those that clean up straight-line code, conditionals, and variable usage) helpful before you even begin splitting up the method.

- If the method doesn’t separate easily into pieces, consider Replace Method with `Method Object` to turn the method into a separate object.

It’s natural to worry about the performance hit from increasing the number of method calls, but most of the time this is a non-issue. By getting the code as clean as possible before worrying about performance, you have the opportunity to gain big insights that can  estructure systems and algorithms in a way that dramatically increases performance.

What to Look for Next

- Duplication: Often the code fragments broken out of a Long Method do similar things in similar ways; it may be possible to identify some duplication among them.

- Communication: Creating names for code fragments helps to relate the design to the application’s domain. Review the names in the area you changed for consistency.

- Abstraction: The signatures of the new methods may suggest a missing class, or new structure may be revealed in the original method.

- Flexibility: Review the new methods for Feature Envy; with more small pieces you now have the opportunity to move code to more “natural” homes.