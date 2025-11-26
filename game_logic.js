import * as State from './state.js'; 

import { 
    saveGame, savePermanentData, loadGame, 
    setCurrentUsername, setGameActive, setIsCombatActive, 
    setCurrentMonster, isInventoryOpen, loadPermanentData, 
    currentUsername,getStoredAccounts, saveAccounts, 
    setIsInventoryOpen,isCombatActive, gameActive,
} from './state.js';

import { MONSTERS, ITEMS, STONE_CONVERSION_RATE, STARTER_LOOT_IDS, UPGRADE_COST, MATERIALS_DATA, } from './config.js';

import { logMessage, updateDisplay, elements, } from './ui_manager.js';

export let currentShopInventory = [];

export function showHowToPlay() {
    const rules = `
        基本流程：
        1. 🛡️ 選擇職業並開始冒險。
        2. 🎒 點選背包可使用道具和販賣道具，遊戲初期有基本裝備。
        3. 🎲 點擊「繼續探險」進入地城。
        4. ⚔️ 遭遇怪物時，點擊「攻擊」進行回合制戰鬥。
        5. 💰 收集金幣和物品。
        6. 🏠 行動步數達到目標後，英雄會自動「返回城鎮」。

        🏠城鎮功能：
        * 返回城鎮時會存檔、治療少量生命。
        * 使用金幣兌換 💎 耀魂石。
        * 使用耀魂石永久強化HP和攻擊力，增強下一次冒險的能力。
        
        🎯目標：
        在地城中探索得越深越好，並收集稀有裝備！
    `;
    
    // 使用 alert 簡潔地顯示說明，您也可以使用更複雜的 Modal 介面
    alert(rules);

    // 可以在日誌中也記錄一條訊息
    logMessage("❓ 玩法說明已顯示。", 'orange');
}

export function toggleInventory() {
    // 關鍵：獲取背包面板元素
    const backpackPanel = elements.inventoryArea; // 從 ui_manager 的 elements 取得

    if (!backpackPanel) {
        logMessage("❌ 致命錯誤：找不到背包區塊！", 'red');
        return; 
    }
    
    // 這些是需要被隱藏的區塊
    let contentToHide = [
        elements.messages,
        elements.hubArea, 
        elements.adventureActions, 
        elements.gameLog,
    ];
    
    if (!isInventoryOpen) {
        // --- [背包開啟] ---
        setIsInventoryOpen(true);
        backpackPanel.style.display = 'block'; 

        contentToHide.forEach(el => {
            if (el) el.style.display = 'none';
        });
        
        renderInventoryList(); 
        renderMaterialInventory(); 
        logMessage("🎒 背包已開啟。", 'white');

    } else {
        // --- [背包關閉] ---
        setIsInventoryOpen(false); 
        backpackPanel.style.display = 'none'; 
        
        // 恢復被隱藏的區塊 (簡化邏輯)
        if (elements.messages) elements.messages.style.display = 'block';
        if (elements.gameLog) elements.gameLog.style.display = 'block';
        if (elements.adventureActions) elements.adventureActions.style.display = 'block';
        if (elements.hubArea) elements.hubArea.style.display = 'block';
        
        // 根據當前狀態恢復按鈕模式
        if (isCombatActive) {
            elements.combatModeButtons.style.display = 'block';
        } else {
            elements.exploreModeButtons.style.display = 'block';
        }
        
        logMessage("🎒 背包已關閉。恢復遊戲介面。", 'white');
    }
}

export function handleMaterialDrop(monsterId) {
    let dropsLogged = 0;

    MATERIALS_DATA.forEach(material => { // MATERIALS_DATA 從 config.js 引入
        if (Math.random() < material.dropRate / 10) {
            
            const materialId = material.id;
            
            // 確保 materials 屬性存在
            if (!State.player.materials[materialId]) {
                State.player.materials[materialId] = 0;
            }

            // 增加素材數量 (每次掉落 1 個)
            State.player.materials[materialId] += 1;
            dropsLogged += 1;
            logMessage(`🧩 獲得素材 [${material.name}]！`, 'cyan');
        }
    });
    
    if (dropsLogged > 0) {
        saveGame();
    }
}

export function getItemById(id) {
    return ITEMS.find(item => item.id === id);
}

export function getMaterialById(id) {
    return MATERIALS_DATA.find(mat => mat.id === id);
}

export function addItemToInventory(item) {
    // 這裡我們只將物品加入到主庫存列表 (player.inventory)
    // ⚠ 注意：使用 State.player
    
    State.player.inventory.push(item);
    saveGame(); // 呼叫 state.js 的儲存函式
    logMessage(`🎁 你獲得了 [${item.name}]！`, 'cyan');
}

