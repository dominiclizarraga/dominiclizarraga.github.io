---
layout: default
title: Computer Science Notes
permalink: /computer_science/
description: 'Your collection of Computer Science notes'
---

<strong>
  I've committed to gaining depth in computer science, and here are the notes I'm taking along with the lessons on csprimer.com.
</strong>


<p style="color:rgb(54, 54, 59);">
  1st module: Computes Systems.
</p>

<div class='writing nu'>
  {% for post in site.categories.computer_science %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>