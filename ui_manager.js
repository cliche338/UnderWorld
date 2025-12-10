import {
    player, permanentData, isCombatActive,
    isInventoryOpen, currentUsername, currentUpgradeMultiplier,
    currentMonster
} from './state.js';

import { ITEMS, MATERIALS_DATA, STONE_CONVERSION_RATE, UPGRADE_COST, ACHIEVEMENTS, ACHIEVEMENT_TIERS, ACHIEVEMENT_CATEGORIES } from './config.js'; //

import {
    calculateTotalAttack,
    useConsumable,
    equipItem,
    unequipItem,
    handleSellItem,
    getMaterialById,
    handleSellMaterial,
    calculateTotalCritChance,
    calculateTotalDefense, // 確保已引入
    calculateTotalMaxHp,
    handleReturnJewel, // 添加回歸玉處理函數
} from './game_logic.js'; //



export const elements = {
    // Combat UI
    combatArea: document.getElementById('combat-area'),
    monsterName: document.getElementById('monster-name'),
    monsterHpValue: document.getElementById('monster-hp-value'),
    monsterMaxHpValue: document.getElementById('monster-max-hp-value'),
    monsterAttackValue: document.getElementById('monster-attack-value'),
    monsterDefenseValue: document.getElementById('monster-defense-value'),
    monsterHpBar: document.getElementById('monster-hp-bar'),

    modalBackdrop: document.getElementById('custom-modal-backdrop'),
    modalBody: document.getElementById('update-log-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalContent: document.getElementById('modal-content'),
    modalCloseBtn: document.getElementById('modal-close-btn'),

    howToPlayBtn: document.getElementById('how-to-play-btn'),
    updateLogBtn: document.getElementById('update-log-btn'),

    // Achievement system
    achievementsBtn: document.getElementById('achievements-toggle-btn'),
    achievementsModalBackdrop: document.getElementById('achievements-modal-backdrop'),
    achievementsPanel: document.getElementById('achievements-panel'),
    achievementsProgress: document.getElementById('achievements-progress'),
    achievementsList: document.getElementById('achievements-list'),
    achievementFilters: document.getElementById('achievement-filters'),
    achievementTierFilters: document.getElementById('achievement-tier-filters'),
    closeAchievementsBtn: document.getElementById('close-achievements-btn'),

    defenseValue: document.getElementById('defense-value'),
    critChanceValue: document.getElementById('crit-chance-value'),

    equippedArmorName: document.getElementById('equipped-armor-name'),
    equippedWeaponName: document.getElementById('equipped-weapon-name'),
    equippedHelmetName: document.getElementById('equipped-helmet-name'),
    equippedGreavesName: document.getElementById('equipped-greaves-name'),
    equippedNecklaceName: document.getElementById('equipped-necklace-name'),
    equippedRingName: document.getElementById('equipped-ring-name'),

    inventoryBtn: document.getElementById('inventory-btn'),
    exploreModeButtons: document.getElementById('explore-mode-buttons'),
    attackBtn: document.getElementById('attack-btn'),
    runBtn: document.getElementById('run-btn'),
    // 視覺化裝備面板
    visualEquipmentPanel: document.getElementById('visual-equipment-panel'),
    visualSlots: {
        weapon: document.getElementById('visual-slot-weapon'),
        helmet: document.getElementById('visual-slot-helmet'),
        armor: document.getElementById('visual-slot-armor'),
        greaves: document.getElementById('visual-slot-greaves'),
        necklace: document.getElementById('visual-slot-necklace'),
        ring: document.getElementById('visual-slot-ring')
    },

    logAndControlsGroup: document.getElementById('log-and-controls-group'),
    gameLog: document.getElementById('game-log'),
    controlsArea: document.getElementById('controls-area'),
    hubInteractiveContent: document.getElementById('hub-interactive-content'),
    townLockoutMessage: document.getElementById('town-lockout-message'),
    materialsSection: document.getElementById('materials-section'),
    materialInventoryList: document.getElementById('material-inventory-list'),

    statusDisplay: document.getElementById('status-display'),
    classNameValue: document.getElementById('class-name-value'), // Added Class Name
    hpValue: document.getElementById('hp-value'),
    maxHpValue: document.getElementById('max-hp-value'),
    attackValue: document.getElementById('attack-value'),
    goldValue: document.getElementById('gold-value'),
    depthValue: document.getElementById('depth-value'),
    stonesValue: document.getElementById('stones-value'),

    goldAmountInput: document.getElementById('gold-amount-input'),
    exchangeBtn: document.getElementById('exchange-btn'),
    exchangeResult: document.getElementById('exchange-result'),
    messages: document.getElementById('messages'),
    inventoryArea: document.getElementById('backpack-content-panel'),
    topCentralAdventures: document.getElementById('top-central-adventures'), // 新增：頂部冒險區容器
    evolutionChallengePanel: document.getElementById('evolution-challenge-panel'),
    evolutionChallengeBtn: document.getElementById('evolution-challenge-btn'), // Added missing button
    evolutionOptions: document.getElementById('evolution-options'), // Added for class selection
    classEvolutionModalBackdrop: document.getElementById('class-evolution-modal-backdrop'), // Fix: Point to correct backdrop ID


    dungeonEntrancePanel: document.getElementById('dungeon-entrance-panel'), // 新增：副本入口
    inventoryList: document.getElementById('inventory-list'),
    closeInventoryBtn: document.getElementById('close-inventory-btn'),

    shopArea: document.getElementById('shop-area'),
    shopInventoryList: document.getElementById('shop-inventory-list'),

    // 區域和按鈕
    hubArea: document.getElementById('hub-area'),
    upgradeHpBtn: document.getElementById('upgrade-hp-btn'),
    upgradeAttackBtn: document.getElementById('upgrade-attack-btn'),
    upgradeDefenseBtn: document.getElementById('upgrade-defense-btn'),

    classSelection: document.getElementById('class-selection'),
    adventureActions: document.getElementById('adventure-actions'),
    gameoverArea: document.getElementById('gameover-area'),
    runStonesGained: document.getElementById('run-stones-gained'),

    selectKnightBtn: document.getElementById('select-knight-btn'),
    selectMerchantBtn: document.getElementById('select-merchant-btn'),

    selectThiefBtn: document.getElementById('select-thief-btn'),
    exploreBtn: document.getElementById('explore-btn'),
    restBtn: document.getElementById('rest-btn'),

    passwordInput: document.getElementById('password-input'),
    createAccountBtn: document.getElementById('create-account-btn'),
    currentStageTitle: document.getElementById('current-stage-title'),

    authArea: document.getElementById('auth-area'),
    loggedOutView: document.getElementById('logged-out-view'),
    loggedInView: document.getElementById('logged-in-view'),
    usernameInput: document.getElementById('username-input'),

    currentUsernameDisplay: document.getElementById('current-username'),
    loginBtn: document.getElementById('login-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    gameContent: document.getElementById('game-content'),
    combatModeButtons: document.getElementById('combat-mode-buttons'),
    deathModeButtons: document.getElementById('death-mode-buttons'),
    reviveBtn: document.getElementById('revive-btn'),

    codexPanel: document.getElementById('codex-panel'),
    codexBtn: document.getElementById('codex-toggle-btn'),
    codexList: document.getElementById('codex-list'),
    codexFilters: document.getElementById('codex-filters'),

    dungeonEntrancePanel: document.getElementById('dungeon-entrance-panel'),
    dungeonEnterBtn: document.getElementById('dungeon-enter-btn'),
    dungeonChallengeBackdrop: document.getElementById('dungeon-challenge-modal-backdrop'),
    dungeonChallengeTitle: document.getElementById('dungeon-challenge-title'),
    dungeonChallengeInfo: document.getElementById('dungeon-challenge-info'),
    dungeonChallengeBtn: document.getElementById('dungeon-challenge-btn'),
    dungeonLeaveBtn: document.getElementById('dungeon-leave-btn'),

    evolutionConfirmModalBackdrop: document.getElementById('evolution-confirm-modal-backdrop'),
    evolutionConfirmModal: document.getElementById('evolution-confirm-modal'),
    evolutionConfirmBtn: document.getElementById('evolution-confirm-btn'),
    evolutionCancelBtn: document.getElementById('evolution-cancel-btn'),

    // Achievement System
    achievementsBtn: document.getElementById('achievements-toggle-btn'),
    achievementsModalBackdrop: document.getElementById('achievements-modal-backdrop'),
    achievementsPanel: document.getElementById('achievements-panel'),
    achievementsList: document.getElementById('achievements-list'),
    achievementsProgress: document.getElementById('achievements-progress'),
    achievementFilters: document.getElementById('achievement-filters'),
    achievementTierFilters: document.getElementById('achievement-tier-filters'),
    closeAchievementsBtn: document.getElementById('close-achievements-btn'),

    // Confirmation Modal
    confirmationModalBackdrop: document.getElementById('confirmation-modal-backdrop'),
    confirmationTitle: document.getElementById('confirmation-title'),
    confirmationContent: document.getElementById('confirmation-content'),
    confirmationConfirmBtn: document.getElementById('confirmation-confirm-btn'),
    confirmationCancelBtn: document.getElementById('confirmation-cancel-btn'),

    // Crafting System
    craftingPanel: document.getElementById('crafting-panel'),
    craftingRecipesList: document.getElementById('crafting-recipes-list'),
    craftingAccessPanel: document.getElementById('crafting-access-panel'),
    closeCraftingBtn: document.getElementById('close-crafting-btn'),

    // Return Jewel Modal
    returnJewelModalBackdrop: document.getElementById('return-jewel-modal-backdrop'),
    returnJewelConfirmBtn: document.getElementById('return-jewel-confirm-btn'),
    returnJewelCancelBtn: document.getElementById('return-jewel-cancel-btn'),

    // Boss Selection Modal
    bossSelectionModalBackdrop: document.getElementById('boss-selection-modal-backdrop'),
    bossSelectionModal: document.getElementById('boss-selection-modal'),
    bossListContainer: document.getElementById('boss-list-container'),
    bossSelectionCloseBtn: document.getElementById('boss-selection-close-btn'),
};

// DEBUG: Check if critical elements are found
const debugObj = {
    confirmModal: !!elements.evolutionConfirmModalBackdrop,
    confirmBtn: !!elements.evolutionConfirmBtn,
    challengeBtn: !!elements.evolutionChallengeBtn
};
console.log("[UI Manager] Elements loaded status:", JSON.stringify(debugObj));

// =========================================================
// 將渲染函式移至頂部，確保所有地方都能呼叫
// =========================================================

export function renderInventoryList() {
    elements.inventoryList.innerHTML = '';

    if (player.inventory.length === 0) {
        elements.inventoryList.textContent = '你的背包裡空空的。';
        return;
    }

    // 輔助函式：確保正確的正負號，並轉換暴擊率為百分比 (保持不變)
    const getStatString = (value, unit) => {
        const sign = value >= 0 ? '+' : '';
        if (unit === '暴擊率') {
            const percent = (value * 100).toFixed(1);
            return `${sign}${percent}% ${unit} `;
        }
        return `${sign}${value} ${unit} `;
    };

    player.inventory.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        let statInfo = ''

        itemDiv.classList.add('inventory-item');
        itemDiv.style.display = 'flex';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.justifyContent = 'flex-start';
        itemDiv.style.gap = '10px';


        // ----------------------------------------------------
        // --- 1. 動作按鈕容器 (左側) ---
        // ----------------------------------------------------
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexShrink = '0';

        // 裝備或使用按鈕
        const actionButton = document.createElement('button');
        actionButton.classList.add('inventory-action-btn'); // ⭐ 優化樣式
        if (item.type === 'consumable') {
            actionButton.textContent = '使用';
            actionButton.onclick = () => useConsumable(index);
        } else if (item.type === 'special') {
            // 特殊道具（如回歸玉）顯示使用按鈕
            actionButton.textContent = '使用';
            actionButton.onclick = () => useConsumable(index); // 統一由useConsumable處理
        } else if (item.type === 'material') {
            // 材料不顯示使用按鈕,只顯示說明
            actionButton.textContent = '材料';
            actionButton.disabled = true;
            actionButton.style.opacity = '0.6';
            actionButton.style.cursor = 'not-allowed';
        } else {
            actionButton.textContent = '裝備';
            actionButton.onclick = () => equipItem(index);
        }
        buttonContainer.appendChild(actionButton);

        // 販賣按鈕
        const sellPrice = item.value || 0;
        if (sellPrice > 0) {
            const sellButton = document.createElement('button');
            sellButton.classList.add('inventory-action-btn'); // ⭐ 優化樣式
            sellButton.textContent = `販賣(${sellPrice} 💰)`;
            sellButton.style.marginLeft = '5px';
            sellButton.style.backgroundColor = '#9b59b6';
            sellButton.onclick = () => handleSellItem(index, sellPrice);
            buttonContainer.appendChild(sellButton);
        }

        // 修正點 2: 先追加按鈕容器 (按鈕在左)
        itemDiv.appendChild(buttonContainer);

        // ----------------------------------------------------
        // --- 2. 道具資訊 Div (Item Info - 右側) ---
        // ----------------------------------------------------
        const itemInfoDiv = document.createElement('span');
        itemInfoDiv.style.flexGrow = '1'; /* 佔據所有剩餘空間 */
        itemInfoDiv.style.textAlign = 'left'; /* 文字緊跟在按鈕後 */

        // --- 圖片/圖示邏輯 ---
        let itemDisplayHtml = '';
        if (item.image) {
            // 如果有圖片路徑，則使用 <img> 標籤
            itemDisplayHtml = `<img src="${item.image}" alt="${item.name}" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle; margin-right: 5px;">`;
        } else {
            // 如果沒有圖片，使用通用圖示
            const typeIcon = item.type === 'weapon' ? '⚔️ 武器' :
                item.type === 'armor' ? '🛡️ 防具' :
                    item.type === 'necklace' ? '📿 項鍊' :
                        item.type === 'ring' ? '💍 戒指' :
                            item.type === 'helmet' ? '🪖 頭盔' :
                                item.type === 'greaves' ? '👢 護脛' :
                                    item.type === 'consumable' ? '🧪 藥水' :
                                        '💎 特殊';
            itemDisplayHtml = `<span style="font-size: 1.2em; margin-right: 5px; vertical-align: middle;">${typeIcon}</span>`;
        }

        // --- 屬性計算邏輯 (所有裝備都使用多屬性收集) ---
        const parts = [];

        // 檢查所有裝備類型可能擁有的屬性，並將其全部加入 parts 陣列
        if (item.attack) parts.push(getStatString(item.attack, 'ATK'));
        if (item.hp) parts.push(getStatString(item.hp, 'HP'));
        if (item.defense) parts.push(getStatString(item.defense, 'DEF'));
        if (item.critChance) parts.push(getStatString(item.critChance, '暴擊率'));

        // 治療屬性只適用於消耗品
        if (item.heal) parts.push(`+ ${item.heal} 治療`);

        statInfo = parts.join(', ');

        // 根據稀有度設置道具名稱顏色
        const rarityColorMap = {
            1: '#ffffff',   // 普通 - 白色
            2: '#00ff00',  // 優良 - 綠色
            3: '#4da6ff',  // 精良 - 藍色
            4: '#4da6ff',
            5: '#9d4dff',  // 史詩 - 紫色
            6: '#9d4dff',
            7: '#ff8000',  //橙色
            8: '#ffd700',  // 神話 - 金色
            9: '#ff0000',  // 傳說 - 紅色
            10: '#ff1493',  // 不朽 - 粉紅色
            11: '#00ffff'   // 特殊道具 - 青色
        };

        const rarityColor = rarityColorMap[item.rarity] || '#ffffff';

        // 組合最終 HTML
        const countDisplay = (item.count && item.count > 1) ? ` <span style="color: yellow; font-weight: bold;">x${item.count}</span>` : '';

        // 修正：只有當 statInfo 有內容時才顯示括號
        const statDisplay = statInfo ? ` (${statInfo})` : '';

        itemInfoDiv.innerHTML = `${itemDisplayHtml} <strong style="color: ${rarityColor};">${item.name}</strong>${countDisplay}${statDisplay}`;

        itemDiv.appendChild(itemInfoDiv);
        elements.inventoryList.appendChild(itemDiv);
    });
}

