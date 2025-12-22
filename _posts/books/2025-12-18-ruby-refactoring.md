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