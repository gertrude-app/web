help:
	echo ""; cat ./help.txt; echo ""

# local dev

storybook:
	$(CONCURRENTLY) -n rs,sb -c cyan.dim,magenta.dim "make watchsync" "make start-storybook"

marketing:
	$(CONCURRENTLY) -n rs,nx -c cyan.dim,magenta.dim "make watchsync" "make start-marketing"

dashboard:
	$(CONCURRENTLY) -n rs,sp -c cyan.dim,magenta.dim "make watchsync" "make start-dashboard"

# scaffold

component:
	node ./scripts/make-component.js $(CLI_ARGS)

# utility

sync:
	rsync -r ./components/src/shared ./dashboard/src/components
	rsync -r ./components/src/shared ./marketing/components

watchsync:
	watchexec --restart --watch ./components/src/shared --exts tsx make sync

start-storybook:
	cd components && npm run storybook

start-marketing:
	cd marketing && npm run dev

start-dashboard:
	cd dashboard && npm run start

npm-install:
	$(CONCURRENTLY) \
	-n root,comp,mark,dash \
	-c magenta.dim,yellow.dim,green.dim,cyan.dim \
	"npm i" "cd components && npm i" "cd marketing && npm i" "cd dashboard && npm i"

# helpers

CONCURRENTLY = node_modules/.bin/concurrently
CLI_ARGS = $(filter-out $@, $(MAKECMDGOALS))
ALL_CMDS = \
  sync \
  watchsync \
  storybook \
  start-storybook \
  marketing \
  start-marketing \
  npm-install \
  dashboard \
  start-dashboard \
  help \
  component

.PHONY: $(ALL_CMDS)
.SILENT: $(ALL_CMDS)

# do nothing when target doesn't match (allow passing args thru to scripts)
%:
	@:
