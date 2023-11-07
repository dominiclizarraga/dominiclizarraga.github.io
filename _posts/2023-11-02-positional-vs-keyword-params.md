---
title: Positional vs Keyword arguments
categories: blog
layout: post
---

When I began programming, I was puzzled by why some parameters were named and others not. <br>
Seeing [*argument_name](https://docs.ruby-lang.org/en/3.1/syntax/methods_rdoc.html#label-Array-2FHash+Argument) or [**argument_name](https://docs.ruby-lang.org/en/3.1/syntax/methods_rdoc.html#label-Keyword+Arguments) threw me for a loop. 😳

Here you'll find the definitive guide to understand both!


## Positional arguments
```bash
# This method takes any number of user names as positional arguments. 🙋🙋‍♀️
def greet_users(*users)
  users.each { |user| puts "Hello, #{user}!" }
end

# Passing individual user names to the method, which are packed into an array.
greet_users("Alice", "Bob", "Carlos")
# Outputs:
# Hello, Alice!
# Hello, Bob!
# Hello, Carlos!

# This method can take a variable number of fruit names. 🍎🍌
def list_fruits(*fruits)
  fruits.join(', ')
end

# Passing a list of fruits to the method.
puts list_fruits("Apple", "Banana", "Cherry")
# Outputs: Apple, Banana, Cherry
```


## Keyword arguments
```bash
# Usage of ** for keyword arguments: 🙋🙋‍♀️
def greet_users(**users)
  users.each do |identifier, user_info|
    puts "Hello, #{user_info[:name]}!"
  end
end

# Passing user details as keyword arguments.
# The keys `:user1`, `:user2`, and `:user3` are identifiers for each user's hash.
greet_users(
  user1: { name: "Alice", age: 30 },
  user2: { name: "Bob", age: 22 },
  user3: { name: "Carlos", age: 25 }
)

# Outputs:
# Hello, Alice!
# Hello, Bob!
# Hello, Carlos!

# This method takes a variable number of fruit names with details. 🍎🍌
def list_fruits(**fruits_with_details)
  fruits_with_details.map { |fruit, color| "#{fruit}: #{color}" }.join(', ')
end

# Passing a hash of fruits with details to the method.
puts list_fruits(Apple: "Green", Banana: "Yellow", Cherry: "Red")
# Outputs: Apple: Green, Banana: Yellow, Cherry: Red

# More real example of user attributes as keyword arguments.🙋🙋‍♀️
def create_user_profile(**attributes)
  puts "Creating a profile for: #{attributes[:name]}"
  puts "Email: #{attributes[:email]}" if attributes[:email]
  puts "Signup Date: #{attributes[:signup_date]}" if attributes[:signup_date]
end

# Passing attributes as a hash, packed with a double splat.
create_user_profile(name: "Jane Doe", email: "jane.doe@example.com", signup_date: "2023-04-01")
# Outputs:
# Creating a profile for: Jane Doe
# Email: jane.doe@example.com
# Signup Date: 2023-04-01
```

## Passing objects 🙋🙋‍♀️

```bash
class User
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

# Create an array of User instances
users = [
  User.new("Alice"),
  User.new("Bob"),
  User.new("Carlos")
]

# Define the greet_users method to accept multiple user objects
def greet_users(*users)
  users.each { |user| puts "Hello, #{user.name}!" }
end

# Call greet_users with the array of User instances
greet_users(*users)

# Outputs:
# Hello, Alice!
# Hello, Bob!
# Hello, Carlos
```

If you already have a hash with the appropriate keys, you can pass it to the method using the double splat operator **, which will convert the hash into keyword arguments.







Docs for reference:

[*positional_argument](https://docs.ruby-lang.org/en/3.1/syntax/methods_rdoc.html#label-Array-2FHash+Argument)

[**keyword_argument](https://docs.ruby-lang.org/en/3.1/syntax/methods_rdoc.html#label-Keyword+Arguments)