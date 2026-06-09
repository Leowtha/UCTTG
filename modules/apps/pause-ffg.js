export default class PauseFFG extends Pause {
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.id = "pause";
    options.template = "systems/ucttg/templates/parts/ffg-paused.html";
    options.popOut = false;
    return options;
  }

  getData() {
    let icon = game.settings.get("ucttg", "ui-pausedImage");
    if (icon?.length <= 0) {
      icon = "systems/ucttg/images/paused.png";
    }

    return {
      paused: game.paused,
      icon,
    };
  }
}
