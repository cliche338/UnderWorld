import * as State from './state.js';

import {
    saveGame, savePermanentData, loadGame,
    setCurrentUsername, setGameActive, setIsCombatActive,
    setCurrentMonster, isInventoryOpen, loadPermanentData,
    currentUsername, getStoredAccounts, saveAccounts,
    setIsInventoryOpen, isCombatActive, gameActive,
} from './state.js';

import { MONSTERS, ITEMS, STONE_CONVERSION_RATE, STARTER_LOOT_IDS, UPGRADE_COST, MATERIALS_DATA, ACHIEVEMENTS, ACHIEVEMENT_TIERS, ACHIEVEMENT_CATEGORIES, CRAFTING_RECIPES } from './config.js';

import {
    logMessage, updateDisplay, elements,
    renderInventoryList, renderMaterialInventory,
    updateExchangeDisplay, getItemIcon,
    renderVisualEquipment // 新增
} from './ui_manager.js';

export { logMessage }; // Export logMessage for main.js usage

// 更新日誌
export function showUpdateLog() {
    const updateLog = `

- 新增鍛造系統, 可合成更強大的武器 : 天鯊海燕、心相湧流
- 天鯊海燕合成素材 : 擊敗指定Boss掉落
- 心相湧流合成素材 : 商店隨機刷出
- 商店道具顏色顯示
- 背包道具顏色顯示
- 裝備顯示區UI更新 : 現在移動到上面可以獲取數值；點選可以卸下


    `;

    if (elements.codexFilters) {
        elements.codexFilters.style.display = 'none';
    }

    const title = "v4.3 遊戲更新日誌";
    openModal(title, updateLog, 'update-modal');
}

// 職業轉職系統
export const ADVANCED_CLASSES = {
    "騎士": [
        { name: "聖騎士", hpBonus: 200, attackBonus: 0, defenseBonus: 0, critBonus: 0, desc: "堅毅壁壘 (HP+200, 受傷反彈 40%)" },
        { name: "狂戰士", hpBonus: 0, attackBonus: 100, defenseBonus: 0, critBonus: 0, desc: "鮮血渴望 (ATK+100, 攻擊吸血 10%)" }
    ],
    "商人": [
        { name: "黑市大亨", hpBonus: 0, attackBonus: 80, defenseBonus: 0, critBonus: 0, desc: "金錢暴力 (ATK+80, 販賣所得+50%)" }
    ],
    "刺客": [
        { name: "影武者", hpBonus: 0, attackBonus: 50, defenseBonus: 0, critBonus: 0.15, desc: "極致輸出 (ATK+50, 暴擊率+15%, 暴擊傷害提升至260%)" },
        { name: "暗影刺客", hpBonus: 100, attackBonus: 30, defenseBonus: 0, critBonus: 0.10, desc: "靈活作戰 (HP+100, 有30%機率閃避攻擊)" }
    ]
};

// 挑戰用的 Boss 定義
export const EVOLUTION_BOSS = {
    id: 'guardian_of_souls',
    name: "職業試煉官",
    hp: 20000,
    attack: 550,
    defense: 120,
    goldReward: 1000,
    difficulty: 6,
    isBoss: true,
    isEvolutionBoss: true
};

export function checkClassEvolution() {
    // 檢查條件：深度 1000 以上 (或下一次轉職層數)，且尚未轉職
    const targetDepth = State.player.nextEvolutionDepth || 1000;

    if (State.player.depth >= targetDepth && !State.player.isEvolved) {
        // 顯示挑戰面板
        if (elements.evolutionChallengePanel) {
            elements.evolutionChallengePanel.style.display = 'flex'; // Use flex to maintain internal layout
        }
        // ⭐ 必須同時顯示父容器
        if (elements.topCentralAdventures) {
            elements.topCentralAdventures.style.display = 'flex';
        } else {
            console.error("Critical: elements.topCentralAdventures is missing!");
        }
    } else {
        // 隱藏挑戰面板
        if (elements.evolutionChallengePanel) {
            elements.evolutionChallengePanel.style.display = 'none';
        }
        // 父容器的隱藏邏輯由 updateDisplay 或其他地方統一管理，或者這裡僅隱藏自己
        // 暫時不隱藏父容器，避免影響副本入口顯示
    }
}

export function handleEvolutionChallenge() {
    console.log("Opening Evolution Confirmation Modal");
    if (!State.gameActive) return;

    // --- 新增：檢查轉職限制 ---
    if (State.player.nextEvolutionDepth && State.player.depth < State.player.nextEvolutionDepth) {
        logMessage(`🔒 轉職試煉尚未準備好... 需歷練至第 ${State.player.nextEvolutionDepth} 層 (目前 ${State.player.depth} 層)。`, 'red');
        return;
    }

    if (elements.evolutionConfirmModalBackdrop) {
        elements.evolutionConfirmModalBackdrop.style.display = 'flex';
    } else {
        // Fallback if modal is missing (should verify markup)
        startEvolutionCombat();
    }
}

export function startEvolutionCombat() {
    // 隱藏確認視窗
    if (elements.evolutionConfirmModalBackdrop) {
        elements.evolutionConfirmModalBackdrop.style.display = 'none';
    }

    // 設定當前怪物為靈魂守護者
    State.setCurrentMonster(JSON.parse(JSON.stringify(EVOLUTION_BOSS)));

    // 隱藏挑戰面板 (避免同時點擊)
    if (elements.evolutionChallengePanel) elements.evolutionChallengePanel.style.display = 'none';
    // 副本入口暫時不隱藏，因為它應該常駐，且有點擊模態框保護
    // if (elements.dungeonEntrancePanel) elements.dungeonEntrancePanel.style.display = 'none';

    // 啟動戰鬥
    State.setIsCombatActive(true);

    updateDisplay();
    logMessage(`⚔️ 你向 [${EVOLUTION_BOSS.name}] 發起了挑戰！證明你的實力吧！`, 'red');

    // 切換 UI 到戰鬥模式
    enterCombatMode();
}

export function enterCombatMode() {
    logMessage(`[DEBUG] Entering Combat Mode.`, 'gray');

    if (elements.combatArea) elements.combatArea.style.display = 'block';
    if (elements.hubArea) elements.hubArea.style.display = 'none';
    if (elements.deathScreen) elements.deathScreen.style.display = 'none';

    // 確保戰鬥介面按鈕顯示
    if (elements.combatModeButtons) elements.combatModeButtons.style.display = 'block';
    if (elements.exploreModeButtons) elements.exploreModeButtons.style.display = 'none';
}

function triggerClassEvolution() {
    const currentClass = State.player.className;
    const options = ADVANCED_CLASSES[currentClass];

    if (!options) return; // 該職業無轉職選項

    elements.evolutionOptions.innerHTML = ''; // 清空選項

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'evolution-btn'; // 可以稍後在 CSS 加樣式
        btn.style.width = '200px';
        btn.style.padding = '15px';
        btn.style.margin = '10px';
        btn.style.background = 'linear-gradient(#2980b9, #2c3e50)';
        btn.style.color = 'white';
        btn.style.border = '2px solid #3498db';
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';

        btn.innerHTML = `
            <strong style="font-size: 1.2em; display: block; margin-bottom: 8px;">${option.name}</strong>
            <span style="font-size: 0.9em; opacity: 0.9;">${option.desc}</span>
        `;

        btn.onclick = () => handleClassChange(option);

        elements.evolutionOptions.appendChild(btn);
    });

    elements.classEvolutionModalBackdrop.style.display = 'flex';
}

