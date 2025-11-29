import * as State from './state.js'; 

import { 
    saveGame, savePermanentData, loadGame, 
    setCurrentUsername, setGameActive, setIsCombatActive, 
    setCurrentMonster, isInventoryOpen, loadPermanentData, 
    currentUsername,getStoredAccounts, saveAccounts, 
    setIsInventoryOpen,isCombatActive, gameActive,
} from './state.js';

import { MONSTERS, ITEMS, STONE_CONVERSION_RATE, STARTER_LOOT_IDS, UPGRADE_COST, MATERIALS_DATA, } from './config.js';

import { logMessage, updateDisplay, elements, 
        renderInventoryList, renderMaterialInventory, 
        updateExchangeDisplay, getItemIcon } from './ui_manager.js';

export let currentShopInventory = [];
let currentCodexFilter = 'all';

function openModal(title, content, modalClass) {

    if (!elements.modalBody || !elements.modalContent || !elements.modalTitle) {
        alert("模態框元素載入失敗，請檢查 index.html 的 modal 結構。");
        return; 
    }
    // 1. 清理舊的樣式類別
    elements.modalBody.classList.remove('rules-modal', 'update-modal', 'codex-modal'); // 確保 codex-modal 被清理
    
    // 2. 應用新的類別，這會觸發 style.css 中的獨立樣式
    elements.modalBody.classList.add(modalClass);

    // 3. 注入內容並顯示
    elements.modalTitle.textContent = title;
    elements.modalContent.textContent = content;
    elements.modalBackdrop.style.display = 'flex'; 

    // 4. 重新綁定關閉邏輯
    elements.modalCloseBtn.onclick = () => {
        elements.modalBackdrop.style.display = 'none';
        // 額外保險：關閉時隱藏篩選器（針對可能的圖鑑殘留）
        if (elements.codexFilters) elements.codexFilters.style.display = 'none';
    };
    
    logMessage(`🔔 顯示模態框: ${title}`, 'orange');
}

export function showHowToPlay() {
    const rules = `
    💧基本流程 : 
        1. 🛡️ 選擇職業並開始冒險。
        2. 🎒 點選背包可使用道具和販賣道具，遊戲初期有基本裝備。
        3. 🎲 點擊「繼續探險」進入地城。
        4. ⚔️ 遭遇怪物時，點擊「攻擊」進行回合制戰鬥。
        5. 💰 收集金幣和物品。
        6. 🏠 每完成7次行動,會自動返回城鎮。

    🏠城鎮功能 : 
        * 返回城鎮時會存檔、治療生命。
        * 使用金幣兌換 💎 耀魂石。
        * 使用耀魂石永久強化HP和攻擊力,增強下一次冒險的能力。
        * 刷新商店以購買更強力的裝備,層數越深可遇見道具稀有度越高。
        
    🗡️戰鬥守則 :
        * 每次攻擊會根據裝備加成對怪物造成傷害。
        * 防禦力會減少所受傷害,最小所受傷害為5。
        * 逃跑有機率失敗，失敗會讓怪物免費攻擊一次(全額傷害)。
        * 每20層會遇到一個Boss怪物。
        * 每250層會遇見奧利哈鋼幻影Boss,擊敗會掉落專屬道具。
        * 每1000層會遇見奧利哈鋼之軀Boss,擊敗會掉落專屬道具。
        * 每10000層會遇見奧利哈鋼之神Boss,擊敗會掉落專屬道具。
        
    🎯目標 : 
        * 在地城中探索得越深越好，並收集稀有裝備！
        * 祝你遊戲愉快！🎉
        
    `;

    if (elements.codexFilters) {
        elements.codexFilters.style.display = 'none'; 
    }
    
    const title = "❓ 遊戲提示與規則";
    openModal(title, rules, 'rules-modal'); 
}

export function showUpdateLog() {
    const updateLog = `

- 調整人物基礎體質 >> HP:150, ATK:15, DEF:10, GOLD:150
- 調整怪物刷新難度
- 新增特殊boss掉落素材
- 調整初始補給
- 下調"奧利哈鋼之軀"強度 >> hp: 737373, attack: 777, defense: 777
- 下調"奧利哈鋼之神"強度 >> hp: 77777777, attack: 77777, defense: 7777
- 新增擊敗"奧利哈鋼之神"掉落道具(非素材類) >> 
    奧利哈鋼之神劍-亞特蘭提斯
    奧利哈鋼之神盔-柏拉圖之視
    奧利哈鋼之神甲-失落帝國
    奧利哈鋼之神鱗-海格力斯
    奧利哈鋼之神心-克里提亞
    奧利哈鋼之神眼-蒂邁歐

    `;
    
    if (elements.codexFilters) {
        elements.codexFilters.style.display = 'none'; 
    }

    const title = "V3.01 遊戲更新日誌";
    openModal(title, updateLog, 'update-modal'); 
}

function renderCodexContent(filter) {

    let htmlContent = `<div id="codex-grid" style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: flex-start;">`;

    // 1. 根據篩選條件過濾道具
    const filteredItems = ITEMS.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    if (filteredItems.length === 0) {
        return `<p style="text-align: center; color: #e74c3c;">該分類下沒有道具。</p>`;
    }

    // 2. 遍歷並建立卡片 HTML
    filteredItems.forEach(item => {
        
        const isKnown = State.permanentData.knownItems.includes(item.id);
        const icon = getItemIcon(item.type);
        const rarityStars = item.rarity + '⭐';
        const introText = (item.intro ? `${item.intro}` : '');

        let nameColor = isKnown ? '#ccc' : '#444';
        let itemName = isKnown ? item.name : '???';
        let rarityColor = '#ccc';

        let itemDisplayHtml = '';
        if (isKnown) {
            // 如果道具已知且有圖片路徑，則使用 <img>
            if (item.image) {
                // 設置圖片尺寸為 40x40 像素（根據卡片大小調整）
                itemDisplayHtml = `<img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain;">`;
            } else {
                // 如果已知但沒有圖片路徑，則回退到通用圖示
                itemDisplayHtml = getItemIcon(item.type); 
            }
        } else {
            // 道具未知時顯示問號圖標
            itemDisplayHtml = '❓'; 
        }

        if (isKnown) {
            if (item.rarity >= 10) {            // 神話
                nameColor = '#d30e0eff'; 
            }else if (item.rarity >= 7) {       //傳說
                nameColor = '#c300ffce';      
            } else if (item.rarity >= 5) {      //稀有
                nameColor = '#1d62e2ff';      
            } else if (item.rarity >= 3) {      //普通
                nameColor = '#13a30eff';      
            }
        }

        // 為了節省空間，我們在這裡使用內聯樣式來替代 CSS 類別
        const itemCardHtml = `
        <div class="codex-card" style="width: 150px; height: 160px; padding: 10px; background: #282828; border: 1px solid #6b5d4d; border-radius: 8px; text-align: center; display: flex; flex-direction: column; justify-content: space-around; align-items: center; ${isKnown ? '' : 'opacity: 0.5;'}">
                
                <div style="font-size: 2em; margin-bottom: 5px;">${itemDisplayHtml}</div> <div style="font-weight: bold; color: ${nameColor}; line-height: 1.2; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${itemName}</div>
                
                <div style="font-size: 0.8em; color: ${rarityColor};">${rarityStars}</div>

                <div style="font-size: 0.2em; color: #a9a9a9; height: 35px; overflow: hidden; text-overflow: ellipsis; font-style: italic; margin-top: 5px; text-align: center; width: 100%;">${introText}
                </div>
                
            </div>
        `;
        htmlContent += itemCardHtml;
    });

    htmlContent += `</div>`;
    return htmlContent;
}

