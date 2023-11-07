---
title: Decompose for method calls
categories: blog
layout: post
---


In Ruby, it is possible to [decompose the elements](https://docs.ruby-lang.org/en/3.1/syntax/assignment_rdoc.html#label-Array+Decomposition) of arrays/hashes into distinct variables. Since values appear within arrays in a index order, they are unpacked into variables in the same order.

```bash
# Decompose of an array
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

In this case we are going to use *decompose* for a method call, <em>(with arrays only one splat needed *)</em>.

```bash
def send_welcome_email(name, email, signup_date)
  puts "Sending welcome email to: #{name}"
  puts "Email: #{email}"
  puts "Signed up on: #{signup_date}"
end

# Array of user information
user_data = ['Jane Doe', 'jane.doe@example.com', '2023-04-01']

# Using splat to pass an array of elements
send_welcome_email(*user_data) 👈

# This code will output:
Sending welcome email to: Jane Doe
Email: jane.doe@example.com
Signed up on: 2023-04-01
```

Now we are going to *decompose* for a hash, <em>(two splats needed **)</em>.


``` bash
def configure_user(profile:, preferences:, settings:)
  puts "Configuring user profile:"
  puts "Profile: #{profile}"
  puts "Preferences: #{preferences}"
  puts "Settings: #{settings}"
end

# Hash of user configuration
user_configuration = {
  profile: { username: 'johndoe', language: 'EN' },
  preferences: { theme: 'dark', notifications: true },
  settings: { privacy: 'high', location: 'off' }
}

# Using 2 splats to pass a hash
configure_user(**user_configuration) 👈

# This code will output:
Configuring user profile:
Profile: {:username=>"johndoe", :language=>"EN"}
Preferences: {:theme=>"dark", :notifications=>true}
Settings: {:privacy=>"high", :location=>"off"}
```