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


