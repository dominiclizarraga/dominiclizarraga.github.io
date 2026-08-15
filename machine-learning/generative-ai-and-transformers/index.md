---
layout: default
title: Generative AI and Transformers Notes
permalink: /machine-learning/generative-ai-and-transformers/
description: 'Transformers, RAG, agents, and modern generative AI'
---

<strong style="margin-top:-1rem;">Understanding the architectures behind modern generative AI.</strong>

<div class='writing nu'>
  {% for post in site.categories.generative-ai-and-transformers %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>
