import * as GameLogic from './game_logic.js';
import { elements, updateExchangeDisplay, hideDungeonChallengeModal, showDungeonChallengeModal } from './ui_manager.js';


document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 啟動遊戲入口：檢查本地登入資訊
    GameLogic.checkLocalLogin(); 

    // 2. 綁定帳號相關按鈕 (使用 ui_manager 裡的元素)
    if (elements.loginBtn) elements.loginBtn.onclick = GameLogic.handleLogin;
    if (elements.createAccountBtn) elements.createAccountBtn.onclick = GameLogic.handleCreateAccount;
    if (elements.logoutBtn) elements.logoutBtn.onclick = GameLogic.handleLogout;

    // 3. 綁定職業選擇 
    // 使用防護檢查，確保元素存在
    if (elements.selectKnightBtn) elements.selectKnightBtn.onclick = () => GameLogic.startGame("騎士", 50, 0, 20, 0, 0); 
    if (elements.selectMerchantBtn) elements.selectMerchantBtn.onclick = () => GameLogic.startGame("商人", 0, 0, 0, -0.20, 200); 
    if (elements.selectThiefBtn) elements.selectThiefBtn.onclick = () => GameLogic.startGame("刺客", 0, 25, 0, 0.20, 0);

    // 4. 綁定遊戲流程按鈕
    if (elements.exploreBtn) elements.exploreBtn.onclick = GameLogic.handleExplore; 
    if (elements.restBtn) elements.restBtn.onclick = GameLogic.handleRest;
    if (elements.reviveBtn) elements.reviveBtn.onclick = GameLogic.handleRevive;
    if (elements.inventoryBtn) elements.inventoryBtn.onclick = GameLogic.toggleInventory;
    if (elements.closeInventoryBtn) elements.closeInventoryBtn.onclick = GameLogic.toggleInventory;

    // 5. 綁定戰鬥按鈕
    if (elements.attackBtn) elements.attackBtn.onclick = GameLogic.handleAttack;
    if (elements.runBtn) elements.runBtn.onclick = GameLogic.handleEscape;
    
    // 6. 綁定交易與升級
    if (elements.exchangeBtn) elements.exchangeBtn.onclick = GameLogic.handleExchangeGold;
    if (elements.goldAmountInput) elements.goldAmountInput.oninput = updateExchangeDisplay; 
    if (elements.upgradeHpBtn) elements.upgradeHpBtn.onclick = GameLogic.handleUpgradeHp;
    if (elements.upgradeAttackBtn) elements.upgradeAttackBtn.onclick = GameLogic.handleUpgradeAttack;
    if (elements.upgradeDefenseBtn) elements.upgradeDefenseBtn.onclick = GameLogic.handleUpgradeDefense;
    
    // 7. 綁定功能按鈕
    if (elements.howToPlayBtn) elements.howToPlayBtn.onclick = GameLogic.showHowToPlay;    
    if (elements.updateLogBtn) elements.updateLogBtn.onclick = GameLogic.showUpdateLog;    
    if (elements.codexBtn) elements.codexBtn.onclick = GameLogic.toggleCodex;          

    // 8. 綁定新增的副本按鈕 (使用防護檢查)
    if (elements.dungeonEnterBtn) {
        // 點擊地圖上的「進入副本挑戰」時：只顯示確認模態框
        elements.dungeonEnterBtn.onclick = () => {
            // 🚨 注意：這裡不再立即隱藏地圖入口
            
            // 呼叫模態框顯示函式 (可以根據實際 Boss 傳入名字)
            showDungeonChallengeModal('古代巨龍', '你確定要挑戰這個強大的 Boss 嗎？你將面對一場沒有退路的戰鬥！');
        };
    }

    if (elements.dungeonChallengeBtn) {
        // 點擊模態框內的「再次挑戰」按鈕：啟動 Boss 戰
        elements.dungeonChallengeBtn.onclick = () => {
            hideDungeonChallengeModal();
            GameLogic.toggleDungeonEntrance(false); // 🚨 挑戰開始，隱藏地圖入口
            GameLogic.handleDungeonBossCombat(); // 啟動戰鬥
        };
    }

    if (elements.dungeonLeaveBtn) {
        // 點擊模態框內的「離開」按鈕：關閉模態框，並隱藏地圖入口
        elements.dungeonLeaveBtn.onclick = () => {
            hideDungeonChallengeModal();
            GameLogic.logMessage("⚔️ 決定暫時撤退，繼續探索！", 'white');
            GameLogic.toggleDungeonEntrance(false); // 🚨 離開，隱藏地圖入口
        };
    }

   if (elements.modalCloseBtn) {
        elements.modalCloseBtn.onclick = () => {
            
            // ⭐ 修正邏輯：如果圖鑑處於開啟狀態，則呼叫 toggleCodex 關閉圖鑑 ⭐
            if (elements.modalBody.classList.contains('codex-modal')) {
                // toggleCodex 會處理隱藏背景、移除樣式和清理篩選器的所有步驟
                GameLogic.toggleCodex(); 
            } else {
                // 否則，執行通用關閉邏輯（用於玩法說明、更新日誌）
                elements.modalBackdrop.style.display = 'none';
            }
        };
    }
    
});