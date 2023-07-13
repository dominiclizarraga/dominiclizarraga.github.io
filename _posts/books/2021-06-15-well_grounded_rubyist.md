---
categories:
  - book
layout: book
title: "The Well-Grounded Rubyist"
publisher:
published: "2009"
author: David A. Black & Joseph Leo III.
rating: 4.2
---

The book is on its 3rd edition and it's comprised of 3 parts and 16 chapters:

1. Ruby foundations: (chapters 1-6)

The syntax is introduced, key concepts and semantics that Ruby uses, also the construction of objects, classes, modules and identifiers, code conventions, also, how to execute files from the console, how to use Gem files and finally using the Ruby interpreter (irb).

2. Built-in Classes and methods: (chapters 7-12)

The most used built-in classes, including: String, Array, Hash, Numeric, Range, Date, Time and Regular Expressions are presented with many examples, what should you expect out of it? How to use it? How the Boolean logic works. The book has a very digested way of reading how the code is flowing, it has a numerical series where you can read from 1 to 12, step by step, line by line so that you can see how the program reads variables, re-assign them and lastly how the output reached that level, instead of jumping from one line to another.

3. Ruby dynamics (chapters 12-16)

Here you will find the metaprogramming basics, as well as handlers for non-existing methods, how to catch up those exceptions, callbacks, hook messages and finally a functional programming example.


Notes.

false and cause I conditional expression to evaluate as false; all other objects including true, of course, but also including 0 an "empty strings" caused it to evaluate to true .

Variables types: locals, instance, class, global.

Every object is capable of understanding a certain set of messages. Each message that an object understands corresponds directly to a- method, a name, executable routine whose execution the object has the ability to trigger.

A class defines an object functionality, and every object is an instance of exactly one class period every time you create a string object, you have created an instance of the class string.

Although every object is an instance of a class, the concept of class is less important than the concept of object. That's because objects can change acquiring methods and behaviors that were not defined in their class period the class is responsible for launching object into existence, a process known as instantiation, but they're after the object has a life of its own.

The ability of objects to adopt behaviors that their class did not give them is one of the most central defining principles of design of Ruby as a language.

Rather than asking in the abstract weather a = b, you ask whether it considers itself equal to B. If you want to know whether a given student is taking a class from a given teacher, you ask the student, are you student of this teacher ?

There is room for debate as to whether this or that programming language, or even these or that kind of programming language, corresponds more closely than others to shape of the real world. A lot depends on how you perceive the world. Do you perceive it as people with things, each of which has task to do and waits for someone to request the task? If so, you may conclude that object oriented languages model the world best. Do you see life as a series of to-do items on a checklist, to be gone through in order? If so, you may see a strictly procedural programming language as having closer ties to the characteristics of the real world. In short there is no answer to the question of what the real world is.
Designing object oriented software is largely a matter of figuring out what you want your objects to be: what they should do, how they will interact with each other, how many of each there should be . For example, many students, one register. And other such questions.

To get an object to talk, you have to ask it to talk. But before you ask it to talk, you have to teach it how to talk.

It's all about asking objects to do things and tell you things.
respond_to? is an example of introspection or reflection.

Keywords are special reserved words that you cannot use as variable names. For example def is a keyword ; The only thing you can use it for is to start a method definition.

Defining a class lets you group behaviors (methods) into convenient bundles, so that you can quickly create many objects that behave essentially the same way . You can also add methods to individual objects, if that's appropriate for what you are trying to do in your program. But you don't have to do that with every object if you model your domain into classes.

A typical class consists of a collection of methods definition. Classes usually exist for the purpose of being instantiated that is, of having objects created instances of that class period
Movies about objects, and objects are instances of classes.
The instance variable enables individual objects to remember state. Instance variables work much like other variables: you assign values to them, and you read those values back; You can add them together, print them out, and so on pivot but instance variables have a few differences:

• Always start with a single @

• Are only visible to the object to which they belong

• Instance variable initialized in one method inside a class can be used by any instance method defined within that class.

An attribute is a property of an object whose value can be read and or written through the object.

Every Ruby class can have only one superclass, in keeping with the principle of single inheritance.