function handleClassChange(option) {
    // 1. 應用數值
    if (option.hpBonus) State.permanentData.hpBonus += option.hpBonus;
    if (option.attackBonus) State.permanentData.attackBonus += option.attackBonus;
    if (option.defenseBonus) State.permanentData.defenseBonus += option.defenseBonus;
    // 暴擊率特別處理，直接加到 player (因為 permanentData 暫無 crit 欄位，或需新增)
    // 為了簡單起見，我們直接修改 player.critChance, 並假設 StartGame 的邏輯不會覆蓋它 (因為已是遊戲中途)
    if (option.critBonus) State.player.critChance += option.critBonus;
    if (option.goldReward) State.player.gold += option.goldReward;

    // 2. 更新狀態與名稱
    State.player.className = option.name;
    State.player.isEvolved = true;

    // 3. 關閉視窗與存檔
    elements.classEvolutionModalBackdrop.style.display = 'none';

    // 如果有加 MaxHP，補滿
    if (option.hpBonus) {
        State.player.maxHp += option.hpBonus;
        State.player.hp += option.hpBonus;
    }

    logMessage(`✨ 靈魂昇華！職階晉升為 [${option.name}]！`, 'gold');
    saveGame();
    savePermanentData(); // 如果改了 permanentData
    updateDisplay();
}

export let currentShopInventory = [];
let currentCodexFilter = 'all';
export let isDungeonAvailable = false;

// 通用確認視窗函式
export function showConfirmationModal(title, message, onConfirmCallback) {
    if (!elements.confirmationModalBackdrop) return;

    elements.confirmationTitle.textContent = title;
    elements.confirmationContent.textContent = message;

    // 綁定確認按鈕 (需移除之前的監聽器以防重複觸發，但簡單起見每次覆蓋 onclick)
    elements.confirmationConfirmBtn.onclick = () => {
        elements.confirmationModalBackdrop.style.display = 'none';
        if (onConfirmCallback) onConfirmCallback();
    };

    // 綁定取消按鈕
    elements.confirmationCancelBtn.onclick = () => {
        elements.confirmationModalBackdrop.style.display = 'none';
    };

    elements.confirmationModalBackdrop.style.display = 'flex';
}

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
    
    🪪職業系統 : 
        1、初始選擇職業 : 騎士、商人、刺客
        2、第一次經過1000層後抵達城鎮可以挑戰轉職
        3、使用"回歸玉"後可以重新選擇職業, 歷經500層後可重新挑戰轉職
        * 骑士 : 
            * 聖騎士 : 受傷反彈 40%
            * 狂戰士 : 攻擊吸血 10% 
        * 商人 : 
            * 黑市大亨 : 販賣所得+50%
        * 刺客 : 
            * 影武者 : 暴擊傷害 260%
            * 暗影刺客 : 閃避率 30%

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
            } else if (item.rarity >= 7) {       //傳說
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
    }
}

export function toggleInventory() {
    const newState = !State.isInventoryOpen;
    State.setIsInventoryOpen(newState);

    if (newState) {
        // --- 打開背包 ---
        if (elements.inventoryArea) elements.inventoryArea.style.display = 'block';

        // 1. 隱藏城鎮和冒險區塊
        if (elements.hubArea) elements.hubArea.style.display = 'none';

        // 2. 隱藏 logAndControlsGroup 以維持 flex 比例
        if (elements.logAndControlsGroup) elements.logAndControlsGroup.style.display = 'none';

        // 3. 顯示裝備欄 (文字版)
        const equippedDisplay = document.getElementById('equipped-items-display');
        if (equippedDisplay) equippedDisplay.style.display = 'block';

        // 4. 顯示視覺化裝備面板
        if (elements.visualEquipmentPanel) {
            elements.visualEquipmentPanel.style.display = 'flex';
            updateVisualEquipment();
        }

        // 5. 顯示鍛造台面板
        if (elements.craftingAccessPanel) elements.craftingAccessPanel.style.display = 'block';

        // 6. 隱藏背包按鈕本身
        if (elements.inventoryBtn) elements.inventoryBtn.style.display = 'none';

        renderInventoryList();
        renderMaterialInventory();
    } else {
        // --- 關閉背包 ---
        if (elements.inventoryArea) elements.inventoryArea.style.display = 'none';

        // 恢復右側面板
        if (elements.logAndControlsGroup) elements.logAndControlsGroup.style.display = 'flex';

        // 恢復 Hub
        if (!State.isCombatActive && State.player.hp > 0) {
            if (elements.hubArea) elements.hubArea.style.display = 'block';
        }

        // 隱藏裝備欄
        const equippedDisplay = document.getElementById('equipped-items-display');
        if (equippedDisplay) equippedDisplay.style.display = 'none';

        // 隱藏視覺化裝備面板
        if (elements.visualEquipmentPanel) elements.visualEquipmentPanel.style.display = 'none';

        // 隱藏鍛造台面板
        if (elements.craftingAccessPanel) elements.craftingAccessPanel.style.display = 'none';

        // 恢復顯示背包按鈕
        if (elements.inventoryBtn) elements.inventoryBtn.style.display = 'block';
    }
}

export function handleMaterialDrop(monsterId) {
    let dropsLogged = 0;

    MATERIALS_DATA.forEach(material => {
        if (Math.random() < material.dropRate / 10) {

            const materialId = material.id;

            if (!State.player.materials[materialId]) {
                State.player.materials[materialId] = 0;
            }

            State.player.materials[materialId] += 1;
            dropsLogged += 1;
            logMessage(`🧩 獲得素材 [${material.name}]！`, 'cyan');
        }
    });
}

function updateVisualEquipment() {
    const slots = elements.visualSlots;
    if (!slots) return;

    const equipment = State.player.equipment;

    const slotMap = [
        { key: 'weapon', slot: slots.weapon },
        { key: 'helmet', slot: slots.helmet },
        { key: 'armor', slot: slots.armor },
        { key: 'greaves', slot: slots.greaves },
        { key: 'necklace', slot: slots.necklace },
        { key: 'ring', slot: slots.ring }
    ];

    // 稀有度颜色映射
    const rarityColorMap = {
        1: '#ffffff', 2: '#00ff00', 3: '#4da6ff',
        4: '#4da6ff', 5: '#9d4dff', 6: '#9d4dff',
        7: '#ff8000', 8: '#ffd700', 9: '#ff0000',
        10: '#ff1493', 11: '#00ffff'
    };

    const rarityNames = {
        1: '普通', 2: '優良', 3: '精良', 4: '精良',
        5: '史詩', 6: '史詩', 7: '橙裝', 8: '神話',
        9: '傳說', 10: '不朽', 11: '特殊'
    };

    slotMap.forEach(item => {
        if (!item.slot) return;

        const equippedItem = equipment[item.key];

        // 清除舊的稀有度樣式
        item.slot.classList.remove('equipped', 'rare', 'epic', 'legendary');

        // 移除舊的事件監聽器（通過克隆節點）
        const newSlot = item.slot.cloneNode(true);
        item.slot.parentNode.replaceChild(newSlot, item.slot);

        // ⭐ 關鍵修復：更新 elements.visualSlots 中的引用
        elements.visualSlots[item.key] = newSlot;

        if (equippedItem) {
            newSlot.classList.add('equipped');

            if (equippedItem.rarity) {
                if (equippedItem.rarity >= 5) newSlot.classList.add('legendary');
                else if (equippedItem.rarity >= 4) newSlot.classList.add('epic');
                else if (equippedItem.rarity >= 3) newSlot.classList.add('rare');
            }

            // 更新內容
            const newContentDiv = newSlot.querySelector('.slot-content');
            if (equippedItem.image) {
                newContentDiv.innerHTML = `<img src="${equippedItem.image}" alt="${equippedItem.name}">`;
            } else {
                newContentDiv.textContent = equippedItem.name.substring(0, 1);
            }

            // === 添加 Tooltip 显示 ===
            let tooltipElement = null;

            newSlot.addEventListener('mouseenter', (e) => {
                const rarityColor = rarityColorMap[equippedItem.rarity] || '#ffffff';
                const rarityName = rarityNames[equippedItem.rarity] || '未知';

                // 创建tooltip
                tooltipElement = document.createElement('div');
                tooltipElement.className = 'equipment-tooltip';

                // 构建属性列表
                const stats = [];
                if (equippedItem.attack) stats.push(`攻擊: +${equippedItem.attack}`);
                if (equippedItem.defense) stats.push(`防禦: +${equippedItem.defense}`);
                if (equippedItem.hp) stats.push(`生命: +${equippedItem.hp}`);
                if (equippedItem.critChance) stats.push(`暴擊率: +${(equippedItem.critChance * 100).toFixed(1)}%`);

                const statsHtml = stats.length > 0
                    ? `<div class="tooltip-stats">${stats.map(s => `<div class="tooltip-stat">${s}</div>`).join('')}</div>`
                    : '';

                tooltipElement.innerHTML = `
                    <div class="tooltip-name" style="color: ${rarityColor};">${equippedItem.name}</div>
                    <div class="tooltip-rarity">稀有度: ${rarityName} (Lv.${equippedItem.rarity})</div>
                    ${statsHtml}
                    <div style="margin-top: 8px; color: #95a5a6; font-size: 0.85em;">點擊卸下裝備</div>
                `;

                document.body.appendChild(tooltipElement);
                updateTooltipPosition(e, tooltipElement);
            });

            newSlot.addEventListener('mousemove', (e) => {
                if (tooltipElement) {
                    updateTooltipPosition(e, tooltipElement);
                }
            });

            newSlot.addEventListener('mouseleave', () => {
                if (tooltipElement && tooltipElement.parentNode) {
                    tooltipElement.parentNode.removeChild(tooltipElement);
                    tooltipElement = null;
                }
            });

            // === 添加点击卸下装备 ===
            newSlot.addEventListener('click', () => {
                unequipItem(item.key);
                // 移除tooltip
                if (tooltipElement && tooltipElement.parentNode) {
                    tooltipElement.parentNode.removeChild(tooltipElement);
                    tooltipElement = null;
                }
            });

        } else {
            const defaultTitles = {
                weapon: "武器", helmet: "頭盔", armor: "胸甲",
                greaves: "護脛", necklace: "項鍊", ring: "戒指"
            };
            newSlot.title = defaultTitles[item.key];
            const newContentDiv = newSlot.querySelector('.slot-content');
            newContentDiv.textContent = "無";
        }
    });
}

