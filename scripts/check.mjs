import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const json = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));
const plugin = await json("plugin.json");
const config = await json("mcp.json");
assert.equal(plugin.$schema, "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json");
assert.equal(plugin.name, "willitplug");
assert.equal(config.$schema, "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json");
assert.equal(config.mcpServers.willitplug.type, "streamable-http");
assert.equal(config.mcpServers.willitplug.url, "https://www.willitplug.com/mcp/");
assert.match(await readFile(new URL("skills/willitplug/SKILL.md", root), "utf8"), /^---\nname: willitplug\n/);
if (!process.argv.includes("--offline")) {
  const call = async (method, params) => {
    const response = await fetch(config.mcpServers.willitplug.url, {
      method: "POST", signal: AbortSignal.timeout(15000),
      headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.error, undefined);
    return result.result;
  };
  assert.equal((await call("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "willitplug-integration-check", version: "1.0.0" } })).serverInfo.name, "willitplug");
  const tools = await call("tools/list", {});
  for (const name of ["check_trip", "country_plugs", "find_countries_by_outlet", "plug_type"])
    assert(tools.tools.some((tool) => tool.name === name), name);
  const result = await call("tools/call", { name: "country_plugs", arguments: { country: "jp" } });
  assert.equal(result.isError, undefined);
  assert.equal(result.structuredContent.country.code, "jp");
  assert.deepEqual(result.structuredContent.country.voltage, [100]);
}
console.log("WillItPlug integration checks passed.");
