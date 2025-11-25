import { 
    player, permanentData, isCombatActive, 
    isInventoryOpen, currentUsername 
} from './state.js';

import { ITEMS, MATERIALS_DATA, STONE_CONVERSION_RATE, UPGRADE_COST } from './config.js';

import { 
    calculateTotalAttack, 
    useConsumable, 
    equipItem, 
    handleSellItem,
    getMaterialById,
    handleSellMaterial,
} from './game_logic.js';

export const elements = {

        howToPlayBtn: document.getElementById('how-to-play-btn'),

        defenseValue: document.getElementById('defense-value'),
        equippedArmorName: document.getElementById('equipped-armor-name'),
        equippedWeaponName: document.getElementById('equipped-weapon-name'),
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

        authArea : document.getElementById('auth-area'),
        loggedOutView : document.getElementById('logged-out-view'),
        loggedInView : document.getElementById('logged-in-view'),
        usernameInput : document.getElementById('username-input'),

        currentUsernameDisplay : document.getElementById('current-username'),
        loginBtn : document.getElementById('login-btn'),
        logoutBtn : document.getElementById('logout-btn'),
        gameContent : document.getElementById('game-content'),
        combatModeButtons : document.getElementById('combat-mode-buttons'),
        deathModeButtons : document.getElementById('death-mode-buttons'), 
        reviveBtn : document.getElementById('revive-btn'), 

    };

export function renderMaterialInventory() {
    const list = elements.materialInventoryList;
    list.innerHTML = ''; // 清空列表
    
    const materials = player.materials || {};
    const materialIds = Object.keys(materials);

    if (materialIds.length === 0) {
        list.textContent = '目前沒有可販售的素材。';
        return;
    }

    materialIds.forEach(materialId => {
        const count = materials[materialId];
        if (count > 0) {
            const material = getMaterialById(materialId); // 從 game_logic 引入
            if (!material) return; // 找不到資料就跳過

            const div = document.createElement('div');
            div.classList.add('material-item');
            
            const totalSellPrice = count * material.value;

            div.innerHTML = `**${material.name}** x ${count} (總價值: ${totalSellPrice} 💰)`;

            const sellButton = document.createElement('button');
            sellButton.textContent = '全部販賣';
            sellButton.style.marginLeft = '10px';
            sellButton.style.backgroundColor = '#2ecc71';
            
            // 🚨 綁定販賣事件
            sellButton.onclick = () => {
                handleSellMaterial(materialId, count, material.value);
                // 販賣後需要重新渲染，因為數量變為 0
                renderMaterialInventory(); 
                renderInventoryList(); // 重新渲染物品列表 (如果需要)
            }; 

            // 只有在城鎮時才能販賣
            if (player.actionsSinceTown > 0) {
                sellButton.disabled = true;
                div.style.opacity = '0.7';
            }
            
            div.appendChild(sellButton);
            list.appendChild(div);
        }
    });
}

export function logMessage(message, color = 'white') {
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

export function updateDisplay() {
    // 1. 計算總攻擊力 (從 game_logic.js 取得)
    const totalAttack = calculateTotalAttack();

    // 2. 核心數值更新
    elements.hpValue.textContent = player.hp;
    elements.maxHpValue.textContent = player.maxHp;
    elements.attackValue.textContent = totalAttack;
    
    elements.defenseValue.textContent = player.defense;
    elements.goldValue.textContent = player.gold;
    elements.depthValue.textContent = player.depth;
    elements.stonesValue.textContent = permanentData.stones;

    // 3. 裝備名稱更新
    elements.equippedWeaponName.textContent = player.equipment.weapon ? player.equipment.weapon.name : '無';
    elements.equippedArmorName.textContent = player.equipment.armor ? player.equipment.armor.name : '無';
    
    // 4. 渲染列表 (將複雜的 HTML 生成邏輯獨立出來)
    renderInventoryList();
    // renderMaterialInventory(); // 暫時註解，避免找不到函式
    updateExchangeDisplay();

    // 5. 按鈕文字更新 (例如永久升級按鈕)
    elements.upgradeHpBtn.textContent = `永久 HP+5 (消耗 ${UPGRADE_COST} 💎) [當前加成: +${permanentData.hpBonus}]`;
    elements.upgradeAttackBtn.textContent = `永久 攻擊+5 (消耗 ${UPGRADE_COST} 💎) [當前加成: +${permanentData.attackBonus}]`;
}

export function updateExchangeDisplay() {
    let goldToExchange = parseInt(elements.goldAmountInput.value);
    
    if (isNaN(goldToExchange) || goldToExchange <= 0) {
        goldToExchange = 0;
    }
    const stonesResult = Math.floor(goldToExchange / STONE_CONVERSION_RATE);
    elements.exchangeResult.textContent = stonesResult;
}

export function renderInventoryList() {
        elements.inventoryList.innerHTML = ''; 

        if (player.inventory.length === 0) {
            elements.inventoryList.textContent = '你的背包裡空空的。';
            return;
        }

        player.inventory.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('inventory-item');
            
            const typeIcon = item.type === 'weapon' ? '⚔️' : item.type === 'armor' ? '🛡️' : '🧪';
            
            let statInfo = '';
            if (item.type === 'weapon') statInfo = `+${item.attack} 攻擊`;
            else if (item.type === 'armor') statInfo = `+${item.hp} 生命`;
            else if (item.type === 'consumable') statInfo = `+${item.heal} 治療`;

            itemDiv.innerHTML = `${typeIcon} **${item.name}** (${statInfo}) `; // 顯示名稱和屬性
            
            // ----------------------------------------------------
            // --- 裝備或使用按鈕 ---
            const actionButton = document.createElement('button');
            actionButton.style.marginLeft = '10px';

            if (item.type === 'consumable') {
                actionButton.textContent = '使用';
                actionButton.onclick = () => useConsumable(index);
            } else {
                actionButton.textContent = '裝備';
                actionButton.onclick = () => equipItem(index);
            }
            itemDiv.appendChild(actionButton);

            // ----------------------------------------------------
            // --- 販賣按鈕 ---
            const sellPrice = item.value || 0; // 使用 item.value 作為基礎售價
            if (sellPrice > 0) {
                const sellButton = document.createElement('button');
                sellButton.textContent = `販賣 (${sellPrice} 💰)`;
                sellButton.style.marginLeft = '5px';
                sellButton.style.backgroundColor = '#9b59b6'; // 販賣按鈕使用紫色
                sellButton.onclick = () => handleSellItem(index, sellPrice); 

                itemDiv.appendChild(sellButton);
            }
            // ----------------------------------------------------
            
            elements.inventoryList.appendChild(itemDiv);
        });
    }