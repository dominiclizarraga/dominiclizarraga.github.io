---
categories:
  - book
layout: book
title: "Refactoring"
publisher:
published: "2009"
author: Jay Fields, Shane Harvie, Martin Fowler & Kent Beck.
rating: 5
---
This book will take you from beginner to advanced in terms of refactoring.

It's recommended to have prior knowledge of either  one Object Oriented language or Ruby however the Ruby language is very idiomatic so you don't need to have a deep understanding of it in order to identify what is the author trying to teach.

Firstly let's bring up what "Refactoring" means:

Verb: To restructure software by applying a series of refactorings without changing its observable behavior.

Noun: A change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior. 

The book has around 70 examples of how you can clean your code up and some others well known "good practices". What are the main benefits of doing it and also it considers its downsides so that you can see the whole picture, bearing in mind that the code you write today must be easy to understand and even change tomorrow.

The first chapter begins with a good example of a Movie theater system, on the left side you may find some spaghetti code and on the right the code after applying some refactoring twists.

Also, he brings some step by step methodology which consists in small changes, test, another small change, test in order to make sure nothing has been broken. He gives you a brief example and then provides a small image, the motivation, the mechanics and the example.

For visual learners, the book has plenty of diagrams, before the Refactoring and after so you can see how a requests is sent from the user/browser and pass through different methods and by doing that you may see how an object is modified and what methods intervene and also how clean is the new diagram.

There is a section called "Tip" where the author gives you some advices in order to perform better; this is the first:

When you find you have to add a feature to a program, and the programs code is not structured in a convenient way to add the feature, first refactor the program to make it easy to add the feature, then add the feature.

He goes over about the ROI (return of investment), the technical debt, how to manage it in the case we have tight deadlines and how much we should invest in order to write good code in the first attempts.

Notes.

Instance methods should not be too long nor does too much. Even if it works, it's until we want to change the system when we notice there's a bad smell.

Code is written by humans and humans need to understand it also care about it.

A poorly design system is hard to change. If it's hard to figure out what to change is very likely that programmer will make a mistake and introduce bugs.

The only guarantee you're going to have is that they will change it again within six months.

The first to refactor is always the same. I need to build a solid set of tests for that section of code.

Decomposing and Refactoring the Statement Method

I am looking to decompose the method into smaller pieces. Smaller pieces of code tend to make things more manageable. They are easier to work and to move around.

My first step is to find a logical clump of code and use Extract Method.

When I extract, I need to know what could go wrong. If I take a larger piece, I can introduce a bug into the program. So before doing it try to figure out how to do it safely.

Any non modified variable can be passed as parameter. Modified variables need more care.

Never be afraid to change names of things to improve clarity.

Good programmers write code that humans can understand.

In most cases a method should be on the object whose data it uses.

While Refactoring you should focus on clarity, and then later focus on performance as a separate activity.

Replacing the Conditional Logic with Polymorphism. If you must use a case statement should be your own data, not on someone else's.

Using subclasses, we can get rid of the case statement using Polymorphism. Example: Movie (as main class) then subclasses: RegularMovie, Children'sMovie and NewMovie.

An object cannot change its class during its lifetime.

All these lead to better-distributed responsibilities and code that is easier to maintain.

The purpose of refactoring is to make software easier to understand and modify.

You can make many changes in software that make little or no change in the observable behavior. It only alters the internal structure.

Any user, whether an end user or another programmer, cannot tell that things have changed.