export function refreshShopInventory() {
    
    // 1. 根據玩家深度決定商店能賣的最高稀有度
    let maxRarityAvailable = 1; 

    // 假設地城深度達到 5 層解鎖 Rarity 2，達到 15 層解鎖 Rarity 3
    if (State.player.depth >= 15) {
        maxRarityAvailable = 3;
    } else if (State.player.depth >= 5) {
        maxRarityAvailable = 2;
    }

    // 2. 過濾所有可販賣的物品 (ITEMS 從 config.js 引入)
    const sellableItems = ITEMS.filter(item => item.price && item.rarity <= maxRarityAvailable);
    
    // 3. 隨機選取 5 個物品作為當前商店的清單
    const SHOP_SLOTS = 5; 
    let newShopIds = [];
    
    // 確保清單中有足夠的物品
    if (sellableItems.length > 0) {
        for (let i = 0; i < SHOP_SLOTS; i++) {
            const randomIndex = Math.floor(Math.random() * sellableItems.length);
            const item = sellableItems[randomIndex];
            
            // 儲存物品的 ID
            newShopIds.push(item.id); 
        }
    }

    // 4. 更新商店庫存狀態
    currentShopInventory = newShopIds; 
    logMessage(`🛒 雜貨鋪已刷新，販賣 ${currentShopInventory.length} 種物品。`, 'yellow');
}

export function getLootItem() {
    let maxRarity = 1; // 基礎難度，預設只能掉落 Rarity 1 的物品
    
    // 根據深度調整可掉落的最高稀有度
    if (State.player.depth >= 15) {
        maxRarity = 3; 
    } else if (State.player.depth >= 5) {
        maxRarity = 2; 
    }
    
    // 1. 過濾出符合當前深度條件的物品
    let availableItems = ITEMS.filter(item => item.rarity <= maxRarity); // ITEMS 從 config.js 引入
    
    // 2. 應用機率偏好 (讓稀有度低的更容易掉落)
    let weightedItems = [];
    availableItems.forEach(item => {
        let weight = 0;
        if (item.rarity <= 3) {
            weight = 4 - item.rarity; 
        } else {
            weight = 1; // Rarity 4 以上的稀有物品，權重固定為 1
        }
        for (let i = 0; i < weight; i++) {
            weightedItems.push(item);
        }
    });

    // 3. 從加權列表中隨機選取
    const randomIndex = Math.floor(Math.random() * weightedItems.length);
    const selectedItem = weightedItems[randomIndex];

    // 複製物件並返回 (確保不修改原始 config 數據)
    return JSON.parse(JSON.stringify(selectedItem));
}

export function handleExplore() {
    if (!gameActive) { logMessage("請先選擇職業開始冒險！", 'red'); return; }
    if (isCombatActive) return;

    // 1. 更新深度和行動計數
    State.player.actionsSinceTown++;
    State.player.depth++; 
    
    // 2. 鎖定城鎮功能
    if (State.player.actionsSinceTown === 1) { 
        toggleTownAccess(false); 
    }

    if (State.player.actionsSinceTown >= State.player.actionsToTownRequired) {
        logMessage("🏠 行動目標已達成！英雄自動返回城鎮休息和存檔。", 'lightgreen');
        handleRest(true); // 呼叫 handleRest 執行返城邏輯
        return; // 立即結束，不觸發隨機事件
    }

    // 3. 記錄進入的層數
    if (State.player.actionsSinceTown >= State.player.actionsToTownRequired) {
        logMessage("🏠 行動目標已達成！英雄自動返回城鎮休息和存檔。", 'lightgreen');
        handleRest(true); // 呼叫 handleRest 執行返城邏輯
        return; // 立即結束，不觸發隨機事件
    }
    
    // 4. 隨機事件生成與執行
    const eventChance = Math.random(); 
    
    if (eventChance < 0.75) { // 戰鬥機率 75%
        startCombat(); // ⚠ 待實作：啟動戰鬥函式
    } else if (eventChance < 0.85) { // 找到金幣機率 10%
        const foundGold = Math.floor(Math.random() * 20) + 10;
        State.player.gold += foundGold;
        logMessage(`💰 你找到了 ${foundGold} 金幣。`, 'yellow');
        saveGame();
    } else if (eventChance < 0.95) { // 找到裝備機率 10%
        const newItem = getLootItem(); // 呼叫剛定義的函式
        if (newItem) addItemToInventory(newItem);
    } else { // 什麼也沒發生機率 5%
        logMessage("💨 什麼都沒有，繼續向下探索。", 'white');
    }

    // 5. 檢查生命值
    if (State.player.hp <= 0) {
        State.player.hp = 0;
        endGame("death");
        return;
    }
    
    updateDisplay();
}

export function startGame(className, hpBonus, attackBonus, goldBonus) {
    if (gameActive) return;

    // 1. 設置基礎屬性
    const baseHp = 100;
    const baseAttack = 5;
    const baseGold = 100;
    
    // 2. 初始化 Run 數據 
    State.player.maxHp = baseHp + State.permanentData.hpBonus + hpBonus;
    State.player.hp = State.player.maxHp;
    State.player.attack = baseAttack + State.permanentData.attackBonus + attackBonus;
    State.player.gold = baseGold + goldBonus;

    State.player.depth = 1;
    State.player.className = className;
    State.player.defense = 0; // 確保有初始值
    
    State.player.equipment = { weapon: null, armor: null };
    State.player.inventory = [];
    player.materials = {};
    
    // 3. 發放起始道具 
    STARTER_LOOT_IDS.forEach(itemId => { // STARTER_LOOT_IDS 從 config.js 引入
    const item = getItemById(itemId); // 呼叫 getItemById
    if (item) { 
            // 複製物件並加入背包
            const newItem = JSON.parse(JSON.stringify(item));
            addItemToInventory(newItem); // 呼叫 addItemToInventory
        }
    });
    logMessage(`🎁 收到起始補給！`, 'lime');

    // 4. 設定城鎮計數器並啟動遊戲
    State.player.actionsSinceTown = 0; 
    setNewTownGoal(); // 呼叫已定義的函式
    gameActive = true;

    // 5. 切換 UI 進入 Adventure Mode
    if (elements.classSelection) elements.classSelection.style.display = 'none';
    if (elements.adventureActions) elements.adventureActions.style.display = 'block'; 
    enterAdventureMode(); 
    saveGame();

    updateDisplay();
    logMessage(`🎉 選擇了 ${className}！開始你的冒險，進入地牢第 ${State.player.depth} 層。`, 'lime');
}

