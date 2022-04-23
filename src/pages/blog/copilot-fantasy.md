---
title: GitHub Copilot is a creative guy
date: 2022-04-22
isDraft: true
description: Making Copilot do weird stuff
layout: ../../layouts/PostLayout.astro
---

Recently I got the access to the [GitHub Copilot](https://copilot.github.com/) preview. Apart from not being able to use it for work for [good reasons](https://copilot.github.com/#faq-is-the-transmitted-data-secure), it has been an interesting experience so far. But this is not what I'm going to talk about in this article.

[Even more recently](https://github.com/github/feedback/discussions/8308) the Copilot team announced the Labs extension, which comes with the "language translation" feature. In short, this feature allows to transform code from the language you are writing your code in another language of choice. And yes, there are plenty. And yes, there's no restriction on the target language.

## The starting code

The code we are going to translate is a simple `gradient_descent` function taken from this [codebasics tutorial](https://youtu.be/vsWrXfO3wWw). The function is written in Python.

```python
def gradient_descent(x, y):
    m_curr = b_curr = 0
    learning_rate = 0.08
    num_iterations = 10000
    n = len(x)

    for i in range(num_iterations):
        y_predicted = m_curr * x + b_curr
        md = -(2 / n) * np.sum(x * (y - y_predicted))
        bd = -(2 / n) * np.sum(y - y_predicted)
        cost = (1 / n) * sum(val**2 for val in (y - y_predicted))
        m_curr = m_curr - learning_rate * md
        b_curr = b_curr - learning_rate * bd
        print("m {}, b {}, iteration {}, cost {}".format(m_curr, b_curr, i, cost))

    return m_curr, b_curr, cost
```