The two hats by Kent Beck. When you add a function, you should not modify existing code, you're just adding new features (hat #1), on the other hand when you are refactoring, you should not add code, just 
restructure the code (hat #2).

Refactoring is not the silver bullet for all software development issues.

Loss of the structure of code has a cumulative effect. The harder it's to see the design in the code, the harder it's to preserve it.

Refactoring helps you spot bugs.

When I'm studying code, I find Refactoring leads me to higher levels of understanding that otherwise I would miss.

You don’t decide to refactor, you refactor because you want to do something else, and refactoring helps you do that other thing.

I ask myself if I can refactor the code to make that understanding more immediately apparent. Then I refactor it.

The other driver of Refactoring is a design that does not help me add a feature easily

Developers often to both things, to remove existing pain points and experiment with new solutions.

When developers have a deeper understanding of the code base they can ne more effective at adding to it and suggesting how to improve it.

Refactoring tends to break big objects and big methods into several smaller ones.

When shouldn't you refactor?

A compromise route is to refactor a large piece of software into components with strong encapsulation. 

Then you can make a refactor-versus-rebuild decision for one component at a time.

Another time you should avoid refactoring is when you are close to a deadline. At that point the productivity gain from refactoring would appear after the deadline and thus be too late.


<div><img src='/../graphics/projects/refactoring_photo.jpeg' alt='beginning_rails' style="width:300px;"/></div>

With refactoring the emphasis changes. You still do up-front design, but now you don't try to find the perfect solution. You may find that the solution is different from the one you previously came up.

Always look for flexible solutions.

Refactoring can lead to simpler designs without sacrificing flexibility.

The secret to fast software is to write tunable software first and then to tune it for sufficient speed.

Since the early days of programming people have realized that the longer a procedure is, the more difficult it is to understand.

If you have a good name for a method, you should not look at the body.

Ninety-nine percent of the time, all you have to do to shorten a method is Extract method. Find the parts of the method that seem to go nicely together and make a new method.

A block of code with a comment that tells you what it is doing can be replaced by a method whose name is based on the comment.

When a class is trying to do too much, it often shows up as too many instance variables. When a class has too many instances variables, duplicated code cannot be far behind.

As with a class with a huge wad of variables, the usual solution for a class with too much code is either to 

Extract class, Extract module or extract subclass. A Useful trick is to determine how clients use the class 
and to use the Extract module for each of these uses. That may give you ideas of how you can break up the class.

A class smell is a method that seems more interested in a class other than the one it actually is in.

You can shrink a lot of parameter lists and simplify method calling.

Bunches of data that hang around together really ought to be made into their own object.

Most times when you see a case statement it may be replaced by Polymorphism.

Each class you create costs money to maintain and to understand. A class that isn't doing enough to pay for itself should be eliminated.

Inheritance often leads to over-intimacy.

One of the prime features of Objects is encapsulation – hiding internal details form the rest of the world.

Comments are used as deodorant to somehow mask the bad smell.

If you want to refactor, the essential precondition is having solid tests.


If you don't write self-testing code, you'll end up spending most time debugging.

When you get a bug report, start by writing a unit test that exposes the bug.

Write isolated tests that do not depend on each other.

You should concentrate on where the risk is. Look at the code and see where it becomes more complex.

I emphasize the safe way of doing the refactoring, which is to take small steps and test after every one.

A large part of refactoring is composing methods to package code properly. Almost all the time the problems come from methods that are too long.

Long methods are troublesome because they often contain a lot of information which gets buried by the complex logic that usually gets dragged in.

The key refactoring is Extract method, which takes a clump of code and turns it into its own method.

Inline method which does the opposite.

I prefer short, well-named methods.

It increases the chances that other methods can use a method and also allows you to read from a higher 
level as a series of comments.

Comments often identify pieces of a method that can be extracted.

In such situation temporary variables can be helpful to break down the expression into something more manageable.

The difficulty in decomposing a method lies in local variables.

Refactoring can break down something complex into simpler pieces, but sometimes you just reach the point at which you have to remove the whole algorithm and replace it with something simpler.

Moving methods is the bread and butter of refactoring. I move methods when classes have too much behavior or when classes are collaborating too much and are highly coupled.

I consider moving a field if I see more methods on another class using the information in the field than the class itself.

You’ve Probably heard that a class should be a crisp abstraction, handle a few clear responsibilities, or some similar guideline.

You need to consider where it can be split, and you split it. A good sign that a subset of the data and a subset of the methods seem to go together. Other good signs are subsets of data that usually change together or are particularly dependent on each other.

One of the keys, if not the key; to objects is encapsulation. Encapsulation means that object need to know less about other parts of the system.

A class is doing too much, remove the middleman with method delegation.

Each object stands for one object in the real world.

Having many two-way links also makes it easy for mistakes to lead to zombies: objects that should be dead but still hang around because of a reference that was not cleared.

Replacing case-like or conditional statements with Polymorphism involves blowing away the original class and replacing it with a new class for each type code.

If the original class has a large chunk of code that doesn't use the type code, I choose either Replace Type code with Module Extension or Replace Type code with State/Strategy.

Replace Type code with Module Extension aims to remove conditional logic. Both the original class and the module that is being extended can access the same instance variables.

Modules cannot be unmixed easily.

When the code is changed at the runtime and the type changes are complex enough that I cant get away with Module Extension I use State/Strategy.

I often find conditionals expressions come in two forms. The first form is a check where either course is part of the normal behavior. The second is a form situation in which one answer from the conditional indicates normal behavior and the other indicates an unusual condition.

You have a conditional that chooses different behavior depending on the type of an object.

One of the grandest sounding words in object jargon is polymorphism. The essence of polymorphism is that it allows you to avoid writing an explicit conditional when you have objects whose behavior varies depending on their types.

You can achieve polymorphism in two ways in Ruby, one by implementing the same method signature on multiples objects and call these methods polymorphically and the second by introducing inheritance hierarchy and have the method that is to be called polymorphically on the subclasses.

The essence of polymorphism is that instead of asking an object what type it is and the invoking some behavior based on the answer you just invoke the behavior.

An assertion technique is a conditional statement that is assumed to be always true.

Goal of interface is to show only what they have to and no more.

Remember your code is for a human first and a computer second.

Methods should be named in a way that communicates their intention. A good way to do this is to think about the comment you would use to describe the method and turn that comment into the name of the method.

A good rule to follow is to say that any method that returns a value should not have observable side effects.

If you come across a method that returns a value that is used by the caller and also has side effects, you should try to separate the query from the modifier.

There are two motivations here for using Replace Constructor with Factory Method. The first comes about if we need to perform this construction login in more than one place. And the second motivation is encapsulation.

Exceptions are better because they clearly separate normal processing form error processing.

A module should have one single responsibility, just like a class.

A module that is difficult to name with the words "helper" or "assistant" is probably doing too much.

The main trigger for use of Extract Subclass is the realization that a class has behavior used for some instances of the class and not for others.

A Ruby Class can only inherit from one superclass directly. If you want the class to vary in several different ways, you have to use delegation or module extension for all but one of them.

Notice that the implementation using extension of modules is similar to the inheritance example. So why use extend instead of inheritance? The answer is that you would use extend if the modules you were creating could be used to extend various classes.

By using delegation instead, you make it clear that you are making only partial use of the delegated class.


Book examples: https://github.com/DominicLizarraga/refactoring_ruby_edition