export function getRandomMonster() {
    
    // 1. Boss 檢查 (深度是 5 的倍數時有 Boss)
    if (State.player.depth > 0 && State.player.depth % 5 === 0) {
        logMessage(`🚨 警報！地城深處傳來強大壓力...`, 'red');
        
        let bossDifficulty = State.player.depth >= 15 ? 5 : 4; // 根據深度決定 Boss 難度
        
        // 從 MONSTERS 中過濾 Boss
        const availableBosses = MONSTERS.filter(m => m.isBoss && m.difficulty === bossDifficulty);
        
        if (availableBosses.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableBosses.length);
            // 複製物件並返回 (避免修改原始數據)
            return JSON.parse(JSON.stringify(availableBosses[randomIndex]));
        }
    }
    
    // 2. 普通怪物生成邏輯
    let targetDifficulty = 1; // 預設為最低難度

    // 根據深度調整難度門檻
    if (State.player.depth >= 30) { 
        targetDifficulty = 3;
    } else if (State.player.depth >= 5) { 
        targetDifficulty = 2;
    }
    
    // 過濾出所有符合條件的普通怪物 (MONSTERS 從 config.js 引入)
    const allAvailableMonsters = MONSTERS.filter(m => !m.isBoss && m.difficulty <= targetDifficulty);
    
    let weightedPool = [];
    
    // 3. 根據難度設定權重 (確保難度分佈合理)
    allAvailableMonsters.forEach(monster => {
        let weight = 0;
        if (monster.difficulty === 2) {
            weight = 5; // 中階怪物權重最高
        } else if (monster.difficulty === 1) {
            weight = 3; // 低階怪物權重中等
        } else if (monster.difficulty === 3) {
            weight = 2; // 高階怪物權重最低
        }
        
        for (let i = 0; i < weight; i++) {
            weightedPool.push(monster);
        }
    });

    if (weightedPool.length === 0) {
        // 如果池子為空，返回最簡單的哥布林
        return JSON.parse(JSON.stringify(MONSTERS.find(m => m.id === 'goblin1'))); 
    }

    // 4. 從加權池中隨機選取
    const randomIndex = Math.floor(Math.random() * weightedPool.length);
    const selectedMonster = weightedPool[randomIndex];
    
    return JSON.parse(JSON.stringify(selectedMonster));
}

export function startCombat() {
    setIsCombatActive(true); 

    const monster = getRandomMonster(); // 使用隨機生成的怪物

    if (!monster) {
        // 如果隨機生成失敗，安全退出
        setIsCombatActive(false);
        logMessage("❌ 系統錯誤：未找到合適的怪物，請嘗試重新探險。", 'red');
        return;
    }
    
    setCurrentMonster(monster); // 🚨 修正點：只使用隨機生成的怪物

    // 🚨 修正點：Log 函式的大小寫
    logMessage(`🚨 你遭遇了 ${State.currentMonster.name} (HP: ${State.currentMonster.hp})！`, 'orange'); 
    logMessage(`--- 請選擇行動 ---`, 'white');

    switchUIMode(true); 
    updateDisplay();
}

export function equipItem(inventoryIndex) {
    const itemToEquip = State.player.inventory[inventoryIndex];
    if (!itemToEquip) return;

    const itemType = itemToEquip.type;
    let oldItem = State.player.equipment[itemType];
    
    // --- 1. 處理卸下舊裝備邏輯 ---
    if (oldItem) {
        State.player.inventory.push(oldItem);
        logMessage(`🔄 卸下了 [${oldItem.name}]，並放回背包。`, 'white');
    }

    // 從背包中移除新物品並裝備
    State.player.inventory.splice(inventoryIndex, 1);
    State.player.equipment[itemType] = itemToEquip;
    logMessage(`✅ 成功裝備 [${itemToEquip.name}]！`, 'yellow');


    // --- 2. 關鍵修正：計算 HP 和 Defense 屬性變動 ---
    
    let hpChange = 0;
    let defenseChange = 0;

    // 計算 HP 變動
    if (itemToEquip.hp) hpChange += itemToEquip.hp;
    if (oldItem && oldItem.hp) hpChange -= oldItem.hp;
    
    // 計算 Defense 變動
    if (itemToEquip.defense) defenseChange += itemToEquip.defense;
    if (oldItem && oldItem.defense) defenseChange -= oldItem.defense;
    
    // 套用變動
    State.player.maxHp += hpChange;
    // 確保當前 HP 不超過上限
    State.player.hp = Math.min(State.player.hp, State.player.maxHp);
    State.player.defense += defenseChange; // 更新玩家的總防禦值
    
    logMessage(`屬性變動：HP 上限 ${hpChange > 0 ? '+' : ''}${hpChange}，防禦 ${defenseChange > 0 ? '+' : ''}${defenseChange}。`, 'yellow');

    // --- 3. 存檔與介面更新 ---
    saveGame(); 
    updateDisplay(); // 統一更新畫面
}

