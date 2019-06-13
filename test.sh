#!/usr/bin/bash

cat feed | rchunk -b '// ACCOUNT' -e '// ACCOUNT' -f ./tmp
