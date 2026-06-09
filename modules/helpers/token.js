export function registerTokenControls() {
  game.settings.register("ucttg", "showMinionCount", {
    name: game.i18n.localize("SWFFG.Settings.showMinionCount.Name"),
    hint: game.i18n.localize("SWFFG.Settings.showMinionCount.Hint"),
    scope: "world",
    config: false,
    default: true,
    type: Boolean,
    onChange: (rule) => window.location.reload()
  });
  game.settings.register("ucttg", "showAdversaryCount", {
    name: game.i18n.localize("SWFFG.Settings.showAdversaryCount.Name"),
    hint: game.i18n.localize("SWFFG.Settings.showAdversaryCount.Hint"),
    scope: "world",
    config: false,
    default: true,
    type: Boolean,
    onChange: (rule) => window.location.reload()
  });
    game.settings.register("ucttg", "adversaryItemName", {
    name: game.i18n.localize("SWFFG.Settings.AdversaryItemName.Name"),
    hint: game.i18n.localize("SWFFG.Settings.AdversaryItemName.Hint"),
    scope: "world",
    config: false,
    default: "Adversary",
    type: String,
    onChange: (rule) => window.location.reload()
  });
}

export function drawMinionCount(token) {
  if (!game.settings.get("ucttg", "showMinionCount")) {
    return;
  }
  const borderWidth = 0.35;
  const friendlyColor = "0x00A2E84D";
  const enemyColor = "0x8800154D";
  const overflowColor = "0xDAA520";
  // calculate total and alive numbers of minions
  const curCount = Math.max(token.actor.system.quantity.value, 0);
  const maxCount = token.actor.system.quantity.max;
  const maxRender = 6;

  // attempt to draw it on the token directly
  // check for existing copies of the container
  if (!token.children.find(i => i.name === "minionCount")) {
    const countContainer = new PIXI.Container();
    countContainer.name = "minionCount";
    token.minionCount = token.addChild(countContainer);
  } else {
    token.minionCount.removeChildren().forEach(i => i.destroy());
  }

  const tokenWidth = token.w;
  const markerRadius = 3;
  const markerDiameter = markerRadius * 2;
  const insideGap = 2;
  const slotWidth = markerDiameter + insideGap;
  const availableSpace = tokenWidth - ((markerDiameter * maxCount) + (insideGap * (maxCount - 1)));
  const outsideGap = availableSpace / 2;
  const bottomPadding = -3;

  if (maxCount > maxRender) {
    const text = new PIXI.Text(
      "∞",
      {
        fontFamily: "Arial",
        fontSize: 24,
        fill: overflowColor,
        align: "center",
        stroke: "0x000000",
        strokeThickness: 1,
        fontWeight: "bold",
      }
    );
    text.anchor.set(0.5);
    text.x = tokenWidth / 2;
    text.y = token.h - 6;
    token.minionCount.addChild(text);
  } else {
    for (let i = 0; i < curCount; i++) {
      const element = new PIXI.Graphics();
      element.lineStyle(borderWidth, "0x000000", 1);
      element.beginFill(friendlyColor);
      element.drawCircle(0, 0, markerRadius);
      element.endFill();
      // position: x is the center of the i-th slot
      element.x = outsideGap + markerRadius + (i * slotWidth);
      element.y = token.h - markerRadius - bottomPadding;
      token.minionCount.addChild(element);
    }

    for (let i = 0; i < maxCount - curCount; i++) {
      const element = new PIXI.Graphics();
      element.lineStyle(borderWidth, "0x000000", 1);
      element.beginFill(enemyColor);
      element.drawCircle(0, 0, markerRadius);
      element.endFill();
      element.x = outsideGap + markerRadius + ((i + curCount) * slotWidth);
      element.y = token.h - markerRadius - bottomPadding;
      token.minionCount.addChild(element);
    }
  }
}

export function drawAdversaryCount(token) {
  if (!game.settings.get("ucttg", "showAdversaryCount")) {
    return;
  }
  const overflowColor = "0xDAA520";
  const itemName = game.settings.get("ucttg", "adversaryItemName");
  const adversaryItems = token?.actor?.items?.filter(i => i.name === itemName) || [];
  let adversaryLevel = 0;
  adversaryItems.forEach(function (item) {
    adversaryLevel += item?.system?.ranks?.current || 0;
  });
 if (adversaryLevel > 0) {
    // 1. Safe access/creation of the container
    let countContainer = token.getChildByName("adversaryLevel");
    
    if (!countContainer) {
        countContainer = new PIXI.Container();
        countContainer.name = "adversaryLevel";
        token.addChild(countContainer);
    } else {
        // Just clear the children, don't re-add the container to the token
        countContainer.removeChildren();
    }

    // 2. Logic for rendering
    const sprite = PIXI.Sprite.from(`systems/ucttg/images/adversary/adversary-${adversaryLevel > 5 ? 6 : adversaryLevel}.png`);
    sprite.scale.set(0.025, 0.025);

    // 3. Position (Using the dynamic height after scale)
    sprite.x = 2 - 2; 
    sprite.y = token.h / 2 + 12;

    if (adversaryLevel > 5) {
        // Comment out or remove if you don't want the tint
        // sprite.tint = parseInt(overflowColor, 16); 
        adversaryLevel = 6;
    }
    
    countContainer.addChild(sprite);
} else {
    // Clean up if adversaryLevel is 0
    const countContainer = token.getChildByName("adversaryLevel");
    if (countContainer) {
        countContainer.destroy({children: true});
    }
  }
}