export function useConsumable(inventoryIndex) {
    const itemToUse = State.player.inventory[inventoryIndex];
    if (!itemToUse || itemToUse.type !== 'consumable') return; // 安全檢查

    const healAmount = itemToUse.heal || 0;

    if (healAmount > 0) {
        // 執行治療
        const oldHp = State.player.hp;
        State.player.hp = Math.min(State.player.maxHp, State.player.hp + healAmount);
        const actualHealed = State.player.hp - oldHp;
        
        logMessage(`🧪 使用了 [${itemToUse.name}]，恢復了 ${actualHealed} 點生命。`, 'lightgreen');
    } else {
        logMessage(`[${itemToUse.name}] 沒有可用的治療效果。`, 'red');
    }

    // --- 移除物品 ---
    State.player.inventory.splice(inventoryIndex, 1);
    
    // --- 存檔與介面更新 ---
    saveGame();
    updateDisplay(); 
}

export function handleSellItem(inventoryIndex, sellPrice) {

    if (State.player.actionsSinceTown > 0) {
        logMessage("🔒 必須返回城鎮才能販賣物品！", 'red');
        return;
    }
    // 1. 獲取物品並移除
    const itemToSell = State.player.inventory[inventoryIndex];
    if (!itemToSell) return;

    // 2. 執行販賣 (移除物品)
    State.player.inventory.splice(inventoryIndex, 1);
    
    // 3. 增加金幣
    State.player.gold += sellPrice;

    // 4. 更新狀態與日誌
    logMessage(`💰 成功販賣 [${itemToSell.name}]，獲得 ${sellPrice} 金幣。`, 'gold');

    // 5. 存檔與介面更新
    saveGame();
    updateDisplay(); // 統一更新畫面
}

export function handleSellMaterial(materialId, count, sellPrice) {
    if (State.player.actionsSinceTown > 0) {
        logMessage("🔒 必須返回城鎮才能販賣素材！", 'red');
        return;
    }

    if (!State.player.materials[materialId] || State.player.materials[materialId] === 0) return;

    const totalRevenue = count * sellPrice;
    
    State.player.gold += totalRevenue;
    State.player.materials[materialId] = 0; // 移除所有素材
    
    logMessage(`💰 販賣了 ${count} 個 [${getMaterialById(materialId).name}]，總共獲得 ${totalRevenue} 金幣。`, 'gold');

    saveGame();
    updateDisplay(); // 更新介面，包括素材列表
}

export function enterAdventureMode() {
    elements.currentStageTitle.textContent = "地城探險";

    // 顯示探索模式按鈕，隱藏戰鬥和死亡按鈕
    elements.exploreModeButtons.style.display = 'block';
    elements.combatModeButtons.style.display = 'none';
    elements.deathModeButtons.style.display = 'none'; 
    
    // 確保城鎮區塊隱藏
    elements.hubArea.style.display = 'none'; 

    // 確保主要遊戲內容顯示
    elements.gameContent.style.display = 'block'; 
    
    // 這裡可以根據 State.isInventoryOpen 決定是否顯示背包
    // elements.inventoryArea.style.display = State.isInventoryOpen ? 'block' : 'none'; 
}

export function enterDeathMode() {
    elements.currentStageTitle.textContent = "💀 英雄陣亡";
    
    // 必須隱藏探索和戰鬥模式的按鈕容器！
    if (elements.exploreModeButtons) elements.exploreModeButtons.style.display = 'none'; // 修正點
    if (elements.combatModeButtons) elements.combatModeButtons.style.display = 'none';  // 修正點
    
    // 顯示死亡模式按鈕
    if (elements.deathModeButtons) elements.deathModeButtons.style.display = 'block'; 
    
    // 確保其他非動作區塊隱藏（例如城鎮區塊）
    if (elements.hubArea) elements.hubArea.style.display = 'none'; 
    if (elements.inventoryArea) elements.inventoryArea.style.display = 'none';
}

export function handleUpgradeHp() {
    
    if (State.permanentData.stones >= UPGRADE_COST) {
        State.permanentData.stones -= UPGRADE_COST; 
        State.permanentData.hpBonus += 5; 

        savePermanentData(); 

        updateDisplay();
        logMessage(`恭喜！您消耗了 ${UPGRADE_COST} 💎，永久 HP 上限提升了 5 點。`, 'yellow');

    } else {
        logMessage(`耀魂石不足！需要 ${UPGRADE_COST} 💎 才能升級。`, 'red');
    }
}

