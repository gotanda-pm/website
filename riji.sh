#!/bin/sh
git add --all .
git commit -m '*** TEMPORARY COMMIT *** FOR RIJI PUBLISH'
# and manualy `git rebase -i` and fixup and rewrite comment
cd `dirname $0`/src/riji
exec riji $@