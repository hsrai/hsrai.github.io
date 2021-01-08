# Way to visit remote server

You need to read these instructions very carefully, and apply in laboratory
session.

## Information you needed

During this SDT, you will work on a remote GNU/Linux server. You must
know the server's name, your user ID, password and the port number, which
allow you to connect the server. This needed information is tabulated below:

| Item | Value |
|:--- |:--- |
| GNU/Linux Server | code.gndec.ac.in  |
| User ID | YourIDtoAccessInternertAtGNEortoLoginToGuru |
| Password | YourPassWordtoAccessInternertAtGNEortoLoginToGuru |
| Port | 22 |

## How to access remote server

Install BitVise SSH Client by downloading [https://www.bitvise.com/ssh-client-download](https://www.bitvise.com/ssh-client-download), and executing downloaded file.

Launch `BitVise SSH Client`, use your userID, `code.gndec.ac.in` as Host name, and `22`
as port to connect remote server. Click on button [ Log in].

If you connect first time, you need to accept and save identity of Server.

Enter password and click [ Ok ].

After this, once connection established (make sure Internet is working, and
there is not typing error/mistake). You will be connected to remote server, if you
are authorised, and you entered correct information.

Bottom left, [ Log in ] buttin will change to [ Log out ].

Click 3rd icon on left side, which reads `New terminal console`, you are connected to 
remote server, you will be presented a big black rectangular
area, in which there is a small solid rectangle (of the size of a single
character), after some text like `hsrai@ubuntu:~$ `, where `hsrai` is user on remote
server named `ubuntu`, like:

	Welcome to Coding Server maintained by
	Computer Centre of GNDEC, Ludhiana,
	Specifically for the students of
	1st year for their course:
	=================================
 	
	  Programming for Problem Solving
	  
	=================================
	To know how to work, read:
	
	 https://coe-gne.github.io/PPS/index.html or
	 http://gdy.club/ppp
	 
	hsrai@ubuntu:~$ 

It will display something about itself, and may include some welcome
message. The above message is the sample, The message, you get may be different.

At the position of cursor (Solid Rectangle), you may type from keyboard. 
Type following command.

	hsrai@ubuntu:~$ ls

`hsai@ubuntu:~` will be there already, and you need to type only:

	ls

You will see list of files and directories, in your `home` at `remote server`.

Now you have entered in to a remote server. That may be a computer on
network, physically placed on the same table, or may in Canada, Europe, or
USA. That may be an old machine or may be a super computer.

If you are able to do this, then pat yourself. You have reached first
destination. But interesting journey yet to come!

Wait for next instruction to build a nice website.
