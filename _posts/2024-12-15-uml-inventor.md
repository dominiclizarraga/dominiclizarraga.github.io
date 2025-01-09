---
title: UML inventor interview (Grady Booch) | notes
categories: blog
layout: post
---
[Full interview](https://www.youtube.com/watch?v=u7WaC429YcU&t=1144s)

[UML](https://en.wikipedia.org/wiki/Unified_Modeling_Language) creator defines UML as reason tool, not coding! Also invented object oriented analysis and design.

IBM fellow is a distinguished role where he seeks to do improvements for the next 5-10 years, as Alan Kay said: The best way to predict the future is to invent it.

He was after automating discovery patterns in legacy code way before LLM’s (didn’t continue the project).

The moment you write a code it becomes “legacy” until you throw it away, even when it’s very small, it has a cost, has to be maintainable, tech debt, etc.

~60s IRS population increased and paperwork was too much that was not able to be done by hand so a new process of automation with Fortran came (they used to close earlier in order to reconcile accounts) that code is still running, mostly business rules plus the government still issuing more rules YOY.

Complex systems started with the defense department ([SAGE](https://en.wikipedia.org/wiki/Semi-Automatic_Ground_Environment) 50s-80s) before satellites and radars, around this time NATO was created and they aimed to fix this problem. (Golden age of software)

The premise back in the day was to build monolith systems that were sustainable over time with algorithmic languages (Cobol, Fortran).

The transition from monoliths to distributed systems initially with [DARPA](https://en.wikipedia.org/wiki/DARPA) was funded by the government and having an email was pretty difficult only a thousand people had.

The issue started to be more noticeable when they wanted to scale the system with algorithmic decomposition, they needed software that work in a variety of computers, multi-lingual, distributed and real time.

Late 70s [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk) arose and the government had an issue that all their systems were using different languages so they wanted to unify them to only one, which was [Ada](https://en.wikipedia.org/wiki/Ada_(programming_language)).

Ada was far ahead of its time, it used the ideas of abstract data types, which was extremely new back in the day.

This new Ada wave brought the [Booch method](https://en.wikipedia.org/wiki/Booch_method) (1979) this is the 2nd golden era of software where they dealt with system distributed problems not only algorithms.

Grady came up with the Booch method by reading many sources but one that caught his attention was Plato and his quote “how one should best see the world? As processes or as atoms” the latter was more inclined to OOP (classes and objects, behavior). (among other philosophical sources)

~1950 subroutines were considered a bad practice/controversial because doing a function call added 2 or 3 more instructions, now is seen normal, this was before the Booch method and thinking in classes and objects, now we take that for granted!

The goal of UML was to look at the software from multiple points of view.

Before data orientation, people who write COBOL used to print every day a document called “common data” as a matter of practice not due to language so that the whole team had the abstractions on a daily basis.

Grady and his partners after spending some years in defense they moved to commercial space and built [ROSE](https://en.wikipedia.org/wiki/IBM_Rational_Rose) which helped the teams to write UML diagrams easily, only as a design tool.

The market then asked “now we have an arpanet and these personal computers, how do we keep building software?”  and that was the time that the concept of “use-cases” was conceived, it was very strange to look through it back in the day.

UML helped people along Microsoft VScode to drive more complex software because now they have these two that most people can use and write code depicting entities relationships responsibilities and that increase the complexity on the systems (maybe LLM will enable us to develop more complex software?)

After the.com hype people realized that the companies or products that were developed we're not economically sustainable (maybe all the microapps we currently have?)

Why u m l is not longer used in modern software?

Grady's outlooks

1. Big companies have exposed their apis therefore there is no much architectural thinking and company keeps building on top of it 
2. Startups for instance they just built with others people money and if it fails it doesn't matter so I don't have formality I just want to build something 
3. Another example if I build an airplane software I want more discipline and I want more ceremony so uml is going to be part of
4. Also if I'm building a defense software and someone may die i want formality
5. Also if I'm going to build something that people have built in the past again and again I don't need uml for instance the users profiles or liking a post I just prompted the LLM 
6. On the other hand if I'm going to build something that I have never seen before something really complex that's the sweet spot for UML
7. James Webb space telescope uses UML.

Economicals on software has changed, back in the day a computer was more expensive than a human so you have to spend more time thinking about the algorithm before trying it out now that has changed and you take that for granted but the competitional resources were very scarce

Regarding the role of software architect: “All architecture is designed but to all design is architecture” It represents significant design decisions that shape the form and shape of the system where significant is measured by cost of change.

The above paragraph reminded me of:

“Successful (working) but undesigned applications carry the seeds of their own destruction; they are easy to write, but gradually become impossible to change.”
― Sandi Metz

The entire history of software engineering is rising levels of  abstraction, and that's what we are currently seeing at very high level of abstraction that does not require any more the system decision which back in the day was bread and butter

Now the decisions that have to be made are what cloud service I use? What message system do I use or what platform? Which are economic decisions, should I use AWS for this?

A very interesting comment from Grady was that if you are a startup you're going to hire someone who has done this before because they know the caveats of these new “architectural decision” in this case let's say AWS because this guy has work on it before and he already knows it's limitations and how far it can go, the costs and so forth therefore they can accelerate your development because they have more expertise on this and now these are “systemic decisions” because they have economic impact (even on the long term)

Another bite from Grady Regarding why migrations are very hard to carry out  is that you aim to build economically feasible software but technology is changing out of you so you that makes you think that you need to change either a new framework or where is the background jobs for the calculations being done either on the server or the mobile for instance

“The code is is the truth but the code is not the whole truth” this quote again is for design decisions and sits around that you cannot just focus on what's the best approach to this problem where is the most optimized solution for this because it involves hardware and even society, even culture.

A comparable change in history like that recent AI has brought can be when software went from being developed just to one monolith across different computers like a distributed systems systems,  that forced us to rethink how we design systems because now you are able to have it either on your mobile or your PC (lates 70s)

By this time many changes came for instance [time-sharing](https://en.wikipedia.org/wiki/Time-sharing), [whirlwind computers](https://timeline.ll.mit.edu/timeline/) then mini computers (digital) with help of semiconductors.

The rise of distributed systems can be like new LLMS.
The perfect storm for AI was having Andrew NG discovering that the matrix multiplication that the NVIDIA GPU us were doing for more realistic game development was the ones that they need for deep learning 

Grady’s take on LLM: based on his vast experience on AI and now that he has 6 years researching the brain and its parts, he concludes that LLMs are unreliable narrators based on their architecture, they allow us to build scale bullshit generators, like stochastic parrots. The result is coherent though.

We are not going to hit AGI by scaling.

For new folks joining the market: -You will always need people to make informed decisions, tools change, it’s another level of abstraction.

Find a place yourself where no one else is there and make your name there. There are plenty of spaces in the computer field, lastly have fun!

[Books recommendations](https://www.amazon.com/Software-Architecture-Perspectives-Emerging-Discipline/dp/0131829572)
