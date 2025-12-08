

/**
 * 卸下装备
 * @param {string} slotType - 装备槽类型 (weapon, helmet, armor, greaves, necklace, ring)
 */
export function unequipItem(slotType) {
    const equipped = State.player.equipment[slotType];
    if (!equipped) {
        logMessage('該裝備欄沒有裝備', 'gray');
        return;
    }

    // 將装备返回背包
    State.player.inventory.push(equipped);
    State.player.equipment[slotType] = null;

    // 重新计算HP上限，确保当前HP不超过新的上限
    const newMaxHp = calculateTotalMaxHp();
    State.player.hp = Math.min(State.player.hp, newMaxHp);

    logMessage(`🔄 已卸下 [${equipped.name}]`, 'yellow');

    // 更新显示
    updateDisplay();
    updateVisualEquipment();
    saveGame();
}
