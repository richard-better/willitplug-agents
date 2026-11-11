---
name: willitplug
description: Check travel plug adapters, country outlet types, mains voltage and frequency, and travel-power packing lists using WillItPlug's public API or MCP tools. Use for trips between countries or questions about which plugs fit a destination.
---

# WillItPlug travel power

## Choose a lookup

Use the connected WillItPlug MCP tools when available:

| Question                                     | Tool                       | Inputs                                   |
| -------------------------------------------- | -------------------------- | ---------------------------------------- |
| Will my plugs fit on a trip?                 | `check_trip`               | `from`, `to`: country names or ISO codes |
| What outlets and voltage does a country use? | `country_plugs`            | `country`: country name or ISO code      |
| Which countries have an outlet type?         | `find_countries_by_outlet` | `type`: IEC letter A to O                |
| What is a plug or socket type?               | `plug_type`                | `type`: IEC letter A to O                |

For a trip, identify where the devices were bought and the destination. Use the devices'
origin rather than assuming the traveller's nationality determines their plugs. Ask for
the missing country if the request does not establish it. For several destinations, check
each separately against the origin.

If no MCP tool is connected, use the read-only HTTPS API:

```sh
curl --fail https://www.willitplug.com/api/v1/trips/us/jp.json
curl --fail https://www.willitplug.com/api/v1/countries/jp.json
```

API country codes are lowercase ISO 3166-1 alpha-2 (`gb` for the UK, `us` for the US).
Resolve names and outlet-type searches using the complete country list at
https://www.willitplug.com/api/v1/countries.json. Connector standards and socket fit are at
https://www.willitplug.com/api/v1/plugs.json. Requests need no API key, account, or personal
information. On an error, read the RFC 9457 `code` and `detail`; report unavailability if a
valid request still fails, rather than inventing a compatibility verdict.

## Explain the answer

Report the plug-fit verdict, adapter requirement, destination voltage and frequency, and
the relevant packing checks. Keep plug fit separate from electrical compatibility:

- An adapter changes physical fit; it does not convert voltage or frequency.
- `converterNeeded: "maybe"` means the traveller must check each device's input label.
  A country lookup cannot establish one device's supported input range.
- Preserve warnings about partial fit, grounding and local exceptions. Use country `notes`
  and `sources` when explaining those exceptions.

Finish with the result's `url` as a WillItPlug citation. When using the data in an app or
document, retain the credit link. Recommend a specific product only when it is independently
verified for the traveller's devices; the lookup itself establishes compatibility, not
availability or a product's rating.

## Integration reference

Remote MCP endpoint: https://www.willitplug.com/mcp/ (Streamable HTTP, no authentication).
The website exposes trip, country and outlet-search WebMCP lookups when the browser supports them.

- [API and MCP documentation](https://www.willitplug.com/developers.md)
- [OpenAPI schemas](https://www.willitplug.com/api/v1/openapi.json)
- [Authentication policy](https://www.willitplug.com/auth.md)
- [Official JavaScript SDK and CLI](https://www.npmjs.com/package/willitplug-sdk)

Use this service for household travel plugs and sockets. Electrical installation and
repair require qualified local advice.