Ruby provides modules, which art bundles of programming functionality similar to classes (except that they don't have instances), that you can easily graft onto your class family tree to provide as many methods for your objects as you need. Your line the idea of a class method is that you send a message to the object that's the class rather than the one of the class instances.

Like classes, modules are bundles of methods and constants. Unlike classes, models don't have instances; Instead, you specify that you want to add the functionality of a particular module to that of a class or a specific object.

No class can inherit from more than one class. In cases where you want numerous extra behaviors for a class instances and you don't want to stash them all in the class superclass and its ancestral classes, you can use modules to organize your code in a more granular weight.

When you are designing a program and you identify a behavior or set of behaviors that may be exhibited by more than one kind of entity or object, you have found a good candidate for a module.

<div><img src='/../graphics/projects/rubyist.jpeg' alt='beginning_rails' style="width:300px;"/></div>

The practice of arranging objects that talk to one another in a complete program is called object-oriented design. You learn in chapter 3 that you define a method twice inside the same class, the second definition takes precedence over the first.

If the object's method lookup path includes two or more same name methods, the first one encounter is the winner and is executed.

Include will make a module's methods available as instance method. extend on the other hand, will make a modules method available as class methods.
The kernel module provides an instance method called _missing. This method is executed whenever an object receives a method that it does not know how to respond to that is, a message that does not match a method anywhere in the object's method look-up path.

• Modules don't have instances. It follows that entities or things are generally best modeled in classes, while characteristics, shared behaviors, and properties of entities or things are best encapsulated in modules.

• A class can have only one superclass, but it means in as many modules as it wants. If you are using inheritance, give priority to create a sensible superclass/subclass relationship.

To know which object itself, you need to know what context you are in. In practice, there are not many contexts to worry about. There is the top level ( before you have entered or after you have left any other context, such as a class definition). There are class definition blocks, model definition blocks, and method definition blocks.

It's all about self switching from one object to another, which it does when you enter a class or module definition, an instance method definition, or a Singleton method (including class method) definition.
As soon as you cross a class or module keyword boundary , the class or module whose definition block you've entered -- the Class or Module object becomes self.

A simple rule governs instance variables and their resolution: every instance variable you will ever see in a Ruby program belongs to whatever object is the current object (self) at that point in the program.
Using global variables tends to end up being a substitute for solid, flexible program design , rather than contributing to it.

One of the main points of object oriented programming is that data and actions are encapsulated in objects. You are supposed to have to query objects for information and to request that they perform actions.

And objects are supposed to have a certain privacy. When you ask an object to do something, you are not supposed to care what the object does internally to get the job done. Even if you yourself wrote the code for the objects method, when you send the object a message, you treat the object as a black box that works behind the scenes and provides a response.

Global variables these sort the landscape by providing a layer information shared by every object in every context.

Globally scoped data is fundamentally in conflict with the object oriented philosophy of endowing objects with abilities and then getting things done by sending request to those objects.

Every definition block whether for a class, a model, a method, starts a new local scope, a new local variable, scratch pad, and get its own variable.

At its simplest, idea behind a class variable is that it provides a storage mechanism that's shared between a class and instance of that class, and that's not visible to any other objects. No other entity can fill this role. Local variables don't survive the scope change between class definition and their inner method definition. Globals do but they are also visible and mutual everywhere else in the program someone not just in one class.

So class variables have a niche to feel: visibility to a class and its instances, and to no one else.

The main business of Ruby program is to send messages to objects. And the main business of an object is to respond to messages. Sometimes, and object wants to be able to send itself messages that it does not want anyone else to be able to send it. For this scenario, Ruby provides the ability to make a method private.

If you don't use an explicit receiver for a method call, Ruby assumes that you want to send the message to the current object , self.
Ruby control flow techniques include the following:

Conditional execution. Execution depends on the truth of an expression.

Looping. A single segment of code is executed repeatedly

Iteration. a call to a method is supplemented with a segment of code that the method can call one or more times during its own execution.

Exceptions. Error conditions are handled by special control for rules.

After all, when you call a method on an object, control is passed to the body of the method ( 8 different scope); And when the method has finished executing, control returns to the point right after the point where the method call took place.

The difference between a method call with a block and a method call 
without a block comes down to whether or not the method can deal. If there is a block, then it can; If not it cannot, because there is nothing to deal to.

An Exception is a special kind of object, an instance of the class exception or a descendant of that class period raising an exception means stopping normal execution of the program and either dealing with the problem that's being encountered or existing the program completely.

It's generally considered good practice to catch a specific exceptions rather than simply using rescue to catch all exceptions.

ensure clause is executed whether an exception is raised or not. In short it is packed to begin/end structure of which it is a part, and its execution is unconditional.

The fact that you can define an even redefine elements like the + -, and square brackets means that Ruby has a great deal of flexibility. But there are limits of what you can redefining will be. You can't where they find any of the literal object constructors: {} it's always a hash literal (or a code block, if it appears in that context), "" we'll always delimit a string, and so forth.

One consideration, weighing in on the side of modifying objects instead of creating new ones, is efficiency, creating new objects is expensive in terms of memory and processing.

All that matters is what the object can do, what methods it can execute.
Nil does exist.

Single values, such as integer and strings, as opposed to collection or container objects that hold multiple values are considered as a scalar.

Symbols aren't unique. Whenever you see xyz, you are seeing a representation of the same object. Again, symbols are more like integers than strings in this respect. When you see the notation "xyz" in two places, you are looking at representations of two different string objects; The literal string constructor "" creates a new string. But :xyz is always the same Symbol object, just as 100 is always the same object.

Symbols are immutable. There is no such thing as appending characters to a symbol; Once the symbol exists, that's it. You will never see :abc << :d or anything of that kind.

Symbols have a number of users, but most appearance fall into one of two categories, method arguments and hash keys.

Well we can process symbol faster. Whereas the strings have a malleability that's a good fit for their presentation of arbitrary values.
Strings being mutual, symbols not.

Symbols share with integers not only immutability and uniqueness but also immediacy: a variable to which a symbol is bound provides the actual symbol value, not a reference tweet.

Any class that aspires to be innumerable must have an each method whose job is to yield items to a supply code block , one at a time period
Numerators are closely related to eaters, but they are not the same thing period and iterate are is a method that yields one or more values to a code block. And enumerator is an object, not a method, therefore maintain state.

An Enumerator can add innumerably to objects that don't have it. It's a matter of wiring: if you hook up and enumerators each method to any iterate are, then you can use the numerator to perform innumerable operations on the object that owns the iterator, whether that object considers itself innumerable or not.

Here is the source code https://github.com/jleo3/twgr 

