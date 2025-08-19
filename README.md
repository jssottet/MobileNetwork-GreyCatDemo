# 6GTWIN-GREYCAT

6GTWIN project's GreyCat implementation

## Description
GreyCat implementation of NDT Basic Model (and fonctional models) for 6GTWIN Demonstrator.
NDT basic model is inspired by the 3GPP definition.

## Installation (REVISED)
Follow GreyCat installation instruction available at: greycat.io

OR

Run `greycat install` at the root of the sources folder, to install the appropriate GreyCat version in the folder and associated libraries.     
Run `[p]npm install` at the root of the source folder to install the frontend dependencies.

To launch:     
Run `./bin/greycat serve` in one terminal to run the backend.     
Run `pnpm gen` to generate typing for your project.      
Run `pnpm dev` to launch the front in dev mode.

Note: it is necessary to run again `pmpm gen && pnpm dev` each time you change the types and/or exposed functions in your backend if you want the changes to be visible in your frontend code.
Note2: When you update the backend, it is necessary to restart for changes to take effect. If the change is structural (attribites, not just functions), you many also need to erase the gcdata folder and start new.


## Usage
Once Greycat is installed, use the run.sh script at the project's root. Simple run the script ./run.sh

## Roadmap
Next Step : Demo of a Signal Prediction according to UE locations.

## Contributing
Contribution guide not yet defined

## Authors and acknowledgment
J-S Sottet and G. Nain are main contributors
Thanks to Ayat Zaki Hindi for her help to map log on network (3GPP inspired) specification

This work done in the context of 6GTWIN project, funded by the Smart Networks and Services Joint Undertaking (SNS
JU) under the European Union’s Horizon Europe research and innovation program under Grant Agreement
No 101136314.

## License
Under definition...

## Project status
This is a proof of concept...