export function handleUpgradeAttack() {
    if (State.permanentData.stones >= UPGRADE_COST) {
        State.permanentData.stones -= UPGRADE_COST; 
        State.permanentData.attackBonus += 5;

        savePermanentData(); 

        updateDisplay();
        logMessage(`恭喜！您消耗了 ${UPGRADE_COST} 💎，永久攻擊力提升了 5 點。`, 'yellow');

    } else {
        logMessage(`耀魂石不足！需要 ${UPGRADE_COST} 💎 才能升級。`, 'red');
    }
}

export function calculateTotalAttack() {
    // ⚠ 注意：使用 State.player 替換原本的 player
    let totalAttack = State.player.attack; 
    
    // 裝備加成
    if (State.player.equipment.weapon) {
        totalAttack += State.player.equipment.weapon.attack || 0;
    }

    return totalAttack;
}

export function handleAttack() {
    // ⚠ 注意：使用 State.isCombatActive 和 State.currentMonster 替換原本的變數
    if (!isCombatActive) return;

    const totalAttack = calculateTotalAttack();

    // 1. 玩家先攻
    State.currentMonster.hp -= totalAttack; 
    logMessage(`你攻擊了 ${State.currentMonster.name}，造成 ${totalAttack} 點傷害。`, 'white');
    
    // 2. 檢查勝利 
    if (State.currentMonster.hp <= 0) {
        endCombat(true); 
        return;
    }
    
    // 立即顯示怪物剩餘 HP
    logMessage(`💥 ${State.currentMonster.name} 剩餘 HP: ${State.currentMonster.hp}`, 'yellow');

    // 3. 怪物反擊 - 關鍵修正：應用防禦力減免 最低傷害5點
    const damageReceived = Math.max(5, State.currentMonster.attack - State.player.defense);
    
    // ⚠ 修正點：扣除的是減免後的傷害
    State.player.hp -= damageReceived; 
    logMessage(`❌ ${State.currentMonster.name} 對你造成了 ${damageReceived} 點傷害 (已減免 ${State.player.defense} 防禦)！`, 'red');

    // 4. 檢查死亡
    if (State.player.hp <= 0) {
        State.player.hp = 0;
        
        // *** 關鍵修正點：清除戰鬥旗標 ***
        setIsCombatActive(false); 
        setCurrentMonster(null);
        
        endGame("death"); // 執行死亡回溯邏輯 (
        return; 
    }
    
    // 5. 戰鬥繼續
    updateDisplay(); 
    logMessage(`--- 請選擇下一回合行動 ---`, 'white'); 
}

export function endCombat(isVictory) {
    setIsCombatActive(false);
    
    if (isVictory) {
        const enemy = State.currentMonster;
        
        // 1. 金幣結算 
        const gold = enemy.goldReward;
        State.player.gold += gold;
        logMessage(`💰 擊敗 ${enemy.name}，獲得 ${gold} 金幣。`, 'yellow');

        // 2. 物品掉落 
        if (Math.random() < 0.1) {
            const newItem = getLootItem(); // 呼叫剛定義的函式
            if (newItem) addItemToInventory(newItem); // 呼叫 addItemToInventory
        }
        handleMaterialDrop(enemy.id);

        logMessage(`🏆 戰鬥勝利！進入下一層。`, 'lightgreen');
        
    }
    
    setCurrentMonster(null);
    
    switchUIMode(false); 
    saveGame(); 
    updateDisplay();
}



export function handleExchangeGold() {

    // 只能在城鎮兌換 (actionsSinceTown > 0 時，城鎮功能會鎖定)
    if (State.player.actionsSinceTown > 0) {
        logMessage("🔒 必須返回城鎮才能兌換耀魂石！", 'red');
        return;
    }
    
    // 獲取使用者輸入的金幣數量 (elements 從 ui_manager.js 匯入)
    let goldToExchange = parseInt(elements.goldAmountInput.value);

    // 確保輸入有效且為 10 的倍數 (STONE_CONVERSION_RATE 從 config.js 匯入)
    if (isNaN(goldToExchange) || goldToExchange < STONE_CONVERSION_RATE || goldToExchange % STONE_CONVERSION_RATE !== 0) {
        logMessage(`兌換金額必須是 ${STONE_CONVERSION_RATE} 的倍數！`, 'red');
        return;
    }

    // 檢查玩家金幣是否足夠
    if (State.player.gold < goldToExchange) {
        logMessage(`你的金幣不足 ${goldToExchange}！`, 'red');
        return;
    }

    // 執行兌換
    const stonesGained = goldToExchange / STONE_CONVERSION_RATE;
    
    State.player.gold -= goldToExchange;           // 扣除金幣
    State.permanentData.stones += stonesGained;    // 增加耀魂石

    savePermanentData(); // 儲存永久資料 (耀魂石變動)
    saveGame();          // 儲存 Run Data (金幣變動)

    logMessage(`💰 成功消耗 ${goldToExchange} 金幣，兌換了 ${stonesGained} 💎 耀魂石！`, 'yellow');

    updateDisplay();
    updateExchangeDisplay(); // ⚠ 這裡需要 updateExchangeDisplay (從 ui_manager.js 匯入)
}

