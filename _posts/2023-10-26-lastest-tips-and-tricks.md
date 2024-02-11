---
title: Latest tips & tricks | Ruby & Rails
categories: blog
layout: post
---

#### First `filter` then `map`

When you first filter a collection, you're reducing its size by selecting only the elements that meet a certain condition. This step inherently decreases the number of items that will subsequently be processed by the map operation. 

Imagine you have an array of user records, and you're only interested in processing active users with an age above 18, where the processing involves a complex calculation.

```ruby
users = User.all
active_adult_users = users.filter { |user| user.active? && user.age > 18 }
processed_users = active_adult_users.map { |user| complex_calculation(user) }
```

In this case, filtering out inactive users or those under 18 before applying the complex calculation minimizes the number of calculations, thus improving the performance.

If you were to map first and then filter, every element in the collection, this means potentially performing a lot of unnecessary work.

Remember: [.select](https://rubyapi.org/3.3/o/enumerable#method-i-select), [.filter](https://rubyapi.org/3.3/o/enumerable#method-i-filter) and [find_all](https://rubyapi.org/3.3/o/enumerable#method-i-find_all) are Enumerable methods that do the same thing!

Similar methods are [.collect](https://rubyapi.org/3.3/o/enumerable#method-i-collect) and [.map](https://rubyapi.org/3.3/o/enumerable#method-i-map)!

<hr style="height: 4px; border-width: 0; color: gray; background-color: blue; opacity: 0.5;"/>

#### `filter_map` vs `filter` + `map`

The `filter_map` method iterates over an enumerable, applying a block to each element.

This approach eliminates the need to iterate over a collection twice (once for filtering and once for mapping).

Performance Benefits

`filter_map` is more efficient than using `filter` and `map` separately because:

- It reduces the number of iterations over the collection to just one.
- It avoids creating an intermediate array that would result from the first operation (filter or map) before passing it to the second operation.

```ruby
fruits = ['apple', 'pear', 'banana', 'cherry', nil, 'fig', 'grape']

uppercase_fruits = fruits.filter_map { |fruit| fruit.upcase if fruit&.length > 4 }

puts uppercase_fruits # Output: ["APPLE", "BANANA", "CHERRY", "GRAPE"]
```

With both methods separate `filter` + `map`

```ruby
fruits = ['apple', 'pear', 'banana', 'cherry', nil, 'fig', 'grape']

# First, filter out the fruits with more than 4 letters, excluding nil values
filtered_fruits = fruits.filter { |fruit| fruit&.length > 4 }

# Then, map the filtered fruits to uppercase
uppercase_fruits = filtered_fruits.map(&:upcase)

puts uppercase_fruits # Output: ["APPLE", "BANANA", "CHERRY", "GRAPE"]

```

<hr style="height: 4px; border-width: 0; color: gray; background-color: blue; opacity: 0.5;"/>

#### find_each vs all + each

When dealing with ActiveRecord objects, understanding the difference between find_each and using all followed by each is crucial for optimizing database interactions and memory usage.

Using `all` followed by `each` is a straightforward way to iterate over a collection of records from the database. `all` retrieves all the records and loads them into memory, and `each` then iterates over these records one by one.

```ruby
Student.all.each do |student|
  puts student.name
end
```
Things to consider:

- Memory Usage: If the students table contains a large number of records, loading all of them with all can consume a significant amount of memory,

`find_each`

`find_each` is specifically designed to manage memory consumption and efficiency when processing large numbers of records. Instead of loading all records into memory at once, `find_each` retrieves and loads records in batches, processing each batch before moving on to the next. <strong>By default, the batch size is 1000 records, but you can specify a different batch size if needed.</strong>

```ruby
# Students records are proccesed in batches of 100, significantly reducing memory usage.
Student.find_each(batch_size: 100) do |student|
  puts student.name 
end
```
`find_each` has different options to apply [more details.](https://api.rubyonrails.org/classes/ActiveRecord/Batches.html#method-i-find_each)

```ruby
Student.find_each(batch_size: 200, start: 1000, finish: 5000, order: :desc, error_on_ignore: true) do |student|
  # Your processing logic here
end
```

<hr style="height: 4px; border-width: 0; color: gray; background-color: blue; opacity: 0.5;"/>

#### .count vs .length vs .size

<strong>`count`</strong> directly translates to a `SELECT COUNT(*) SQL` query against the database. It asks the database to count the number of entries that match the query and does not load the objects into memory. This makes it very efficient for large datasets.

Every time you call `count`, it performs a database query, which could be a downside if called repeatedly without a need for real-time accuracy. It will make an SQL COUNT regardless of the state of the collection in memory. [(See this article to know how to tackle `count` efficiently)](https://dominiclizarraga.github.io/2024/01/22/when-you-see-the-count.html)

```ruby
book = Book.first
# Book Load ...
book.comments.load
# Comment Load (0.3ms) SELECT "comments".* FROM "comments" WHERE "comments"."book_id" = $1 [["book_id", 1]]
book.comments.count
# Comment Count (0.5ms) SELECT COUNT(*) FROM "comments" WHERE "comments"."book_id" = $1 [["book_id", 1]]
```

<strong>`length`</strong> loads the entire collection of objects into memory and then counts the number of elements. This can be memory-intensive for large datasets because it initializes all the objects. It does not trigger an extra database query if the collection is already loaded.

`ActiveRecord` loads the comments from the database (if they haven't been loaded already) to count them. The count is done by Ruby in memory after loading the records.

```ruby
blogpost = BlogPost.first
# BlogPost Load ...
blogpost.comments.to_a 
# Comment Load (0.2ms) SELECT "comments".* FROM "comments" WHERE "comments"."blog_post_id" = $1 [["blog_post_id", 1]]
 [["blog_post_id", 1]]
blogpost.comments.length
# (no additional database query is executed, comments are already loaded into memory.)
```

<strong>size</strong> combines the behaviors of both `count` and `length`. If the collection has already been loaded, size will calculate the number of elements in-memory, avoiding a database query. 

If the collection has not been loaded, it will perform a `SELECT COUNT(*) query`, similar to `count`.

When a counter cache is implemented, `.size` uses the cached value for the count, eliminating the need for database queries to count the records.

With data loaded:
```ruby
# `size` if loaded, calculates the length with Ruby
blogpost = BlogPost.first
# BlogPost Load ...
blogpost.comments.load
# Comment Load (0.5ms) SELECT "comments".* FROM "comments" WHERE "comments"."blog_post_id" = $1 [["blog_post_id", 1]]
puts blogpost.comments.size
# (no db hit) - Uses Ruby to calculate the size from the loaded collection
```

Without data loaded:
```ruby
# `size` if not loaded, performs an SQL COUNT query
blogpost = BlogPost.first
# BlogPost Load ...
puts blogpost.comments.size
# Comment Count (0.4ms) SELECT COUNT(*) FROM "comments" WHERE "comments"."blog_post_id" = $1 [["blog_post_id", 1]]
```
With counter cache:
```ruby
# Scenario 6: `size` if there is a counter cache, uses the cached count
blogpost = BlogPost.first
# BlogPost Load ...
puts blogpost.likes.size
# (no db hit) - Uses counter cache
puts blogpost.likes.size
# (no db hit) - Uses counter cache again without additional queries
```

<hr style="height: 4px; border-width: 0; color: gray; background-color: blue; opacity: 0.5;"/>

#### sort_by vs order

<hr style="height: 4px; border-width: 0; color: gray; background-color: blue; opacity: 0.5;"/>

Try to make the calculations and queries even if they become big in controllers or models and in view just sort them in memory

<hr style="height: 4px; border-width: 0; color: gray; background-color: blue; opacity: 0.5;"/>

#### shuffle => in memory vs @model.order('random()') => in db

<hr style="height: 4px; border-width: 0; color: gray; background-color: blue; opacity: 0.5;"/>

#### any? => exist? vs present? => in memory