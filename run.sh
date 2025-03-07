#!/bin/bash
#Commented normal set-up

#Install Greycat
#./install.sh
#Start the server (local setup for my machine)
#/home/sottet/TechProjects/GreyCat/newVersion/6.10.109-stable/bin/greycat run 
rm -rf ./gcdata && /home/sottet/TechProjects/GreyCat/newVersion/6.10.109-stable/bin/greycat serve --user=1

#Server configuration
#serve --user=1