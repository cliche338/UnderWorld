import { 
    player, permanentData, isCombatActive, 
    isInventoryOpen, currentUsername 
} from './state.js'; //

import { ITEMS, MATERIALS_DATA, STONE_CONVERSION_RATE, UPGRADE_COST } from './config.js'; //

import { 
    calculateTotalAttack, 
    useConsumable, 
    equipItem, 
    handleSellItem,
    getMaterialById,
    handleSellMaterial,
    calculateTotalCritChance,
    calculateTotalDefense, // 確保已引入
    calculateTotalMaxHp,
} from './game_logic.js'; //

export const elements = {

        modalBackdrop: document.getElementById('custom-modal-backdrop'),
        modalBody: document.getElementById('update-log-modal'), 
        modalTitle: document.getElementById('modal-title'), 
        modalContent: document.getElementById('modal-content'),
        modalCloseBtn: document.getElementById('modal-close-btn'),

        howToPlayBtn: document.getElementById('how-to-play-btn'),
        updateLogBtn: document.getElementById('update-log-btn'),

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
        gameLog: document.getElementById('game-log'), 
        controlsArea: document.getElementById('controls-area'),
        hubInteractiveContent: document.getElementById('hub-interactive-content'),
        townLockoutMessage: document.getElementById('town-lockout-message'),
        materialsSection: document.getElementById('materials-section'),
        materialInventoryList: document.getElementById('material-inventory-list'),

        statusDisplay: document.getElementById('status-display'),
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

};

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
            return `${sign}${percent}% ${unit}`;
        }
        return `${sign}${value} ${unit}`;
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
        if (item.type === 'consumable') { 
            actionButton.textContent = '使用'; 
            actionButton.onclick = () => useConsumable(index); 
        } else {
            actionButton.textContent = '裝備'; 
            actionButton.onclick = () => equipItem(index); 
        }
        buttonContainer.appendChild(actionButton);

        // 販賣按鈕
        const sellPrice = item.value || 0; 
        if (sellPrice > 0) { 
            const sellButton = document.createElement('button'); 
            sellButton.textContent = `販賣 (${sellPrice} 💰)`; 
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
                        '🧪 藥水';
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
        if (item.heal) parts.push(`+${item.heal} 治療`);

        statInfo = parts.join(', ');

        // 組合最終 HTML
        itemInfoDiv.innerHTML = `${itemDisplayHtml} **${item.name}** (${statInfo}) `;

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
            materialInfoSpan.innerHTML = `**${material.name}** x ${count} (總價值: ${totalSellPrice} 💰)`;
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
        const p = document.createElement('p'); //
        p.innerHTML = message; //
        p.style.color = color; //
        
        // 確保只保留最新的訊息
        if (elements.messages.children.length > 100) { //
            elements.messages.removeChild(elements.messages.children[0]); //
        }
        elements.messages.appendChild(p); //
        
        // 自動滾動到底部
        if (elements.gameLog) { //
        elements.gameLog.scrollTop = elements.gameLog.scrollHeight; //
    }
    }

export function updateDisplay() {
    // 1. 計算總攻擊力 (從 game_logic.js 取得)
    const totalMaxHp = calculateTotalMaxHp();
    const totalAttack = calculateTotalAttack();
    const totalDefense = calculateTotalDefense();

    player.hp = Math.min(player.hp, totalMaxHp);

    // 2. 核心數值更新
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
        elements.critChanceValue.textContent = `${(totalCritChance * 100).toFixed(1)}%`;
    }   

    
    // 4. 渲染列表 (將複雜的 HTML 生成邏輯獨立出來)
    renderInventoryList(); //
    renderMaterialInventory(); // 【修正：恢復素材背包渲染】
    updateExchangeDisplay(); //

    // 5. 按鈕文字更新 (例如永久升級按鈕)
    elements.upgradeHpBtn.textContent = `永久 HP+5 (消耗 ${UPGRADE_COST} 💎) \n[當前加成: +${permanentData.hpBonus}]`; 
    elements.upgradeAttackBtn.textContent = `永久 ATK+5 (消耗 ${UPGRADE_COST} 💎) \n[當前加成: +${permanentData.attackBonus}]`; 
    elements.upgradeDefenseBtn.textContent = `永久 DEF+5 (消耗 ${UPGRADE_COST} 💎) \n[當前加成: +${permanentData.defenseBonus}]`;
}

export function showDungeonChallengeModal(bossName, infoText) {
    if (!elements.dungeonChallengeBackdrop) return;
    
    // 更新內容並顯示
    elements.dungeonChallengeTitle.textContent = `🔥 挑戰：${bossName} 🔥`;
    elements.dungeonChallengeInfo.textContent = infoText;
    elements.dungeonChallengeBackdrop.style.display = 'flex';
    
    logMessage(`🔔 挑戰副本 Boss 提示已顯示: ${bossName}`, 'orange');
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