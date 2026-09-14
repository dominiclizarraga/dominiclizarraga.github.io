---
categories:
  - book
layout: book
date: 2026-08-12
title: "Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications"
publisher: "O'Reilly Media"
published: "2022"
author: Chip Huyen
isbn13: "9781098107956"
isbn: "9781098107956"
---

overview of machine learning systems
introduction of machine learning systems
data engineering fundamentals
training data
feature engineering
model development and offline evaluation
model deployment and prediction service
data distribution shifts and monitoring
continual learning and test in production
infraestructure and tooling for MLOPS
the human side of machine learning

The preface goes over how Chip started this book which was from writing down and preparing classes for her Machine Learning students back in 2017 and how similar where the questions shed had like: 

> “What model should I use?” “How often should I retrain my model?” “How can I detect data distribution shifts?” “How do I ensure that the features used during training are consistent with the features used during inference?”

> ML systems are both complex and unique. They are complex because they consist of many different components (ML algorithms, data, business logic, evaluation metrics, underlying infrastructure, etc.) and involve many different stakeholders (data scientists, ML engineers, business leaders, users, even society at large). ML systems are unique because they are data dependent, and data varies wildly from one use case to the next.

> For example, two companies might be in the same domain (ecommerce) and have the same problem that they want ML to solve (recommender system), but their resulting ML systems can have different model architecture, use different sets of features, be evaluated on different metrics, and bring different returns on investment.