---
title: Computer Science Notes
permalink: /computer_science/
categories: computer_science
layout: page
---

<h3 style="color:rgb(54, 54, 59);margin-bottom:1.5rem;">These are the notes I'm taking along with my Computer Science lessons.</h3>

<div class='writing nu'>
  <ul>
    {% for post in site.categories.computer_science %}
      <li style='list-style:none;'>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span>{{ post.date | date_to_string }}</span>
      </li>
    {% endfor %}
  </ul>
</div>