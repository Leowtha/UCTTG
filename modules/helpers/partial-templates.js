export default class TemplateHelpers {
  static async preload() {
    const templatePaths = [
      "systems/ucttg/templates/parts/shared/ffg-modifiers.html",
      "systems/ucttg/templates/parts/shared/ffg-sources.html",
      "systems/ucttg/templates/parts/actor/ffg-skills.html",
      "systems/ucttg/templates/parts/actor/ffg-weapon-armor-gear.html",
      "systems/ucttg/templates/parts/actor/ffg-vehicle-weapon-attachments.html",
      "systems/ucttg/templates/parts/ffg-qualities-attachments-mods.html",
      "systems/ucttg/templates/parts/ffg-mods.html",
      "systems/ucttg/templates/items/dialogs/ffg-mod.html",
      "systems/ucttg/templates/items/dialogs/ffg-modification.html",
      "systems/ucttg/templates/parts/actor/ffg-vehicle-cargo.html",
      "systems/ucttg/templates/parts/actor/ffg-vehicle-crew.html",
      "systems/ucttg/templates/parts/actor/ffg-homestead-upgrades.html",
      "systems/ucttg/templates/parts/actor/ffg-homestead-storage.html",
      "systems/ucttg/templates/parts/actor/ffg-talents.html",
      "systems/ucttg/templates/parts/actor/ffg-abilities.html",
      "systems/ucttg/templates/parts/actor/ffg-forcepowers.html",
      "systems/ucttg/templates/parts/actor/ffg-criticalinjury.html",
      "systems/ucttg/templates/parts/shared/ffg-block.html",
      "systems/ucttg/templates/parts/actor/ffg-signatureability.html",
      "systems/ucttg/templates/chat/roll-forcepower-card.html",
      "systems/ucttg/templates/chat/roll-weapon-card.html",
      "systems/ucttg/templates/chat/roll-vehicle-card.html",
      "systems/ucttg/templates/parts/shared/ffg-tabs.html",
      "systems/ucttg/templates/parts/actor/ffg-healingitem.html",
      "systems/ucttg/templates/dialogs/combat-tracker.html",
      "systems/ucttg/templates/chat/parts/item/ffg-header.html",
      "systems/ucttg/templates/chat/parts/item/ffg-footer.html",
    ];

    return loadTemplates(templatePaths);
  }
}
