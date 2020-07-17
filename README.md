# shortlink

> omg this actually works

## What is this?

Did you know that there is an HTML meta tag that you can use to redirect traffic

```html
<meta http-equiv="refresh" content="0; URL='$URL'" />
```

It turns out you can build an entire URL shortening service with nothing but GitHub!

## Setup

Fork this repo.

Edit the action in `.github/workflows` to add a CNAME to your own domain, or remove that line
entirely to use `username.github.io/shortlink`.

Setup Actions and gh-pages.

Add and edit short url links by editing the files in the `/links` directory.