function updateCodexDisplay(filterType) {
    currentCodexFilter = filterType;
    const contentHtml = renderCodexContent(filterType);
    
    const totalItems = ITEMS.length; 
    
    // 計算已解鎖道具數 (從 state.js 的 permanentData.knownItems 取得)
    const knownItemsCount = State.permanentData && 
                            State.permanentData.knownItems && 
                            Array.isArray(State.permanentData.knownItems) 
                            ? State.permanentData.knownItems.length 
                            : 0;
    
    // 創建進度顯示 HTML
    const progressDisplay = `
        <div style="text-align: center; margin: 0 0 2px 0; font-weight: bold; font-size: 1.1em; color: #f39c12; border-bottom: 2px solid #3d3326; padding-bottom: 5px;">
            收集進度: ${knownItemsCount} / ${totalItems}
        </div>
    `;

    // 設置標題和內容
    elements.modalTitle.textContent = "📜 道具圖鑑";
    elements.modalContent.innerHTML = progressDisplay + contentHtml;
}

export function toggleCodex() {
    // 檢查圖鑑面板是否已經開啟 (使用模態框的背景)
    const isCodexOpen = elements.modalBackdrop.style.display === 'flex'; 

    // 關鍵安全檢查：確保過濾器父容器存在
    if (!elements.codexFilters) {
        logMessage("❌ 錯誤：圖鑑篩選容器 (codexFilters) 未載入。", 'red');
        return; 
    }

    if (!isCodexOpen) {
        // --- 開啟圖鑑 ---
        try { 
            updateCodexDisplay('all'); // 預設顯示所有道具
            elements.codexFilters.style.display = 'block';
            // 設置模態框樣式
            elements.modalBody.classList.remove('rules-modal', 'update-modal'); 
            elements.modalBody.classList.add('codex-modal');
            
            elements.modalBackdrop.style.display = 'flex';
            
            // 綁定篩選按鈕事件 (使用事件委派)
            elements.codexFilters.onclick = (e) => {
                e.preventDefault(); 
                
                let target = e.target;
                
                // 向上查找，確保找到帶有 data-filter 屬性的按鈕
                if (target.tagName !== 'BUTTON') {
                    target = target.closest('BUTTON');
                }
                
                const filter = target ? target.getAttribute('data-filter') : null;

                if (filter) {
                    try { // 【關鍵修正 2：在篩選點擊時加入 Try-Catch】
                        // 添加視覺反饋
                        document.querySelectorAll('#codex-filters button').forEach(btn => {
                            btn.style.opacity = (btn.getAttribute('data-filter') === filter) ? '1.0' : '0.6';
                        });
                        
                        updateCodexDisplay(filter); // 呼叫渲染
                    } catch (err) {
                        logMessage("❌ 篩選失敗，請檢查道具數據。", 'red');
                        console.error("Codex Filter Execution Error:", err);
                    }
                }
            };

            logMessage("📜 道具圖鑑已開啟。", 'cyan');
        } catch (error) {
            logMessage("❌ 圖鑑啟動失敗，請檢查 HTML 結構。", 'red');
            console.error("Codex Startup Error:", error);
        }

    } else {
        // --- 關閉圖鑑 ---
        elements.modalBackdrop.style.display = 'none';
        elements.modalContent.innerHTML = ''; // 清理內容
        elements.modalBody.classList.remove('codex-modal');
        
        elements.codexFilters.style.display = 'none';
        // 移除事件綁定
        elements.codexFilters.onclick = null; 
        
        logMessage("📜 道具圖鑑已關閉。", 'cyan');
    }
}

