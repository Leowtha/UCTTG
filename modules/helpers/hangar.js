// helpers/hangar.js
// Hangar management for vessel actors. Stores references (actor IDs), never copies.

/** Cost in Mobile-Suit slots for a given actor type. MS is the "true" unit. */
export function hangarCost(type) {
  switch (type) {
    case "mobilearmor":  return 2;
    case "mobilesuit":   return 1;
    case "mobileweapon": return 0.5;
    default:             return 0;
  }
}

const DROPPABLE = ["mobilesuit", "mobilearmor", "mobileweapon"];

/**
 * Add a dropped mech (by actor ID) to a vessel's hangar. Soft capacity: always allows, warns if over.
 */
export async function addToHangar(vessel, droppedActor) {
  if (!DROPPABLE.includes(droppedActor.type)) {
    ui.notifications.warn(game.i18n.localize("ucttg.HangarInvalidUnit"));
    return;
  }
  const units = foundry.utils.deepClone(vessel.system.hangar?.units ?? {});
  if (units[droppedActor.id]) {
    ui.notifications.info(game.i18n.localize("ucttg.HangarAlreadyStored"));
    return;
  }
  units[droppedActor.id] = {
    id: droppedActor.id,
    type: droppedActor.type,
    name: droppedActor.name,
    img: droppedActor.img,
  };
  await vessel.update({ "system.hangar.units": units });

  // soft warning if now over capacity
  const capacity = Number(vessel.system.hangar?.capacity ?? 0);
  const used = hangarUsed(units);
  if (used > capacity) {
    ui.notifications.warn(
      game.i18n.format("ucttg.HangarOverCapacity", { used, capacity })
    );
  }
}

/** Remove a unit from the hangar. Uses the -=key idiom so Foundry deletes the record. */
export async function ejectFromHangar(vessel, actorId) {
  await vessel.update({ [`system.hangar.units.-=${actorId}`]: null });
}

/** Sum of costs for a units object. */
export function hangarUsed(units) {
  return Object.values(units ?? {}).reduce((sum, u) => sum + hangarCost(u.type), 0);
}

/**
 * Resolve stored IDs into live display records, pruning dead references.
 * Returns { units: [...], used, capacity, overCapacity }.
 */
export function buildHangarData(vessel) {
  const stored = vessel.system.hangar?.units ?? {};
  const capacity = Number(vessel.system.hangar?.capacity ?? 0);
  const units = [];
  const dead = [];

  for (const [id, rec] of Object.entries(stored)) {
    const live = game.actors.get(id);
    if (!live) { dead.push(id); continue; }
    units.push({
      id: live.id,
      type: live.type,
      typeLabel: game.i18n.localize(`ucttg.HangarType.${live.type}`),
      name: live.name,
      img: live.img,
      cost: hangarCost(live.type),
      wounds: live.system?.stats?.wounds,   // for a quick condition readout
    });
  }

  // prune dead refs (fire-and-forget; don't block render)
  if (dead.length && game.user.isGM) {
    const updates = {};
    dead.forEach(id => updates[`system.hangar.units.-=${id}`] = null);
    vessel.update(updates);
  }

  const used = units.reduce((s, u) => s + u.cost, 0);
  return { units, used, capacity, overCapacity: used > capacity };
}