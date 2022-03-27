# Create HTML Skeleton Template

To keep things simple, we will create a file directly on the server.  To do so, we will use the [`nano`](https://www.nano-editor.org/) editor.

Delete the existing default `index.html` file.  nginx adds this when first installed, we will be replacing it with our own in the next step.

Create a new `index.html` file using nano.

```bash
nano /var/www/html/index.html
```

Paste the following in by right clicking and selecting paste in the terminal.

```html
// index.html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

## Save and Exit nano

Press `Ctrl + x` to exit nano

This will trigger a prompt at the bottom that says `Save modified buffer?`.  Here you press `y` for "Yes".

It will then confirm `File Name to Write: index.html` and you must press enter to finally save the file.

## Confirm the Hello World Message Appears

Navigate to `https://helloworld.yourdomain.com` in your browser and confirm you can see the "Hello World" message.

[Prev](/00-Hello-World-Website/04-install-nginx)