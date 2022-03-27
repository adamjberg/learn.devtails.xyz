# Install nginx

The following command should be run on the server you just created on Digital Ocean.  Make sure to [SSH into your server](/posts/how-to-ssh-into-a-server) and then run within that terminal.  [`nginx`](https://www.nginx.com/resources/wiki/) is an HTTP server that will be responsible for responding with the HTML file we have created.

```bash
sudo apt-get install nginx
```

Once successfully installed, nginx will automatically start serving files out of the `/var/www/html/` folder on your remote server.  You should be able to open a browser at this point and type in the IP Address of your server.  It should display the default nginx page.

[Prev](/00-Hello-World-Website/03-how-to-configure-namecheap-dns-to-point-domain-to-digitalocean-server)

[Next](/00-Hello-World-Website/05-create-index-html)