export const STONE_CONVERSION_RATE = 10;
export const UPGRADE_COST = 50; 
export const SAVE_KEY = 'fantasy_adventure_save';
export const ACCOUNTS_KEY = 'local_user_accounts';
export const PERM_SAVE_KEY = 'fantasy_adventure_perm_save'

export const MONSTERS = [
    // 簡單怪物 (Difficulty 1)
        { id: 'goblin1', name: "普通哥布林", hp: 30, attack: 10, defense: 5, goldReward: 15, difficulty: 1 },
        { id: 'slime1', name: "普通史萊姆", hp: 40, attack: 8, defense: 5,goldReward: 20, difficulty: 1 },
        { id: 'slime2', name: "濕潤史萊姆", hp: 50, attack: 10, defense: 15,goldReward: 30, difficulty: 1 },
        { id: 'slime3', name: "劇毒史萊姆", hp: 60, attack: 15, defense: 25,goldReward: 40, difficulty: 1 },
        { id: 'slime4', name: "熔岩史萊姆", hp: 60, attack: 20, defense: 25,goldReward: 40, difficulty: 1 },
        { id: 'slime5', name: "暗影史萊姆", hp: 65, attack: 20, defense: 25,goldReward: 50, difficulty: 1 },
        
    // 中等怪物 (Difficulty 2)
        { id: 'k1', name: "骷髏人", hp: 35, attack: 20, defense: 15, goldReward: 35, difficulty: 2 },
        { id: 'wolf1', name: "野狼", hp: 45, attack: 15, defense: 20, goldReward: 40, difficulty: 2 },
        { id: 'wolf2', name: "狼人", hp: 65, attack: 22, defense: 20, goldReward: 55, difficulty: 2 },
        { id: 'wolf3', name: "雙頭狼", hp: 130, attack: 25, defense: 40, goldReward: 80, difficulty: 2 },
        { id: 's-slime1', name: "菁英-普通史萊姆", hp: 80, attack: 16, defense: 25, goldReward: 40, difficulty: 2 },
        { id: 's-slime2', name: "菁英-濕潤史萊姆", hp: 100, attack: 20, defense: 30, goldReward: 60, difficulty: 2 },
        { id: 's-slime3', name: "菁英-劇毒史萊姆", hp: 120, attack: 30, defense: 35, goldReward: 80, difficulty: 2 },
        { id: 's-slime4', name: "菁英-熔岩史萊姆", hp: 120, attack: 40, defense: 35, goldReward: 80, difficulty: 2 },
        { id: 's-slime5', name: "菁英-暗影史萊姆", hp: 130, attack: 40, defense: 35, goldReward: 100, difficulty: 2 },
        { id: 'mo1', name: "魔能哨兵", hp: 220, attack: 50, defense: 65, goldReward: 150, difficulty: 2 },
        { id: 'mo2', name: "魔能戰士", hp: 200, attack: 55, defense: 55, goldReward: 150, difficulty: 2 },
        { id: 'mo3', name: "魔能獵犬", hp: 170, attack: 70, defense: 55, goldReward: 150, difficulty: 2 },
        
    // 強力怪物 (Difficulty 3)
        { id: 'rock1', name: "黑曜石頭人", hp: 100, attack: 30, defense: 35, goldReward: 80, difficulty: 3 },
        { id: 'rock2', name: "普通岩石頭人", hp: 60, attack: 25, defense: 45, goldReward: 50, difficulty: 3 },
        { id: 'demon1', name: "颱風惡魔", hp: 150, attack: 20, defense: 75, goldReward: 90, difficulty: 3 },
        { id: 'demon2', name: "火焰惡魔", hp: 80, attack: 35, defense: 45, goldReward: 90, difficulty: 3 },
        { id: 'demon3', name: "暗影惡魔", hp: 280, attack: 35, defense: 45, goldReward: 90, difficulty: 3 },
        { id: 'x-mo1', name: "混沌-魔能哨兵", hp: 420, attack: 150, defense: 55, goldReward: 150, difficulty: 2 },
        { id: 'x-mo2', name: "混沌-魔能戰士", hp: 400, attack: 155, defense: 65, goldReward: 150, difficulty: 2 },
        { id: 'x-mo3', name: "混沌-魔能獵犬", hp: 370, attack: 170, defense: 55, goldReward: 150, difficulty: 2 },
        { id: 'mo4', name: "魔能戰魂", hp: 400, attack: 190, defense: 85, goldReward: 350, difficulty: 2 },

    // Boss 怪物 (Difficulty 4 & 5)
        { id: 'boss1', name: "地城守衛者", hp: 450, attack: 140, defense: 80, goldReward: 300, difficulty: 4, isBoss: true },
        { id: 'boss2', name: "遠古巨龍", hp: 500, attack: 160, defense: 95, goldReward: 1000, difficulty: 5, isBoss: true },
        { id: 'boss3', name: "大樹守衛", hp: 1500, attack: 150, defense: 200, goldReward: 500, difficulty: 4, isBoss: true },
        { id: 'boss4', name: "炸彈惡魔", hp: 550, attack: 175, defense: 100, goldReward: 300, difficulty: 5, isBoss: true },
        { id: 'boss5', name: "凋零女王", hp: 600, attack: 250, defense: 115, goldReward: 500, difficulty: 5, isBoss: true },
        { id: 'x-mo4', name: "混沌-魔能戰魂", hp: 1800, attack: 220, defense: 150, goldReward: 350, difficulty: 4 },

    // 世界級 Boss
        { id: 'ori-shadow', name: "奧利哈鋼幻影", hp: 37373, attack: 377, defense: 377, goldReward: 370, difficulty: 10, isBoss: true },
        { id: 'ori-body', name: "奧利哈鋼之軀", hp: 700700, attack: 777, defense: 777, goldReward: 370, difficulty: 10, isBoss: true },
        { id: 'ori-god', name: "奧利哈鋼之神", hp: 7777777777777, attack: 777777, defense: 7777, goldReward: 7777, difficulty: 10, isBoss: true },
     ];   