// Tooltip位置更新辅助函数
function updateTooltipPosition(e, tooltip) {
    const offset = 15;
    let x = e.clientX + offset;
    let y = e.clientY + offset;

    // 防止tooltip超出屏幕
    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth) {
        x = e.clientX - rect.width - offset;
    }
    if (y + rect.height > window.innerHeight) {
        y = e.clientY - rect.height - offset;
    }

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

export function getItemById(id) {
    return ITEMS.find(item => item.id === id);
}

export function getMaterialById(id) {
    return MATERIALS_DATA.find(mat => mat.id === id);
}

export function addItemToInventory(item) {

    // 堆疊邏輯：如果是消耗品，先檢查背包是否已有相同物品
    if (item.type === 'consumable') {
        const existingItem = State.player.inventory.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.count = (existingItem.count || 1) + 1;
            logMessage(`🎁 你獲得了 [${item.name}] (目前持有: ${existingItem.count})！`, 'cyan');
        } else {
            item.count = 1;
            State.player.inventory.push(item);
            logMessage(`🎁 你獲得了 [${item.name}]！`, 'cyan');
        }
    } else {
        // 非消耗品，直接堆疊
        State.player.inventory.push(item);
        logMessage(`🎁 你獲得了 [${item.name}]！`, 'cyan');
    }

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
    // 排除boss專屬掉落的材料
    const bossOnlyItems = ['heart-of-the-sea', 'heart-of-the-sky', 'wings-of-the-swallow', 'wings-of-the-shark'];
    const sellableItems = ITEMS.filter(item =>
        item.price &&
        item.rarity <= maxRarityAvailable &&
        !bossOnlyItems.includes(item.id) // 排除boss專屬材料
    );

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
        if (State.currentMonster && State.currentMonster.isDungeonBoss) {

            // 呼叫 UI 函式，並傳遞 'defeat' 模式
            showDungeonChallengeModal(
                `挑戰失敗：${State.currentMonster.name}`,
                `你被強大的 Boss 擊敗，已經被送回城鎮。請準備更完善後再行挑戰。`,
                'defeat' // 傳遞 'defeat' 模式
            );

            // 由於模態框會擋住，我們讓模態框的「離開」按鈕處理復原和進入城鎮模式。
            // 這裡不執行 enterDeathMode，而是讓模態框的「離開」按鈕執行復原
            logMessage("❌ Boss 戰敗，等待玩家點擊離開確認。", 'red');
            return; // 阻止繼續執行後續的 updateDisplay/enterDeathMode
        }


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

    // --- Achievement Tracking ---
    if (!State.player.maxDepthReached || nextDepth > State.player.maxDepthReached) {
        State.player.maxDepthReached = nextDepth;
    }
    checkAchievements();
    // ----------------------------

    const isBossLayer = nextDepth > 0 &&
        (nextDepth % 25 === 0 || nextDepth % 20 === 0);

    // 1. 更新深度和行動計數
    State.player.actionsSinceTown++;
    State.player.depth++;

    // 2. 鎖定城鎮功能
    if (State.player.actionsSinceTown === 1) {
        toggleTownAccess(false);
    }

    // 3. 檢查是否達到自動回城條件 (⭐修正：如果是 Boss 層，暫不回城，先打 Boss)
    if (State.player.actionsSinceTown >= State.player.actionsToTownRequired && !isBossLayer) {
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

export function startGame(className, hpBonus, attackBonus, defenseBonus, critChanceBonus, goldBonus) {

    // 0. 處理職業重選邏輯
    if (State.isReselecting) {
        changeClass(className, hpBonus, attackBonus, defenseBonus, critChanceBonus, goldBonus);
        return;
    }

    // 檢查狀態
    if (State.gameActive) return;

    const baseHp = 150;
    const baseAttack = 15;
    const baseDefense = 10;
    const baseCrit = 0.05;
    const baseGold = 150;

    // 2. 初始化 Run 數據 
    State.player.maxHp = baseHp + hpBonus;
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
        if (currentDepth % 10000 === 0) {
            bossId = 'ori-god';
            logMessage('🚨 警報！奧利哈鋼之神即將降臨...', 'red');
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

export function toggleDungeonEntrance(isVisible) {
    // 之前已經修正為 #dungeon-entrance-panel，此處只做邏輯確認
    const container = elements.dungeonEntrancePanel; // 假設 ui_manager 已經引用它
    if (!container) return;

    container.style.display = isVisible ? 'flex' : 'none';
    isDungeonAvailable = isVisible;

    if (isVisible) {
        logMessage("🚨 偵測到強大的 Boss 氣息！請從副本入口進入挑戰。", 'red');
        if (elements.exploreBtn) elements.exploreBtn.disabled = true;
    } else {
        if (elements.exploreBtn) elements.exploreBtn.disabled = false;
    }
}

export function getDungeonBoss() {

    // ⭐ 直接指定副本 Boss ID ⭐
    const bossId = 'xmasboss';

    const boss = MONSTERS.find(m => m.id === bossId);

    if (boss) {
        logMessage(`🔥 你感應到強大的氣息... Boss：${boss.name} 準備就緒！`, 'orange');

        // 🚨 關鍵：返回時確保 Boss 數據被複製，且包含 isDungeonBoss 旗標
        const monsterData = JSON.parse(JSON.stringify(boss));

        // 確保即使配置中沒有，這裡也強制加上，避免 endGame 判斷失敗
        monsterData.isDungeonBoss = true;

        return monsterData;
    }

    logMessage("❌ 系統錯誤 ", 'red');
    return null;
}

export function handleDungeonBossCombat() {
    if (!State.gameActive) {
        logMessage("請先選擇職業開始冒險！", 'red');
        return;
    }

    const monster = getDungeonBoss();

    if (!monster) {
        logMessage("❌ 無法啟動副本戰鬥，請稍後再試。", 'red');
        switchUIMode(false);
        return;
    }

    // 1. 設置戰鬥狀態
    State.setIsCombatActive(true);
    State.setCurrentMonster(monster);

    // 2. 切換按鈕 UI
    switchUIMode(true); // 進入戰鬥模式 (顯示攻擊/逃跑按鈕)

    // 3. 輸出遭遇日誌
    logMessage(`🚨 副本挑戰啟動！遭遇 Boss: ${State.currentMonster.name} (HP: ${State.currentMonster.hp})！`, 'red');
    logMessage(`--- 請選擇行動 ---`, 'white');

    updateDisplay();
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

    // --- 2. 移除手動加減屬性的舊邏輯 (關鍵修正) ---
    // 讓屬性完全依賴 calculateTotal* 函式，這樣就不會重複疊加了。

    // 計算 HP 變動 (用於日誌顯示，但不再用於直接修改 State)
    let hpChange = 0;
    if (itemToEquip.hp) hpChange += itemToEquip.hp;
    if (oldItem && oldItem.hp) hpChange -= oldItem.hp;

    // 計算 Defense 變動
    let defenseChange = 0;
    if (itemToEquip.defense) defenseChange += itemToEquip.defense;
    if (oldItem && oldItem.defense) defenseChange -= oldItem.defense;

    // 計算 Attack 變動
    let attackChange = 0;
    if (itemToEquip.attack) attackChange += itemToEquip.attack;
    if (oldItem && oldItem.attack) attackChange -= oldItem.attack;

    const newMaxHp = calculateTotalMaxHp();
    State.player.hp = Math.min(State.player.hp, newMaxHp);

    logMessage(`屬性變動：HP 上限 ${hpChange > 0 ? '+' : ''}${hpChange}，防禦 ${defenseChange > 0 ? '+' : ''}${defenseChange}，攻擊 ${attackChange > 0 ? '+' : ''}${attackChange}。`, 'yellow');

    // --- 3. 存檔與介面更新 ---
    updateDisplay();
    updateVisualEquipment();
}

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

export function useConsumable(inventoryIndex) {
    const itemToUse = State.player.inventory[inventoryIndex];
    if (!itemToUse || itemToUse.type !== 'consumable') return; // 安全檢查

    const healAmount = itemToUse.heal || 0;
    // 增加：獲取永久屬性值
    const permanentHpGain = itemToUse.hp || 0;
    const permanentDefenseGain = itemToUse.defense || 0;

    // --- 新增：回歸玉邏輯 ---
    if (itemToUse.id === 'return-jewel') {
        showConfirmationModal(
            '確定要使用回歸玉嗎？',
            '這將使您重新選擇職業，您的轉職進度將被重置，需再歷練 500 層才能再次轉職。',
            () => {
                // 消耗物品 (重新查找以防萬一)
                const itemIndex = State.player.inventory.findIndex(i => i.id === 'return-jewel');
                if (itemIndex !== -1) {
                    State.player.inventory.splice(itemIndex, 1);
                    saveGame();
                    handleReturnJewel();
                }
            }
        );
        return;
    }

    let effectLogged = false;

    // 1. 執行治療效果
    if (healAmount > 0) {
        const oldHp = State.player.hp;
        State.player.hp = Math.min(State.player.maxHp, State.player.hp + healAmount);
        const actualHealed = State.player.hp - oldHp;

        logMessage(`🧪 使用了 [${itemToUse.name}]，恢復了 ${actualHealed} 點生命。`, 'lightgreen');
        effectLogged = true;
    }

    // 2. 執行永久 HP 上限增加 
    if (permanentHpGain > 0) {
        State.player.maxHp += permanentHpGain;
        State.player.hp += permanentHpGain;
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

    // --- 移除物品邏輯 (支援堆疊) ---
    if (itemToUse.count && itemToUse.count > 1) {
        itemToUse.count--;
        logMessage(`(剩餘數量: ${itemToUse.count})`, 'gray');
    } else {
        State.player.inventory.splice(inventoryIndex, 1);
    }

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

    // 2. 執行販賣 (處理堆疊)
    if (itemToSell.count && itemToSell.count > 1) {
        itemToSell.count--;
    } else {
        State.player.inventory.splice(inventoryIndex, 1);
    }

    // 3. 增加金幣
    let finalPrice = sellPrice;

    // 黑市大亨職業特效：販賣價格 1.5 倍
    if (State.player.className === '黑市大亨') {
        finalPrice = Math.floor(sellPrice * 1.5);
    }


    State.player.gold += finalPrice;
    State.player.totalGoldEarned = (State.player.totalGoldEarned || 0) + finalPrice;

    // 4. 更新狀態與日誌
    if (finalPrice > sellPrice) {
        logMessage(`💰 [黑市大亨] 成功販賣 [${itemToSell.name}]，獲得 ${finalPrice} 金幣 (原價 ${sellPrice})。`, 'gold');
    } else {
        logMessage(`💰 成功販賣 [${itemToSell.name}]，獲得 ${finalPrice} 金幣。`, 'gold');
    }

    checkAchievements();


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

    let finalPrice = sellPrice;

    // 黑市大亨職業特效：販賣價格 1.5 倍
    if (State.player.className === '黑市大亨') {
        finalPrice = Math.floor(sellPrice * 1.5);
    }

    const totalRevenue = count * finalPrice;

    State.player.gold += totalRevenue;
    State.player.totalGoldEarned = (State.player.totalGoldEarned || 0) + totalRevenue;
    State.player.materials[materialId] = 0; // 移除所有素材

    checkAchievements();

    if (finalPrice > sellPrice) {
        logMessage(`💰 [黑市大亨] 販賣了 ${count} 個 [${getMaterialById(materialId).name}]，獲得 ${totalRevenue} 金幣 (單價加成: ${finalPrice})。`, 'gold');
    } else {
        logMessage(`💰 販賣了 ${count} 個 [${getMaterialById(materialId).name}]，總共獲得 ${totalRevenue} 金幣。`, 'gold');
    }

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

    // 確保 classSelection 被隱藏 (修正：強制隱藏)
    if (elements.classSelection) {
        elements.classSelection.style.display = 'none';
        // 額外確保 inline style 確實被覆蓋
        elements.classSelection.setAttribute('style', 'display: none !important');
    }
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

    let totalMaxHp = State.player.maxHp;
    totalMaxHp += State.permanentData.hpBonus || 0;

    // 裝備加成 (這段保持不變)
    if (State.player.equipment.helmet) {
        totalMaxHp += State.player.equipment.helmet.hp || 0;
    }
    if (State.player.equipment.armor) {
        totalMaxHp += State.player.equipment.armor.hp || 0;
    }
    if (State.player.equipment.greaves) {
        totalMaxHp += State.player.equipment.greaves.hp || 0;
    }
    if (State.player.equipment.necklace) {
        totalMaxHp += State.player.equipment.necklace.hp || 0;
    }
    if (State.player.equipment.ring) {
        totalMaxHp += State.player.equipment.ring.hp || 0;
    }

    // 確保 MaxHP 不會小於 1
    return Math.max(1, totalMaxHp);
}

export function calculateTotalDefense() {

    let totalDefense = State.player.defense || 0;
    totalDefense += State.permanentData.defenseBonus || 0;

    // 裝備加成
    if (State.player.equipment.weapon) {
        totalDefense += State.player.equipment.weapon.defense || 0;
    }
    if (State.player.equipment.helmet) {
        totalDefense += State.player.equipment.helmet.defense || 0;
    }
    if (State.player.equipment.armor) {
        totalDefense += State.player.equipment.armor.defense || 0;
    }
    if (State.player.equipment.greaves) {
        totalDefense += State.player.equipment.greaves.defense || 0;
    }
    if (State.player.equipment.necklace) {
        totalDefense += State.player.equipment.necklace.defense || 0;
    }
    if (State.player.equipment.ring) {
        totalDefense += State.player.equipment.ring.defense || 0;
    }
    return totalDefense;
}

export function calculateTotalAttack() {

    let totalAttack = State.player.attack;
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

// Helper to calculate cost and count based on multiplier
function getUpgradeParams() {
    const multiplier = State.currentUpgradeMultiplier;
    let count = 1;

    if (multiplier === 'MAX') {
        count = Math.floor(State.permanentData.stones / UPGRADE_COST);
        if (count < 1) count = 1; // Ensure at least 1 to trigger "not enough" message if 0
    } else {
        count = parseInt(multiplier);
    }
    return { count, cost: count * UPGRADE_COST };
}

export function handleUpgradeAttack() {
    const { count, cost } = getUpgradeParams();
    const attackIncrease = 5 * count;

    if (State.permanentData.stones >= cost) {
        // 扣除費用
        State.permanentData.stones -= cost;
        State.permanentData.attackBonus += attackIncrease;

        // 儲存遊戲和永久數據
        State.savePermanentData();
        State.saveGame();

        // 更新介面和日誌
        const newTotalAttack = calculateTotalAttack();
        logMessage(`⚔️ 永久 攻擊 升級成功 (x${count})！ATK +${attackIncrease}，目前 ATK: ${newTotalAttack}。`, 'yellow');
        updateDisplay();
    } else {
        logMessage(`❌ 您的耀魂石不足 (購買 x${count} 需要 ${cost} 💎)。`, 'red');
    }
}

export function handleUpgradeDefense() {
    const { count, cost } = getUpgradeParams();
    const defenseIncrease = 5 * count;

    if (State.permanentData.stones >= cost) {
        // 扣除費用
        State.permanentData.stones -= cost;
        State.permanentData.defenseBonus += defenseIncrease;

        // 儲存遊戲和永久數據
        State.savePermanentData();
        State.saveGame();

        // 更新介面和日誌
        const newTotalDefense = calculateTotalDefense(); // 獲取正確的總值
        logMessage(`🛡️ 永久 防禦 升級成功 (x${count})！DEF +${defenseIncrease}，目前 DEF: ${newTotalDefense}。`, 'yellow');
        updateDisplay()
    } else {
        logMessage(`❌ 您的奧術魔石不足 (購買 x${count} 需要 ${cost} 💎)。`, 'red');
    }
}

export function calculateTotalCritChance() {
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
    // ⭐ 修正點 1：新增總防禦力計算 ⭐
    const totalDefense = calculateTotalDefense();
    const monsterDefense = parseInt(State.currentMonster.defense) || 0;

    // --- 暴擊判定 ---
    const finalCritChance = calculateTotalCritChance();
    const isCritical = Math.random() < finalCritChance;

    // 預設暴擊倍率 200%
    let critMultiplier = 2;

    // 影武者職業特效：暴擊傷害 260%
    if (State.player.className === '影武者') {
        critMultiplier = 2.6;
    }

    const damageMultiplier = isCritical ? critMultiplier : 1;

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

    // 狂戰士職業特效：攻擊吸血 10%
    if (State.player.className === '狂戰士' && damageDealt > 0) {
        const healAmount = Math.floor(damageDealt * 0.1);
        if (healAmount > 0) {
            const oldHp = State.player.hp;
            State.player.hp = Math.min(State.player.maxHp, State.player.hp + healAmount);
            logMessage(`🩸 [狂戰士] 嗜血打擊！你從傷害中恢復了 ${healAmount} 點生命。`, 'lightgreen');
        }
    }

    // 3. 檢查勝利 
    if (State.currentMonster.hp <= 0) {
        endCombat(true);
        return;
    }

    logMessage(`💥 ${State.currentMonster.name} 剩餘 HP: ${State.currentMonster.hp}`, 'yellow');

    // 4. 怪物反擊 -

    // 暗影刺客職業特效：30% 機率閃避
    if (State.player.className === '暗影刺客' && Math.random() < 0.3) {
        logMessage(`⚡ [暗影刺客] 你的身形如鬼魅般閃爍，完全閃避了 ${State.currentMonster.name} 的攻擊！`, 'cyan');
        // 閃避成功，不執行傷害計算，也不會有受傷訊息
        updateDisplay();
        logMessage(`--- 請選擇下一回合行動 ---`, 'white');
        return;
    }


    // 4-1. 怪物暴擊判定：固定為 40% 
    const MONSTER_CRIT_CHANCE = 0.40;
    const isMonsterCritical = Math.random() < MONSTER_CRIT_CHANCE;
    const monsterDamageMultiplier = isMonsterCritical ? 2 : 1;

    // 4-2. 計算基礎傷害 (減去玩家的總防禦力)
    // ⭐ 修正點 2：使用 totalDefense 變數 ⭐
    let damageReceived = Math.max(5, State.currentMonster.attack - totalDefense);

    // 4-3. 套用怪物暴擊倍率
    damageReceived *= monsterDamageMultiplier;

    damageReceived = Math.round(damageReceived);

    // 4-4. 輸出暴擊訊息
    if (isMonsterCritical) {
        logMessage(`🔥 怪物暴擊！${State.currentMonster.name} 對你造成了雙倍傷害！`, 'orange');
    }

    // 5. 對玩家造成傷害
    State.player.hp -= damageReceived;

    // ⭐ 修正點 3：日誌顯示正確的 totalDefense 值 ⭐
    logMessage(`❌ ${State.currentMonster.name} 對你造成了 ${damageReceived} 點傷害 (已減免 ${totalDefense} 防禦)！`, 'red');

    // 聖騎士職業特效：受傷反彈 40%
    if (State.player.className === '聖騎士' && damageReceived > 0) {
        const reflectDamage = Math.floor(damageReceived * 0.4);
        if (reflectDamage > 0) {
            State.currentMonster.hp -= reflectDamage;
            logMessage(`🛡️ [聖騎士] 神聖反擊！將 ${reflectDamage} 點傷害反彈給 ${State.currentMonster.name}。`, 'yellow');

            // 檢查反彈傷害是否擊殺怪物
            if (State.currentMonster.hp <= 0) {
                endCombat(true);
                return;
            }
        }
    }

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
    const { count, cost } = getUpgradeParams();
    const hpIncrease = 5 * count;

    if (State.permanentData.stones >= cost) {
        // 1. 扣除費用
        State.permanentData.stones -= cost;

        // 2. 增加永久 HP 加成
        State.permanentData.hpBonus += hpIncrease;

        // 3. 更新玩家狀態 (MaxHP 和當前 HP)
        const newTotalMaxHp = calculateTotalMaxHp();
        State.player.hp = newTotalMaxHp;

        // 4. 儲存遊戲和永久數據
        State.savePermanentData();
        State.saveGame();

        // 5. 更新介面和日誌
        logMessage(`❤️ 永久 HP 升級成功 (x${count})！MaxHP +${hpIncrease}，目前 MaxHP: ${newTotalMaxHp}。`, 'yellow');
        updateDisplay();
    } else {
        logMessage(`❌ 您的耀魂石不足 (購買 x${count} 需要 ${cost} 💎)。`, 'red');
    }
}

export function handleMultiplierClick(value) {
    State.setCurrentUpgradeMultiplier(value);

    // 更新按鈕外觀 (需要在 ui_manager.js 中處理，但我們可以發送一個信號或直接呼叫 updateDisplay)
    // 這裡我們假設 updateDisplay 會處理文字更新
    // 對於按鈕的 "active" 狀態，我們需要一個專門的 UI 更新函數

    // 這裡直接調用 ui_manager 的更新函數
    updateDisplay();
}

export function endCombat(isVictory) {
    setIsCombatActive(false);

    if (isVictory) {
        const enemy = State.currentMonster;

        // 轉職挑戰勝利判定
        if (enemy.isEvolutionBoss) {
            logMessage(`🏆 戰勝了心中的恐懼！你獲得了晉升的資格。`, 'gold');
            triggerClassEvolution();
            // 隱藏挑戰按鈕，避免重複挑戰
            if (elements.evolutionChallengePanel) {
                elements.evolutionChallengePanel.style.display = 'none';
            }
            // 結束這裡，避免觸發一般怪物的掉落邏輯 (雖然也沒關係)
            // 但如果有名稱衝突，建議這裡直接 return 或不做後續邏輯
            // 不過為了讓玩家也能拿到金幣，我們繼續往下執行
        }

        // Achievement Tracking (moved here to capture gold update)
        State.player.totalMonstersKilled = (State.player.totalMonstersKilled || 0) + 1;

        // 金幣結算 
        const gold = enemy.goldReward;
        State.player.gold += gold;
        State.player.totalGoldEarned = (State.player.totalGoldEarned || 0) + gold;
        logMessage(`💰 擊敗 ${enemy.name}，獲得 ${gold} 金幣。`, 'yellow');

        // === Boss 擊殺追蹤（用於成就系統）===
        if (enemy.isBoss && enemy.id) {
            // 確保 bossKills 物件存在
            if (!State.player.bossKills) {
                State.player.bossKills = {};
            }
            // 增加該 Boss 的擊殺計數
            State.player.bossKills[enemy.id] = (State.player.bossKills[enemy.id] || 0) + 1;
            logMessage(`🏆 Boss擊殺記錄：${enemy.name} x${State.player.bossKills[enemy.id]}`, 'gold');
        }

        // Trigger achievement check AFTER all stats (kills, gold, boss kills) are updated
        checkAchievements();

        // 擊敗 奧利哈鋼幻影
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

        //擊敗 奧利哈鋼之軀
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

        //擊敗 奧裡哈鋼之神
        if (enemy.id === 'ori-god') {

            const rareLootIds = [
                'ori-god-sword',    // 武器
                'ori-god-helmet',   // 頭盔
                'ori-god-armor',    // 胸甲
                'ori-god-greaves',  // 護脛
                'ori-god-necklace', // 項鍊
                'ori-god-ring',     // 戒指
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

        //擊敗 猩紅尼古拉
        if (enemy.id === 'xmasboss') {

            const rareLootIds = [
                'xmas-sword',         // 武器
                'xmas-helmet',        // 頭盔
                'xmas-armor',         // 胸甲
                'xmas-greaves',       // 護脛
                'xmas-necklace',      // 項鍊
                'xmas-ring',          // 戒指
            ];

            // 隨機選擇其中一件
            const randomIndex = Math.floor(Math.random() * rareLootIds.length);
            const rareLootId = rareLootIds[randomIndex];

            const newItem = getItemById(rareLootId);

            if (newItem) {
                addItemToInventory(newItem);
                logMessage(`🎉 恭喜！您從 ${enemy.name} 身上獲得了神話道具：[${newItem.name}]！`, 'gold');
            }

            const dustId = 'xmas-star';
            const dustCount = 1;
            State.player.materials[dustId] = (State.player.materials[dustId] || 0) + dustCount;
            logMessage(`✨ 獲得稀有素材 [聖誕星] x${dustCount}！`, 'gold');
        }

        // 擊敗 蒼穹-魔能飛燕
        if (enemy.id === 'swallow-boss') {

            const rareLootIds = [
                'heart-of-the-sky',
                'wings-of-the-swallow'
            ];

            // 隨機選擇其中一件
            const randomIndex = Math.floor(Math.random() * rareLootIds.length);
            const rareLootId = rareLootIds[randomIndex];

            const newItem = getItemById(rareLootId);

            if (newItem) {
                addItemToInventory(newItem);
                logMessage(`🎉 恭喜！您從 ${enemy.name} 身上獲得了神話道具：[${newItem.name}]！`, 'gold');
            }
        }

        // 擊敗 汪洋-魔能影鯊
        if (enemy.id === 'shark-boss') {

            const rareLootIds = [
                'heart-of-the-sea',
                'wings-of-the-shark'
            ];

            // 隨機選擇其中一件
            const randomIndex = Math.floor(Math.random() * rareLootIds.length);
            const rareLootId = rareLootIds[randomIndex];

            const newItem = getItemById(rareLootId);

            if (newItem) {
                addItemToInventory(newItem);
                logMessage(`🎉 恭喜！您從 ${enemy.name} 身上獲得了神話道具：[${newItem.name}]！`, 'gold');
            }
        }

        if (enemy.isBoss && enemy.id !== 'ori-shadow' && enemy.id !== 'ori-body' && enemy.id !== 'ori-god' && enemy.id !== 'xmasboss') {

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

    // ⭐ 關鍵修正 v2：檢查是否需要返回城鎮模式
    // 如果 actionsSinceTown 為 0，代表我们在城鎮中戰鬥 (如轉職 Boss, 副本 Boss)
    // 必須使用 enterTownMode 來恢復 Hub 介面 (switchUIMode 只切換按鈕，不足以恢復城鎮狀態)
    const shouldReturnToTown = State.player.actionsSinceTown === 0;

    setCurrentMonster(null);

    if (shouldReturnToTown) {
        enterTownMode();
    } else {
        switchUIMode(false);
    }

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

    // --- Achievement Tracking ---
    checkAchievements();
    // ----------------------------

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

        // 定義類型對應的名稱與emoji
        const typeNameMap = {
            'weapon': '武器',
            'armor': '胸甲',
            'necklace': '項鍊',
            'ring': '戒指',
            'helmet': '頭盔',
            'greaves': '護脛',
            'consumable': '藥水',
            'special': '特殊'
        };

        const typeEmojiMap = {
            'weapon': '⚔️',
            'armor': '🛡️',
            'necklace': '📿',
            'ring': '💍',
            'helmet': '🪖',
            'greaves': '👢',
            'consumable': '🧪',
            'special': '💎'
        };

        let displayType = '';
        const typeName = typeNameMap[item.type] || '物品';

        if (item.image) {
            // 如果有圖片，顯示圖片 + 類型名稱
            displayType = `<img src="${item.image}" alt="${typeName}" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle; margin-right: 4px;"> ${typeName}`;
        } else {
            // 否則顯示 Emoji + 類型名稱
            const emoji = typeEmojiMap[item.type] || '❓';
            displayType = `${emoji} ${typeName}`;
        }

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
            11: '#00ffff'   // 至高 - 青色

        };

        const rarityColor = rarityColorMap[item.rarity] || '#ffffff';
        const itemNameWithColor = `<span style="color: ${rarityColor}; font-weight: bold;">${item.name}</span>`;

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
        itemInfoSpan.innerHTML = `${displayType}: ${itemNameWithColor}${statHtml} 價格: *${item.price}* 💰`;

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

    if (State.player.actionsSinceTown === 0) {
        if (!isAuto) {
            logMessage("🏠 你已經在城鎮裡了！請點擊「繼續探險」開始新的冒險。", 'cyan');
            return;
        }
    }

    // 1. 檢查是否達到返回城鎮的行動要求
    if (State.player.actionsSinceTown < State.player.actionsToTownRequired) {

        const needed = State.player.actionsToTownRequired - State.player.actionsSinceTown;
        logMessage(`❌ 必須在地城中行動 ${needed} 次才能返回城鎮存檔！`, 'orange');
        return;
    }

    // 2. 執行治療 (只對當前 HP 進行操作)
    const totalMaxHp = calculateTotalMaxHp(); // 計算出總 Max HP
    const oldHp = State.player.hp;
    State.player.hp = totalMaxHp;
    const healAmount = State.player.hp - oldHp;

    // 3. 重置行動計數器並設定新目標
    State.player.actionsSinceTown = 0;
    setNewTownGoal();

    State.player.lastRestDepth = State.player.depth;
    State.player.goldAtLastRest = State.player.gold;

    // 4. 存檔 (這是遊戲的關鍵存檔點)
    saveGame();

    // 5. 啟用城鎮功能並刷新商店
    toggleTownAccess(true);
    refreshShopInventory();
    renderShop();

    if (isAuto) {
        logMessage(`🏠 行動目標已達成！自動返回城鎮休息和存檔。`, 'lightgreen');
    } else {
        logMessage(`🏠 成功返回城鎮，恢復了 ${healAmount} 點生命，進度已儲存。`, 'lightgreen');
    }

    updateDisplay();

    // 6. 檢查轉職
    checkClassEvolution();

}

export function enterTownMode() {
    // 1. 恢復基礎冒險模式介面 (重置按鈕、主要區域顯示)
    enterAdventureMode();

    // 2. 更新標題
    if (elements.currentStageTitle) {
        elements.currentStageTitle.textContent = "城鎮休息";
    }

    // 3. 確保背包關閉
    if (elements.inventoryArea) elements.inventoryArea.style.display = 'none';

    // 4. 確保城鎮功能開啟 (交易/升級)
    toggleTownAccess(true);

    // 5. 刷新商店
    refreshShopInventory();
    renderShop();

    // 6. 檢查轉職 (關鍵：確保按鈕重新出現)
    checkClassEvolution();
}

export function handleRevive() {

    const success = loadGame();

    if (success) {
        setGameActive(true);

        State.player.depth = State.player.lastRestDepth;
        State.player.actionsSinceTown = 0;

        const totalMaxHp = calculateTotalMaxHp();
        State.player.hp = totalMaxHp;

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
    if (elements.classSelection) {
        elements.classSelection.style.display = 'grid'; // Fallback
        elements.classSelection.setAttribute('style', 'display: grid !important; grid-template-columns: 1fr 1fr 1fr !important; gap: 10px !important;');
    }
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
        if (State.player.actionsSinceTown === 0) {
            enterTownMode();
        } else {
            enterAdventureMode();
        }

    } else {
        logMessage("歡迎來到地下城冒險！請選擇你的職業來創建新角色。", 'white');

        const initialPlayerState = {
            hp: 0, maxHp: 0, attack: 0, defense: 0, gold: 0, depth: 0, className: "",
            equipment: { weapon: null, helmet: null, armor: null, greaves: null, necklace: null, ring: null },
            inventory: [], materials: {}, goldAtLastRest: 0,
            actionsSinceTown: 0, actionsToTownRequired: 0,
            critChance: 0.05,
            totalGoldEarned: 0
        };
        Object.assign(State.player, initialPlayerState);
        State.setGameActive(false); // Ensure game is inactive for new character

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

    //登入成功後：顯示相關按鈕和副本入口
    elements.howToPlayBtn.style.display = 'block';
    elements.updateLogBtn.style.display = 'block';
    elements.codexBtn.style.display = 'block';
    elements.achievementsBtn.style.display = 'block'; // 顯示成就按鈕
    elements.dungeonEntrancePanel.style.display = 'block';

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
    State.setGameActive(false); // Reset game active state

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

    // 6.登出時：隱藏不屬於登入介面的按鈕和緊急通知 
    elements.howToPlayBtn.style.display = 'none';
    elements.updateLogBtn.style.display = 'none';
    elements.codexBtn.style.display = 'none';
    elements.achievementsBtn.style.display = 'none'; // 隱藏成就按鈕
    elements.dungeonEntrancePanel.style.display = 'none';

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

        elements.howToPlayBtn.style.display = 'none';
        elements.updateLogBtn.style.display = 'none';
        elements.codexBtn.style.display = 'none';
        elements.achievementsBtn.style.display = 'none'; // 隱藏成就按鈕
        elements.dungeonEntrancePanel.style.display = 'none';
    }
}

// =========================================================
// 成就系統 (Achievement System)
// =========================================================

// 檢查並解鎖成就
export function checkAchievements() {
    if (!State.currentUsername) return;

    ACHIEVEMENTS.forEach(achievement => {
        // 如果已經解鎖，跳過
        if (State.permanentData.achievements.includes(achievement.id)) {
            return;
        }

        // 根據檢查函數檢查是否達成
        let isUnlocked = false;
        switch (achievement.checkFunction) {
            case 'checkDepth':
                isUnlocked = State.player.maxDepthReached >= achievement.requirement;
                break;
            case 'checkKills':
                isUnlocked = State.player.totalMonstersKilled >= achievement.requirement;
                break;
            case 'checkEvolution':
                isUnlocked = State.player.isEvolved;
                break;
            case 'checkGoldEarned':
                isUnlocked = State.player.totalGoldEarned >= achievement.requirement;
                break;
            case 'checkStones':
                isUnlocked = State.permanentData.stones >= achievement.requirement;
                break;
            case 'checkKnownItems':
                isUnlocked = State.permanentData.knownItems.length >= achievement.requirement;
                break;
            case 'checkBossKill':
                // 檢查是否擊敗特定 Boss
                if (achievement.bossId && State.player.bossKills) {
                    isUnlocked = (State.player.bossKills[achievement.bossId] || 0) >= achievement.requirement;
                }
                break;
            case 'checkUniqueBossKills':
                // 檢查擊敗不同 Boss 的總數
                if (State.player.bossKills) {
                    const uniqueBossCount = Object.keys(State.player.bossKills).length;
                    isUnlocked = uniqueBossCount >= achievement.requirement;
                }
                break;
            case 'checkItemCollection':
                // 檢查是否收集了特定道具集合
                if (achievement.requiredItems && Array.isArray(achievement.requiredItems)) {
                    isUnlocked = achievement.requiredItems.every(itemId =>
                        State.permanentData.knownItems.includes(itemId)
                    );
                }
                break;
            case 'checkCraftedWeapon':
                // 檢查是否鍛造了特定武器
                isUnlocked = checkCraftedWeapon(achievement);
                break;
        }

        if (isUnlocked) {
            unlockAchievement(achievement.id);
        }
    });
}

// 解鎖成就
export function unlockAchievement(achievementId) {
    // 防止重複解鎖
    if (State.permanentData.achievements.includes(achievementId)) {
        return;
    }

    // 添加到已解鎖列表
    State.permanentData.achievements.push(achievementId);
    State.savePermanentData();

    // 找到成就數據
    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) return;

    // 顯示解鎖通知
    showAchievementNotification(achievement);

    // 日誌
    const tier = ACHIEVEMENT_TIERS[achievement.tier];
    logMessage(`🏆 成就解鎖！${tier.icon} [${achievement.name}] - ${achievement.description}`, 'gold');
}

// 顯示成就解鎖通知
export function showAchievementNotification(achievement) {
    const tier = ACHIEVEMENT_TIERS[achievement.tier];

    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.style.borderColor = tier.color;

    notification.innerHTML = `
        <h2>🏆 成就解鎖！</h2>
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="tier-badge tier-${achievement.tier.toLowerCase()}">${tier.icon} ${tier.name}</div>
        <div class="achievement-description">${achievement.description}</div>
    `;

    document.body.appendChild(notification);

    // 3秒後移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// (Removed redundant achievement wrapper functions as logic is integrated into main functions)

/**
 * 檢查是否鍛造/擁有了特定武器
 */
export function checkCraftedWeapon(achievement) {
    const targetWeapon = achievement.targetWeapon;
    // 檢查背包中是否有該武器
    const hasWeapon = State.player.inventory.some(item => item.id === targetWeapon);
    // 或者檢查是否裝備了該武器
    const isEquipped = State.player.equipment.weapon && State.player.equipment.weapon.id === targetWeapon;
    return hasWeapon || isEquipped;
}

// =========================================
// 回歸玉功能 (Return Jewel Logic)
// =========================================

export function handleReturnJewel() {
    // 显示自定义确认模态框
    if (!elements.returnJewelModalBackdrop) {
        logMessage('⚠️ 模态框元素未找到', 'red');
        return;
    }

    elements.returnJewelModalBackdrop.style.display = 'flex';

    // 绑定确认按钮
    const confirmHandler = () => {
        elements.returnJewelModalBackdrop.style.display = 'none';
        executeReturnJewel();
        cleanup();
    };

    // 绑定取消按钮
    const cancelHandler = () => {
        elements.returnJewelModalBackdrop.style.display = 'none';
        logMessage('❌ 取消使用回歸玉', 'gray');
        cleanup();
    };

    // 清理事件监听器
    const cleanup = () => {
        elements.returnJewelConfirmBtn.removeEventListener('click', confirmHandler);
        elements.returnJewelCancelBtn.removeEventListener('click', cancelHandler);
    };

    elements.returnJewelConfirmBtn.addEventListener('click', confirmHandler);
    elements.returnJewelCancelBtn.addEventListener('click', cancelHandler);
}

// 执行回归玉效果的内部函数
function executeReturnJewel() {
    State.setIsReselecting(true);

    // 1. 如果背包打開，先關閉它
    if (State.isInventoryOpen) {
        toggleInventory();
    }

    // 2. 確保遊戲主容器顯示 (因為 classSelection 在裡面)
    if (elements.gameContent) elements.gameContent.style.display = 'block';

    // 3. 隱藏不相關 UI
    if (elements.hubArea) elements.hubArea.style.display = 'none';
    if (elements.adventureActions) elements.adventureActions.style.display = 'none';
    if (elements.combatModeButtons) elements.combatModeButtons.style.display = 'none';
    if (elements.deathModeButtons) elements.deathModeButtons.style.display = 'none';
    if (elements.inventoryArea) elements.inventoryArea.style.display = 'none'; // 強制隱藏背包容器

    // 4. 顯示職業選擇
    if (elements.classSelection) {
        elements.classSelection.style.display = 'grid';
        elements.classSelection.setAttribute('style', 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;');
    }

    logMessage("🔮 使用了回歸玉... 時光倒流，請重新選擇您的道路。", 'purple');
}

function changeClass(className, hpBonus, attackBonus, defenseBonus, critChanceBonus, goldBonus) {
    State.player.className = className;
    State.player.class = null; // 重置進階職業

    // 設定轉職鎖定：當前層數 + 500
    State.player.nextEvolutionDepth = State.player.depth + 500;
    State.player.isEvolved = false; // 重置轉職狀態

    State.setIsReselecting(false);

    if (elements.classSelection) {
        elements.classSelection.style.display = 'none';
        elements.classSelection.setAttribute('style', 'display: none !important');
    }

    // 恢復正常介面
    enterAdventureMode();

    saveGame();
    updateDisplay();
    logMessage(`✨ 命運重塑！您現在是 [${className}]。`, 'gold');
    logMessage(`🔒 轉職試煉已重置，需在第 ${State.player.nextEvolutionDepth} 層後方能再次挑戰。`, 'gray');
}

// =========================================
// Debug / Cheat Functions
// =========================================
window.cheat_jump = (depth) => {
    if (typeof depth !== 'number') {
        console.log("Usage: cheat_jump(depth_number)");
        return;
    }
    State.player.depth = depth;
    State.player.actionsSinceTown = 0; // Reset return counter to allow exploration
    State.saveGame();
    updateDisplay();
    logMessage(`🚀 [CHEAT] Warp to depth ${depth}.`, 'magenta');
};

// =========================================================
// 合成系統 (Crafting System)
// =========================================================

/**
 * 檢查玩家是否擁有指定配方的所有材料
 * @param {Object} recipe - 合成配方物件
 * @returns {boolean} - 是否可合成
 */
export function checkRecipeAvailable(recipe) {
    if (!recipe || !recipe.materials) return false;

    // 檢查每個材料是否足夠
    return recipe.materials.every(material => {
        const itemInInventory = State.player.inventory.find(item => item.id === material.itemId);
        if (!itemInInventory) return false;

        // 如果是可堆疊物品，檢查數量
        if (itemInInventory.count) {
            return itemInInventory.count >= material.count;
        }

        // 非堆疊物品，計算背包中相同ID物品的數量
        const totalCount = State.player.inventory.filter(item => item.id === material.itemId).length;
        return totalCount >= material.count;
    });
}

/**
 * 執行合成操作
 * @param {Object} recipe - 合成配方物件
 */
export function executeCraft(recipe) {
    // 再次檢查材料（防禦性編程）
    if (!checkRecipeAvailable(recipe)) {
        logMessage('❌ 材料不足，無法合成！', 'red');
        return;
    }

    // 檢查金幣（如果需要）
    if (recipe.goldCost && State.player.gold < recipe.goldCost) {
        logMessage(`❌ 金幣不足！需要 ${recipe.goldCost} 金幣。`, 'red');
        return;
    }

    // 消耗材料
    recipe.materials.forEach(material => {
        let remainingToRemove = material.count;

        // 從背包中移除材料
        for (let i = State.player.inventory.length - 1; i >= 0 && remainingToRemove > 0; i--) {
            const item = State.player.inventory[i];
            if (item.id === material.itemId) {
                if (item.count && item.count > 1) {
                    // 可堆疊物品
                    const removeCount = Math.min(item.count, remainingToRemove);
                    item.count -= removeCount;
                    remainingToRemove -= removeCount;

                    if (item.count <= 0) {
                        State.player.inventory.splice(i, 1);
                    }
                } else {
                    // 非堆疊物品，直接移除
                    State.player.inventory.splice(i, 1);
                    remainingToRemove--;
                }
            }
        }
    });

    // 扣除金幣（如果需要）
    if (recipe.goldCost) {
        State.player.gold -= recipe.goldCost;
    }

    // 生成目標物品
    const resultItem = getItemById(recipe.resultItemId);
    if (resultItem) {
        const newItem = JSON.parse(JSON.stringify(resultItem));
        addItemToInventory(newItem);
        logMessage(`✨ 成功合成 [${resultItem.name}]！`, 'gold');
    }

    // 保存遊戲
    saveGame();
    updateDisplay();

    // 重新渲染背包和合成面板
    if (State.isInventoryOpen) {
        renderInventoryList();
    }
}

/**
 * 獲取所有可用配方（僅顯示材料充足的）
 * @returns {Array} - 可用配方列表
 */
export function getAvailableRecipes() {
    return CRAFTING_RECIPES.filter(recipe => checkRecipeAvailable(recipe));
}

/**
 * 獲取所有配方（包含不可用的）
 * @returns {Array} - 所有配方列表
 */
export function getAllRecipes() {
    return CRAFTING_RECIPES;
}

/**
 * 切換合成面板顯示狀態
 */
export function toggleCraftingPanel() {
    // 僅在城鎮中可使用
    if (State.player.actionsSinceTown > 0) {
        logMessage('🔒 必須返回城鎮才能使用鍛造台！', 'red');
        return;
    }

    const panel = elements.craftingPanel;
    if (!panel) return;

    const isCurrentlyVisible = panel.style.display !== 'none';

    if (isCurrentlyVisible) {
        // 關閉合成面板
        panel.style.display = 'none';
    } else {
        // 打開合成面板（模态框）
        panel.style.display = 'flex';
        renderCraftingPanel();
    }
}

/**
 * 渲染合成面板（需要在 ui_manager.js 中實現）
 */
function renderCraftingPanel() {
    // 這個函數將在 ui_manager.js 中實現
    // 這裡只是一個佔位符，確保函數存在
    if (typeof window.renderCraftingPanel === 'function') {
        window.renderCraftingPanel();
    }
}