export function renderMaterialInventory() {
    const list = elements.materialInventoryList;
    list.innerHTML = ''; // 清空列表

    // 確保 player.materials 存在，因為 loadGame 已確保它是 {}
    const materials = player.materials;
    const materialIds = Object.keys(materials); //

    if (materialIds.length === 0) { //
        list.textContent = '目前沒有可販售的素材。'; //
        return; //
    }

    materialIds.forEach(materialId => { //
        const count = materials[materialId]; //
        if (count > 0) { //
            const material = getMaterialById(materialId); // 從 game_logic 引入
            if (!material) return; // 找不到資料就跳過

            const div = document.createElement('div'); //
            div.classList.add('material-item'); //

            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.justifyContent = 'space-between'; // 讓按鈕和資訊分散開

            const totalSellPrice = count * material.value; //

            // ----------------------------------------------------
            // --- 1. 販賣按鈕 (Sell All Button) ---
            // ----------------------------------------------------
            const sellButton = document.createElement('button'); //
            sellButton.textContent = '全部販賣'; //
            sellButton.style.marginLeft = '0px';
            sellButton.style.backgroundColor = '#2ecc71'; //
            sellButton.style.flexShrink = '0'; // 防止按鈕被壓縮

            // 🚨 綁定販賣事件
            sellButton.onclick = () => { //
                handleSellMaterial(materialId, count, material.value); //
                renderMaterialInventory(); // 販賣後需要重新渲染
            };

            // 只有在城鎮時才能販賣
            if (player.actionsSinceTown > 0) { //
                sellButton.disabled = true; //
                div.style.opacity = '0.7'; //
            }

            div.appendChild(sellButton); // 

            // ----------------------------------------------------
            // --- 2. 材料資訊 Span (從 innerHTML 分離出來) ---
            // ----------------------------------------------------
            const materialInfoSpan = document.createElement('span');
            materialInfoSpan.innerHTML = `** ${material.name}** x ${count} (總價值: ${totalSellPrice} 💰)`;
            materialInfoSpan.style.flexGrow = '1';
            materialInfoSpan.style.textAlign = 'left';
            materialInfoSpan.style.paddingLeft = '10px';

            div.appendChild(materialInfoSpan);

            list.appendChild(div); //
        }
    });
}

