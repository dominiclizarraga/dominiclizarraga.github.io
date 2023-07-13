---
title: Practicing Rails | Justin Weiss
categories: blog
layout: post
---

Introduction

It is possible to learn Rails without having the things you learn abandon you as soon as you try to grab ahold of them. 

That’s what this book is about. It’s a second book of Rails. A companion. It’ll show you how to learn the most in the least amount of time, using the resources and knowledge you already have. And in the process, I’ll guide you through some of the toughest lessons I’ve learned during my programming and Rails career.

Embrace struggle, failure, and reward. 

Learning to become a great Rails developer is hard work. And, being hard work, the only way to learn is to struggle. I’ve heard programming described as “Running into a brick wall, constantly.” So don’t worry if you feel that way – we all do.

Learning isn’t just about reading. It’s also about action. And that is why you can’t learn Rails without practicing Rails.

Chapter 1 Tiny Apps: The best way to study new Rails ideas

The best way to learn new Rails ideas and techniques is to use them. Right away. Practice them, internalize them, and make those techniques yours.


When you’re working with such small apps, you focus on the single thing you want to learn. That way, you don’t have to worry about learning that new idea inside your existing, more complicated apps.  

For example, if you’re trying to learn ActiveModel::Serializers, and your controller isn’t serializing the model correctly, you can never be sure if the problem’s a gap in your knowledge, a problem with Rails, or a problem with your app. 

If you tried this out in a tiny test app, you could be pretty sure the problem was just a simple mistake or a misunderstanding. You can catch these mistakes on a small scale before you fight the bugs that appear when you use them into a larger app.

I care about getting the most knowledge in the least amount of time, and scaffolds and other Rails code generators are a great way to do just that.

Using the console and Tests for learning.

The console is great for messing with objects, but getting those objects set up can be hard. Tests are great for getting objects set up, but hard for messing with them.

Most Rails books and videos are good at showing you what’s possible. But they can’t explain everything. Those gaps will raise questions, and you’ll naturally want to have those questions answered.

“Why does it work that way?” 
“How could this possibly work?” 
“What if I tried using it with this other idea I just learned about?”

So, when I say “play with and modify the things you learn”, I mean “Answer the questions you have about the things you learn, using code.”

<div><img src='/../graphics/projects/justin_weiss.png' alt='beginning_rails' style="width:600px;"/></div>

Chapter 2 How to build your own Rails app

This feeling is totally normal. Whenever I’m about to start a new Rails app, I still feel like I want to give up computers forever and run into the woods or something. But I have a process to share with you that will help you get past this, so you can turn your ideas into real, working apps.


When you face a large, fuzzy, overwhelming task like this, the answer is always the same: Break it apart! Break your big idea into small tasks that lead you to where you want to be. You’ll have a path you can take that, no matter what, will get you closer to finishing your app.

How do you choose the first thing to work on?

When you start a new project, try this short process to help decide which thing to work on first: Take a few minutes and think what you’re trying to build. Write down every feature that comes to mind. Think of the different paths a user could take through your application, the different things they could do. Describe each one in a single sentence. 

Then, focus on just the paths where, if you didn’t have them, your app couldn’t exist. Core paths. 

Core paths are the things you’d talk about if someone asked you to describe your app in 30 seconds.

Which part of the feature should you start with? 

Once you’re ready to build your first core path, you might feel like writing models for all the objects you have in mind. Maybe you want to create migrations, add attributes, and connect everything together. 

But soon, you’ll have a ton of pieces that may not all fit. It’ll take a long time before you can actually use your app. And if you didn’t design your models well, you’ll just have to do that work over again when you build your UI and actually start playing with your app.

So, start with UI, and infer your data model from what you see in the UI.

When you begin work on a single, small feature, start with the UI: 

1. Take the small feature, or core path, from earlier. 

2. Think of one simple thing someone could do with that feature. 

3. Draw just enough screens for that user to be able to do that thing. 

4. Describe the path through that action, as if you were telling someone what you were going to do. 

5. As you describe that path, write out the objects, properties of those objects, and other actions you think you need to develop that path.