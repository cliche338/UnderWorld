<<<<<<< HEAD
import { ACCOUNTS_KEY, SAVE_KEY, PERM_SAVE_KEY } from './config.js'; 
import { logMessage, updateDisplay, elements } from './ui_manager.js';

export let currentMonster = null;
export let isCombatActive = false;
export let gameActive = false;
export let currentUsername = null;
export let isInventoryOpen = false;
export let permanentData = { stones: 0, hpBonus: 0, attackBonus: 0 };

export let player = {
        hp: 0,
        maxHp: 0,
        attack: 0,
        defense: 0,
        gold: 0,
        depth: 0,
        className: "",
        equipment: {
            weapon: null, // 儲存當前裝備的物品物件或 null
            armor: null,  // 儲存當前裝備的物品物件或 null
        },
        
        materials: {},

        inventory: [], // 儲存未裝備的物品物件列表

        actionsToTownRequired: 0,
        actionsSinceTown: 0,//行動計數器
    };

export function setGameActive(value) {
    gameActive = value; // 這裡可以直接修改
}

export function setIsCombatActive(value) {
    isCombatActive = value;
}

export function setCurrentMonster(monsterObject) {
    currentMonster = monsterObject;
}

export function setCurrentUsername(username) {
    currentUsername = username; // 這裡可以直接修改，因為我們在 state.js 內部
}

export function setIsInventoryOpen(value) {
    isInventoryOpen = value; // 這裡可以直接修改
}

export function getStoredAccounts() {
        const data = localStorage.getItem(ACCOUNTS_KEY);
        return data ? JSON.parse(data) : [];
    }

export function saveAccounts(accounts) {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    }

export function loadPermanentData() {
    if (!currentUsername) return; 
    
    // 步驟 1: 建立該用戶專屬的永久數據 KEY
    const uniquePermKey = PERM_SAVE_KEY + '_' + currentUsername;
    const savedDataString = localStorage.getItem(uniquePermKey);

    if (savedDataString) {
        // 步驟 2: 成功載入，將數據寫入 permanentData
        const loadedData = JSON.parse(savedDataString);
        loadedData.stones = loadedData.stones || 0;
        Object.assign(permanentData, loadedData);
    } else {
        // 步驟 3: 新帳號，則初始化 permanentData
        permanentData = { stones: 0, hpBonus: 0, attackBonus: 0 };
    }
}

export function savePermanentData() {
    if (!currentUsername) return; 

    // 步驟 1: 建立該用戶專屬的永久數據 KEY
    const uniquePermKey = PERM_SAVE_KEY + '_' + currentUsername;
    
    // 步驟 2: 將 permanentData 整個物件存入 LocalStorage
    localStorage.setItem(uniquePermKey, JSON.stringify(permanentData));
}

export function loadGame() {
        if (!currentUsername) return false; 

        const uniqueSaveKey = SAVE_KEY + '_' + currentUsername;
        const savedDataString = localStorage.getItem(uniqueSaveKey);

        if (savedDataString) {
            // 🚨 診斷：輸出成功
            console.log("GAME STATE: Found save data for user:", currentUsername);
            
            const loadedPlayer = JSON.parse(savedDataString);
            Object.assign(player, loadedPlayer); 
            
            logMessage("📂 載入本地進度成功。", 'lightgreen');
            return true;
        }
        
        // 🚨 診斷：輸出失敗
        console.log("GAME STATE: No save data found for user:", currentUsername); 
        return false;
    }

