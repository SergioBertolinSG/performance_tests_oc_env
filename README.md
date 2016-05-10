# Environment for running a performance comparison between owncloud versions
**Sergio Bertolín 2016 for ownCloud team week.**

Requirements: 

Since it takes advantage of virtual machines and provisioning tools, it should work on windows and linux. But I've tested and used it on OS X(El capitan).

- vagrant, a recent version. I'm using 1.8.1 with a plugin for checking guest additions: https://github.com/dotless-de/vagrant-vbguest .
- ansible, a recent version. I'm using ansible 2.0.0 from pip.
- virtualbox. I'm using version 5.0.16.

For starting just do:

```
vagrant up
```
Choose the network adapter to have a bridge connection.
If you need to run ansible provision just do:

```
vagrant provision`
```

To enter the machine do:

```
vagrant ssh
```

When finished testing do:

```
vagrant halt
```

And if you want to get rid of all the VM data do:

```
vagrant destroy
```

After that you could create and provision the machine from the beginning like if nothing ever happened.


### Running Tests
Get the local network ip address of your VM.

Using browser go to http://your_localnetwork_ip_address/performance_server/

To run tests just choose a tag and click on run tests button. It will take few minutes.
Run tests again against a different version of owncloud.

Now when you open the dropdowns you'll see two results files. Choose them and click on compare to see the comparison.

