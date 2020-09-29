---
title: NuxtJS
description: Wherein Squiggs discovers that Nuxt is pretty fun to play with.
author: Squiggs
tags:
  - vue
  - nuxt
  - meta
  - evolution
  - rubik's cube
date: 2020-08-03T19:08:41.437Z
---

So I am _finally_ giving [NuxtJS](https://nuxtjs.org/) a try and it's so much easier that I thought it would be. I pretty much renamed the files and folders and that was about it. Crazy. I _did_ have to play around with the Bulma styles for awhile and I still haven't got it completely. (Styles are duplicated...)

One thing that I _have_ had to handle differently with this website of tech demos and proofs of concept is that a lot of my little apps create an initial state with some random values. Of course with static site generation, NuxtJS is getting some random values and then populating those as the initial page state every time the user refreshes the page.

I've handled this for the Evolution page by changing the way it works a bit. I made it so that all 200 _things_ start in the same spot (hopefully above the Start button). Then upon clicking the Start button, they spread out randomly. That makes the random calculations happen differently each time. However now as I'm thinking about it, the random colors and sexes are going to be the same each time, but the user can't really tell. Anyway, then the app runs the simulation automatically whereas it was a manual button click every time before. I also added a transition to the _things_ which looks pretty cool. Sometimes they warp and I can't figure out why. I'm still much happier with the way the app works now.

Unfortunately I think the Rubik's Cube was in some transitional state the last time I worked on the website (about a year ago!). It looks like I was trying to give the ability to rotate the cube. The calculations are all jacked up, though... I'll have to figure that out. Also, the random orientation of the cube is the same each time the user refreshes the page... I don't think the NuxtJS hydration works with randomness either since rotating one of the faces reveals that the actual face values are different than what is being displayed initially. It makes me wonder if the best thing to do might be something like [this](https://ruwix.com/online-puzzle-simulators/) where the cube starts out solved... Anyway, I want to get to a point where I can implement those features I had invisioned over a year ago. I'll talk about them in a future post.

TTFN
