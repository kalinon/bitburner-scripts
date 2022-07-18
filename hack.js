import { hackServer } from "./scripts/lib.js";

/** @param {NS} ns */
export async function main(ns) {
  var target = ns.args[0];

  while (true) {
    await hackServer(ns, target);
  }
}
