---
categories:
  - book
layout: book
title: "Eloquent Ruby"
publisher:
published: "2011"
author: Russ Olsen.
rating: 5
---

This is book is not for learning the very basics of Ruby, it’s more for people who have played with the language, the console and maybe built simple web app, I say this because it assumes you know what is an array, how you can manipulate or work with it therefore the book only shows shortcuts for instance methods on arrays, the correct usage of bang (!).

I contains 3 sections after each chapter, staying out of trouble, in the wild and to wrap up, which has the most important takeaway after the lesson, i.e. “Choose the right control structure”, a real example from a codebase and finally a summary of what it went over.


The book navigates each lesson through a kind of library system where a Document is created with its author, it plays with the first name and last name of the author, then it adds it to an array, then to a hash in order to have it more well organized.

It will refresh you some basics methods like inject, map, sort, reverse, push, pop, delete, shift with the bang and without it always keeping in mind that Ruby is an idiomatic language.

The book dedicates one chapter to learn how to work and mutilate this String class which is something Ruby is pretty smart and after that String brush up it goes to the Regular Expression, It shows you only the basics of how to validate an e-mail, address how to format a date, and it helps you find it easy to use instead of the intimidating appearance it seems to be.

It has a deep chapter on the usage of symbols, it shows you the difference between a symbol and just string, it brings the symbol characteristics, it’s immutability, its better performance and it’s memory space utilization.

The core of Ruby on Rails, everything is an object, shows you the keywords, how to treat the self, some instance methods in order to know what class is the object you are evaluating, it also presents why treating everything as an object is a good way because it provides consistency to your application, the difference between public, private, protected methods. how to require external libraries like date for instance and it closes remembering us that virtually everything in Ruby is an object, and virtually all of those objects inherit the basic set of methods from the Object class.

<div><img src='/../graphics/projects/Eloquent_ruby.jpeg' alt='beginning_rails' style="width:300px;"/></div>

Engineering is all about tradeoffs. just about every engineering decision involves getting something, but at a price, and there is a price to be paid for dynamic typing. In the chapter 8 lays out the difference between dynamic and static programming languages and encourages you to write tests which is the best way 2 make sure your code works as it should, do you need to test it early, you need to test it often, and you certainly need to test it whenever you change it.

The tests framework used on this book are Unit::Test and RSpec it shows you how to start those tests and make them work with their document class. The author Hardly stresses how important is to write test in order to know how your code is working there is no shortcut, there is no easy way it would save you tons of hours if you do it often.

The part II of the books goes over the back bone of the language, in this case Classes, Modules and Blocks. Despite shelves full of books on software architecture, and UML diagrams to fill an Art Museum and design meeting that seem to last longer than the pyramids, building software mostly comes down to writing one method after another, methods that stick to doing one thing and doing it well.

Composing methods for humans, this technique advocates dividing your class up into methods that have three characteristics. first, each message should do a single thing , focus on solving a single aspect of the problem. by concentrating on one thing, your methods are not only easier to write, they are also easier to understand.

second, each method needs to operate at a single conceptual level: Simply put, don’t mix high level logic with the nitty-gritty details. a method that implements their business logic around say, currency conversions, should not suddenly veer off into the details of how the various accounts are sorted in the database.

Finally, each method needs to have a name that reflects its purpose. nothing new here, we have all heard endless lectures about picking good method names. the time to listen to all of them haranguing is when you are creating lots of little methods that you are trying to put together into a functional whole.

Why is building small, well named methods that do one thing such a good idea? it’s not about writing better code for the computer, because the computer does not care. you can code the same algorithm in a handful of large methods or in a myriad of little message and , as long as you’ve gotten the details right, the computer will give you exactly the same answer. the reason you should lean towards smaller methods is that all those compact, easy-to-comprehend methods will help you get the details right.

Short, easily comprehending methods also have some secondary advantages as well. take the old bit of coding advice that every message should have exactly one way out, so that all of the logic converges at the bottom for a single return.

the key to preventing your compose methods from turning on you is to remember that every method should have two things going for it. First, it should be short. and second, it should be coherent. In plain English, your method should be compact, but it should also do something. 

Unfortunately, since short is so much easier to remember than coherent, programmers will sometimes go too far in breaking up their methods.
There is also a chapter that teaches you how to modify normal operators (<, >, +, -, =, %, *) and change their behavior totally, it demonstrates the ups and downs of defining your own operators, and what are they consequences for others users if they don’t know what outcome will they get.

Chapter 12 and 13 explore the idea behind equality classes, how you can leverage the custom operator by giving them another behavior, how equal? is different from ==, or even ===; all of them have different meaning and the author breaks them all down, next it touches the Singleton and class methods what are their uses, when should you use them, how are they built and again they differences.

The usage of Class instance variables, instance variables and modules, what are the benefits , the caveats, what happen if a name collision takes place, what can they hold, what are the risks of over using a module and one of the keys of programming which is naming these instances, those classes, these modules. How to include that module into a Class, how to extend the usage of that module, and also how is the look-up procedure when you call a method (Inheritance tree).

An easy rule of thumb for naming modules is that if you find yourself creating a lot of names that all start with the same word, perhaps 'TonsOTonerPrintQueue' and 'TonsOTonerPrintAdministration', then you just may need a 'TonsOToner' module.

The book also covers iterators with 3 chapters, they’re different ways of calling, the usage of yield (Execute around), the naming convention, how to enable a class to use more than 40 methods coming from the enumerable module, the usage of rescue, begin, raise; Come on errors when using execute around which can be for instance forget about exceptions; because execute around is all about warranties. The whole idea of execute around is that the color is warranty that this will happen before the code fires and that will happen after.

The technique “execute later “ is when you add a parameter prefix with an ampersand, some practical examples of lambdas and procs as well and lastly it touches some of the metaprogramming topics to modify subclasses, to use the method_missing method In order to rescue one execution and provide an exception.

Updating existing classes, fixing broken classes, what is the monkey patching? Dealing with DSL and XML, what are the Gems package, how to consume them, nuts and bolts of gems, where are they located and also how to build a gem publish them and make it public.