// =========================================================
// 其他導出函式在底部 (保持不變)
// =========================================================

export function logMessage(message, color = 'white') {
    if (!elements.messages) {
        // 如果訊息區域尚未載入 (例如在登入畫面時)，則直接返回或使用 console.log 替代
        console.log(`[LOG] ${message} `);
        return;
    }

    const p = document.createElement('p');
    p.innerHTML = message;
    p.style.color = color;

    // 確保只保留最新的訊息
    if (elements.messages.children.length > 100) {
        elements.messages.removeChild(elements.messages.children[0]);
    }
    elements.messages.appendChild(p);

    // 自動滾動到底部
    if (elements.gameLog) {
        elements.gameLog.scrollTop = elements.gameLog.scrollHeight;
    }
}

// 浮動提示通知（Toast Notification）
export function showToast(message, type = 'info', duration = 2000) {
    // 創建toast容器（如果不存在）
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }

    // 創建toast元素
    const toast = document.createElement('div');
    toast.style.cssText = `
        background: ${type === 'warning' ? 'rgba(255, 193, 7, 0.95)' : type === 'error' ? 'rgba(220, 53, 69, 0.95)' : 'rgba(40, 167, 69, 0.95)'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out, slideOut 0.3s ease-out ${duration - 300}ms;
        pointer-events: auto;
    `;
    toast.textContent = message;

    // 添加動畫樣式
    if (!document.getElementById('toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }

    toastContainer.appendChild(toast);

    // 自動移除
    setTimeout(() => {
        toast.remove();
    }, duration);
}

export function updateDisplay() {
    // 1. 計算總攻擊力 (從 game_logic.js 取得)
    const totalMaxHp = calculateTotalMaxHp();
    const totalAttack = calculateTotalAttack();
    const totalDefense = calculateTotalDefense();

    player.hp = Math.min(player.hp, totalMaxHp);

    // 2. 核心數值更新
    if (elements.classNameValue) elements.classNameValue.textContent = player.className || "初心者"; // Default to Beginner
    elements.hpValue.textContent = Math.round(player.hp);
    elements.maxHpValue.textContent = Math.round(totalMaxHp);
    elements.attackValue.textContent = Math.round(totalAttack);
    elements.defenseValue.textContent = Math.round(totalDefense);
    elements.goldValue.textContent = player.gold;
    elements.stonesValue.textContent = permanentData.stones;
    elements.depthValue.textContent = player.depth;

    // 3. 裝備名稱更新
    if (elements.equippedWeaponName) {
        elements.equippedWeaponName.textContent = player.equipment.weapon ? player.equipment.weapon.name : '無';
    }

    if (elements.equippedHelmetName) {
        elements.equippedHelmetName.textContent = player.equipment.helmet ? player.equipment.helmet.name : '無';
    }

    if (elements.equippedArmorName) {
        elements.equippedArmorName.textContent = player.equipment.armor ? player.equipment.armor.name : '無';
    }

    if (elements.equippedGreavesName) {
        elements.equippedGreavesName.textContent = player.equipment.greaves ? player.equipment.greaves.name : '無';
    }

    if (elements.equippedNecklaceName) {
        elements.equippedNecklaceName.textContent = player.equipment.necklace ? player.equipment.necklace.name : '無';
    }

    if (elements.equippedRingName) {
        elements.equippedRingName.textContent = player.equipment.ring ? player.equipment.ring.name : '無';
    }
    const totalCritChance = calculateTotalCritChance();
    if (elements.critChanceValue) {
        // 將暴擊率 (例如 0.15) 轉換為百分比並顯示一位小數 (例如 "15.0%")
        elements.critChanceValue.textContent = `${(totalCritChance * 100).toFixed(1)}% `;
    }


    // 4. 渲染列表 (將複雜的 HTML 生成邏輯獨立出來)
    renderInventoryList(); //
    renderMaterialInventory(); // 【修正：恢復素材背包渲染】
    // 5. 按鈕文字更新 (例如永久升級按鈕)
    const multiplier = currentUpgradeMultiplier;
    let count = 1;
    let displayCost = UPGRADE_COST;

    if (multiplier === 'MAX') {
        const affordable = Math.floor(permanentData.stones / UPGRADE_COST);
        count = affordable > 0 ? affordable : 1;
        displayCost = count * UPGRADE_COST;
    } else {
        count = parseInt(multiplier);
        displayCost = count * UPGRADE_COST;
    }

    if (elements.upgradeHpBtn) elements.upgradeHpBtn.textContent = `永久 HP+${5 * count} \n(消耗 ${displayCost}💎) \n[當前: +${permanentData.hpBonus}]`;
    if (elements.upgradeAttackBtn) elements.upgradeAttackBtn.textContent = `永久 ATK+${5 * count} \n(消耗 ${displayCost}💎) \n[當前: +${permanentData.attackBonus}]`;
    if (elements.upgradeDefenseBtn) elements.upgradeDefenseBtn.textContent = `永久 DEF+${5 * count} \n(消耗 ${displayCost}💎) \n[當前: +${permanentData.defenseBonus}]`;

    // 6. 更新倍率按鈕狀態
    document.querySelectorAll('.multiplier-btn').forEach(btn => {
        if (btn.getAttribute('data-value') == multiplier) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });


    // 7. 更新轉職挑戰按鈕顯示
    if (elements.evolutionChallengeBtn && player.nextEvolutionDepth !== undefined) {
        if (player.depth >= player.nextEvolutionDepth && !player.isEvolved) {
            elements.evolutionChallengeBtn.style.display = 'block';
        } else {
            elements.evolutionChallengeBtn.style.display = 'none';
        }
    }

    // 8. 更新戰鬥顯示 (如果戰鬥中)
    if (isCombatActive && elements.combatArea && elements.combatArea.style.display !== 'none') {
        updateCombatDisplay();
    }
} // End of updateDisplay

export function updateCombatDisplay() {
    if (!currentMonster) return;

    if (elements.monsterName) elements.monsterName.textContent = currentMonster.name;
    if (elements.monsterHpValue) elements.monsterHpValue.textContent = currentMonster.hp;
    if (elements.monsterMaxHpValue) elements.monsterMaxHpValue.textContent = currentMonster.maxHp;
    if (elements.monsterAttackValue) elements.monsterAttackValue.textContent = currentMonster.attack;
    if (elements.monsterDefenseValue) elements.monsterDefenseValue.textContent = currentMonster.defense;

    // 更新血條
    if (elements.monsterHpBar) {
        const hpPercent = Math.max(0, (currentMonster.hp / currentMonster.maxHp) * 100);
        elements.monsterHpBar.style.width = `${hpPercent}%`;
    }
}



// =========================================================
// Boss 選擇系統 UI Functions
// =========================================================

export function showBossSelectionModal() {
    if (!elements.bossSelectionModalBackdrop) return;
    elements.bossSelectionModalBackdrop.style.display = 'flex';
}

export function hideBossSelectionModal() {
    if (!elements.bossSelectionModalBackdrop) return;
    elements.bossSelectionModalBackdrop.style.display = 'none';
}

export function renderBossList(bosses, onSelectCallback) {
    if (!elements.bossListContainer) return;

    elements.bossListContainer.innerHTML = '';

    if (!bosses || bosses.length === 0) {
        elements.bossListContainer.innerHTML = '<p style="color: #999;">目前沒有可挑戰的Boss</p>';
        return;
    }

    bosses.forEach(boss => {
        const bossCard = document.createElement('div');
        bossCard.style.cssText = `
            position: relative;
            background: linear-gradient(135deg, #1a1515 0%, #2a1a1a 100%);
            border: 2px solid #f39c12;
            border-radius: 8px;
            padding: 20px;
            padding-right: 100px;
            transition: all 0.3s ease;
            cursor: pointer;
        `;

        // Boss 資訊區塊（包含圖片）
        const bossInfo = document.createElement('div');
        bossInfo.style.cssText = 'flex: 1; text-align: left; display: flex; align-items: center; gap: 15px;';

        // Boss 圖片或圖示
        let imageHtml = '';
        if (boss.image) {
            imageHtml = `
                <img src="${boss.image}" alt="${boss.name}" 
                     style="width: 80px; height: 80px; object-fit: contain; border-radius: 8px; background: rgba(0,0,0,0.3); padding: 5px;">
            `;
        } else {
            // 如果沒有圖片，使用大型emoji圖示
            imageHtml = `
                <div style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 3em; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    👹
                </div>
            `;
        }


        // 獲取掉落物名稱（如果有）
        let dropsHtml = '';
        if (boss.drops && boss.drops.length > 0) {
            // 從 ITEMS 和 MATERIALS_DATA 獲取掉落物名稱
            const dropNames = boss.drops.map(dropId => {
                // 先在 ITEMS 中查找
                let item = ITEMS.find(i => i.id === dropId);
                // 如果找不到，在 MATERIALS_DATA 中查找
                if (!item) {
                    item = MATERIALS_DATA.find(m => m.id === dropId);
                }
                return item ? item.name : dropId;
            });

            dropsHtml = `
                <div style="margin-top: 10px; padding: 8px; background: rgba(255, 215, 0, 0.1); border-radius: 5px; border: 1px solid rgba(255, 215, 0, 0.3);">
                    <div style="font-size: 0.85em; color: #f1c40f; margin-bottom: 5px;">🎁 可能掉落:</div>
                    <div style="font-size: 0.85em; color: #f39c12; max-height: 40px; overflow-y: auto;">
                        ${dropNames.join(', ')}
                    </div>
                </div>
            `;
        }

        bossInfo.innerHTML = `
            ${imageHtml}
            <div style="flex: 1;">
                <div style="font-size: 1.3em; font-weight: bold; color: #f39c12; margin-bottom: 8px;">
                    ${boss.name}
                </div>
                <div style="display: flex; gap: 15px; font-size: 0.95em; color: #ddd;">
                    <span>❤️ HP: <strong style="color: #e74c3c;">${boss.hp}</strong></span>
                    <span>⚔️ ATK: <strong style="color: #f39c12;">${boss.attack}</strong></span>
                    <span>🛡️ DEF: <strong style="color: #3498db;">${boss.defense || 0}</strong></span>
                </div>
              
                ${dropsHtml}
            </div>
        `;

        // 選擇按鈕
        const selectBtn = document.createElement('button');
        selectBtn.textContent = '選擇';
        selectBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background-color: #e74c3c;
            border: 2px solid #ff8888;
            color: white;
            padding: 8px 20px;
            font-size: 0.95em;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 80px;
        `;

        selectBtn.onmouseover = () => {
            selectBtn.style.backgroundColor = '#c0392b';
            selectBtn.style.transform = 'scale(1.05)';
        };
        selectBtn.onmouseout = () => {
            selectBtn.style.backgroundColor = '#e74c3c';
            selectBtn.style.transform = 'scale(1)';
        };

        selectBtn.onclick = (e) => {
            e.stopPropagation();
            if (onSelectCallback) {
                onSelectCallback(boss.id);
            }
        };

        // Hover 效果
        bossCard.onmouseover = () => {
            bossCard.style.borderColor = '#ff8';
            bossCard.style.boxShadow = '0 0 20px rgba(243, 156, 18, 0.4)';
            bossCard.style.transform = 'translateY(-2px)';
        };
        bossCard.onmouseout = () => {
            bossCard.style.borderColor = '#f39c12';
            bossCard.style.boxShadow = 'none';
            bossCard.style.transform = 'translateY(0)';
        };

        bossCard.appendChild(bossInfo);
        bossCard.appendChild(selectBtn);
        elements.bossListContainer.appendChild(bossCard);
    });
}

export function showDungeonChallengeModal(boss) {
    if (!elements.dungeonChallengeBackdrop) return;

    // 更新內容並顯示Boss詳細資訊
    elements.dungeonChallengeTitle.textContent = `🔥 挑戰：${boss.name} 🔥`;

    // 構建詳細資訊
    const infoHtml = `
        <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-around; margin-bottom: 10px;">
                <div>
                    <div style="color: #95a5a6; font-size: 0.9em;">生命值</div>
                    <div style="color: #e74c3c; font-size: 1.3em; font-weight: bold;">${boss.hp}</div>
                </div>
                <div>
                    <div style="color: #95a5a6; font-size: 0.9em;">攻擊力</div>
                    <div style="color: #f39c12; font-size: 1.3em; font-weight: bold;">${boss.attack}</div>
                </div>
                <div>
                    <div style="color: #95a5a6; font-size: 0.9em;">防禦力</div>
                    <div style="color: #3498db; font-size: 1.3em; font-weight: bold;">${boss.defense || 0}</div>
                </div>
            </div>
            <div style="color: #f1c40f; font-size: 1.1em; margin-top: 10px;">
                💰 獎勵: ${boss.goldReward} 金幣
            </div>
        </div>
        <p style="color: #e74c3c; font-weight: bold; margin: 15px 0;">⚠️ 這是一場沒有退路的戰鬥！</p>
        <p style="color: #ddd;">你確定要挑戰這個強大的 Boss 嗎？</p>
    `;

    elements.dungeonChallengeInfo.innerHTML = infoHtml;
    elements.dungeonChallengeBackdrop.style.display = 'flex';

    logMessage(`🔔 準備挑戰 Boss: ${boss.name}`, 'orange');
}

export function hideDungeonChallengeModal() {
    if (!elements.dungeonChallengeBackdrop) return;
    elements.dungeonChallengeBackdrop.style.display = 'none';
}

export function updateExchangeDisplay() {
    let goldToExchange = parseInt(elements.goldAmountInput.value);

    if (isNaN(goldToExchange) || goldToExchange <= 0) {
        goldToExchange = 0;
    }
    const stonesResult = Math.floor(goldToExchange / STONE_CONVERSION_RATE);
    elements.exchangeResult.textContent = stonesResult;
}

export function getItemIcon(itemType) {
    switch (itemType) {
        case 'weapon': return '⚔️';
        case 'helmet': return '🪖';
        case 'armor': return '🛡️';
        case 'greaves': return '👢';
        case 'necklace': return '📿';
        case 'ring': return '💍';
        case 'consumable': return '🧪';
        default: return '❓';
    }
}

// =========================================================
// Achievement System UI Functions
// =========================================================

let currentCategoryFilter = 'all';
let currentTierFilter = 'all';

export function renderAchievementsList(categoryFilter = 'all', tierFilter = 'all') {
    console.log('[Achievement] renderAchievementsList called, ACHIEVEMENTS:', ACHIEVEMENTS, 'length:', ACHIEVEMENTS ? ACHIEVEMENTS.length : 0);
    if (!elements.achievementsList) return;

    currentCategoryFilter = categoryFilter;
    currentTierFilter = tierFilter;

    elements.achievementsList.innerHTML = '';

    // Filter achievements
    let filteredAchievements = ACHIEVEMENTS;

    if (categoryFilter !== 'all') {
        filteredAchievements = filteredAchievements.filter(a => a.category === categoryFilter);
    }

    if (tierFilter !== 'all') {
        filteredAchievements = filteredAchievements.filter(a => a.tier === tierFilter);
    }



    // RENDER with innerHTML and inline styles
    elements.achievementsList.innerHTML = '';

    console.log('[Achievement RENDER] filteredAchievements.length:', filteredAchievements.length);
    console.log('[Achievement RENDER] filteredAchievements:', filteredAchievements);

    filteredAchievements.forEach((achievement) => {
        console.log('[Achievement RENDER] Rendering:', achievement.name);
        const isUnlocked = permanentData.achievements.includes(achievement.id);
        const tier = ACHIEVEMENT_TIERS[achievement.tier];

        // 未解鎖的成就使用灰色調，已解鎖的使用彩色
        const cardBg = isUnlocked ? '#2a2a2a' : '#1a1a1a';
        const titleColor = isUnlocked ? '#f1c40f' : '#666';
        const descColor = isUnlocked ? '#ecf0f1' : '#555';
        const borderColor = isUnlocked ? tier.color : '#333';
        const badgeBg = isUnlocked ? tier.color : '#444';
        const badgeColor = isUnlocked ? 'white' : '#888';
        const filter = isUnlocked ? '' : 'opacity: 0.6; filter: grayscale(80%);';

        const html = `<div style="background:${cardBg};border-left:8px solid ${borderColor};padding:20px;margin:10px 0;border-radius:5px;display:flex;justify-content:space-between;box-shadow:0 3px 10px rgba(0,0,0,0.5);${filter}">
            <div style="flex:1;"><div style="font-size:18px;font-weight:bold;color:${titleColor};margin-bottom:8px;">${achievement.name}</div>
            <div style="font-size:14px;color:${descColor};">${achievement.description}</div></div>
            <div style="background:${badgeBg};color:${badgeColor};padding:10px 20px;border-radius:5px;font-weight:bold;">${tier.name}</div></div>`;

        elements.achievementsList.insertAdjacentHTML('beforeend', html);
    });

    // Update progress
    const unlockedCount = permanentData.achievements.length;
    const totalCount = ACHIEVEMENTS.length;
    if (elements.achievementsProgress) {
        elements.achievementsProgress.textContent = `已解鎖: ${unlockedCount}/${totalCount}`;
    }
}

export function toggleAchievements() {
    if (!elements.achievementsModalBackdrop) {
        console.error('[Achievement] Modal backdrop not found!');
        return;
    }

    const isVisible = elements.achievementsModalBackdrop.style.display === 'flex';
    console.log('[Achievement] Toggle called, isVisible:', isVisible);

    if (isVisible) {
        elements.achievementsModalBackdrop.style.display = 'none';
        console.log('[Achievement] Modal closed');
    } else {
        elements.achievementsModalBackdrop.style.display = 'flex';
        console.log('[Achievement] Modal opened');
        renderAchievementsList(currentCategoryFilter, currentTierFilter);

        // Delay binding to ensure DOM is ready
        setTimeout(() => {
            console.log('[Achievement] Binding events after delay');
            bindAchievementFilters();
        }, 100);

        // Add backdrop click to close
        elements.achievementsModalBackdrop.onclick = (e) => {
            if (e.target === elements.achievementsModalBackdrop) {
                console.log('[Achievement] Backdrop clicked');
                toggleAchievements();
            }
        };
    }
}

function bindAchievementFilters() {
    console.log('[Achievement] Setting up global click handlers...');

    // Define global functions for inline onclick handlers
    window.achievementCategoryClick = function (btn) {
        console.log('[Achievement] Category clicked!', btn.getAttribute('data-category'));
        // Remove active from all category buttons
        document.querySelectorAll('.achievement-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        renderAchievementsList(category, currentTierFilter);
    };

    window.achievementTierClick = function (btn) {
        console.log('[Achievement] Tier clicked!', btn.getAttribute('data-tier'));
        // Remove active from all tier buttons  
        document.querySelectorAll('.achievement-tier-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tier = btn.getAttribute('data-tier');
        renderAchievementsList(currentCategoryFilter, tier);
    };

    window.closeAchievements = function () {
        console.log('[Achievement] Close clicked!');
        toggleAchievements();
    };

    console.log('[Achievement] Global functions registered!');
}

// =========================================
// 12. 裝備展示面板渲染 (VISUAL EQUIPMENT RENDER)
// =========================================

export function renderVisualEquipment() {
    const visualPanel = document.getElementById('visual-equipment-display');
    if (!visualPanel || visualPanel.style.display === 'none') {
        if (!visualPanel) return;
    }

    const slots = visualPanel.querySelectorAll('.equipment-slot');

    slots.forEach(slot => {
        const slotType = slot.getAttribute('data-slot');
        const equippedItemId = player.equipment[slotType];

        // 重置狀態
        slot.innerHTML = '';
        slot.classList.add('empty'); // 預設為空 (會顯示 '無' via CSS)
        slot.setAttribute('title', slot.getAttribute('data-slot-name') || ''); // 恢復基本 title

        if (equippedItemId) {
            // 尋找對應的物品資料
            const itemData = ITEMS.find(i => i.id === equippedItemId);

            if (itemData) {
                // 有找到物品資料
                if (itemData.image) {
                    const img = document.createElement('img');
                    img.src = itemData.image;
                    img.alt = itemData.name;
                    // 更新 tooltip
                    slot.title = `${itemData.name}\n${itemData.intro || ''}`;
                    slot.appendChild(img);
                    slot.classList.remove('empty');
                } else {
                    // 有物品但沒圖片，暫時顯示名稱縮寫或文字
                    // 為了美觀，這裡也可以選擇顯示一個通用裝備圖標，目前先用文字
                    slot.innerHTML = `<span style="font-size:0.8em; text-align:center; color:#f1c40f;">${itemData.name}</span>`;
                    slot.title = `${itemData.name}\n${itemData.intro || ''}`;
                    slot.classList.remove('empty');
                }
            } else {
                // 有 ID 但找不到物品資料 (可能是 ID 錯誤或舊存檔)
                // 視為 "無"，保持 empty 狀態，但可以 Log 警告
                console.warn(`VisualEquipment: Item ID '${equippedItemId}' not found in ITEMS.`);
            }
        }
    });
}

// =========================================
// 13. 合成系統 UI 渲染 (CRAFTING SYSTEM RENDER)
// =========================================

export function renderCraftingPanel() {
    if (!elements.craftingRecipesList) return;

    // 需要從 game_logic.js 導入這些函數
    import('./game_logic.js').then(module => {
        const { getAllRecipes, checkRecipeAvailable, executeCraft, getItemById } = module;
        const allRecipes = getAllRecipes();

        elements.craftingRecipesList.innerHTML = '';

        if (allRecipes.length === 0) {
            elements.craftingRecipesList.innerHTML = '<p style="text-align: center; color: #999;">目前沒有可用的配方</p>';
            return;
        }

        allRecipes.forEach(recipe => {
            const isAvailable = checkRecipeAvailable(recipe);
            const resultItem = getItemById(recipe.resultItemId);

            // 創建配方項目
            const recipeDiv = document.createElement('div');
            recipeDiv.className = `recipe-item ${isAvailable ? 'available' : 'unavailable'}`;

            // 標題
            const headerDiv = document.createElement('div');
            headerDiv.className = 'recipe-header';
            const nameSpan = document.createElement('span');
            nameSpan.className = 'recipe-name';
            nameSpan.textContent = recipe.name;
            headerDiv.appendChild(nameSpan);
            recipeDiv.appendChild(headerDiv);

            // 描述
            if (recipe.description) {
                const descP = document.createElement('p');
                descP.className = 'recipe-description';
                descP.textContent = recipe.description;
                recipeDiv.appendChild(descP);
            }

            // 合成結果
            if (resultItem) {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'recipe-result';
                resultDiv.innerHTML = `⚔️ 鍛造 : <strong>${resultItem.name}</strong>`;
                recipeDiv.appendChild(resultDiv);
            }

            // 材料需求
            const materialsDiv = document.createElement('div');
            materialsDiv.className = 'recipe-materials';
            const materialsTitle = document.createElement('p');
            materialsTitle.innerHTML = '<strong>所需材料:</strong>';
            materialsDiv.appendChild(materialsTitle);

            recipe.materials.forEach(material => {
                const materialItem = getItemById(material.itemId);
                if (!materialItem) return;

                // 計算玩家擁有的數量
                let ownedCount = 0;
                player.inventory.forEach(item => {
                    if (item.id === material.itemId) {
                        if (item.count) {
                            ownedCount += item.count;
                        } else {
                            ownedCount += 1;
                        }
                    }
                });

                const hasEnough = ownedCount >= material.count;
                const materialDiv = document.createElement('div');
                materialDiv.className = `material-item ${hasEnough ? 'has' : 'missing'}`;

                const materialName = document.createElement('span');
                materialName.textContent = materialItem.name;

                const materialCount = document.createElement('span');
                materialCount.textContent = `${ownedCount}/${material.count}`;
                materialCount.style.fontWeight = 'bold';

                materialDiv.appendChild(materialName);
                materialDiv.appendChild(materialCount);
                materialsDiv.appendChild(materialDiv);
            });

            recipeDiv.appendChild(materialsDiv);

            // 金幣需求顯示
            if (recipe.goldCost && recipe.goldCost > 0) {
                const goldDiv = document.createElement('div');
                goldDiv.className = 'recipe-gold-cost';
                goldDiv.style.marginTop = '8px';
                goldDiv.style.padding = '5px';
                goldDiv.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                goldDiv.style.borderRadius = '4px';

                const hasEnoughGold = player.gold >= recipe.goldCost;
                goldDiv.innerHTML = `<strong>💰 所需金幣:</strong> <span style="color: ${hasEnoughGold ? '#00ff00' : '#ff4444'}; font-weight: bold;">${recipe.goldCost.toLocaleString()}</span>`;

                recipeDiv.appendChild(goldDiv);
            }

            // 合成按鈕
            const craftBtn = document.createElement('button');
            craftBtn.className = 'craft-button';
            craftBtn.textContent = isAvailable ? '🔨 合成' : '❌ 材料不足';
            craftBtn.disabled = !isAvailable;

            if (isAvailable) {
                craftBtn.onclick = () => {
                    executeCraft(recipe);
                    renderCraftingPanel(); // 重新渲染面板
                };
            }

            recipeDiv.appendChild(craftBtn);
            elements.craftingRecipesList.appendChild(recipeDiv);
        });
    }).catch(error => {
        console.error('Failed to load crafting recipes:', error);
        elements.craftingRecipesList.innerHTML = '<p style="color: red;">載入配方失敗，請重新整理頁面</p>';
    });
}

// 將 renderCraftingPanel 導出到全局，供 game_logic.js 調用
window.renderCraftingPanel = renderCraftingPanel;