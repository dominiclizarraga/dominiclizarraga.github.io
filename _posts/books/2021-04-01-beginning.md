---
categories:
  - book
layout: book
title: "Beginning Rails 6 🚇"
publisher:
published: "2020"
author: Brady Somerville, Adam Gamble.
rating: 4.5
---

This book takes you from the straightforward “rails new blog –d=postgrsql” to adding active jobs and sending automated emails; it goes step by step so that you can see gradually the app development, it has more than 500 pages with 18 chapters; it touches the very basics of Ruby in the 4th just in case the reader has no experience with this language however Rails is very intuitive and easy to follow along.

As you may read the main web app that is built along with this book is a blog where an user can sign-in/ log-in with email and password, can post with “Rich Text” (attach images, modify font, color, size), can edit its own posts, can comment on other’s posts and finally can delete only posts that user has created. Articles are the epicenter of the application.

It uses the most common Gems in order to get the app up and running, it helps you add the gem to translate the app into different languages (Spanish, Portuguese, etc.), it helps you enable the active storage gem which is used like a cloud storage (comes by default with Rails), explains you the differences between CSS and SCSS, also how to connect JavaScript, what is it for?, action text, Ajax, Action Cable and finally it uploads the app to Heroku (Cloud platform to host your app) in order to grant access anyone in the world.

It was also the first book I’ve read that contains the whole Action Pack broken down, routes, controllers, views, which means Action Controller, Action View and Action Dispatch respectively in addition the whole request cycle, who are the actors, what is DNS for? And lands all of this with a CD player in a car example, pretty clear for me.

Notes. ✍🏻

A framework is a collection of libraries and tools intended to facilitate development. Design with productivity in mind a good framework provides a basic but complete infrastructure on top of which to build an application.
Why choose Rails? 🛤

It provides a powerful database abstraction layer called active records, which works with all popular data based systems. It chips with a sensible set of defaults and provides a well-proven, multi-layer system for organizing programs files and concerns.

Its goal as a framework is to solve 80% of the problems that occur in web development, assuming that the remaining 20% are problems that are unique to the applications domain; you get to focus on just 20% which is what really matters.

With rails, you can respond to the needs of customers quickly and easily, and rails works well during collaborative development. It has the famous convention over configuration, "don’t repeat yourself" (DRY), the concepts of rapid prototyping and that "you ain’t gonna need it" (YAGNI) Philosophy, closing the gap between customer and programmer.

Programming is all about making decisions. If you were to write a system from scratch, without the aid of rails, you would have to make a lot of decisions: how to organize your files, what naming conventions to adopt, and how to handle databases access are only a few. Rails lets you start right away by encompassing a set of intelligent decisions about how you program should work and alleviating the
amount of low-level decisions making you need to do up front. As a result, you can focus on the problems direct trying to solve and get the job done more quickly.

Although you can manipulate most things in the Rails setup and environment, the more you accept the defaults, the faster you can develop applications and predict how they will work. If you put your files in the right place and name them according to the right conventions, things just work. If you are willing to agree to the defaults, you’re generally have less code to write.

The more duplication exists in a system, the more room box has to hide.
Ruby is known for making certain programmatic constructs look more natural by way of what’s called syntactic sugar. Rails has popularized the term synthetic vinegar coma is the exact opposite of syntactic sugar: awkward programmatic constructs are discouraged by making their syntax look sour.

Rails employs a time honored and well-established architectural pattern that advocates dividing application logic and labor into three distinct categories: the model, view, and controller. In the MVC pattern, the model represents the data, the view represents the user interface, and the controller directs all the action. The real power lies in the combination of the MVC layers.

Using the pain of maintenance considerably while increasing the level of ability among components.

Models. in rails, the model layer represents the database. For example, a model called User convention, would map to a table called users. All the rules for data access, associations, validation, calculations and routines that should be executed before and after save, update or destroy operation and nearly encapsulated in get model.

Controllers. It is the controller’s job to fill with requests coma like processing server variables and formatting data, asking the model for information, and sending information back to the model to be saved in the database. It sets up variables to be used in the view, and then proceeds to render or redirect to another action after processing is complete. 