export function endGame(reason) {
    // 1. 關鍵：更新遊戲狀態旗標
    setGameActive(false);
    
    // 死亡懲罰邏輯
    if (reason === "death") {
        
        // --- 結算死亡懲罰 ---
        
        // 1. 計算本次冒險獲得的耀魂石 (從 State 和 Config 獲取)
        let goldGainedInRun = State.player.gold;
        let stonesGained = Math.floor(goldGainedInRun / State.STONE_CONVERSION_RATE);
        
        // 2. 更新永久貨幣並儲存
        State.permanentData.stones += stonesGained;
        savePermanentData(); // 呼叫 state.js 的儲存函式
        
        // 3. 輸出結束訊息
        logMessage(`💀 遊戲結束！你在地城第 ${State.player.depth} 層陣亡了。`, 'red');
        logMessage(`本次冒險結算獲得 ${stonesGained} 💎 耀魂石。`, 'yellow');
        
        // 4. 切換到死亡介面
        enterDeathMode(); // 呼叫先前定義的介面切換函式
        
    } else {
        // 非死亡結束 (例如成功返回城鎮)
        logMessage(`🎉 恭喜！冒險結束。`, 'gold');
        enterAdventureMode(); 
    }
    
    // 5. 統一更新畫面
    updateDisplay(); 
}

export function setNewTownGoal() {
    // Math.random() * (最大值 - 最小值 + 1) + 最小值
    // 範圍 5 到 10
    State.player.actionsToTownRequired = Math.floor(Math.random() * 6) + 5; 
    
    logMessage(`✅ 距離下一次返回城鎮，你必須完成 ${State.player.actionsToTownRequired} 次探險。`, 'cyan');
}

export function renderShop() {
    // 獲取商店列表的 DOM 元素 (從 ui_manager.js 匯入)
    elements.shopInventoryList.innerHTML = ''; 

    // 獲取當前的動態清單 (從 game_logic.js 頂部定義)
    const shopList = currentShopInventory || [];

    if (shopList.length === 0) {
        elements.shopInventoryList.textContent = '商店目前沒有可販賣的商品。';
        return;
    }
    
    // 遍歷清單，同時獲取索引 (index)
    shopList.forEach((itemId, index) => { 
        const item = getItemById(itemId); 
        if (!item) return;

        const shopDiv = document.createElement('div');
        shopDiv.classList.add('shop-item');

        const displayType = item.type === 'weapon' ? '⚔️ 武器' : item.type === 'armor' ? '🛡️ 防具' : '🧪 藥水';
        const displayStat = item.attack ? `+${item.attack} 攻` : item.hp ? `+${item.hp} 生命` : item.heal ? `+${item.heal} 治療` : '';

        shopDiv.innerHTML = `${displayType}: **${item.name}** (${displayStat}) 價格: **${item.price}** 💰`;

        const buyButton = document.createElement('button');
        buyButton.textContent = '購買';
        buyButton.style.marginLeft = '10px';
        
        // 🚨 關鍵：綁定購買按鈕到 handleBuyItem
        buyButton.onclick = () => handleBuyItem(item.id, index); 

        // 檢查是否在地城中 (如果 actionsSinceTown > 0，則按鈕禁用)
        if (State.player.actionsSinceTown > 0) {
            buyButton.disabled = true;
            shopDiv.style.opacity = '0.5';
        }

        shopDiv.appendChild(buyButton);
        elements.shopInventoryList.appendChild(shopDiv);
    });
}

export function handleBuyItem(itemId, index) {
    const item = getItemById(itemId); 
    if (!item) return;

    // 檢查是否在地城中 (雙重保險)
    if (State.player.actionsSinceTown > 0) {
        logMessage("🔒 必須返回城鎮才能進行購買！", 'red');
        return;
    }

    const cost = item.price || 0;

    if (State.player.gold >= cost) {
        State.player.gold -= cost; // 扣除金幣
        
        // 複製物品物件並加入背包
        const newItem = JSON.parse(JSON.stringify(item));
        addItemToInventory(newItem); // 呼叫 addItemToInventory

        // 關鍵：從當前商店清單中移除該物品
        if (currentShopInventory) {
            currentShopInventory.splice(index, 1);
        }

        // 存檔與更新介面
        saveGame();
        updateDisplay();
        logMessage(`🛒 成功購買 [${item.name}]，花費 ${cost} 金幣。`, 'lightgreen');
        
        // 重新渲染商店，新的列表將缺少該物品
        renderShop(); 
    } else {
        logMessage(`金幣不足！購買 [${item.name}] 需要 ${cost} 金幣。你目前只有 ${State.player.gold} 💰。`, 'red');
    }
}

export function handleRest() {

    if (!gameActive) return;

    // 1. 檢查是否達到返回城鎮的行動要求
    if (State.player.actionsSinceTown < State.player.actionsToTownRequired) {

        const needed = State.player.actionsToTownRequired - State.player.actionsSinceTown;
        logMessage(`❌ 必須在地城中行動 ${needed} 次才能返回城鎮存檔！`, 'orange');
        return;
    }
    
    // 2. 執行治療
    const healAmount = 10;
    State.player.hp = State.player.maxHp;
    
    // 3. 重置行動計數器並設定新目標
    State.player.actionsSinceTown = 0; 
    setNewTownGoal(); // ⚠ 待實作：設定新的行動目標
    
    // 4. 存檔 (這是遊戲的關鍵存檔點)
    saveGame(); 

    // 5. 啟用城鎮功能並刷新商店
    toggleTownAccess(true); // 呼叫之前定義的函式

    refreshShopInventory()
    renderShop(); // ⚠ 待實作：渲染商店介面

    if (!isAuto) {
        logMessage(`🏠 成功返回城鎮，恢復了 ${healAmount} 點生命，進度已儲存。`, 'lightgreen');
    }

    updateDisplay();
}

