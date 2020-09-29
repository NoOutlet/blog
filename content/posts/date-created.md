---
title: Blog post dates
description: Wherein Squiggs solves an issue with blog post dates in git-triggered static site deployment.
author: Squiggs
tags:
  - blog
  - meta
  - Vue
  - Nuxt
  - Render.com
  - git
  - copy/paste
date: 2020-08-05T16:56:45.930Z
---

[NoOutlet.net](https://nooutlet.net) is currently hosted on [Render.com](https://render.com). They offer free static site hosting and allow me to set up automatic deploys whenever I push a new commit to a private repository on [GitHub](https://github.com). This is really cool and maybe I'll make a post about it some day, but for the purposes of this blog, it caused a _complication_.

I was previously displaying the [`createdAt`](https://content.nuxtjs.org/writing) property for the date of the blog post. This pulls from the actual creation date in the file metadata. Because the files get cloned anew by Render.com each time I push a commit, the creation date was changing for all of my blog posts. This post was originally a post to test if any commit will cause all blog post files to update their created date and unfortunately they did. To solve this, I now set a `date` property in the [YAML front matter](https://content.nuxtjs.org/writing#front-matter). If the file has that property then that data is displayed; otherwise it displays the `createdAt` date and highlights in red. Then I added a feature that allows me to click the header and it will copy to the clipboard the text `date: [createdAt]` (where [createdAt] is replaced with the actual datetime). This allows me to past it directly into the front matter since it is already in YAML format.

So now I have an indication that I need to fill in that `date` property (the red text) and I have a simple method for getting that data (clicking the header and pasting into the file).
