---
title: Action policy gem + Cache
categories: blog
layout: post
---

Recently I worked with an app that was using Action Policy, I noticed that those policies were being called almost everywhere! So I started a small research and found that there was a section for cache authorizations.

Let's dive in with Redis and how policies are saved in memory.

Here are the official (docs)[https://actionpolicy.evilmartians.io/#/caching] for combinig action policy + cache.