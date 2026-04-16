class ffgSettings extends FormApplication {
  activateListeners(html) {
    super.activateListeners(html);
    html.find("button.filepicker").click(this._onFilePicker.bind(this));
  }

  getData(acceptableSettings) {
    const canConfigure = game.user.can("SETTINGS_MODIFY");
    let includeSettings = [];
    for (const setting of game.settings.settings) {
      if (acceptableSettings.includes(setting[0])) {
        const s = foundry.utils.duplicate(setting[1]);
        s.name = game.i18n.localize(s.name);
        s.hint = game.i18n.localize(s.hint);
        s.value = game.settings.get(s.namespace, s.key);
        s.type = setting.type instanceof Function ? setting.type.name : "String";
        s.isCheckbox = setting[1].type === Boolean;
        s.isSelect = s.choices !== undefined;
        s.isRange = setting[1].type === Number && s.range;
        s.isFilePicker = setting.valueType === "FilePicker";
        includeSettings.push(s);
      }
    }

    const data = {
      system: {title: game.system.title, menus: [], settings: includeSettings},
    };

    // Return data
    return {
      user: game.user,
      canConfigure: canConfigure,
      systemTitle: game.system.title,
      data: data,
    };
  }

  _onFilePicker(event) {
    event.preventDefault();

    const fp = new FilePicker({
      type: "image",
      callback: (path) => {
        $(event.currentTarget).prev().val(path);
        //this._onSubmit(event);
      },
      top: this.position.top + 40,
      left: this.position.left + 10,
    });
    return fp.browse();
  }

    /** @override */
  async _updateObject(event, formData) {
    for (let [k, v] of Object.entries(foundry.utils.flattenObject(formData))) {
      let s = game.settings.settings.get(k);
      let current = game.settings.get(s.namespace, s.key);
      if (v !== current) {
        await game.settings.set(s.namespace, s.key, v);
      }
    }
  }
}

export class rulesetSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "ruleset-settings",
      classes: ["ucttg", "ruleset-settings"],
      title: `${game.i18n.localize("SWFFG.Settings.ruleset.Title")}`,
      template: "systems/ucttg/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
        "ucttg.dicetheme",
        "ucttg.vehicleRangeBand",
        "ucttg.skilltheme",
        "ucttg.enableForceDie",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class uiSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "ui-settings",
      classes: ["ucttg", "ui-settings"],
      title: `${game.i18n.localize("SWFFG.Settings.ui.Title")}`,
      template: "systems/ucttg/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "ucttg.ui-uitheme",
      "ucttg.ui-pausedImage",
      "ucttg.ui-token-healthy",
      "ucttg.ui-token-wounded",
      "ucttg.ui-token-overwounded",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class combatSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "combat-settings",
      classes: ["ucttg", "combat-settings"],
      title: `${game.i18n.localize("SWFFG.Settings.combat.Title")}`,
      template: "systems/ucttg/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "ucttg.useGenericSlots",
      "ucttg.initiativeRule",
      "ucttg.removeCombatantAction",
      "ucttg.useDefense",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class actorSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "actor-settings",
      classes: ["ucttg", "actor-settings"],
      title: `${game.i18n.localize("SWFFG.Settings.actor.Title")}`,
      template: "systems/ucttg/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "ucttg.enableSoakCalc",
      "ucttg.talentSorting",
      "ucttg.showMinionCount",
      "ucttg.showAdversaryCount",
      "ucttg.adversaryItemName",
      "ucttg.maxAttribute",
      "ucttg.maxSkill",
      "ucttg.medItemName",
      "ucttg.HealingItemAction",
      "ucttg.RivalTokenPrepend",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class xpSpendingSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "xpSpending",
      classes: ["ucttg", "xpSpending"],
      title: `${game.i18n.localize("SWFFG.Settings.xpSpending.Title")}`,
      template: "systems/ucttg/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "ucttg.specializationCompendiums",
      "ucttg.signatureAbilityCompendiums",
      "ucttg.forcePowerCompendiums",
      "ucttg.talentCompendiums",
      "ucttg.notifyOnXpSpend",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class localizationSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "localization",
      classes: ["ucttg", "localization"],
      title: `${game.i18n.localize("SWFFG.Settings.localization.Title")}`,
      template: "systems/ucttg/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "ucttg.skillSorting",
      "ucttg.destiny-pool-light",
      "ucttg.destiny-pool-dark",
    ];
    return super.getData(includeSettingsNames);
  }
}

export class groupManagerSettings extends ffgSettings {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "group-manager",
      classes: ["ucttg", "group-manager"],
      title: `${game.i18n.localize("SWFFG.Settings.groupManager.Title")}`,
      template: "systems/ucttg/templates/dialogs/ffg-ui-settings.html",
    });
  }

  getData(options) {
    const includeSettingsNames = [
      "ucttg.pcListMode",
      "ucttg.privateTriggers",
      "ucttg.GMCharactersInGroupManager"
    ];
    return super.getData(includeSettingsNames);
  }
}
