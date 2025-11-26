export const STONE_CONVERSION_RATE = 10;
export const UPGRADE_COST = 50; 
export const SAVE_KEY = 'fantasy_adventure_save';
export const ACCOUNTS_KEY = 'local_user_accounts';
export const PERM_SAVE_KEY = 'fantasy_adventure_perm_save'

export const MONSTERS = [
    // 簡單怪物 (Difficulty 1)
        { id: 'goblin1', name: "普通哥布林", hp: 30, attack: 10, goldReward: 15, difficulty: 1 },
        { id: 'slime1', name: "普通史萊姆", hp: 40, attack: 8, goldReward: 20, difficulty: 1 },
        { id: 'slime2', name: "濕潤史萊姆", hp: 50, attack: 10, goldReward: 30, difficulty: 1 },
        { id: 'slime3', name: "劇毒史萊姆", hp: 60, attack: 15, goldReward: 40, difficulty: 1 },
        { id: 'slime4', name: "熔岩史萊姆", hp: 60, attack: 20, goldReward: 40, difficulty: 1 },
        { id: 'slime5', name: "暗影史萊姆", hp: 65, attack: 20, goldReward: 50, difficulty: 1 },
        
    // 中等怪物 (Difficulty 2)
        { id: 'k1', name: "骷髏人", hp: 35, attack: 20, goldReward: 35, difficulty: 2 },
        { id: 'wolf1', name: "野狼", hp: 45, attack: 15, goldReward: 40, difficulty: 2 },
        { id: 'wolf2', name: "狼人", hp: 65, attack: 22, goldReward: 55, difficulty: 2 },
        { id: 'wolf3', name: "雙頭狼", hp: 130, attack: 25, goldReward: 80, difficulty: 2 },
        { id: 's-slime1', name: "菁英-普通史萊姆", hp: 80, attack: 16, goldReward: 40, difficulty: 2 },
        { id: 's-slime2', name: "菁英-濕潤史萊姆", hp: 100, attack: 20, goldReward: 60, difficulty: 2 },
        { id: 's-slime3', name: "菁英-劇毒史萊姆", hp: 120, attack: 30, goldReward: 80, difficulty: 2 },
        { id: 's-slime4', name: "菁英-熔岩史萊姆", hp: 120, attack: 40, goldReward: 80, difficulty: 2 },
        { id: 's-slime5', name: "菁英-暗影史萊姆", hp: 130, attack: 40, goldReward: 100, difficulty: 2 },
        
    // 強力怪物 (Difficulty 3)
        { id: 'rock1', name: "黑曜石頭人", hp: 100, attack: 30, goldReward: 80, difficulty: 3 },
        { id: 'rock2', name: "普通岩石頭人", hp: 60, attack: 25, goldReward: 50, difficulty: 3 },
        { id: 'demon1', name: "颱風惡魔", hp: 150, attack: 20, goldReward: 90, difficulty: 3 },
        { id: 'demon2', name: "火焰惡魔", hp: 80, attack: 35, goldReward: 90, difficulty: 3 },

    // Boss 怪物 (Difficulty 4 & 5)
        { id: 'ori-shadow', name: "奧利哈鋼幻影", hp: 2240, attack: 85, goldReward: 700, difficulty: 10, isBoss: true },
        { id: 'boss1', name: "地城守衛者", hp: 200, attack: 40, goldReward: 300, difficulty: 4, isBoss: true },
        { id: 'boss2', name: "遠古巨龍", hp: 500, attack: 60, goldReward: 1000, difficulty: 5, isBoss: true },
        { id: 'boss3', name: "大樹守衛", hp: 1500, attack: 20, goldReward: 500, difficulty: 4, isBoss: true },
        { id: 'boss4', name: "炸彈惡魔", hp: 200, attack: 75, goldReward: 200, difficulty: 5, isBoss: true },

     ];   

