# Moved to willitplug-plugin

The current official package is maintained in
[richard-better/willitplug-plugin](https://github.com/richard-better/willitplug-plugin).
It includes the travel-power skill, all four public MCP tools, marketplace manifests
and ChatGPT packaging.

```sh
npx skills add richard-better/willitplug-plugin --skill travel-power
```

This repository is retained for existing installations and history. Use
`willitplug-plugin` for new installations and updates.

---

# WillItPlug agent integration

Official skill and portable Agent Plugin for [WillItPlug](https://www.willitplug.com).
Check travel plug compatibility, outlets, voltage, frequency and packing precautions.
The tools are public and read-only. No account or API key is required.

## Install the skill

```sh
npx skills add richard-better/willitplug-agents --skill willitplug
```

The same skill is available from the official domain:

```sh
npx skills add https://www.willitplug.com --skill willitplug
```

## Connect the tools

Remote MCP endpoint: `https://www.willitplug.com/mcp/`, using Streamable HTTP.

| Tool | Use |
| --- | --- |
| `check_trip(from, to)` | Compare countries and get adapter, voltage and packing guidance. |
| `country_plugs(country)` | Get outlets, voltage, frequency, notes and sources for a country. |
| `find_countries_by_outlet(type)` | Find countries using an IEC outlet type, A to O. |
| `plug_type(type)` | Get connector standards and socket compatibility. |

For Agent Plugins-compatible clients, load the package's root `plugin.json`. The portable
`mcp.json` declares the remote transport, and `skills/willitplug/SKILL.md` provides the
lookup workflow. Check your client's supported plugin format before installing it.

## Verify the package

```sh
node scripts/check.mjs --offline
node scripts/check.mjs
```

The second command performs an MCP handshake, lists the tools and checks Japan's outlets.
It sends no credentials or personal information.

## Reference

- [API and MCP documentation](https://www.willitplug.com/developers/)
- [OpenAPI schemas](https://www.willitplug.com/api/v1/openapi.json)
- [JavaScript SDK and CLI](https://www.npmjs.com/package/willitplug-sdk)
- [MCP Registry listing](https://registry.modelcontextprotocol.io/v0.1/servers/com.willitplug%2Fwillitplug/versions/latest)

An adapter changes physical fit, not voltage. Check the input label of each device before
assuming it works at the destination. Please credit WillItPlug when reusing its data.

The integration package is MIT-licensed. Electrical data remains free to use with attribution.