Controllers typically manage a single area of an application. For example, in a recipe application, you probably have a controller just for managing recipes. Inside the recipes controller, you can define what are called actions. Actions describe what a controller can do. If you want to be able to create, read coma update and delete recipes, you create appropriately named actions in the recipe’s controller.

When a request comes into a controller, it uses a URL parameter to identify the action to execute; And when it is done, it’s sensory response to the browser. Their response is what you look at next.
Views. The view layer in the MVC forms the visible part of the application. In rails, views are the templates that (most of the time) contain HTML markup to be rendered in a browser. It’s important to note that views are meant to be free of all but the simplest programming logic. Any direct interaction with the model layer it should be delegated to the controller layer, to keep the view clean and decouple from the applications business logic.

active_record: a library that handles database abstraction and interaction.

Action view: a templating system that generates the HTML documents the visitor gets back as a result of a request to a rails application.
Action controller: a library for manipulating both application flow and the data coming from the database on its way to being displayed in a view. New lane these libraries can be used independently of rails one of another. Together, they form the rails MVC development stack.
Rails is modular. One of the greatest features of rails is that it was built with modularity in mind from the ground up. Although many developers appreciate the fact that they get a full stack, you may have your own preferences in libraries.

In the real world, specifications above as we learn how real users interact with our web applications.

Chapter 3, goes to explain how is the rails architecture distributed, what are the files inside of each folder, how to start writing our first migration, execute it, how to add validations to the model, add more fields to the model, and also, how to rollback a migration in case you make a mistake or you did not add something important, it is always reversible.

Chapter 4, explains why Ruby is dynamic, how you can use the IRB prompt, what are the Ruby data types such as string, numbers, symbols, arrays and hashes. what are variables, what are they for, and they need do not specify a data type for the variable or the find it in your code before you use it. What are the best practices for naming variables, in this case long and descriptive. Blocks and iterators, comments, control structures, methods. And finally, a brief introduction to object-oriented programming, objects and classes.

A key feature of active record which maps table to classes, table rows to object, and table columns to object attributes. This practice is commonly known as object relational mapping (ORM).

rails db:system:change -Which makes it easy to switch databases.
Active Record provides the link between these classes and your tables, allowing you to work with what look like regular objects, which, in turn, can be persisted to the database. This frees you from having to write low level SQL to talk to the database.

Object oriented programming is all about objects. You create a class that encapsulates all the logic required to create an object, along with its properties and attributes, and use the class to produce new objects, each of which is in unique instance, distinct from other objects of the same class. That means sound a little abstract (and with good reason abstraction, after all, is the name of the game) but if it helps you can think of a class as being an object factory.

Classes are used to create objects, and objects have attributes. Every object has a unique set of attributes different from other objects of the same class.

A return of nil always represents nothing.

The new constructor creates a new object, but it is your responsibility to save it. If you forget to save the object, it will never be written to the database.

To summarize, when you want to create a new object and save it manually, use the new constructor; When you want to create and save in one operation, use create.

update_attributes is an instance variable if you want to update attributes in just one operation.

The following call works for deleting or what’s inside the array Article.delete([1, 2, 3])

The primary way in which you enhance models is by adding methods to them. This is referred to as adding domain logic. With active record, all the logic for a particular table is contained in one place that model. This is why the model is set to encapsulate all the domain logic. This logic includes access rules, validations, relationships, and well, just about anything else you feel like adding.

user.build_profile(attributes={})  Returns a new profile object that has been instantiated with attributes and linked to user through a foreign key but has not yet been saved.

user.create_profile(attributes={})  Returns a new profile object that has been instantiated with attributes and linked to user through a foreign key that has already been saved.

Their rule of thumb is that belongs_to declaration always go in the class with the foreign key

rails db:setup Command recreates the database and adds the seat data as you may expect.

Whenever you want to add a validation error to the list of errors, you just type errors.add(column_name, error_message).

<div><img src='/../graphics/projects/beginning_rails_6.jpeg' alt='beginning_rails' style="width:300px;"/></div>

Action Controller. Orchestrate your applications flow. Every time a user requests a page, submits a form, or clicks a link, that request is handled in one way or another by a controller.