export const ITEMS = [
    // 武器
        { id: 'ori-sword', name: '奧利哈鋼聖劍', type: 'weapon', attack: 150, value: 1500, price: 3700, rarity: 10 },
        { id: 'w1', name: '生鏽的短刀', type: 'weapon', attack: 3, value: 20, price: 50, rarity: 1 },
        { id: 'w2', name: '戰士長劍', type: 'weapon', attack: 8, value: 30, price: 400, rarity: 2 }, 
        { id: 'w3', name: '龍牙戰斧', type: 'weapon', attack: 15, value: 100, price: 800, rarity: 3 },
        { id: 'w4', name: '狂暴利刃', type: 'weapon', attack: 50, value: 100, price: 1500, rarity: 4 },
        { id: 'w5', name: '普通的長劍', type: 'weapon', attack: 5, value: 20, price: 100, rarity: 1 },
        { id: 'w6', name: '刺客短匕', type: 'weapon', attack: 25, value: 230, price: 400, rarity: 3 },
        { id: 'w7', name: '騎士槍盾', type: 'weapon', attack: 25, defense: 25, value: 320, price: 580, rarity: 4 },
        
    // 防具
        { id: 'ori-armor', name: '奧利哈鋼之甲', type: 'armor', hp: 550, defense: 55, value: 1500, price: 3700, rarity: 10 },
        { id: 'a1', name: '皮革護甲', type: 'armor', hp: 10, defense: 5, value: 15, price: 250, rarity: 1 },
        { id: 'a2', name: '鋼鐵胸甲', type: 'armor', hp: 25, defense: 15, value: 50, price: 500, rarity: 2 },
        { id: 'a3', name: '泰坦合金板甲', type: 'armor', hp: 170, defense: 35, value: 200, price: 2500, rarity: 4 },
        { id: 'a4', name: '死者肩甲', type: 'armor', hp: 50, defense: 25, value: 80, price: 750, rarity: 3 },
        { id: 'a5', name: '僧侶袈裟', type: 'armor', hp: 120, defense: 20, value: 780, price: 1500, rarity: 3 },
        
    // 項鍊
        { id: 'ori-necklace', name: '奧利哈鋼之心', type: 'necklace', hp: 200, defense: 35, value: 1500, price: 3700, rarity: 10 },
        { id: 'n1', name: '守護項鍊', type: 'necklace', hp: 20, defense: 5, value: 30, price: 500, rarity: 2 },
        { id: 'n2', name: '狂暴掛墜', type: 'necklace', attack: 15, value: 40, price: 750, rarity: 3 },
        { id: 'n3', name: '生命吊墜', type: 'necklace', hp: 50, value: 20, price: 300, rarity: 1 },

    // 戒指
        { id: 'ori-ring', name: '奧利哈鋼之眼', type: 'ring', attack: 70, value: 1500, price: 3700, rarity: 10 },
        { id: 'r1', name: '力量之戒', type: 'ring', attack: 10, value: 300, price: 600, rarity: 2 },
        { id: 'r2', name: '鐵壁指環', type: 'ring', defense: 10, value: 210, price: 550, rarity: 2 },
        { id: 'r3', name: '黯淡全能之石', type: 'ring', attack: 5, hp: 10, defense: 5, value: 400, price: 900, rarity: 3 },
        { id: 'r4', name: '乾淨全能之石', type: 'ring', attack: 10, hp: 15, defense: 10, value: 600, price: 1200, rarity: 4 },
        { id: 'r4', name: '閃耀全能之石', type: 'ring', attack: 20, hp: 25, defense: 20, value: 1000, price: 2000, rarity: 5 },

    // 藥水
        { id: 'c1', name: '輕型治療藥水', type: 'consumable', heal: 20, value: 10, price: 50, rarity: 1 },
        { id: 'c2', name: '強效治療藥水', type: 'consumable', heal: 50, value: 40, price: 100, rarity: 2 },
        { id: 'c3', name: '醫療箱', type: 'consumable', heal: 200, value: 150, price: 350, rarity: 4 },
        { id: 'c4', name: '普通藥草', type: 'consumable', heal: 30, value: 40, price: 75, rarity: 1 },
        { id: 'c5', name: '大回復藥劑', type: 'consumable', heal: 120, value: 150, price: 280, rarity: 3 },
    ];

    export const MATERIALS_DATA = [
        { id: 'goblin_ear', name: '哥布林耳朵', value: 10, dropRate: 0.5 },
        { id: 'slime_gel', name: '史萊姆凝膠', value: 15, dropRate: 0.6 },
        { id: 'dark_dust', name: '黑暗塵土', value: 50, dropRate: 0.25 },
        { id: 'dark_piece', name: '黑暗碎片', value: 500, dropRate: 0.1 },
        { id: 'dark_star', name: '幽冥煞星', value: 5500, dropRate: 0.001 },
        { id: 'wolf_skin', name: '狼皮', value: 25, dropRate: 0.6 },
        { id: 'broken_blade', name: '斷劍', value: 220, dropRate: 0.33 },
        { id: 'cloth', name: '布料纖維', value: 50, dropRate: 0.5 },
        { id: 'cloth', name: '碎骨', value: 50, dropRate: 0.2 },
    ];

    export const STARTER_LOOT_IDS = [
    'w1', 
    'a1',
    'c1', 
    'c1', 
    ];
    
