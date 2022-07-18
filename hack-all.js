import { checkServer, hackServer } from "./scripts/lib.js";

/** @param {NS} ns */
export async function main(ns) {
  var servers = ns.scan();
  for (var i = 1; i < servers.length; i++) {
    await checkServer(ns, servers[i]);
  }

  while (true) {
    for (var i = 1; i < servers.length; i++) {
      await hackServer(ns, servers[i]);
    }
  }
}