export function saveGame() {
        // 只有在登入後才進行存檔
        if (!currentUsername) return; 

        // *** 關鍵修正：使用唯一的 Username 作為存檔密鑰的一部分 ***
        const uniqueSaveKey = SAVE_KEY + '_' + currentUsername; 
        const playerDataString = JSON.stringify(player);
        
        localStorage.setItem(uniqueSaveKey, playerDataString);
        logMessage("💾 遊戲進度已存檔至本地！", 'lightgreen');
=======
import { ACCOUNTS_KEY, SAVE_KEY, PERM_SAVE_KEY } from './config.js'; 
import { logMessage, updateDisplay, elements } from './ui_manager.js';

export let currentMonster = null;
export let isCombatActive = false;
export let gameActive = false;
export let currentUsername = null;
export let isInventoryOpen = false;
export let permanentData = { stones: 0, hpBonus: 0, attackBonus: 0 };

export let player = {
        hp: 0,
        maxHp: 0,
        attack: 0,
        defense: 0,
        gold: 0,
        depth: 0,
        className: "",
        equipment: {
            weapon: null, // 儲存當前裝備的物品物件或 null
            armor: null,  // 儲存當前裝備的物品物件或 null
        },
        
        materials: {},

        inventory: [], // 儲存未裝備的物品物件列表

        actionsToTownRequired: 0,
        actionsSinceTown: 0,//行動計數器
    };

export function setGameActive(value) {
    gameActive = value; // 這裡可以直接修改
}

export function setIsCombatActive(value) {
    isCombatActive = value;
}

export function setCurrentMonster(monsterObject) {
    currentMonster = monsterObject;
}

export function setCurrentUsername(username) {
    currentUsername = username; // 這裡可以直接修改，因為我們在 state.js 內部
}

export function setIsInventoryOpen(value) {
    isInventoryOpen = value; // 這裡可以直接修改
}

export function getStoredAccounts() {
        const data = localStorage.getItem(ACCOUNTS_KEY);
        return data ? JSON.parse(data) : [];
    }

export function saveAccounts(accounts) {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    }

export function loadPermanentData() {
    if (!currentUsername) return; 
    
    // 步驟 1: 建立該用戶專屬的永久數據 KEY
    const uniquePermKey = PERM_SAVE_KEY + '_' + currentUsername;
    const savedDataString = localStorage.getItem(uniquePermKey);

    if (savedDataString) {
        // 步驟 2: 成功載入，將數據寫入 permanentData
        const loadedData = JSON.parse(savedDataString);
        loadedData.stones = loadedData.stones || 0;
        Object.assign(permanentData, loadedData);
    } else {
        // 步驟 3: 新帳號，則初始化 permanentData
        permanentData = { stones: 0, hpBonus: 0, attackBonus: 0 };
    }
}

export function savePermanentData() {
    if (!currentUsername) return; 

    // 步驟 1: 建立該用戶專屬的永久數據 KEY
    const uniquePermKey = PERM_SAVE_KEY + '_' + currentUsername;
    
    // 步驟 2: 將 permanentData 整個物件存入 LocalStorage
    localStorage.setItem(uniquePermKey, JSON.stringify(permanentData));
}

export function loadGame() {
        if (!currentUsername) return false; 

        const uniqueSaveKey = SAVE_KEY + '_' + currentUsername;
        const savedDataString = localStorage.getItem(uniqueSaveKey);

        if (savedDataString) {
            // 🚨 診斷：輸出成功
            console.log("GAME STATE: Found save data for user:", currentUsername);
            
            const loadedPlayer = JSON.parse(savedDataString);
            Object.assign(player, loadedPlayer); 
            
            logMessage("📂 載入本地進度成功。", 'lightgreen');
            return true;
        }
        
        // 🚨 診斷：輸出失敗
        console.log("GAME STATE: No save data found for user:", currentUsername); 
        return false;
    }

export function saveGame() {
        // 只有在登入後才進行存檔
        if (!currentUsername) return; 

        // *** 關鍵修正：使用唯一的 Username 作為存檔密鑰的一部分 ***
        const uniqueSaveKey = SAVE_KEY + '_' + currentUsername; 
        const playerDataString = JSON.stringify(player);
        
        localStorage.setItem(uniqueSaveKey, playerDataString);
        logMessage("💾 遊戲進度已存檔至本地！", 'lightgreen');
>>>>>>> 3e0344665655e7ce1773c771c446981dd705bf43
    }