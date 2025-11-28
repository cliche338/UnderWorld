import * as GameLogic from './game_logic.js';
import { elements, updateExchangeDisplay } from './ui_manager.js';


document.addEventListener('DOMContentLoaded', () => {
    // 1. 啟動遊戲入口：檢查本地登入資訊
    GameLogic.checkLocalLogin(); 

    // 2. 綁定帳號相關按鈕 (使用 ui_manager 裡的元素)
    elements.loginBtn.onclick = GameLogic.handleLogin;
    elements.createAccountBtn.onclick = GameLogic.handleCreateAccount;
    elements.logoutBtn.onclick = GameLogic.handleLogout;

    // 3. 綁定職業選擇 
    //HP,ATK,GOLD,DEF,CRIT
    elements.selectKnightBtn.onclick = () => GameLogic.startGame("騎士", 50, 0, 0, 20, 0); 
    elements.selectMerchantBtn.onclick = () => GameLogic.startGame("商人", 0, 0, 200, 0, -0,20);
    elements.selectThiefBtn.onclick = () => GameLogic.startGame("刺客", 0, 25, 0, 0, 0.20);

    // 4. 綁定遊戲流程按鈕
    elements.exploreBtn.onclick = GameLogic.handleExplore; 
    elements.restBtn.onclick = GameLogic.handleRest;
    elements.reviveBtn.onclick = GameLogic.handleRevive;
    elements.inventoryBtn.onclick = GameLogic.toggleInventory;
    elements.closeInventoryBtn.onclick = GameLogic.toggleInventory;

    // 5. 綁定戰鬥按鈕
    elements.attackBtn.onclick = GameLogic.handleAttack;
    elements.runBtn.onclick = GameLogic.handleEscape;
    
    // 6. 綁定交易與升級 (請確保這些函式在 game_logic.js 中被 export)
    elements.exchangeBtn.onclick = GameLogic.handleExchangeGold;
    elements.goldAmountInput.oninput = updateExchangeDisplay; 
    elements.upgradeHpBtn.onclick = GameLogic.handleUpgradeHp;
    elements.upgradeAttackBtn.onclick = GameLogic.handleUpgradeAttack;
    elements.upgradeDefenseBtn.onclick = GameLogic.handleUpgradeDefense;
    
    elements.howToPlayBtn.onclick = GameLogic.showHowToPlay;    //玩法說明
    elements.updateLogBtn.onclick = GameLogic.showUpdateLog;    //更新日誌
    elements.codexBtn.onclick = GameLogic.toggleCodex;          //圖鑑

    if (elements.modalCloseBtn) {
        elements.modalCloseBtn.onclick = () => {
            elements.modalBackdrop.style.display = 'none';
        };
    }
    
});



