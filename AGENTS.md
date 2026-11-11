# Maintaining the WillItPlug integration

This repository distributes the official skill and MCP client configuration. The hosted
service and its API are documented at https://www.willitplug.com/developers/.

- Keep `plugin.json` and `mcp.json` valid against their declared Agent Plugins schemas.
- Update the workflow in `skills/willitplug/SKILL.md` when tool names or public contracts change.
- Treat country codes as device-origin and destination inputs; a traveller's nationality
  does not establish where their devices were bought.
- Keep voltage conversion separate from physical plug fit. Preserve sources and warnings.
- Run `node scripts/check.mjs --offline` for package changes and `node scripts/check.mjs`
  before a release to verify the hosted MCP contract.
- Publish only integration instructions and public service configuration. Credentials are
  supplied by neither this package nor the service.