A typical controller is most often a collection of actions that relates to a specific area of concern. For example, consider the blog application you have been building in the previous chapters. The controller that manages articles has the class name articles controller and has action methods for listing, creating, updating, reading, and deleting articles.

The controller looks for a view whose name matches they requested name action.

Action View. this library is another important part of action pack. Given that controllers are responsible for handling the request and issuing a response, views are responsible for rendering the output of a response in a way a browser or any other user agent can understand. The primary mechanism by which they do is through shared variables. All instance variables that you may see in a view comes from the controller; look at the view is not handling any logic to fetch the list of these articles.
Action Pack. routing salt this problem by decoupling the URL from the underlying program implementation.

Request cycle

Then type request to response process is called the action pack request cycle. They request cycle consists of the following steps:
Rails receives a request from the outside world (usually a browser).
routing picks apart the request to determine the controller and action to invoke.

A new controller object is instantiated, and an action method is called.
The controller interacts with the model (usually performing a CRUD operation in a database with an Active Record model, but not necessarily).
A response is sent back to the browser, in the form of either a render or a red direct.

HTTP verbs

The HTTP protocol defines several request methods, the most popular of which art GET and POST. Both our method for requesting a webpage; The differences in how the request is sent. GET is the simpler of the two period it includes all the information about the request as a part of the URL. POST sends information in visibly, which is to say as a part of the request header and not part of the URL so you cannot type a post request into your browser’s locations bar.

How do you know when to use each? The best way to think of this is to consider GET high as read method. It should never do anything destructive, such as modifying a database record. POST, on the other hand, can be thought of as a writer method. When you need to create data, use POST. PATCH is used when you need to update a record partially, for instance, only changing your e-mail address. PUT is used to update a record completely.

Most of the time, our controllers handle interactions with a collection of things, so we reflected by using a plural name.

Comments are interesting because they are a little different from our other models so far. Comments depend on a particular article; They never exist on their own because they are conceptually meaningless if they are not tight to an article.

Remember that you always have the article_id in your parameters because it is always included in your nested name routes.
Also notice how you find they assign comment you do so using @article.comments.

HTTP is a stateless so how can the application remember you are logged in if HTTP is a stateless? The answer is that you fake state with session object. Example: session[:account_id] = @account.id.

Notice that you define session as a resource and not resources, because you never deal a set of sessions at once.

The rule of thumb is that whenever you have data that are provided by the user, you cannot trust them blindly . You need to escape it. This includes model attributes as well ask parameters. Fortunately, railes escapes all rendered as strings for you.

html_safe method skips the HTML escaping process.

simple_fromat method Convert text to HTML using simple formatting rules.
The chapters of Active Storage, how to implement Ajax (was implemented for creating and deleting comments, interacted with the DOM with a .js file where all the code for doing this was placed) and sending and receiving email (Action Mailer and Action Mailbox) is difficult to describe but overall those chapters are pretty neat, I’d say more than https://guides.rubyonrails.org/.

Active Job chapter covers the configuration, the creation, the exception handling, retry, discard and finally it has a benchmark exercise where the perform_later method on the mail delivery improved significantly the app performance.

This is the first time I faced Active Model, before this one I didn’t know it existed, the book take that module to build an EmailAFriend without the need to create the whole model as Article for example and with all the benefits a model implies, Active Record, callbacks, validations, attributes and so on.

The Action Cable chapter is short, explains how HTTP is the normal way the web works, then how web sockets were introduced as a bidirectional server communication and after that it just lays out the four main concepts as connections, channels, streams, broadcasting, subscription and so on, it configures it and apply the broadcast to Article so every time one article is published it will appear at the top without refreshing and start the cycle from the beginning.

The last 3 chapters covers testing, internationalization and the upload to Heroku, the first on them emphasize the importance of always test after each small change, and why the didn’t apply test to follow along, they bring up the technical debt, refactoring. what tools are outside to automate the testing like Unit::Test, fixtures, validations and lastly the 4 types of tests, for models, for controllers, mailers and system, it doesn’t go deep into the weeds, it only explain what they are.
