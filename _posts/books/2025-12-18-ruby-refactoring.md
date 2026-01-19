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

1. [Refactoring Example](#chapter-1)
2. [The Refactoring Cycle](#chapter-2)
3. [Refactoring Step by Step](#chapter-3)
4. [The Refactoring Practice](#chapter-4)
5. [Measurable Smells](#chapter-5)



### Preface.

What Is This Book About?

Refactoring is the art of improving the design of existing code and was introduced to the world by Martin Fowler in Refactoring. Fowler’s book provides dozens of detailed mechanical recipes, each of which describes the steps needed to change one (usually small) aspect of a program’s design without breaking anything or changing any behavior.

But to be skilled in refactoring is to be skilled not only in safely and gradually <b>changing</b> code’s design, but also in first <b>recognizing</b> where code needs improvement. The agile community has adopted the term code smell to describe the anti-patterns in software design, the places where refactoring is needed.

The aim of this book, then, is to help you <b>practice recognizing</b> the smells in existing Ruby code and apply the most important refactoring techniques to eliminate those smells.

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

We’ll begin with a quick example of refactoring to show how you can identify problems in code and systematically clean them up. In later chapters, we’ll touch on theory, provide deeper dives into problems and how you fi x them.

Sparkline Script

The script generates a sparkline (a small graph used to display trends, without detail) and does it by generating an SVG document to describe the graphic.

The original script was written quickly to display a single sparkline to demonstrate the trends that occur when tossing a coin.

[GitHub repo](https://github.com/kevinrutherford/rrwb-code/blob/master/svg-before/sparky.rb)

```ruby
NUMBER_OF_TOSSES = 1000
BORDER_WIDTH = 50

def toss
  2 * (rand(2)*2 - 1)
end

def values(n)
  a = [0]
  n.times { a << (toss + a[-1]) }
  a
end

def spark(centre_x, centre_y, value)
  "<rect x=\"#{centre_x-2}\" y=\"#{centre_y-2}\"
    width=\"4\" height=\"4\"
    fill=\"red\" stroke=\"none\" stroke-width=\"0\" />
  <text x=\"#{centre_x+6}\" y=\"#{centre_y+4}\"
    font-family=\"Verdana\" font-size=\"9\"
    fill=\"red\" >#{value}</text>"
end

$tosses = values(NUMBER_OF_TOSSES)
points = []
$tosses.each_index { |i| points << "#{i},#{200-$tosses[i]}" }

data = "<svg xmlns=\"http://www.w3.org/2000/svg\"
     xmlns:xlink=\"http://www.w3.org/1999/xlink\" >
  <!-- x-axis -->
  <line x1=\"0\" y1=\"200\" x2=\"#{NUMBER_OF_TOSSES}\" y2=\"200\"
            stroke=\"#999\" stroke-width=\"1\" />
  <polyline fill=\"none\" stroke=\"#333\" stroke-width=\"1\"
    points = \"#{points.join(' ')}\" />
  #{spark(NUMBER_OF_TOSSES-1, 200-$tosses[-1], $tosses[-1])}
</svg>"

puts "Content-Type: image/svg+xml
Content-Length: #{data.length}

#{data}"
```

Before we dive in and change things, take a moment to review the script. Which aspects of it strike you as convoluted, or unreadable, or even unmaintainable? (Part II, “Code Smells,” of this book lists over forty common code problems)

Here are the more obvious problems we noticed in the code:

•  Comments: the SVG output that’s not a bad thing, because the SVG is quite opaque. But it also serves to comment the Ruby script, which suggests that the string is too complex.

• Part of the SVG document is broken out into a separate method Inconsistent Style: (line 34), whereas most is built inline in the data string.

• Strictly speaking, the list of properties of the XML elements Long Parameter List: aren’t Ruby parameters. But they are long lists, and we feel sure they will cause problems later.

• The code uses Uncommunicative Name: data as the name of the SVG document, i as an iterator index (line 25), a as the name of an array (line 9), and n as the number of array elements (line 8).

• Dead Code: The constant BORDER_WIDTH (line 2) is unused.

• Greedy Method: toss tosses a coin and also scales it to be –2 or +2.

• Most of the numbers representing SVG coordinates and shape sizes Derived Value: could probably be derived from the number of tosses and the sparkline’s max and min values.

• The text markers for the start and end tags of XML elements Duplicated Code: are repeated throughout the code; the calculation 200-tosses[x] is repeated (lines 25, 34).

• Data Clump: The SVG components’ parameters include several x-y pairs that represent points on the display canvas (lines 15, 18, 30). Some have further parameters that go to make up a rectangle (lines 16, 30). Strictly, these are parameters to SVG elements, and this is therefore a problem in the defi nition of SVG.

• Global Variable: Why is tosses a global variable at all?

• One might argue that all of the methods here (lines 4, 8, 14) are Utility Function: Utility Functions.

• Greedy Module: The script isn’t a class, as such, but it does have multiple responsibilities: Some of the script deals with tossing coins, some deals with drawing pictures, and some wraps the SVG document in an HTTP message.

• Divergent Change: The data string (lines 27–35) is probably going to need to be
different for almost every imaginable variation on this script.

• There are already Ruby libraries for manipulating XML ele- Reinvented Wheel: ments, and even for creating SVG documents.

Which should we address first? When faced with a long to-do list of code smells it’s easy to feel a little intimidated. It’s important to remember at this stage that we can’t fix everything in one sitting; we’ll have to proceed in small, safe steps.

It is entirely likely that you would address the smells in a different order, and that’s just fine.

Consistency

We can easily remove the Dead Code and change the Global Variable;

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

Most metrics seem to correlate with length, so we tend to worry about size first (usually noticeable as a `Large Module` or `Long Method`).

Metrics are indicators, not absolutes. It’s very easy to get into the trap of making numbers without addressing the total complexity. So don’t refactor just for a better number; <b>make sure it really improves your code.</b>

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
Don’t delete comments that are pulling their own weight such as `rdoc`API documentation. Some comments can be particularly helpful, those that tell why something is done a particular way (or why it wasn’t), or those that cite algorithms that are not obvious (where a simpler algorithm won’t do).

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

- Use `Extract Method` to break up the method into smaller pieces. Look for comments or white space delineating interesting fragments. You want to extract methods that are semantically meaningful, not just introduce a function call every seven lines.

- You may find other refactorings (those that clean up straight-line code, conditionals, and variable usage) helpful before you even begin splitting up the method.

- If the method doesn’t separate easily into pieces, consider Replace Method with `Method Object` to turn the method into a separate object.

It’s natural to worry about the performance hit from increasing the number of method calls, but most of the time this is a non-issue. By getting the code as clean as possible before worrying about performance, you have the opportunity to gain big insights that can  estructure systems and algorithms in a way that dramatically increases performance.

What to Look for Next

- Duplication: Often the code fragments broken out of a `Long Method` do similar things in similar ways; it may be possible to identify some duplication among them.

- Communication: Creating names for code fragments helps to relate the design to the application’s domain. Review the names in the area you changed for consistency.

- Abstraction: The signatures of the new methods may suggest a missing class, or new structure may be revealed in the original method.

- Flexibility: Review the new methods for `Feature Envy`; with more small pieces you now have the opportunity to move code to more “natural” homes.

### Large Module

What to Look For
- A class or module has a large number of instance variables, methods, or just lines of code.

Why This Is a Problem
- Testability: A Large Module is usually difficult to test, either because it depends on many other modules or because it is difficult or time-consuming to create instances in isolation.

- Flexibility: The module represents too many responsibilities folded together that is, every `Large Module` is also a `Greedy Module`.

How It Got This Way
Large modules get big a little bit at a time. The developer keeps adding just one more capability to a module until eventually it grows too big. Sometimes the problem is a lack of insight into the parts that make up the whole module.

What to Do
In general, you’re trying to break up the module. This usually proceeds piecemeal:

• Very often a review of the module reveals a composite of other smells, such as `Long Methods`, `Data Clumps`, and `Temporary Fields`; fix these smells first.

• To break up the module further, use `Extract Class` or `Extract Module` if you can identify a new piece that has part of this module’s responsibilities.

• If you have a large class, you might try `Extract Subclass` if you can divide responsibilities between the class and a new subclass.

• Sometimes a class is big because it’s a GUI class, and it represents both a display component and a model. In this case, you can use `Duplicate Observed Data` to help extract a domain class.

What to Look for Next
- Duplication: As you peel off each piece of the `Large Module` you may discover it has similar responsibilities or interface to an existing module.

- Communication: Dividing up confused responsibilities, and giving names to them, helps the reader relate the code to the real domain. Review the names (see Chapter 6) used in the slimmer module and everything you extracted.

### Long Parameter List

What to Look For
• A method has more than one or two parameters.
• A method yields more than one or two objects to an associated block.

Why This Is a Problem

- Simplicity: A `Long Parameter List` often indicates that a method has more than one responsibility. Sometimes the parameters have no meaningful grouping they don’t go together. In such cases it may be that the method, or the objects it uses, doesn’t represent a meaningful and cohesive abstraction in the problem domain.

- Flexibility: A `Long Parameter List` represents a large number of pieces of shared information between the caller and called code. If either changes, the parameter list is likely to need changing too.

- Communication: A lot of parameters represent a lot to remember the programmer has to remember not only what objects to pass, but in which order. More succinct APIs are easier and quicker to use.

When to Leave It
This is one of those places where a smell doesn’t always equate to a problem. You might smell a `Long Parameter List` but decide it’s right for the situation at hand for example, to avoid the called method picking up a dependency that you don’t want it to have. Ensure that your changes don’t upset this balance.

How It Got This Way
You might be trying to minimize coupling between objects. Instead of the called object being aware of relationships between classes, you let the caller locate everything; then the method concentrates on what it is being asked to do with the pieces.

The method may have acquired many parameters because the programmer generalized it to deal with multiple variations by creating a general algorithm with a lot of control parameters.

What to Do
• If a parameter’s value can be obtained from another object this one already knows, use `Replace Parameter with Method`

• If the parameters come from a single object, try `Preserve Whole Object`.

• If the data is not from one logical object, you still might group them via `Introduce Parameter Object`.

What to Look for Next
- Duplication: Sometimes a method’s clients all have to jump through the same hoops in order to call it. Check for `Duplicated Code` among the callers.

- Communication: Parameters add to the cognitive load required to understand a class’s interface; all of the above refactorings help to hide detail. Review all of this class’s method signatures looking for `Data Clumps` and naming patterns.

- Size: The amount of code required to call a method can be large when the method requires a lot of unrelated parameters. Look for signs of `Feature Envy` and `Open Secret` around the objects you are now passing as parameters to the method.

### Exercises:

Exercises 5.1: Comments

Exercises 5.2: Long Method

Exercises 5.3: Large Class

Exercises 5.4: Smells and Refactorings

Exercises 5.5: Triggers