export function enterTownMode() {
    
    // 1. 設置標題
   

    // 2. 顯示 Town/Hub 區塊，隱藏戰鬥/死亡區塊
    if (elements.hubArea) elements.hubArea.style.display = 'block';
    
    // 3. 顯示 Explore/Rest 按鈕
    if (elements.exploreModeButtons) elements.exploreModeButtons.style.display = 'block';
    if (elements.combatModeButtons) elements.combatModeButtons.style.display = 'none';
    if (elements.deathModeButtons) elements.deathModeButtons.style.display = 'none';
    
    // 4. 確保不該出現的元素被隱藏
    if (elements.classSelection) elements.classSelection.style.display = 'none';
    if (elements.inventoryArea) elements.inventoryArea.style.display = 'none'; 

    // 5. 確保城鎮功能開啟 (交易/升級)
    toggleTownAccess(true);

    // 6. 刷新商店 (這兩個函式需要之後補齊)
    refreshShopInventory(); 
    renderShop();
}

export function handleRevive() {
    // 1. 載入上次成功的存檔點
    const success = loadGame(); // ⚠ 呼叫 State 模組的 loadGame

    if (success) {
        // 2. 復原成功，將遊戲標記為活躍
        setGameActive(true);
        
        // 3. 輸出訊息
        logMessage(`✨ 復原成功！你回到了上一個城鎮存檔點 (深度 ${State.player.depth} 層)。`, 'green');
        
        // 4. 切換回城鎮介面
        enterTownMode(); 
        
    } else {
        logMessage(`❌ 無法找到存檔！請重新選擇職業開始新遊戲。`, 'red');
        // 這裡可以導向職業選擇介面，邏輯會在 initializeGame 中處理
    }
    updateDisplay(); // 統一更新畫面
}

export function toggleTownAccess(canAccess) {
    
    // 鎖定/解鎖按鈕
    if (elements.upgradeHpBtn) elements.upgradeHpBtn.disabled = !canAccess;
    if (elements.upgradeAttackBtn) elements.upgradeAttackBtn.disabled = !canAccess;
    if (elements.exchangeBtn) elements.exchangeBtn.disabled = !canAccess;

    // 顯示/隱藏鎖定訊息 (hubInteractiveContent 和 townLockoutMessage 需要在 HTML/UI Manager 中正確設置)
    if (elements.hubInteractiveContent && elements.townLockoutMessage) {
        // ⚠ 這裡需要您檢查 HTML/UI Manager 是否有這兩個 ID，如果沒有，請註解掉
        if (canAccess) {
            // elements.hubInteractiveContent.style.display = 'block';
            // elements.townLockoutMessage.style.display = 'none';
            // logMessage("🔓 已返回城鎮，可以使用升級與兌換功能。", 'green');
        } else {
            // elements.hubInteractiveContent.style.display = 'none';
            // elements.townLockoutMessage.style.display = 'block';
            // logMessage("🔒 離開城鎮，強化與交易功能已鎖定。", 'orange');
        }
    }
}

export function switchUIMode(isCombat) {
    if (isCombat) {
        elements.exploreModeButtons.style.display = 'none';
        elements.combatModeButtons.style.display = 'block';
    } else {
        elements.exploreModeButtons.style.display = 'block';
        elements.combatModeButtons.style.display = 'none';
    }
}

export function handleEscape() {
    if (!isCombatActive) return;

    const escapeChance = 0.5; // 50% 基礎逃跑機率

    if (Math.random() < escapeChance) {
        logMessage(`🏃 成功逃離戰鬥！`, 'green');
        endCombat(false); // 結束戰鬥，返回探索模式
    } else {
        logMessage(`🛑 逃跑失敗！怪物趁機攻擊你！`, 'red');
        
        // 逃跑失敗懲罰：怪物免費攻擊一次
        const damageReceived = Math.max(1, State.currentMonster.attack - State.player.defense);
        State.player.hp -= damageReceived;
        logMessage(`❌ ${State.currentMonster.name} 趁亂造成了 ${damageReceived} 點傷害！`, 'red');
        
        // 檢查死亡
        if (State.player.hp <= 0) {
            State.player.hp = 0;
            endGame("death");
            return;
        }
        updateDisplay();
        logMessage(`--- 戰鬥繼續：請選擇下一回合行動 ---`, 'white');
    }
}

