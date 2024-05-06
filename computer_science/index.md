---
layout: default
title: Computer Science Notes
permalink: /computer_science/
description: 'Your collection of Computer Science notes'
---

<h3 style="color:rgb(54, 54, 59);margin-bottom:1.5rem;">These are the notes I'm taking along with my Computer Science lessons.</h3>

<div class='writing nu'>
  {% for post in site.categories.computer_science %}
    <div><a title='#{{ forloop.rindex }}' href='{{ post.url }}'>{{ post.title }}</a></div>
    <time>{{ post.date | date: "%Y-%m-%d" }}</time>
  {% endfor %}
</div>