export const ITEMS = [

    // 武器
        { id: 'ori-broken-sword', name: '奧利哈鋼斷劍', type: 'weapon', attack: 60, value: 1500, price: 3700, rarity: 10 },
        { id: 'ori-sword', name: '奧利哈鋼聖劍', type: 'weapon', attack: 150, value: 1500, price: 3700, rarity: 10 },
        { id: 'w1', name: '生鏽的短刀', type: 'weapon', attack: 3, value: 20, price: 50, rarity: 1 },
        { id: 'w2', name: '戰士長劍', type: 'weapon', attack: 8, value: 30, price: 400, rarity: 2 }, 
        { id: 'w3', name: '龍牙戰斧', type: 'weapon', attack: 15, value: 100, price: 800, rarity: 3 },
        { id: 'w4', name: '狂暴利刃', type: 'weapon', attack: 50, value: 340, price: 1500, rarity: 4 },
        { id: 'w5', name: '普通的長劍', type: 'weapon', attack: 5, value: 20, price: 100, rarity: 1 },
        { id: 'w6', name: '刺客短匕', type: 'weapon', attack: 25, value: 230, price: 400, rarity: 3 },
        { id: 'w7', name: '騎士槍盾', type: 'weapon', attack: 25, defense: 25, value: 320, price: 580, rarity: 4 },
        { id: 'w8', name: '澄澈之鋒刃', type: 'weapon', attack: 75, value: 520, price: 1220, rarity: 5 },
        { id: 'w9', name: '冰晶樹節枝', type: 'weapon', attack: 85, value: 620, price: 1420, rarity: 6 },
        { id: 'w10', name: '魔影之爪', type: 'weapon', attack: 155, defense: -40, value: 620, price: 1420, rarity: 7 },
        { id: 'w11', name: '戰神之錘', type: 'weapon', attack: 130, value: 850, price: 1800, rarity: 7 },
        { id: 'w12', name: '幽魂長弓', type: 'weapon', attack: 110, defense: 10, value: 950, price: 1950, rarity: 8 },
        { id: 'w13', name: '混沌魔刃', type: 'weapon', attack: 180, hp: -50, value: 1100, price: 2300, rarity: 9 },
        { id: 'w14', name: '滅龍聖劍', type: 'weapon', attack: 220, value: 1500, price: 3000, rarity: 9 },
        
    // 頭盔
        { id: 'ori-broken-helmet', name: '碎裂的奧利哈鋼頭骨', type: 'helmet', hp: 100, defense: 85, value: 1500, price: 3700, rarity: 10 },
        { id: 'ori-helmet', name: '奧利哈鋼龍骨', type: 'helmet', hp: 200, defense: 150, value: 1500, price: 3700, rarity: 10 },
        { id: 'h1', name: '皮革帽子', type: 'helmet', defense: 15, value: 70, price: 120, rarity: 1 },
        { id: 'h2', name: '士兵鋼盔', type: 'helmet', defense: 25, value: 150, price: 250, rarity: 1 },
        { id: 'h3', name: '軍官帽', type: 'helmet', defense: 30, value: 250, price: 300, rarity: 1 },
        { id: 'h4', name: '護目鏡', type: 'helmet', defense: 20, value: 250, price: 220, rarity: 2 },
        { id: 'h5', name: '惡魔之眼', type: 'helmet', attack: 50, value: 350, price: 630, rarity: 3 },
        { id: 'h6', name: '鋼鐵面罩', type: 'helmet', hp: 20, defense: 35, value: 300, price: 480, rarity: 2 },
        { id: 'h7', name: '堅韌戰盔', type: 'helmet', defense: 60, value: 450, price: 720, rarity: 3 },
        { id: 'h8', name: '影步兜帽', type: 'helmet', attack: 30, defense: 25, value: 600, price: 950, rarity: 4 },
        { id: 'h9', name: '泰坦頭骨', type: 'helmet', hp: 120, defense: 50, value: 850, price: 1400, rarity: 5 },
        { id: 'h10', name: '王者頭冠', type: 'helmet', hp: 80, attack: 40, defense: 40, value: 1200, price: 2000, rarity: 6 },
    
    // 胸甲
        { id: 'ori-broken-armor', name: '碎裂的奧利哈鋼戰甲', type: 'armor', hp: 275, defense: 535, value: 1500, price: 3700, rarity: 10 },
        { id: 'ori-armor', name: '奧利哈鋼龍軀', type: 'armor', hp: 550, defense: 55, value: 1500, price: 3700, rarity: 10 },
        { id: 'a1', name: '皮革護甲', type: 'armor', hp: 10, defense: 5, value: 15, price: 250, rarity: 1 },
        { id: 'a2', name: '鋼鐵胸甲', type: 'armor', hp: 25, defense: 15, value: 50, price: 500, rarity: 2 },
        { id: 'a3', name: '泰坦合金板甲', type: 'armor', hp: 170, defense: 35, value: 200, price: 2500, rarity: 4 },
        { id: 'a4', name: '死者肩甲', type: 'armor', hp: 50, defense: 25, value: 80, price: 750, rarity: 3 },
        { id: 'a5', name: '僧侶袈裟', type: 'armor', hp: 120, defense: 20, value: 780, price: 1500, rarity: 3 },
        { id: 'a6', name: '聖盾鐵鎧', type: 'armor', hp: 250, defense: 30, value: 1280, price: 3450, rarity: 5 },
        { id: 'a7', name: '鐵血戰甲', type: 'armor', hp: 50, defense: 50, value: 350, price: 680, rarity: 3 },
        { id: 'a8', name: '火焰鱗甲', type: 'armor', hp: 150, defense: 40, value: 600, price: 1050, rarity: 4 },
        { id: 'a9', name: '龍皮護胸', type: 'armor', hp: 300, defense: 60, value: 1000, price: 2100, rarity: 5 },
        { id: 'a10', name: '守護者之鎧', type: 'armor', hp: 450, defense: 100, value: 1800, price: 3800, rarity: 6 },
         
    // 護脛
        { id: 'ori-broken-greaves', name: '碎裂的奧利哈鋼鱗甲', type: 'greaves', hp: 100, defense: 85, value: 1500, price: 3700, rarity: 10 },
        { id: 'ori-greaves', name: '奧利哈鋼龍鱗', type: 'greaves', hp: 200, defense: 150, value: 1500, price: 3700, rarity: 10 },
        { id: 'g1', name: '牛仔褲', type: 'greaves', defense: 15, value: 60, price: 100, rarity: 1 },
        { id: 'g2', name: '厚皮腿甲', type: 'greaves', defense: 30, value: 70, price: 220, rarity: 1 },
        { id: 'g3', name: '狂戰士護脛', type: 'greaves', defense: 55, hp:-30, value: 160, price: 340, rarity: 2 },
        { id: 'g4', name: '鐵鍊腿甲', type: 'greaves', defense: 45, value: 120, price: 280, rarity: 2 },
        { id: 'g5', name: '守護者長靴', type: 'greaves', hp: 50, defense: 50, value: 300, price: 550, rarity: 3 },
        { id: 'g6', name: '刺客皮靴', type: 'greaves', attack: 20, defense: 35, value: 450, price: 780, rarity: 4 },
        { id: 'g7', name: '泰坦合金護脛', type: 'greaves', defense: 90, hp: 80, value: 900, price: 1600, rarity: 5 },
    
    // 項鍊
        { id: 'ori-broken-necklace', name: '碎裂的奧利哈鋼之心', type: 'necklace', hp: 100, defense: 15, value: 1500, price: 3700, rarity: 10 },
        { id: 'ori-necklace', name: '奧利哈鋼龍心', type: 'necklace', hp: 200, defense: 35, value: 1500, price: 3700, rarity: 10 },
        { id: 'n1', name: '守護項鍊', type: 'necklace', hp: 20, defense: 5, value: 30, price: 500, rarity: 2 },
        { id: 'n2', name: '狂暴掛墜', type: 'necklace', attack: 15, value: 40, price: 750, rarity: 2 },
        { id: 'n3', name: '生命吊墜', type: 'necklace', hp: 50, value: 20, price: 300, rarity: 1 },
        { id: 'n4', name: '原生羽飾', type: 'necklace', hp: 70, value: 60, price: 550, rarity: 3 },
        { id: 'n5', name: '守望之源', type: 'necklace', hp: 125, defense: 45, value: 660, price: 1250, rarity: 4 },
        { id: 'n6', name: '紫水晶項鍊', type: 'necklace', hp: 225, defense: 55, value: 660, price: 1550, rarity: 5 },
        { id: 'n7', name: '暗影線圈', type: 'necklace', attack: 50, defense: -30, value: 850, price: 1800, rarity: 6 },
        { id: 'n8', name: '遠古勳章', type: 'necklace', hp: 350, value: 1100, price: 2300, rarity: 7 },
        { id: 'n9', name: '和諧護符', type: 'necklace', attack: 30, hp: 150, defense: 30, value: 1600, price: 3200, rarity: 8 },
        { id: 'n10', name: '混沌之星', type: 'necklace', attack: 75, hp: 200, defense: 45, value: 2500, price: 4500, rarity: 9 },

    // 戒指
        { id: 'ori-broken-ring', name: '污濁的奧利哈鋼之眼', type: 'ring', attack: 35, value: 1500, price: 3700, rarity: 10 },
        { id: 'ori-ring', name: '奧利哈鋼魔眼', type: 'ring', attack: 70, defense: 30, value: 1500, price: 3700, rarity: 10 },
        { id: 'r1', name: '力量之戒', type: 'ring', attack: 10, value: 300, price: 600, rarity: 2 },
        { id: 'r2', name: '鐵壁指環', type: 'ring', defense: 10, value: 210, price: 550, rarity: 2 },
        { id: 'r3', name: '黯淡全能之石', type: 'ring', attack: 5, hp: 10, defense: 5, value: 400, price: 900, rarity: 3 },
        { id: 'r4', name: '乾淨全能之石', type: 'ring', attack: 10, hp: 15, defense: 10, value: 600, price: 1200, rarity: 4 },
        { id: 'r5', name: '閃耀全能之石', type: 'ring', attack: 20, hp: 25, defense: 20, value: 1000, price: 2000, rarity: 5 },
        { id: 'r6', name: '束縛之戒', type: 'ring', attack: 70, hp: -55, value: 700, price: 1800, rarity: 5 },
        { id: 'r7', name: '幻影之戒', type: 'ring', attack: 35, hp: 35, defense: 35, value: 1500, price: 2500, rarity: 5 }, 
        { id: 'r8', name: '泰坦防護環', type: 'ring', hp: 80, defense: 50, value: 800, price: 1600, rarity: 6 },
        { id: 'r9', name: '嗜血魔戒', type: 'ring', attack: 70, hp: -20, defense: 15, value: 1200, price: 2200, rarity: 7 },
        { id: 'r10', name: '賢者之眼', type: 'ring', attack: 50, hp: 60, defense: 40, value: 1800, price: 3500, rarity: 8 },
        { id: 'r11', name: '毀滅指輪', type: 'ring', attack: 220, value: 2500, price: 5000, rarity: 9 },

    // 藥水
        { id: 'ori-blood', name: '奧利哈鋼之血', type: 'consumable', hp: 300, value: 10, price: 50, rarity: 10 },
        { id: 'c1', name: '輕型治療藥水', type: 'consumable', heal: 20, value: 10, price: 50, rarity: 1 },
        { id: 'c2', name: '強效治療藥水', type: 'consumable', heal: 50, value: 40, price: 100, rarity: 2 },
        { id: 'c3', name: '醫療箱', type: 'consumable', heal: 200, value: 150, price: 350, rarity: 4 },
        { id: 'c4', name: '普通藥草', type: 'consumable', heal: 30, value: 40, price: 75, rarity: 1 },
        { id: 'c5', name: '大回復藥劑', type: 'consumable', heal: 120, value: 150, price: 280, rarity: 3 },
        { id: 'c6', name: '秘藥', type: 'consumable', hp: 100, value: 700, price: 1440, rarity: 5 },
        { id: 'c7', name: '神聖治療藥水', type: 'consumable', heal: 250, value: 350, price: 580, rarity: 6 },
        { id: 'c8', name: '涅槃藥劑', type: 'consumable', heal: 500, value: 800, price: 1250, rarity: 7 },
        { id: 'c9', name: '不朽藥水', type: 'consumable', heal: 800, value: 1500, price: 2800, rarity: 8 },
        { id: 'c10', name: '賢者之心', type: 'consumable', defense: 500, value: 3000, price: 5000, rarity: 9 },

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
        { id: 'bone_shard', name: '碎骨', value: 50, dropRate: 0.2 }, 
        { id: 'monster_bone', name: '巨獸骨塊', value: 80, dropRate: 0.4 },
        { id: 'mana_gem', name: '魔力寶石碎片', value: 800, dropRate: 0.05 },
        { id: 'ore_chunk', name: '黑鐵礦石', value: 150, dropRate: 0.35 },
        { id: 'demon_horn', name: '惡魔之角', value: 1200, dropRate: 0.08 },

    ];

    export const STARTER_LOOT_IDS = [
    'w1', 
    'a1',
    'c1', 
    'c1', 
    ];
    
