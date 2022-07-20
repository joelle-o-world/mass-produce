# Mass Produce 

Run shell scripts lots of times with randomised argumentns.

## Install

```
yarn global add mass-produce
```

## Usage

Pass the command line utility a shell script:

```bash
mass-produce my-script.sh {optional: number-of-iterations}
```

In `my-script.sh` variables that match the pattern `$varying{type}{n}` will be assigned random values.

```bash
#! /bin/bash

echo "Hark! I hear a dove, singing at $varying_frequency1 Hertz!"
```


Here's a sample output:


```
> mass-produce my-script.sh 5

Found 1 varying variables
Run #0
Hark! I hear a dove, singing at 12883Hz Hertz!
End of run #0

Run #1
Hark! I hear a dove, singing at 16924Hz Hertz!
End of run #1

Run #2
Hark! I hear a dove, singing at 15472Hz Hertz!
End of run #2

Run #3
Hark! I hear a dove, singing at 962Hz Hertz!
End of run #3

Run #4
Hark! I hear a dove, singing at 13766Hz Hertz!
End of run #4
```
