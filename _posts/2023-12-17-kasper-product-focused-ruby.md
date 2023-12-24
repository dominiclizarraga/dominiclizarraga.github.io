---
title: Product Focused Ruby - Kasper Timm Hansen.
categories: blog
layout: post
---

**Sketching and mental model of programming.**

I recently attended a live session with Kasper Timm Hansen, he unfolded his approach to product-focused development, blending technical prowess with real-world problem solving.

1st session notes:

1.- Have a problem definition.

2.- In a rails context, start with a controller and start figuring out how to pass stuff to the view (it will give you a lot of constraints already).

3.- Then sketch stuff out like write methods that reflect "complete" and "uncomplete" (for a Todo app and task feature), don't focus on assigning instance variables, inheritance of the controller (you save this for later).

4.- At this point we have how routes are going to be. What are going to be the "resources" are they going to be nested?

<p style="text-align: center;">We have figured out the organizational stuff around things. So now we know how to put into business logic and complete it.</p>

5.- Take a break from it like an outside view of like, okay, can I name this differently because.

<p style="text-align: center;">If the problem definition has a known unknown that would be one thing to start tackling, or it can help reveal unknown unknowns. And and then figure out, if it's something involved with like TCP connections, and we haven't worked with those before.</p>

<p style="text-align: center;">Use method like you know how they work to keep sketching things out (Inheritance from ApplicationController or RESTful methods).</p>

6.- Delineate between what's the feature, and what's the architecture? User model would be architecture and User::Invite would be the feature.

2nd session notes (more hands-on):

1.- At the very start of the feature cycle, what you essentially do is a deep dive. You try to keep going for about half an hour, maybe an hour, if you have something really good going or if you're just trying to fire off ideas.

2.- Try to take full advantage of the fact that Ruby reads somewhat like pseudocode. It's a case of 'first thought, best thought', allowing for a more rapid-fire approach.

3.- What you actually want is to quickly formulate a hypothesis. Figure out how to disprove or prove it, at least, and then keep making rapid changes.



