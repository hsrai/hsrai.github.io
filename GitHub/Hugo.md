
Login to [https://github.com/](https://github.com/) by entering email or userID (I assumed that ID to be `CoE-GNE`) and password (if you have not created account there, then create that first).

Visit:

[https://github.com/hsrai/www](https://github.com/hsrai/www)

On top right, you will see three buttons, namely Watch, Star and Fork. Click to `Fork` to get a copy of repositiry `www` of user `hsrai`, under your name. 

Login to remote server, as explained in Task 01, and issue following commands (Note: Replace `CoE-GNE` with your github userID).

```sh
cd
git clone https://github.com/CoE-GNE/www.git
cd www
unzip /Public/www.zip 
nano config.toml
```

At line no. 4 replace `hsrai` with your ID (say `coe`) on `code.gndec.ac.in`. After, for user `coe`, it will look like:

```sh
baseURL = "http://code.gndec.ac.in/~coe/www"
```

Save file, by pressing ctrl-x (press ctrl key, keep it holded and press x), press `y` to confirm save changes, then press ENTER is accept name of file (You may change name of file, but we  need not to do so, in the present case).

Issue following command:

```sh
hugo
```

View you website at (by replacing coe with your userID):

[http://code.gndec.ac.in/~coe/www/](http://code.gndec.ac.in/~coe/www/)

You may further explore and edit following files to reflect your content:

```sh
.
├── config.toml
├── content
│   ├── about
│   │   └── _index.md
│   ├── contact.md
│   ├── _index.md
│   └── post
│       ├── AIML.md
│       ├── _index.md
│       ├── Paper01.md
│       └── Paper02.md
```

To make the changes visible on website, you need to issue command:

```sh
hugo
```
