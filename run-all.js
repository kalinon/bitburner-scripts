/** @param {NS} ns */
export async function main(ns) {
  var servers = ns.scan();
  for (var i = 1; i < servers.length; i++) {
    ns.exec("/scripts/hack-all.js", servers[i]);
  }
}
