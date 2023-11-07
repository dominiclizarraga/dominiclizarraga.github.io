---
title: Positional vs Keyword arguments
categories: blog
layout: post
---

def send_welcome_email(name, email, signup_date)
  puts "Sending welcome email to: #{name}"
  puts "Email: #{email}"
  puts "Signed up on: #{signup_date}"
  # Code to send email would be here
end

# Array of user information
user_data = ['Jane Doe', 'jane.doe@example.com', '2023-04-01']

# Using splat to pass array elements as individual arguments
send_welcome_email(*user_data)