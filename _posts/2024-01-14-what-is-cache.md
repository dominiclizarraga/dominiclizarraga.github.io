---
title: What is cache? 💵 💰
categories: blog
layout: post
---

Currently, I'm focusing on enhancing the performance of an application, and one of the key areas I've explored in-depth is caching. Although I was aware of caching before, I didn't fully grasp its concept or have the opportunity to apply it, so I never felt compelled to delve into it.

If you find yourself in a similar position, here are some initial steps to build a strong understanding of caching :)

**What is cache?**

The term ['cache' is an English word](https://dictionary.cambridge.org/us/dictionary/english/cache) meaning a secure place where items are stored and hidden. Now this concept will make more sense in computing.

Cache is a method of storing frequently accessed data in fast memory to keep it closer to the user.

This fast memory can be found either on hard drives, processors (like CPUs and GPUs) or web browser, web server, databases, client-side, CDNs and it goes from KBs to MBs and in different layers (L1, L2, etc).

In browser for example, the first time you visit a web site it will download the HTML, CSS and images then computer will save a copy of those files. The next time you visit that page, it will retrieve a local copy instead of requesting a web server, which speeds up the process.

<p style="text-align: center;">Think of a coffee shop where the barista keeps commonly used items like milk and sugar at hand, rather than going to the storage room for each order. This is like 'caching', where frequently used data is kept readily accessible. ☕️</p>

Fun fact: The concept of caching was originally proposed in 1965 by Maurice Wilkes. [Paper](https://www.historyofinformation.com/detail.php?id=834)

**When is it useful?**

There are 2 main ways so far to implement with Ruby on Rails app.

1. HTTP Caching - Web browser can cache HTTP responses to enable faster retrieval data. It improves response time and reduce load on back-end. By storing copies of frequently accessed data, caching reduces the need for repeated requests to the server, thereby enhancing overall performance and user experience. (Mostly for Static assets and JSON APIs and AJAX endpoints.)

2. This involves caching within the application itself and can be tailored to the specific needs of your Rails application. Rails provides several caching techniques like page caching, action caching, and fragment caching. 

**How to use it in rails?**

Rails has 3 ways of caching data: page, action and fragment. Each of them has different purposes.

- [Page caching](https://guides.rubyonrails.org/caching_with_rails.html#page-caching) stores the entire HTML response, serving it directly from the web server without hitting the Rails stack. 

- [Action caching](https://guides.rubyonrails.org/caching_with_rails.html#action-caching) caches the output of controller actions. 

- [Fragment caching](https://guides.rubyonrails.org/caching_with_rails.html#fragment-caching) is more granular and caches smaller pieces of a view. 

Also there are different techniques as well like Russian Doll Caching, Shared partial caching, Low-Level Caching and Key-based cache expiration.

**Extra tools you need. 🛠️**

Rails caching is designed to be backend agnostic. This means you can implement custom caching solutions or adapters for other storage mechanisms.

Redis: Advanced in-memory data store, supports complex structures, ensures data persistence, replication, and integrity.

Memcached: Efficient, simple key-value store, ideal for caching static data, quick setup.

Memory Store: Caches data in the Rails server's memory. This is a good option for single-server setups and development environments.

File Store: Caches data as files on the disk. This can be useful in environments where memory is limited.

**Is it truly beneficial for your App?**

Currently in the implementation phase, the improvements are evident on the pages where it has been applied. It is advisable to compare response times before and after implementing these changes. If feasible, establish a Maximum Average Response Time (MART) as a benchmark.

More when we complete this process!