export function initializeGame() {
    
    // 1. 載入永久數據
    loadPermanentData(); 

    // 2. 嘗試載入 Run Data (上次的存檔)
    if (loadGame()) {
        // 載入成功，直接進入冒險模式
        logMessage(`歡迎回來，${currentUsername}！已載入角色 [${State.player.className}] 於地城第 ${State.player.depth} 層的進度。`, 'cyan');
        
        setGameActive(true);
        enterTownMode(); 
        
    } else {
        // 無存檔，顯示職業選擇介面
        logMessage("歡迎來到地下城冒險！請選擇你的職業來創建新角色。", 'white');
        
        if (elements.classSelection) elements.classSelection.style.display = 'flex'; 
        if (elements.adventureActions) elements.adventureActions.style.display = 'none'; 
        if (elements.hubArea) elements.hubArea.style.display = 'block';
        if (elements.exploreModeButtons) elements.exploreModeButtons.style.display = 'none';
        
        const initialPlayerState = { 
            hp: 0, maxHp: 0, attack: 0, defense: 0, gold: 0, depth: 0, 
            className: "", equipment: { weapon: null, armor: null }, 
            inventory: [], materials: {},
            actionsSinceTown: 0, actionsToTownRequired: 0 
        };
        
        Object.assign(State.player, initialPlayerState); // 覆蓋現有物件的屬性，不會引發 TypeError
    }

    // 介面更新
    updateDisplay();
}

export function handleSuccessfulLogin(username) {
    // 設置當前使用者名稱
    setCurrentUsername(username);
    
    // 在本地儲存帳號狀態 (用於下次檢查)
    localStorage.setItem('local_username', username);

    // 介面切換 (使用 ui_manager 的 elements)
    elements.loggedOutView.style.display = 'none';
    elements.loggedInView.style.display = 'block';
    elements.currentUsernameDisplay.textContent = username;
    elements.gameContent.style.display = 'block';

    // 啟動遊戲 (載入永久數據和 Run Data)
    initializeGame();
}

export function handleCreateAccount() {
    // 1. 從 UI 元素中獲取輸入值
    const username = elements.usernameInput.value.trim();
    const password = elements.passwordInput.value.trim();

    if (username.length < 3 || password.length < 3) {
        logMessage("帳號和密碼長度至少需要 3 個字元。", 'orange');
        return;
    }

    // 2. 從 State 模組獲取所有帳號
    let accounts = getStoredAccounts();
    const userExists = accounts.some(acc => acc.username === username);

    // 3. 檢查帳號是否已存在
    if (userExists) {
        logMessage("❌ 帳號已存在，請直接登入。", 'red');
        return;
    }

    // 4. 創建新帳號並儲存
    accounts.push({ username: username, password: password });
    saveAccounts(accounts); // 呼叫 State 模組的儲存函式
    
    logMessage(`🎉 帳號 ${username} 創建成功！已自動為您登入。`, 'green');

    // 5. 處理成功登入
    handleSuccessfulLogin(username);

    // 6. 清除輸入框內容
    elements.usernameInput.value = '';
    elements.passwordInput.value = '';
}

export function handleLogin() {
    
    // 1. 從 UI 元素中獲取輸入值 (使用 ui_manager 的 elements)
    const username = elements.usernameInput.value.trim();
    const password = elements.passwordInput.value.trim();

    if (!username || !password) {
        logMessage("請輸入帳號和密碼。", 'orange');
        return;
    }

    // 2. 從 State 模組獲取所有帳號
    const accounts = getStoredAccounts();
    const userAccount = accounts.find(acc => acc.username === username);

    // 3. 驗證帳號和密碼
    if (userAccount && userAccount.password === password) {
        logMessage(`歡迎，${username}！登入成功。`, 'green');
        
        // 4. 處理成功登入，並啟動遊戲流程
        handleSuccessfulLogin(username);

        // 5. 清除輸入框內容 (UI 更新)
        elements.usernameInput.value = '';
        elements.passwordInput.value = '';
        
    } else {
        // 6. 登入失敗
        logMessage("❌ 帳號或密碼錯誤。", 'red');
    }
}

export function handleLogout() {
    // 1. 清除本地儲存的登入狀態
    localStorage.removeItem('local_username');

    // 2. 重置 State 中的用戶名
    currentUsername = null;
    
    // 3. 輸出訊息
    logMessage(`👋 ${State.player.className} 已登出。`, 'white');

    // 4. 切換介面回登入畫面
    elements.loggedOutView.style.display = 'block';
    elements.loggedInView.style.display = 'none';
    elements.gameContent.style.display = 'none';
    elements.classSelection.style.display = 'none';
    
    // 5. 清除遊戲數據 (確保下次登入是新進度)
    Object.assign(State.player, {
        hp: 0, maxHp: 0, attack: 0, defense: 0, gold: 0, depth: 0, className: "", 
        equipment: { weapon: null, armor: null }, inventory: [], materials: {}, 
        actionsSinceTown: 0, actionsToTownRequired: 0 
    });
    
    updateDisplay();
}

export function checkLocalLogin() {
    const storedUsername = localStorage.getItem('local_username'); 

    if (storedUsername) {
        // 如果找到帳號，直接進入成功登入流程
        handleSuccessfulLogin(storedUsername); // 🚨 讓統一流程處理初始化
    } else {
        // 未登入：只顯示登入介面
        logMessage("請登入或創建帳號來開始冒險。", 'orange');
        
        elements.gameContent.style.display = 'none';
        elements.loggedOutView.style.display = 'block';
    }
}