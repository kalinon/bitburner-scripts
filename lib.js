/**
 * @param {NS} ns
 * @param {string} target
 **/
export async function checkServer(ns, target) {
  ns.print(` - checking server: ${target}`);
  if (!ns.hasRootAccess(target)) {
    ns.print(` - Need root access to ${target}`);
    await gainAccess(ns, target);
  }
}

/**
 * @param {NS} ns
 * @param {string} target
 **/
export async function gainAccess(ns, target) {
  let rPorts = ns.getServerNumPortsRequired(target);
  if (rPorts > 0) {
    ns.print(`- unable to hack ${target} at this time`);
  } else {
    // Brute force the server if we have the exe
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.print(` - brute forcing: ${target}`);
      ns.brutessh(target);
    }

    ns.print(` - nuking: ${target}`);
    ns.nuke(target);
  }
}

/**
 * @param {NS} ns
 * @param {string} target
 **/
export async function hackServer(ns, target) {
  // check again, to see if we gained access, if we do hack it
  if (!ns.hasRootAccess(target)) {
    ns.alert(`skipping: ${target} - no root access`);
  } else {
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
