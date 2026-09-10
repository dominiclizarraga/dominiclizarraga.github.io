---
categories:
  - book
layout: book
date: 2026-09-10
title: "Natural Language Processing in Action: Understanding, analyzing, and generating text with Python"
publisher: Manning
published: "2019"
author: Hobson Lane, Cole Howard & Hannes Max Hapke
isbn13: "9781617294631"
isbn: "9781617294631"
---

Currently reading. Notes in progress.

## Notes

<!-- Start writing your notes here. -->

This book is divided in 3 parts and it assumes you already know Python. It does contain code snippets and exercises we can run in our machines.

Part I is a brief introduction to classic NLP, like doing each step at the time, going from English sentence, tokenize them, then vectorize and lastly apply topic vectors in order to compress those numerical representations. This is useful for semantic search to chatbots.

Part II starts using some Neural Networks and more modern algorithm like backpropagation and libraries like `Word2Vec` the type of NN (neural network are presented in the book are CNN and RNN).

Part III is meant for building a real project using most modern NLP.

Chapter 1.

In this chapter the book goes over what really is NLP, difference of "natural language" vs "programming language" and incrementally we add more tools to build our chatbot.

Natural language is used for communicate each other, it doesn't need an interpreter/compiler, it doesn't process math operations like a Programming language does. However we need to process Natural language in a way that computer can understand so that it act on those statements or even reply to them, we need to make those statements into data (numbers).

> A natural language processing system is often referred to as a
pipeline because it usually involves several stages, where input is natural languge and a processed output flows out.

> The size of the actual natural language content currently
online must exceed 100 billion gigabytes.

> Natural languages can’t be directly translated into a precise set of mathematical operations, but they do contain information and instructions that can be extracted.

The math.

>Processing natural language to extract useful information can be difficult. It requires tedious statistical bookkeeping, but that’s what machines are for.

> Once you extract structured numerical data, vectors, from natural language, you can take advantage of all the tools of mathematics and machine learning. 

> We use the same linear algebra tricks as the projection of 3D objects onto a 2D computer screen, allowing computers to interpret and store the “meaning” of statements rather than just word or character counts. Semantic analysis, along with statistics, can help resolve the ambiguity of natural language.

Here is another challenge for computer to understand Natural language and it's "decoding" which is having the current context when a phrase is said. Like when someone says: "Good morning." What makes a morining good? What about noons and afternoons?

> This degree of compression is still out of reach for machines.

Language through a computer’s “eyes”

> When you type “Good Morn’n Rosa,” a computer sees only “01000111 01101111
01101111 …”. How can you program a chatbot to respond to this binary stream
intelligently?

