#!/usr/bin/bash

echo -e "testing" | rchunk -b '// ACCOUNT' -e '// ACCOUNT' -f ./tmp