export function toggleInventory() {
    // 關鍵：獲取背包面板元素
    const backpackPanel = elements.inventoryArea;

    if (!backpackPanel) {
        logMessage("❌ 致命錯誤：找不到背包區塊！", 'red');
        return; 
    }
    
    // 這些是需要被隱藏的區塊 (簡化列表，但確保遊戲核心內容隱藏)
    let contentToHide = [
        elements.messages,
        elements.hubArea, 
        elements.adventureActions, 
        elements.gameLog,
        elements.controlsArea,
    ];
    
    if (!State.isInventoryOpen) {
        // --- [背包開啟] ---
        setIsInventoryOpen(true);
        backpackPanel.style.display = 'block'; 

        // 隱藏所有與背包衝突的介面
        contentToHide.forEach(el => {
            if (el) el.style.display = 'none';
        });
        
        // 額外隱藏按鈕區塊，避免在背包打開時看到
        elements.exploreModeButtons.style.display = 'none';
        elements.combatModeButtons.style.display = 'none';
        
        // 渲染背包內容
        renderInventoryList(); 
        renderMaterialInventory(); 
        logMessage("🎒 背包已開啟。", 'white');

    } else {
        // --- [背包關閉] ---
        setIsInventoryOpen(false); 
        backpackPanel.style.display = 'none'; 
        
        // 1. 恢復所有核心 UI 區塊 (日誌、控制台總區)
        if (elements.controlsArea) elements.controlsArea.style.display = 'block'; // 恢復「下一步行動」總容器
        if (elements.messages) elements.messages.style.display = 'block';
        if (elements.gameLog) elements.gameLog.style.display = 'block';

        // 【關鍵修正 1：無條件恢復城鎮區塊】
        if (elements.hubArea) elements.hubArea.style.display = 'block'; 

        // 2. 根據狀態精確恢復按鈕模式
        if (State.isCombatActive) {
            // 戰鬥中：只顯示戰鬥按鈕
            elements.combatModeButtons.style.display = 'block';
            elements.exploreModeButtons.style.display = 'none';
            if (elements.adventureActions) elements.adventureActions.style.display = 'block'; 
            
        } else {
            // 探索/城鎮狀態 (非戰鬥)：
            elements.exploreModeButtons.style.display = 'block';
            elements.combatModeButtons.style.display = 'none';
            if (elements.adventureActions) elements.adventureActions.style.display = 'block';
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
   
}

export function getItemById(id) {
    return ITEMS.find(item => item.id === id);
}

export function getMaterialById(id) {
    return MATERIALS_DATA.find(mat => mat.id === id);
}

export function addItemToInventory(item) {
    
    State.player.inventory.push(item);
    logMessage(`🎁 你獲得了 [${item.name}]！`, 'cyan');

    // 確保 item.id 存在，且該 ID 尚未被記錄
    if (item.id && !State.permanentData.knownItems.includes(item.id)) {
        State.permanentData.knownItems.push(item.id);
        logMessage(`📜 道具 [${item.name}] 已記錄到圖鑑！`, 'yellow');
        State.savePermanentData(); // 儲存永久數據
    }
}

export function refreshShopInventory() {
    
    // 1. 根據玩家深度決定商店能賣的"最高"稀有度
    let maxRarityAvailable = 1; 

    if (State.player.depth >= 250) { 
        maxRarityAvailable = 9; // 150 層或以上解鎖最高販賣級別 Rarity 9
    } else if (State.player.depth >= 200) { 
        maxRarityAvailable = 8;
    } else if (State.player.depth >= 120) { 
        maxRarityAvailable = 7;
    } else if (State.player.depth >= 90) { 
        maxRarityAvailable = 6;
    } else if (State.player.depth >= 60) { 
        maxRarityAvailable = 5;
    } else if (State.player.depth >= 40) { 
        maxRarityAvailable = 4;
    } else if (State.player.depth >= 20) { 
        maxRarityAvailable = 3;
    } else if (State.player.depth >= 10) { 
        maxRarityAvailable = 2;
    }

    // 2. 過濾所有可販賣的物品 (ITEMS 從 config.js 引入)
    const sellableItems = ITEMS.filter(item => item.price && item.rarity <= maxRarityAvailable);
    
    // 3. 隨機選取 5 個物品作為當前商店的清單
    const SHOP_SLOTS = 5; 
    let newShopIds = [];
    
    // 確保清單中有足夠的物品
    if (sellableItems.length > 0) {
    let weightedPool = [];

    sellableItems.forEach(item => {
        // 使用道具的 Rarity 數值作為權重 
        let weight = item.rarity || 1; 
        for (let i = 0; i < weight; i++) {
            weightedPool.push(item.id); // 將 ID 加入加權池，次數等於權重
        }
    });

    if (weightedPool.length > 0) {
        for (let i = 0; i < SHOP_SLOTS; i++) {
            // 從加權池中隨機選一個
            const randomIndex = Math.floor(Math.random() * weightedPool.length);
            const itemId = weightedPool[randomIndex];

            newShopIds.push(itemId);
        }
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

export function endGame(reason) {
    // 1. 關鍵：更新遊戲狀態旗標
    setGameActive(false);
    
    // 死亡懲罰邏輯
    if (reason === "death") {
        
        // --- 結算死亡懲罰 ---
        
        // 1. 計算本次冒險多賺的金幣 相對於上次存檔
        // 🚨 關鍵修正：確保 player.gold 是數字
        let currentGold = parseFloat(State.player.gold) || 0; 
        let lastRestGold = parseFloat(State.player.goldAtLastRest) || 0; 
        
        let newlyGainedGold = currentGold - lastRestGold;
        if (newlyGainedGold < 0) newlyGainedGold = 0; 

        // 2. 應用懲罰：遺失一半多賺的金幣
        const goldLost = Math.floor(newlyGainedGold / 2);
        const goldRetained = newlyGainedGold - goldLost;
        
        // 3. 更新玩家金幣總額：恢復到上次存檔點金幣 + 保留的金幣
        State.player.gold = lastRestGold + goldRetained;
        
        // 4. 計算並結算耀魂石 (使用遺失前的總金幣計算，但只用於顯示)
   
        let stonesGained = Math.floor(newlyGainedGold / STONE_CONVERSION_RATE); 

        saveGame(); 

        // 5. 輸出結束訊息
        logMessage(`💀 遊戲結束！你在地城第 ${State.player.depth} 層陣亡了。`, 'red');
        
        // 6. 切換到死亡介面
        enterDeathMode(); 
        
    } else {
        // 非死亡結束
        logMessage(`🎉 恭喜！冒險結束。`, 'gold');
        enterAdventureMode(); 
    }
    
    // 7. 統一更新畫面
    updateDisplay(); 
}

export function handleExplore() {
    if (!gameActive) { logMessage("請先選擇職業開始冒險！", 'red'); return; }
    if (isCombatActive) return;

    const nextDepth = State.player.depth + 1;
    const isBossLayer = nextDepth > 0 && 
                        (nextDepth % 25 === 0 || nextDepth % 20 === 0);
                        
    // ⭐ 關鍵修正 A: Boss 優先級判定
    // 檢查下一層是否為 Boss 樓層，且當前回城計數器已滿
    if (isBossLayer) {
        if (State.player.actionsSinceTown >= State.player.actionsToTownRequired) {
            
            // 讓行動計數器減 1，防止自動回城邏輯觸發
            State.player.actionsSinceTown = State.player.actionsToTownRequired - 1;
            logMessage("🚨 注意！ Boss 就在眼前，先完成戰鬥才能返回城鎮！", 'orange');
        }
    }

    // 1. 更新深度和行動計數
    State.player.actionsSinceTown++;
    State.player.depth++; 
    
    // 2. 鎖定城鎮功能
    if (State.player.actionsSinceTown === 1) { 
        toggleTownAccess(false); 
    }

    // 3. 檢查是否達到自動回城條件
    if (State.player.actionsSinceTown >= State.player.actionsToTownRequired) {
        logMessage("🏠 行動目標已達成！自動返回城鎮休息和存檔。", 'lightgreen');
        handleRest(true); // 呼叫 handleRest 執行返城邏輯
        return; // 立即結束，不觸發隨機事件
    }
    
    // 4. 記錄進入的層數
    const needed = State.player.actionsToTownRequired - State.player.actionsSinceTown;
    logMessage(`--- 進入地城第 ${State.player.depth} 層 (需再行動 ${needed} 次才能返回城鎮) ---`, 'cyan'); 
    
    // 5. 隨機事件生成與執行
    const eventChance = Math.random(); 
    let eventHappened = false; 

    // ⭐ 關鍵修正 B: Boss 樓層強制戰鬥
    if (isBossLayer) { 
        startCombat(); // Boss 樓層直接執行戰鬥
        eventHappened = true;
    } 
    
    // 5b. 非 Boss 樓層的普通隨機事件判定
    if (!eventHappened) { 
        
        if (eventChance < 0.75) { 
            // 75% 機率戰鬥
            startCombat();
            eventHappened = true;
        } 
        else if (eventChance < 0.85) { 
            // 找到金幣 (10% 機率)
            const foundGold = Math.floor(Math.random() * 20) + 10;
            State.player.gold += foundGold;
            logMessage(`💰 你找到了 ${foundGold} 金幣。`, 'yellow');
            eventHappened = true;
        } else if (eventChance < 0.95) { 
            // 找到裝備 (10% 機率)
            const newItem = getLootItem(); 
            if (newItem) {
                 addItemToInventory(newItem); 
                 eventHappened = true;
            }
        } else { 
            // 5% 機率空手而歸
            logMessage("💨 什麼都沒有，繼續向下探索。", 'white');
            eventHappened = true;
        }
    }

    // 6. 檢查生命值
    if (State.player.hp <= 0) {
        State.player.hp = 0;
        endGame("death");
        return;
    }
    
    updateDisplay();
}

export function startGame(className, hpBonus, attackBonus, goldBonus, defenseBonus, critChanceBonus) {

    // 檢查狀態
    if (State.gameActive) return; 

    const baseHp = 150;
    const baseAttack = 15;
    const baseDefense = 10;
    const baseCrit = 0.05;
    const baseGold = 150;

    // 2. 初始化 Run 數據 
    State.player.maxHp = baseHp + State.permanentData.hpBonus + hpBonus;
    State.player.hp = State.player.maxHp;
    State.player.attack = baseAttack + attackBonus; 
    State.player.gold = baseGold + goldBonus;
    State.player.depth = 1;
    State.player.className = className;
    State.player.defense = baseDefense + defenseBonus; 
    State.player.critChance = baseCrit + critChanceBonus;
    State.player.inventory = [];
    State.player.materials = {};
    State.player.goldAtLastRest = State.player.gold;
    State.player.equipment = { 
        weapon: null, //武器
        helmet: null, //頭盔
        armor: null,  //胸甲
        greaves: null, //護脛
        necklace: null, //項鍊
        ring: null, //戒指
    }; 
    

    // 3. 發放起始道具 
    STARTER_LOOT_IDS.forEach(itemId => { 
        const item = getItemById(itemId); 
        if (item) { 
            const newItem = JSON.parse(JSON.stringify(item));
            addItemToInventory(newItem); 
        }
    });
    logMessage(`🎁 收到起始補給！`, 'lime');

    // 4. 設定城鎮計數器並啟動遊戲
    State.player.actionsSinceTown = 0; 
    setNewTownGoal(); 
    State.setGameActive(true); 

    // 5. 切換 UI 進入 Adventure Mode (按鈕切換)
    if (elements.classSelection) elements.classSelection.style.display = 'none'; 
    if (elements.adventureActions) elements.adventureActions.style.display = 'block';
    
    enterAdventureMode(); 
    saveGame(); 

    updateDisplay();
    logMessage(`🎉 選擇了 ${className}！開始你的冒險`, 'lime');
}

export function getRandomMonster() {
    
    const currentDepth = State.player.depth;
    
    // 1. Boss 檢查 (只在 25 的倍數時運行)
    if (currentDepth > 0 && currentDepth % 25 === 0) { 
        
        let bossId = null;
        
        // 【特殊 Boss 優先級判斷】
        if (currentDepth === 10000) { 
            bossId = 'ori-god'; 
            logMessage('🚨 警報！奧利哈鋼神即將降臨...', 'red'); 
        } else if (currentDepth % 1000 === 0) { 
            bossId = 'ori-body'; 
            logMessage('🚨 警報！奧利哈鋼之軀準備就緒...', 'red'); 
        } else if (currentDepth % 250 === 0) { 
            bossId = 'ori-shadow'; 
            logMessage('🚨 警報！奧利哈鋼幻影現身...', 'red');
        } 
        // 2. 處理一般 Boss 
        else { 
            let bossDifficulty = currentDepth >= 60 ? 5 : 4;
            const availableBosses = MONSTERS.filter(m => m.isBoss && m.difficulty === bossDifficulty);
            
            if (availableBosses.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableBosses.length);
                bossId = availableBosses[randomIndex].id;
                logMessage(`🚨 警報！地城深處傳來強大壓力...`, 'red'); 
            }
        }
        
        // 3. 返回 Boss 怪物 (如果找到了 Boss)
        if (bossId) {
            const boss = MONSTERS.find(m => m.id === bossId);
            if (boss) {
                return JSON.parse(JSON.stringify(boss));
            }
        }
        
        // 🚨 修正：如果在 Boss 樓層但找不到 Boss 數據（如 ID 拼寫錯誤），則返回最簡單的怪物作為保險
        // 這是防止 Boss 樓層邏輯執行失敗後，繼續執行下面的普通怪物抽選。
        return JSON.parse(JSON.stringify(MONSTERS.find(m => m.id === 'goblin1'))); 
    }
    
    // ----------------------------------------------------
    // 普通怪物生成邏輯 (只有在不是 Boss 樓層時運行)
    // ----------------------------------------------------
    
    let targetDifficulty = 1;

    // 根據深度調整難度門檻
    if (currentDepth >= 250) { 
        targetDifficulty = 4; 
    } else if (currentDepth >= 150) { 
        targetDifficulty = 3; 
    } else if (currentDepth >= 50) { 
        targetDifficulty = 2; 
    } else {
        targetDifficulty = 1; 
    }
    
    const allAvailableMonsters = MONSTERS.filter(m => !m.isBoss && m.difficulty <= targetDifficulty);
    
    let weightedPool = [];
    
    allAvailableMonsters.forEach(monster => {
        let weight = 0;
        
        if (monster.difficulty === 4) {
            weight = 12; // Difficulty 3: 次高權重
        } else if (monster.difficulty === 3) {
            weight = 8; // Difficulty 3: 次高權重
        } else if (monster.difficulty === 2) {
            weight = 4; // Difficulty 2: 中等權重
        } else if (monster.difficulty === 1) {
            weight = 2; // Difficulty 1: 最低權重
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
    
    setCurrentMonster(monster); 

    // 強制切換按鈕 UI
    if (elements.exploreModeButtons) {
        elements.exploreModeButtons.style.display = 'none';
    }
    if (elements.combatModeButtons) {
        elements.combatModeButtons.style.display = 'block';
    }
    
    // 輸出遭遇日誌
    logMessage(`🚨 你遭遇了 ${State.currentMonster.name} (HP: ${State.currentMonster.hp}, 攻擊: ${State.currentMonster.attack}, 防禦: ${State.currentMonster.defense || 0})！`, 'orange'); 
    logMessage(`--- 請選擇行動 ---`, 'white');

    // 這裡只需要 updateDisplay，因為按鈕已經手動切換
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
    let attackChange = 0;

    // 計算 HP 變動
    if (itemToEquip.hp) hpChange += itemToEquip.hp;
    if (oldItem && oldItem.hp) hpChange -= oldItem.hp;
    
    // 計算 Defense 變動
    if (itemToEquip.defense) defenseChange += itemToEquip.defense;
    if (oldItem && oldItem.defense) defenseChange -= oldItem.defense;

    // 計算 Attack 變動
    if (itemToEquip.attack) attackChange += itemToEquip.attack;
    if (oldItem && oldItem.attack) attackChange -= oldItem.attack;
    
    // 套用變動
    State.player.maxHp += hpChange;
    State.player.hp = Math.min(State.player.hp, State.player.maxHp);
    State.player.defense += defenseChange;
    State.player.attack += attackChange; 
    
    logMessage(`屬性變動：HP 上限 ${hpChange > 0 ? '+' : ''}${hpChange}，防禦 ${defenseChange > 0 ? '+' : ''}${defenseChange}，攻擊 ${attackChange > 0 ? '+' : ''}${attackChange}。`, 'yellow');

    // --- 3. 存檔與介面更新 ---
    
    updateDisplay(); // 統一更新畫面
}

export function useConsumable(inventoryIndex) {
    const itemToUse = State.player.inventory[inventoryIndex];
    if (!itemToUse || itemToUse.type !== 'consumable') return; // 安全檢查

    const healAmount = itemToUse.heal || 0;
    // 增加：獲取永久屬性值
    const permanentHpGain = itemToUse.hp || 0;
    const permanentDefenseGain = itemToUse.defense || 0;
    
    let effectLogged = false;

    // 1. 執行治療效果
    if (healAmount > 0) {
        const oldHp = State.player.hp;
        State.player.hp = Math.min(State.player.maxHp, State.player.hp + healAmount);
        const actualHealed = State.player.hp - oldHp;
        
        logMessage(`🧪 使用了 [${itemToUse.name}]，恢復了 ${actualHealed} 點生命。`, 'lightgreen');
        effectLogged = true;
    } 
    
    // 2. 執行永久 HP 上限增加 (ori-blood, c6)
    if (permanentHpGain > 0) {
        State.player.maxHp += permanentHpGain; 
        State.player.hp += permanentHpGain; // 增加的上限也立即補滿
        logMessage(`❤️ [${itemToUse.name}] 永久增加了 ${permanentHpGain} 點 HP 上限！`, 'gold');
        effectLogged = true;
    }

    // 3. 執行永久 Defense 增加 (c10)
    if (permanentDefenseGain > 0) {
        State.player.defense += permanentDefenseGain; 
        logMessage(`🛡️ [${itemToUse.name}] 永久增加了 ${permanentDefenseGain} 點防禦力！`, 'gold');
        effectLogged = true;
    }

    // 如果沒有任何效果（既不能治癒，也沒有永久屬性）
    if (!effectLogged) {
        logMessage(`[${itemToUse.name}] 沒有可用的效果。`, 'red');
        return; // 不消耗物品
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
    
    // 確保城鎮區塊常駐顯示
    if (elements.hubArea) elements.hubArea.style.display = 'block'; 

    // 確保主要遊戲內容顯示
    elements.gameContent.style.display = 'block'; 

    // 確保動作容器顯示
    if (elements.adventureActions) elements.adventureActions.style.display = 'block';
    if (elements.controlsArea) elements.controlsArea.style.display = 'block';
    
    // 確保 classSelection 被隱藏
    if (elements.classSelection) elements.classSelection.style.display = 'none';
}

export function enterDeathMode() {
    
    // 1. 隱藏所有動作按鈕容器
    if (elements.exploreModeButtons) elements.exploreModeButtons.style.display = 'none'; 
    if (elements.combatModeButtons) elements.combatModeButtons.style.display = 'none';
    if (elements.adventureActions) elements.adventureActions.style.display = 'none'; // 確保探索按鈕總容器隱藏
    
    // 2. 顯示死亡模式按鈕
    if (elements.deathModeButtons) elements.deathModeButtons.style.display = 'block'; 
    
    // 3. 確保總控制區塊顯示標題
    if (elements.controlsArea) elements.controlsArea.style.display = 'block'; 

    // 4. 確保其他非動作區塊隱藏
    if (elements.hubArea) elements.hubArea.style.display = 'none'; 
    if (elements.inventoryArea) elements.inventoryArea.style.display = 'none';
}

export function calculateTotalMaxHp() {
    let totalMaxHp = State.player.maxHp; // 基礎值 + 永久加成

    // 裝備加成
    for (const slot in State.player.equipment) {
        const item = State.player.equipment[slot];
        if (item && item.hp) {
            totalMaxHp += item.hp;
        }
    }
    // 確保 maxHp 不會是負數（雖然不太可能）
    return Math.max(1, totalMaxHp);
}

export function calculateTotalDefense() {
    let totalDefense = State.player.defense; // 基礎值 + 永久加成

    // 裝備加成
    for (const slot in State.player.equipment) {
        const item = State.player.equipment[slot];
        if (item && item.defense) {
            totalDefense += item.defense;
        }
    }
    return totalDefense;
}

export function calculateTotalAttack() {
    
    // 基礎攻擊力 (已包含在 State.player.attack 中)
    let totalAttack = State.player.attack; 
    
    // ⭐ 修正 ATK: 加上永久攻擊加成
    totalAttack += State.permanentData.attackBonus || 0; 

    // 裝備加成
    if (State.player.equipment.weapon) {
        totalAttack += State.player.equipment.weapon.attack || 0;
    }
    // 加上項鍊/戒指的 ATK 加成
    if (State.player.equipment.necklace) {
        totalAttack += State.player.equipment.necklace.attack || 0;
    }
    if (State.player.equipment.ring) {
        totalAttack += State.player.equipment.ring.attack || 0;
    }

    return totalAttack;
}

export function handleUpgradeAttack() {
    if (State.permanentData.stones < UPGRADE_COST) {
        logMessage(`❌ 耀魂石不足，需要 ${UPGRADE_COST} 💎。`, 'red');
        return;
    }
    
    State.permanentData.stones -= UPGRADE_COST;
    State.permanentData.attackBonus += 5; // 更新永久數據
    State.player.attack += 5;

    logMessage(`💪 永久攻擊力 +5 成功！[當前加成: +${State.permanentData.attackBonus}]`, 'lightgreen');
    savePermanentData();
    updateDisplay(); 
}

export function handleUpgradeDefense() {
    if (State.permanentData.stones < UPGRADE_COST) {
        logMessage(`❌ 耀魂石不足，需要 ${UPGRADE_COST} 💎。`, 'red');
        return;
    }
    
    State.permanentData.stones -= UPGRADE_COST;
    State.permanentData.defenseBonus += 5; // 更新永久數據

    // 套用即時效果到當前 Run Data
    State.player.defense += 5; 

    logMessage(`🛡️ 永久防禦力 +5 成功！[當前加成: +${State.permanentData.defenseBonus}]`, 'lightgreen');
    savePermanentData(); // 儲存永久數據

    updateDisplay(); // 統一更新畫面
}

export function calculateTotalCritChance() {
    // 基礎暴擊率 (在 startGame 中設定的 0.05)
    let totalCritChance = State.player.critChance || 0; 

    // 加上所有裝備的暴擊率加成
    for (const slot in State.player.equipment) {
        const item = State.player.equipment[slot];
        if (item && item.critChance) {
            totalCritChance += item.critChance;
        }
    }
    
    // 確保暴擊率不超過 100% (1.0)
    return Math.min(1.0, totalCritChance); 
}

export function handleAttack() {
    
    if (!isCombatActive) return;

    const totalAttack = calculateTotalAttack();
    const monsterDefense = parseInt(State.currentMonster.defense) || 0; 
    
    // --- 暴擊判定 ---
    const finalCritChance = calculateTotalCritChance();
    const isCritical = Math.random() < finalCritChance; 
    const damageMultiplier = isCritical ? 2 : 1;
    
    // 1. 玩家先攻：計算基礎傷害
    let damageDealt = Math.max(5, totalAttack - monsterDefense);
    
    // 2. 套用暴擊倍率
    damageDealt *= damageMultiplier;
    
    // 診斷日誌 (幫助您確認計算過程)
    logMessage(`⚙️ 玩家攻擊: ${totalAttack} - 怪物防禦: ${monsterDefense} = 基礎 ${damageDealt / damageMultiplier} 傷害`, 'gray'); 
    
    // 輸出暴擊訊息
    if (isCritical) {
        logMessage(`💥 暴擊！你造成了雙倍傷害！`, 'red');
    }
    
    State.currentMonster.hp -= damageDealt;
    logMessage(`你攻擊了 ${State.currentMonster.name}，造成 ${damageDealt} 點傷害。`, 'white');
    
    // 3. 檢查勝利 
    if (State.currentMonster.hp <= 0) {
        endCombat(true); 
        return;
    }
    
    logMessage(`💥 ${State.currentMonster.name} 剩餘 HP: ${State.currentMonster.hp}`, 'yellow');
    // 4. 怪物反擊 -
    // 4-1. 怪物暴擊判定：固定為 40% 
    const MONSTER_CRIT_CHANCE = 0.40; 
    const isMonsterCritical = Math.random() < MONSTER_CRIT_CHANCE;
    const monsterDamageMultiplier = isMonsterCritical ? 2 : 1;
    
    // 4-2. 計算基礎傷害 (已減免玩家防禦)
    let damageReceived = Math.max(5, State.currentMonster.attack - State.player.defense);
    
    // 4-3. 套用怪物暴擊倍率
    damageReceived *= monsterDamageMultiplier;
    
    // 4-4. 輸出暴擊訊息
    if (isMonsterCritical) {
        logMessage(`🔥 怪物暴擊！${State.currentMonster.name} 對你造成了雙倍傷害！`, 'orange');
    }
    
    // 5. 對玩家造成傷害
    State.player.hp -= damageReceived; 
    logMessage(`❌ ${State.currentMonster.name} 對你造成了 ${damageReceived} 點傷害 (已減免 ${State.player.defense} 防禦)！`, 'red');

    // 6. 檢查死亡
    if (State.player.hp <= 0) {
        State.player.hp = 0;
        
        // *** 關鍵修正點：清除戰鬥旗標 ***
        setIsCombatActive(false); 
        setCurrentMonster(null);
        
        endGame("death");
        return; 
    }
    
    // 6. 戰鬥繼續
    updateDisplay(); 
    logMessage(`--- 請選擇下一回合行動 ---`, 'white'); 
}

export function handleUpgradeHp() {
    
    if (State.permanentData.stones < UPGRADE_COST) {
        logMessage(`❌ 耀魂石不足，需要 ${UPGRADE_COST} 💎。`, 'red');
        return;
    }
    
    State.permanentData.stones -= UPGRADE_COST; 
    State.permanentData.hpBonus += 5; 

    // 【關鍵修正：立即將永久加成套用到當前角色】
    State.player.maxHp += 5; 
    State.player.hp = State.player.maxHp; // 順便補滿血

    logMessage(`❤️ 永久 HP 上限 +5 成功！[當前加成: +${State.permanentData.hpBonus}]`, 'lightgreen');
    savePermanentData(); 

    updateDisplay(); 
}

export function endCombat(isVictory) {
    setIsCombatActive(false);
    
    if (isVictory) {
        const enemy = State.currentMonster;
        
        // 金幣結算 
        const gold = enemy.goldReward;
        State.player.gold += gold;
        logMessage(`💰 擊敗 ${enemy.name}，獲得 ${gold} 金幣。`, 'yellow');

        // 擊敗奧利哈鋼幻影
        if (enemy.id === 'ori-shadow') { 
            
            const rareLootIds = [
                'ori-broken-sword',         // 武器
                'ori-broken-helmet',        // 頭盔
                'ori-broken-armor',         // 胸甲
                'ori-broken-greaves',       // 護脛
                'ori-broken-necklace',      // 項鍊
                'ori-broken-ring',          // 戒指
                'ori-blood'                 // 消耗品
            ];
            
            // 隨機選擇其中一件
            const randomIndex = Math.floor(Math.random() * rareLootIds.length);
            const rareLootId = rareLootIds[randomIndex];
            
            const newItem = getItemById(rareLootId); 
            
            if (newItem) {
                addItemToInventory(newItem);
                logMessage(`🎉 恭喜！您從 ${enemy.name} 身上獲得了神話道具：[${newItem.name}]！`, 'gold');
            }

            const dustId = 'ori_dust';
            const dustCount = 2;
            State.player.materials[dustId] = (State.player.materials[dustId] || 0) + dustCount;
            logMessage(`✨ 獲得稀有素材 [奧利哈鋼粉塵] x${dustCount}！`, 'gold');
        }

        //擊敗奧利哈鋼之軀
        if (enemy.id === 'ori-body') { 
            
            const rareLootIds = [
                'ori-sword',    // 武器
                'ori-helmet',   // 頭盔
                'ori-armor',    // 胸甲
                'ori-greaves',  // 護脛
                'ori-necklace', // 項鍊
                'ori-ring',     // 戒指
                'ori-blood'     // 消耗品
            ];
            
            // 隨機選擇其中一件
            const randomIndex = Math.floor(Math.random() * rareLootIds.length);
            const rareLootId = rareLootIds[randomIndex];
            
            const newItem = getItemById(rareLootId); 
            
            if (newItem) {
                addItemToInventory(newItem);
                logMessage(`🎉 恭喜！您從 ${enemy.name} 身上獲得了神話道具：[${newItem.name}]！`, 'gold');
            }

            const essenceId = 'ori_essence'; 
            const essenceCount = 1;
            State.player.materials[essenceId] = (State.player.materials[essenceId] || 0) + essenceCount;
            logMessage(`✨ 獲得稀有素材 [奧利哈鋼精華] x${essenceCount}！`, 'gold');

            const dustId = 'ori_dust';
            const dustCount = 3;
            State.player.materials[dustId] = (State.player.materials[dustId] || 0) + dustCount;
            logMessage(`✨ 獲得稀有素材 [奧利哈鋼粉塵] x${dustCount}！`, 'gold');
        }

        //擊敗奧利哈鋼之神
        if (enemy.id === 'ori-god') { 
            
            const rareLootIds = [
                'ori-god-sword',    // 武器
                'ori-god-helmet',   // 頭盔
                'ori-god-armor',    // 胸甲
                'ori-god-greaves',  // 護脛
                'ori-god-necklace', // 項鍊
                'ori-god-ring',     // 戒指
                'ori-blood'     // 消耗品
            ];
            
            // 隨機選擇其中一件
            const randomIndex = Math.floor(Math.random() * rareLootIds.length);
            const rareLootId = rareLootIds[randomIndex];
            
            const newItem = getItemById(rareLootId); 
            
            if (newItem) {
                addItemToInventory(newItem);
                logMessage(`🎉 恭喜！您從 ${enemy.name} 身上獲得了神話道具：[${newItem.name}]！`, 'gold');
            }

            const essenceId = 'ori_essence'; 
            const essenceCount = 5;
            State.player.materials[essenceId] = (State.player.materials[essenceId] || 0) + essenceCount;
            logMessage(`✨ 獲得稀有素材 [奧利哈鋼精華] x${essenceCount}！`, 'gold');

            const dustId = 'ori_dust';
            const dustCount = 10;
            State.player.materials[dustId] = (State.player.materials[dustId] || 0) + dustCount;
            logMessage(`✨ 獲得稀有素材 [奧利哈鋼粉塵] x${dustCount}！`, 'gold');
        }

        if (enemy.isBoss && enemy.id !== 'ori-shadow' && enemy.id !== 'ori-body' && enemy.id !== 'ori-god') { 
            
            // 掉落高品質材料
            const scaleId = 'dragon_scale'; // 假設是巨龍鱗片 (稀有)
            const coreId = 'ancient_core'; // 假設是遠古核心 (稀有)
            
            // 判定掉落數量和機率 (這裡設定為高機率掉落 1-2 個)
            
            // 1. 掉落 1-2 個巨龍鱗片 (高機率)
            if (Math.random() < 0.75) { 
                const scaleCount = Math.floor(Math.random() * 2) + 1; // 1 或 2 個
                State.player.materials[scaleId] = (State.player.materials[scaleId] || 0) + scaleCount;
                logMessage(`✨ Boss 掉落素材 [巨龍鱗片] x${scaleCount}！`, 'orange');
            }
            
            // 2. 掉落 1 個遠古核心 (中機率)
            if (Math.random() < 0.50) { 
                const coreCount = 1;
                State.player.materials[coreId] = (State.player.materials[coreId] || 0) + coreCount;
                logMessage(`✨ Boss 掉落素材 [遠古核心] x${coreCount}！`, 'orange');
            }
        }
        
        // 物品掉落 
        else if (Math.random() < 0.1) {
            const newItem = getLootItem(); 
            if (newItem) addItemToInventory(newItem); 
        }

        handleMaterialDrop(enemy.id);

        logMessage(`🏆 戰鬥勝利！進入下一層。`, 'lightgreen');
        
    }
    
    setCurrentMonster(null);
    switchUIMode(false); 
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

export function setNewTownGoal() {
    State.player.actionsToTownRequired = 7; 
    
    logMessage(`✅ 距離下一次返回城鎮，你必須完成 ${State.player.actionsToTownRequired} 次探險。`, 'cyan');
}

export function renderShop() {
    elements.shopInventoryList.innerHTML = ''; 

    // 獲取當前的動態清單 (從 game_logic.js 頂部定義)
    const shopList = currentShopInventory || [];

    if (shopList.length === 0) {
        elements.shopInventoryList.textContent = '商店目前沒有可販賣的商品。';
        return;
    }
    
    // 輔助函式 (假設存在於作用域內)
    const getStatString = (value, unit) => {
        const sign = value >= 0 ? '+' : '';
        if (unit === '暴擊率') {
            const percent = (value * 100).toFixed(1);
            return `${sign}${percent}% ${unit}`;
        }
        return `${sign}${value} ${unit}`;
    };
    // -----------------------------------------------------------------

    // 遍歷清單，同時獲取索引 (index)
    shopList.forEach((itemId, index) => { 
        const item = getItemById(itemId); 
        if (!item) return;

        const shopDiv = document.createElement('div');
        shopDiv.classList.add('shop-item');

        // 設置 Flex 佈局
        shopDiv.style.display = 'flex';
        shopDiv.style.alignItems = 'center';
        shopDiv.style.justifyContent = 'space-between';

        const displayType = item.type === 'weapon' ? '⚔️ 武器' : 
                            item.type === 'armor' ? '🛡️ 胸甲' : 
                            item.type === 'necklace' ? '📿 項鍊' : 
                            item.type === 'ring' ? '💍 戒指' : 
                            item.type === 'helmet' ? '🪖 頭盔' :
                            item.type === 'greaves' ? '👢 護脛' : 
                            '🧪 藥水';

        let displayStat = '';
        const parts = []; // 統一使用 parts 陣列收集屬性

        // 檢查所有裝備類型可能擁有的屬性
        if (item.attack) parts.push(getStatString(item.attack, '攻'));
        if (item.hp) parts.push(getStatString(item.hp, '生命'));
        if (item.defense) parts.push(getStatString(item.defense, '防禦'));
        if (item.critChance) parts.push(getStatString(item.critChance, '暴擊率'));
        if (item.heal) parts.push(`+${item.heal} 治療`); // 治療屬性

        displayStat = parts.join(', ');

        // 只在 displayStat 有內容時才顯示括號
        const statHtml = displayStat ? ` (${displayStat})` : ''; 

        // ----------------------------------------------------
        // ⭐ 修正 1: 創建按鈕並追加到左側
        // ----------------------------------------------------
        const buyButton = document.createElement('button');
        buyButton.textContent = '購買';
        buyButton.style.flexShrink = '0'; // 防止按鈕被擠壓
        buyButton.style.order = '1'; // 確保按鈕在左側
        buyButton.onclick = () => handleBuyItem(item.id, index); 

        // 關鍵：將按鈕追加到 shopDiv
        shopDiv.appendChild(buyButton);

        // ----------------------------------------------------
        // ⭐ 修正 2: 創建 Span 來包裹資訊 (右側)
        // ----------------------------------------------------
        const itemInfoSpan = document.createElement('span');
        itemInfoSpan.innerHTML = `${displayType}: *${item.name}*${statHtml} 價格: *${item.price}* 💰`;
        
        itemInfoSpan.style.flexGrow = '1'; // 佔據剩餘空間
        itemInfoSpan.style.textAlign = 'left'; // 讓文字靠右對齊
        itemInfoSpan.style.marginLeft = '10px'; // 與按鈕保持間距
        itemInfoSpan.style.order = '2'; // 確保資訊在右側
        
        // 關鍵：將資訊追加到 shopDiv
        shopDiv.appendChild(itemInfoSpan);

        // ----------------------------------------------------
        // 檢查是否在地城中 (按鈕禁用邏輯)
        // ----------------------------------------------------
        if (State.player.actionsSinceTown > 0) {
            buyButton.disabled = true;
            shopDiv.style.opacity = '0.5';
        }

        // 將 shopDiv 加入清單
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

export function handleRest(isAuto = false) {

    if (!gameActive) return;

    // 0. 檢查是否已經位於城鎮
    if (State.player.actionsSinceTown === 0) {
        // 如果是自動返回的，則繼續執行存檔邏輯；如果玩家手動點擊，則給出提示
        if (!isAuto) {
            logMessage("🏠 你已經在城鎮裡了！請點擊「繼續探險」開始新的冒險。", 'cyan');
            return; // 已經在城鎮中，不需要再次執行存檔和重置
        }
    }
    
    // 1. 檢查是否達到返回城鎮的行動要求
    if (State.player.actionsSinceTown < State.player.actionsToTownRequired) {

        const needed = State.player.actionsToTownRequired - State.player.actionsSinceTown;
        logMessage(`❌ 必須在地城中行動 ${needed} 次才能返回城鎮存檔！`, 'orange');
        return; // 檢查失敗，立即退出
    }
    
    // 2. 執行治療
    const healAmount = State.player.maxHp - State.player.hp;
    State.player.hp = State.player.maxHp;
    
    // 3. 重置行動計數器並設定新目標
    State.player.actionsSinceTown = 0; 
    setNewTownGoal(); 
    
    State.player.lastRestDepth = State.player.depth;
    State.player.goldAtLastRest = State.player.gold; // 記錄當前金幣為上次存檔點
    
    // 4. 存檔 (這是遊戲的關鍵存檔點)
    saveGame(); 

    // 5. 啟用城鎮功能並刷新商店
    toggleTownAccess(true); 

    refreshShopInventory()
    renderShop();

    if (isAuto) {
        logMessage(`🏠 行動目標已達成！自動返回城鎮休息和存檔。`, 'lightgreen');
    } else {
        logMessage(`🏠 成功返回城鎮，恢復了 ${healAmount} 點生命，進度已儲存。`, 'lightgreen');
    }
    
    updateDisplay();
    
}

export function enterTownMode() {

    // 顯示 Town/Hub 區塊，隱藏戰鬥/死亡區塊
    if (elements.hubArea) elements.hubArea.style.display = 'block';
    
    // 顯示 Explore/Rest 按鈕
    if (elements.exploreModeButtons) elements.exploreModeButtons.style.display = 'block'; 
    if (elements.combatModeButtons) elements.combatModeButtons.style.display = 'none'; 
    if (elements.deathModeButtons) elements.deathModeButtons.style.display = 'none'; 
    
    // 確保主要的動作容器顯示 
    if (elements.adventureActions) elements.adventureActions.style.display = 'block'; 
    if (elements.controlsArea) elements.controlsArea.style.display = 'block'; 

    // 確保不該出現的元素被隱藏
    if (elements.classSelection) elements.classSelection.style.display = 'none';
    if (elements.inventoryArea) elements.inventoryArea.style.display = 'none'; 

    // 確保城鎮功能開啟 (交易/升級)
    toggleTownAccess(true);

    // 刷新商店
    refreshShopInventory(); 
    renderShop();
}

export function handleRevive() {
    
    const success = loadGame(); 

    if (success) {
        setGameActive(true); 

        State.player.depth = State.player.lastRestDepth;
        State.player.actionsSinceTown = 0; 
        State.player.hp = State.player.maxHp; 
        
        logMessage(`✨ 復原成功！你回到了上一個城鎮 (深度 ${State.player.depth} 層)，生命值已恢復！`, 'green');
        
        enterTownMode(); 
        
    } else {
        logMessage(`❌ 無法找到存檔！請重新選擇職業開始新遊戲。`, 'red');
        enterSelectionMode(); 
    }
    updateDisplay(); 
}

// 導向職業選擇
export function enterSelectionMode() {
    if (elements.classSelection) elements.classSelection.style.display = 'flex'; 
    if (elements.adventureActions) elements.adventureActions.style.display = 'none'; 
    if (elements.hubArea) elements.hubArea.style.display = 'block';
    if (elements.exploreModeButtons) elements.exploreModeButtons.style.display = 'none';
    if (elements.deathModeButtons) elements.deathModeButtons.style.display = 'none';
    elements.currentStageTitle.textContent = "選擇你的職業";
}

export function toggleTownAccess(canAccess) {
    
    // 鎖定/解鎖按鈕
    if (elements.upgradeHpBtn) elements.upgradeHpBtn.disabled = !canAccess;
    if (elements.upgradeAttackBtn) elements.upgradeAttackBtn.disabled = !canAccess;
    if (elements.exchangeBtn) elements.exchangeBtn.disabled = !canAccess;

    // 顯示/隱藏鎖定訊息 (hubInteractiveContent 和 townLockoutMessage 需要在 HTML/UI Manager 中正確設置)
    if (elements.hubInteractiveContent && elements.townLockoutMessage) {
        if (canAccess) {
            elements.hubInteractiveContent.style.display = 'block';
            elements.townLockoutMessage.style.display = 'none';
            logMessage("🔓 已返回城鎮，可以使用升級與兌換功能。", 'green');
        } else {
            elements.hubInteractiveContent.style.display = 'none';
            elements.townLockoutMessage.style.display = 'block';
            logMessage("🔒 離開城鎮，強化與交易功能已鎖定。", 'orange');
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
        const damageReceived = State.currentMonster.attack;
        State.player.hp -= damageReceived;
        logMessage(`❌ ${State.currentMonster.name} 趁亂造成了 ${damageReceived} 點傷害 (已減免 ${State.player.defense} 防禦)！`, 'red');
        
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
    State.loadPermanentData(); 

    // 2. 嘗試載入 Run Data (上次的存檔)
    if (State.loadGame()) {
        // 載入成功
        State.setGameActive(true);
        enterTownMode(); 
        
    } else {
        logMessage("歡迎來到地下城冒險！請選擇你的職業來創建新角色。", 'white');
        
        const initialPlayerState = { 
            hp: 0, maxHp: 0, attack: 0, defense: 0, gold: 0, depth: 0, className: "", 
            equipment: { weapon: null, helmet: null, armor: null, greaves: null, necklace: null, ring: null }, 
            inventory: [], materials: {}, goldAtLastRest: 0,
            actionsSinceTown: 0, actionsToTownRequired: 0,
            critChance: 0.05
        };
        Object.assign(State.player, initialPlayerState); 
        
        enterSelectionMode();
    }

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
    State.setCurrentUsername(null); // 【關鍵修正】使用 State 函式重置 currentUsername
    
    // 3. 重置 player 數據為初始狀態（確保下次登入前是乾淨的）
    Object.assign(State.player, {
        hp: 0, maxHp: 0, attack: 0, defense: 0, gold: 0, depth: 0, className: "", 
        equipment: { weapon: null, helmet: null, armor: null, greaves: null, necklace: null, ring: null }, // 【修正：包含新的裝備欄位】
        inventory: [], materials: {}, goldAtLastRest: 0,
        actionsSinceTown: 0, actionsToTownRequired: 0 
    });
    
    // 4. 輸出訊息
    logMessage(`👋 您已登出。`, 'white');

    // 5. 切換介面回登入畫面
    elements.loggedOutView.style.display = 'block'; // 顯示登入框
    elements.loggedInView.style.display = 'none';   // 隱藏登出狀態
    elements.gameContent.style.display = 'none';    // 隱藏整個遊戲內容
    elements.classSelection.style.display = 'none'; // 隱藏職業選擇按鈕
    
    updateDisplay(); // 統一更新畫面
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