---
layout: default
title: Bookshelf
---

# Bookshelf ({{ site.books | size }})

Below are the books I've read over the years. (Work in progress)

{% assign books_by_year = site.books | group_by: "year_read" | sort: "name" | reverse %}

{% for year_group in books_by_year %}
  <h2>{{ year_group.name }}</h2>
  
  <div class="bookshelf-grid">
    {% for book in year_group.items %}
      <div class="book">
        <a href="{{ book.cover_url }}">
          <img src="{{ book.cover_url }}" alt="{{ book.title }} book cover">
        </a>
      </div>
    {% endfor %}
  </div>
{% endfor %}