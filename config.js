export const STONE_CONVERSION_RATE = 10;
export const UPGRADE_COST = 50;
export const SAVE_KEY = 'fantasy_adventure_save';
export const ACCOUNTS_KEY = 'local_user_accounts';
export const PERM_SAVE_KEY = 'fantasy_adventure_perm_save'

// =========================================================
// 試煉之門 
// =========================================================
export const DUNGEON_BOSSES = [
        'xmasboss',           // 猩紅尼古拉 (聖誕活動Boss)
        'moon-shadow',        // 殘月魅影
        'revive-phoenix-1',   // 涅槃之朱雀 凰
        'revive-phoenix-2',   // 涅槃之朱雀 鳳
];

// =========================================================
// 舊日支配者 - (解鎖條件: 擊敗奧利哈鋼之神)
// =========================================================
export const CHALLENGE_BOSSES = [
        'Outer-Abhoth',
        'Outer-Tulzscha',
        'Outer-Daoloth',
        'Outer-Ghroth',
        'Outer-Nyarlathotep',
        'Outer-Shub-Niggurath',
        'Outer-Yog-Sothoth',
        'Outer-Azathoth',
];


export const MONSTERS = [
        // 簡單怪物 (Difficulty 1)
        { id: 'goblin1', name: "普通哥布林", hp: 30, attack: 10, defense: 5, goldReward: 15, difficulty: 1 },
        { id: 'slime1', name: "普通史萊姆", hp: 40, attack: 8, defense: 5, goldReward: 20, difficulty: 1 },
        { id: 'slime2', name: "濕潤史萊姆", hp: 50, attack: 10, defense: 15, goldReward: 30, difficulty: 1 },
        { id: 'slime3', name: "劇毒史萊姆", hp: 60, attack: 15, defense: 25, goldReward: 40, difficulty: 1 },
        { id: 'slime4', name: "熔岩史萊姆", hp: 60, attack: 20, defense: 25, goldReward: 40, difficulty: 1 },
        { id: 'slime5', name: "暗影史萊姆", hp: 65, attack: 20, defense: 25, goldReward: 50, difficulty: 1 },

        // 中等怪物 (Difficulty 2)
        { id: 'k1', name: "骷髏人", hp: 35, attack: 20, defense: 15, goldReward: 35, difficulty: 2 },
        { id: 'k2', name: "幽魂射手", hp: 55, attack: 40, defense: 20, goldReward: 50, difficulty: 2 },
        { id: 'wolf1', name: "野狼", hp: 45, attack: 15, defense: 15, goldReward: 40, difficulty: 2 },
        { id: 'wolf2', name: "狼人", hp: 65, attack: 22, defense: 15, goldReward: 55, difficulty: 2 },
        { id: 'wolf3', name: "雙頭狼", hp: 130, attack: 25, defense: 25, goldReward: 80, difficulty: 2 },
        { id: 's-slime1', name: "菁英-普通史萊姆", hp: 80, attack: 15, defense: 25, goldReward: 40, difficulty: 2 },
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
        { id: 'demon1', name: "颱風惡魔", hp: 150, attack: 20, defense: 55, goldReward: 90, difficulty: 3 },
        { id: 'demon2', name: "火焰惡魔", hp: 80, attack: 35, defense: 45, goldReward: 90, difficulty: 3 },
        { id: 'demon3', name: "暗影惡魔", hp: 280, attack: 35, defense: 45, goldReward: 90, difficulty: 3 },

        // 混沌怪物 (Difficulty 4)
        { id: 'x-mo1', name: "混沌-魔能哨兵", hp: 420, attack: 150, defense: 55, goldReward: 150, difficulty: 4 },
        { id: 'x-mo2', name: "混沌-魔能戰士", hp: 400, attack: 155, defense: 65, goldReward: 150, difficulty: 4 },
        { id: 'x-mo3', name: "混沌-魔能獵犬", hp: 370, attack: 170, defense: 55, goldReward: 150, difficulty: 4 },
        { id: 'mo4', name: "魔能戰魂", hp: 400, attack: 190, defense: 85, goldReward: 350, difficulty: 4 },

        // Boss 怪物 (Difficulty 5)
        { id: 'boss1', name: "地城守衛者", hp: 450, attack: 140, defense: 80, goldReward: 300, difficulty: 5, isBoss: true },
        { id: 'boss2', name: "遠古巨龍", hp: 500, attack: 160, defense: 95, goldReward: 1000, difficulty: 5, isBoss: true },
        { id: 'boss3', name: "大樹守衛", hp: 1500, attack: 150, defense: 200, goldReward: 500, difficulty: 5, isBoss: true },
        { id: 'boss4', name: "炸彈惡魔", hp: 550, attack: 175, defense: 100, goldReward: 300, difficulty: 5, isBoss: true },
        { id: 'boss5', name: "凋零女王", hp: 600, attack: 250, defense: 115, goldReward: 500, difficulty: 5, isBoss: true },
        { id: 'boss6', name: "泰坦戰甲", hp: 750, attack: 180, defense: 180, goldReward: 850, difficulty: 5, isBoss: true },
        { id: 'x-mo4', name: "混沌-魔能戰魂", hp: 1800, attack: 220, defense: 150, goldReward: 350, difficulty: 5 },
        { id: 'swallow-boss', name: "蒼穹-魔能飛燕", hp: 18500, attack: 550, defense: 450, goldReward: 1350, difficulty: 5, isBoss: true },
        { id: 'shark-boss', name: "汪洋-魔能影鯊", hp: 18500, attack: 550, defense: 450, goldReward: 1350, difficulty: 5, isBoss: true },
        { id: 'phoenix-boss', name: "墮落折翼鳳凰", hp: 50505, attack: 450, defense: 450, goldReward: 1450, difficulty: 5, isBoss: true },

        // 副本 Boss
        {
                id: 'xmasboss', name: "猩紅尼古拉", hp: 1500, attack: 320, defense: 150, goldReward: 1350, difficulty: 8, isBoss: true,
                image: 'icon/boss/xmasboss.png', drops: ['xmas-sword', 'xmas-helmet', 'xmas-armor', 'xmas-greaves', 'xmas-star']
        },
        {
                id: 'moon-shadow', name: "殘月魅影", hp: 35515, attack: 1550, defense: 550, goldReward: 5120, difficulty: 8, isBoss: true,
                image: 'icon/boss/moon-shadow.png', drops: ['n11', 'r12', 'broken-moon']
        },
        {
                id: 'revive-phoenix-1', name: "涅槃之朱雀 凰", hp: 500000, attack: 6060, defense: 660, goldReward: 8888, difficulty: 9, isBoss: true,
                image: 'icon/boss/revive-phoenix-1.png', drops: ['heart-of-phoenix', 'c9']
        },
        {
                id: 'revive-phoenix-2', name: "真火之朱雀 鳳", hp: 500000, attack: 6060, defense: 660, goldReward: 8888, difficulty: 9, isBoss:
                        true, image: 'icon/boss/revive-phoenix-2.png', drops: ['flame-of-the-truth', 'c9']
        },

        // 世界 Boss
        { id: 'ori-shadow', name: "奧利哈鋼幻影", hp: 37373, attack: 377, defense: 377, goldReward: 370, difficulty: 10, isBoss: true },
        { id: 'ori-body', name: "奧利哈鋼之軀", hp: 737373, attack: 777, defense: 777, goldReward: 370, difficulty: 10, isBoss: true },
        { id: 'ori-god', name: "奧利哈鋼之神", hp: 7777777, attack: 7777, defense: 7777, goldReward: 7777, difficulty: 10, isBoss: true },

        // 外神&舊日 Boss
        {
                id: 'Outer-Azathoth', name: "阿撒托斯", hp: 8800000, attack: 65430, defense: 76060, goldReward: 168888,
                difficulty: 11, isBoss: true, image: 'icon/outergods/Azathoth.png', drops: ['heart-of-Azathoth']
        },
        {
                id: 'Outer-Nyarlathotep', name: "奈亞拉托提普", hp: 4400000, attack: 45670, defense: 56060, goldReward: 128888,
                difficulty: 11, isBoss: true, image: 'icon/outergods/Nyarlathotep.png', drops: ['shape-of-Nyarlathotep']
        },
        {
                id: 'Outer-Shub-Niggurath', name: "莎布-尼古拉絲", hp: 4400000, attack: 45670, defense: 56060, goldReward: 128888,
                difficulty: 11, isBoss: true, image: 'icon/outergods/Shub-Niggurath.png', drops: ['uterus-of-Shub-Niggurath']
        },
        {
                id: 'Outer-Yog-Sothoth', name: "猶格-索托斯", hp: 4400000, attack: 45670, defense: 56060, goldReward: 128888,
                difficulty: 11, isBoss: true, image: 'icon/outergods/Yog-Sothoth.png', drops: ['key-of-Yog-Sothoth']
        },
        {
                id: 'Outer-Daoloth', name: "道羅斯", hp: 2200000, attack: 21980, defense: 3660, goldReward: 128888,
                difficulty: 11, isBoss: true, image: 'icon/outergods/Daoloth.png', drops: ['scales-of-Daoloth']
        },
        {
                id: 'Outer-Ghroth', name: "格赫羅斯", hp: 2200000, attack: 21980, defense: 3660, goldReward: 88888,
                difficulty: 11, isBoss: true, image: 'icon/outergods/Ghroth.png', drops: ['eye-of-Ghroth']
        },
        {
                id: 'Outer-Tulzscha', name: "圖爾茲查", hp: 2200000, attack: 21980, defense: 3660, goldReward: 88888,
                difficulty: 11, isBoss: true, image: 'icon/outergods/Tulzscha.png', drops: ['flame-of-Tulzscha']
        },
        {
                id: 'Outer-Abhoth', name: "阿布霍斯", hp: 2200000, attack: 21980, defense: 3660, goldReward: 88888,
                difficulty: 11, isBoss: true, image: 'icon/outergods/Abhoth.png', drops: ['dust-of-Abhoth']
        },

];

export const ITEMS = [

        // 武器
        {
                id: 'ori-broken-sword', name: '奧利哈鋼斷劍', type: 'weapon', attack: 60, critChance: 0.25, image: 'icon/weapon/ori-broken-sword.png',
                value: 1500, price: 3700, rarity: 10, intro: '斷裂的聖劍'
        },
        {
                id: 'ori-sword', name: '奧利哈鋼聖劍', type: 'weapon', attack: 220, critChance: 0.45, image: 'icon/weapon/ori-sword.png',
                value: 1500, price: 3700, rarity: 10, intro: '修復完好的聖劍\n蘊含巨大能量'
        },
        {
                id: 'ori-god-sword', name: '奧利哈鋼之神劍-亞特蘭蒂斯', type: 'weapon', attack: 520, critChance: 0.60, image: 'icon/weapon/ori-god-sword.png',
                value: 1500, price: 3700, rarity: 10, intro: '蘊藏奧利哈鋼神力的劍\n是傲視群雄的存在'
        },
        {
                id: 'xmas-sword', name: '聖誕樹冰劍', type: 'weapon', attack: 70, defense: 20, image: 'icon/weapon/xmas-sword.png',
                value: 1200, price: 5500, rarity: 10, intro: '聖誕節限時副本掉落'
        },
        {
                id: 'w1', name: '生鏽的短刀', type: 'weapon', attack: 3, image: 'icon/weapon/w1.png',
                value: 20, price: 50, rarity: 1, intro: '普通的短刀但生鏽了'
        },
        {
                id: 'w2', name: '戰士長劍', type: 'weapon', attack: 8, image: 'icon/weapon/w2.png',
                value: 30, price: 400, rarity: 2, intro: '普通戰士們普遍使用的武器'
        },
        {
                id: 'w3', name: '龍牙戰斧', type: 'weapon', attack: 15, image: 'icon/weapon/w3.png',
                value: 100, price: 300, rarity: 3, intro: '屠龍戰士曾使用過的斧頭'
        },
        {
                id: 'w4', name: '狂暴血刃', type: 'weapon', attack: 50, image: 'icon/weapon/w4.png',
                value: 340, price: 1500, rarity: 4, intro: '脾氣差的劍士曾經的刀'
        },
        {
                id: 'w5', name: '普通的長劍', type: 'weapon', attack: 5, image: 'icon/weapon/w5.png',
                value: 20, price: 100, rarity: 1, intro: '就是普通的劍'
        },
        {
                id: 'w6', name: '刺客短匕', type: 'weapon', attack: 25, critChance: 0.65, image: 'icon/weapon/w6.png',
                value: 230, price: 550, rarity: 3, intro: '暗殺者常用的匕首\n大幅提升背刺暴擊概率'
        },
        {
                id: 'w7', name: '騎士槍盾', type: 'weapon', attack: 25, defense: 25, image: 'icon/weapon/w7.png',
                value: 320, price: 680, rarity: 4, intro: '舊城邦騎士的套裝'
        },
        {
                id: 'w8', name: '澄澈之鋒刃', type: 'weapon', attack: 75, critChance: 0.15, image: 'icon/weapon/w8.png',
                value: 520, price: 1220, rarity: 6, intro: '刀刃澄澈可透光的冰晶刀'
        },
        {
                id: 'w9', name: '冰晶樹節枝', type: 'weapon', attack: 85, critChance: -0.25, image: 'icon/weapon/w9.png',
                value: 620, price: 1320, rarity: 6, intro: '用冰晶樹的樹枝加工而成的武器'
        },
        {
                id: 'w10', name: '魔影之爪', type: 'weapon', attack: 155, defense: -40, image: 'icon/weapon/w10.png',
                value: 720, price: 1420, rarity: 7, intro: '暗影惡魔的爪子'
        },
        {
                id: 'w11', name: '嵐切', type: 'weapon', attack: 50, critChance: 0.35, image: 'icon/weapon/w11.png',
                value: 340, price: 1300, rarity: 8, intro: '御風劍士的寶刀'
        },
        {
                id: 'w12', name: '幽魂長弓', type: 'weapon', attack: 110, defense: 10, image: 'icon/weapon/w12.png',
                value: 950, price: 1950, rarity: 8, intro: '幽魂射手的弓箭'
        },
        {
                id: 'w13', name: '混沌魔刃', type: 'weapon', attack: 180, hp: -50, image: 'icon/weapon/w13.png',
                value: 1100, price: 2300, rarity: 9, intro: '被混沌之力侵蝕的古刀'
        },
        {
                id: 'w14', name: '滅龍聖劍', type: 'weapon', attack: 190, defense: -25, critChance: 0.35, image: 'icon/weapon/w14.png',
                value: 1400, price: 3000, rarity: 9, intro: '曾經對巨龍造成重創的劍'
        },
        {
                id: 'w15', name: '解', type: 'weapon', attack: 550, critChance: 0.55, image: 'icon/weapon/w15.png',
                value: 1400, price: 3000, rarity: 10, intro: '「龍麟 反發 成雙之流星」'
        },
        {
                id: 'w16', name: '噬魂七星劍', type: 'weapon', attack: 250, critChance: 0.65, defense: -150, image: 'icon/weapon/w16.png',
                value: 1700, price: 2600, rarity: 9, intro: '「想獲得強大的力量就必須犧牲點什麼...」'
        },
        {
                id: 'w17', name: '名刀月隱', type: 'weapon', attack: 125, critChance: 0.25, image: 'icon/weapon/w17.png',
                value: 700, price: 1600, rarity: 9, intro: '由瑟利亞的刀匠以輝石鍛造\n因其收刀入鞘時會散發微光而得名。'
        },
        {
                id: 'w20', name: '黯淡的大夏龍雀刀', type: 'weapon', attack: 115, image: 'icon/weapon/w20.png',
                value: 4700, price: 6500, rarity: 10, intro: '砍傷鳳凰的刀，但似乎失去了神力'
        },
        // 合成
        {
                id: 'w18', name: '天鯊海燕', type: 'weapon', attack: 450, defense: 55, critChance: 0.15, image: 'icon/weapon/w18.png',
                value: 5000, price: 25000, rarity: 10, intro: '「劈分汪洋，斬裂天際」'
        },
        {
                id: 'w19', name: '心相湧流', type: 'weapon', attack: 350, defense: 350, image: 'icon/weapon/w19.png',
                value: 5000, price: 25000, rarity: 10, intro: '「心刃合一，無盡湧動」'
        },
        {
                id: 'w21', name: '涅槃真火-大夏龍雀', type: 'weapon', attack: 405, defense: 45, hp: 500, image: 'icon/weapon/w21.png',
                value: 47000, price: 65000, rarity: 11, intro: '恢復神力的鳳凰神刀'
        },
        {
                id: 'w22', name: '霜月之輪刃', type: 'weapon', attack: 215, defense: -35, hp: 100, image: 'icon/weapon/w22.png',
                value: 7000, price: 15000, rarity: 10, intro: '於冰月之地吸收月光精華而煉成的武器'
        },
        {
                id: 'The-Great-Old_sword', name: '舊日誓約之劍', type: 'weapon', attack: 2215, defense: 535, hp: 700, image: 'icon/weapon/The-Great-Old_sword.png',
                value: 75000, price: 111520, rarity: 11, intro: '和外神簽訂契約的舊日之劍'
        },
        {
                id: 'The-Great-Old_helmet', name: '舊日誓約之視', type: 'helmet', hp: 1750, attack: 1120, defense: 250, image: 'icon/helmet/The-Great-Old_helmet.png',
                value: 75000, price: 111520, rarity: 11, intro: '和外神簽訂契約的舊日之眼'
        },
        {
                id: 'The-Great-Old_armor', name: '舊日誓約之盔', type: 'armor', hp: 1275, defense: 455, image: 'icon/armor/The-Great-Old_armor.png',
                value: 75000, price: 111520, rarity: 11, intro: '和外神簽訂契約的舊日之盔'
        },
        {
                id: 'The-Great-Old_greaves', name: '舊日誓約之脛', type: 'greaves', attack: 1015, defense: 355, hp: 330, image: 'icon/greaves/The-Great-Old_greaves.png',
                value: 75000, price: 111520, rarity: 11, intro: '和外神簽訂契約的舊日之脛'
        },
        {
                id: 'The-Great-Old_necklace', name: '舊日誓約之鍊', type: 'necklace', attack: 615, defense: 135, hp: 340, image: 'icon/necklace/The-Great-Old_necklace.png',
                value: 75000, price: 111520, rarity: 11, intro: '和外神簽訂契約的舊日之鍊'
        },
        {
                id: 'The-Great-Old_ring', name: '舊日誓約之環', type: 'ring', attack: 415, defense: 235, hp: 670, image: 'icon/ring/The-Great-Old_ring.png',
                value: 75000, price: 111520, rarity: 11, intro: '和外神簽訂契約的舊日之環'
        },

        // 頭盔
        {
                id: 'ori-broken-helmet', name: '碎裂的奧利哈鋼頭骨', type: 'helmet', hp: 200, defense: 85, image: 'icon/helmet/ori-broken-helmet.png',
                value: 1500, price: 3700, rarity: 10, intro: '碎裂的龍骨頭盔'
        },
        {
                id: 'ori-helmet', name: '奧利哈鋼龍骨', type: 'helmet', hp: 400, defense: 150, image: 'icon/helmet/ori-helmet.png',
                value: 1500, price: 3700, rarity: 10, intro: '完整龍骨製成的頭盔\n散發著王者的氣息'
        },
        {
                id: 'ori-god-helmet', name: '奧利哈鋼之神盔-柏拉圖之視', type: 'helmet', hp: 750, attack: 150, defense: 250, image: 'icon/helmet/ori-god-helmet.png',
                value: 1500, price: 3700, rarity: 10, intro: '富含神之力頭盔\n散發神的壓迫感'
        },
        {
                id: 'xmas-helmet', name: '聖誕帽', type: 'helmet', attack: 30, defense: 25, image: 'icon/helmet/xmas-helmet.png',
                value: 1200, price: 5500, rarity: 10, intro: '聖誕節限時副本掉落'
        },
        {
                id: 'h1', name: '皮革帽子', type: 'helmet', defense: 15, image: 'icon/helmet/h1.png',
                value: 70, price: 120, rarity: 1, intro: '一般的皮革帽'
        },
        {
                id: 'h2', name: '士兵鋼盔', type: 'helmet', defense: 25, image: 'icon/helmet/h2.png',
                value: 150, price: 250, rarity: 1, intro: '普通士兵的鋼盔\n還算堪用'
        },
        {
                id: 'h3', name: '軍官帽', type: 'helmet', defense: 30, image: 'icon/helmet/h3.png',
                value: 250, price: 300, rarity: 1, intro: '軍官階級才能獲得的帽子'
        },
        {
                id: 'h4', name: '夜視護目鏡', type: 'helmet', defense: 20, image: 'icon/helmet/h4.png',
                value: 250, price: 220, rarity: 2, intro: '可以在黑夜中偵測動體的護目鏡'
        },
        {
                id: 'h5', name: '惡魔之眼', type: 'helmet', attack: 50, image: 'icon/helmet/h5.png',
                value: 350, price: 630, rarity: 3, intro: '和惡魔在激戰中拔下的惡魔眼睛'
        },
        {
                id: 'h6', name: '鋼鐵面罩', type: 'helmet', hp: 20, defense: 35, image: 'icon/helmet/h6.png',
                value: 300, price: 480, rarity: 2, intro: '鋼鐵戰士的面罩'
        },
        {
                id: 'h7', name: '堅韌戰盔', type: 'helmet', defense: 60, image: 'icon/helmet/h7.png',
                value: 450, price: 720, rarity: 3, intro: '身經百戰的鬥士頭盔'
        },
        {
                id: 'h8', name: '影步兜帽', type: 'helmet', attack: 30, defense: 25, critChance: 0.15, image: 'icon/helmet/h8.png',
                value: 600, price: 950, rarity: 4, intro: '暗影刺客的連帽披風\n從暗夜中現行造成暴擊傷害'
        },
        {
                id: 'h9', name: '泰坦頭骨', type: 'helmet', hp: 120, defense: 50, image: 'icon/helmet/h9.png',
                value: 850, price: 1400, rarity: 5, intro: '泰坦戰甲的頭骨'
        },
        {
                id: 'h10', name: '王者頭冠', type: 'helmet', hp: 180, attack: 40, defense: 40, image: 'icon/helmet/h10.png',
                value: 1200, price: 2000, rarity: 6, intro: '古代失落國度帝王的頭冠'
        },

        // 胸甲
        {
                id: 'ori-broken-armor', name: '碎裂的奧利哈鋼戰甲', type: 'armor', hp: 275, defense: 55, image: 'icon/armor/ori-broken-armor.png',
                value: 1500, price: 3700, rarity: 10, intro: '掉落了幾片龍鱗\n但不影響戰甲的主要功能'
        },
        {
                id: 'ori-armor', name: '奧利哈鋼龍軀', type: 'armor', hp: 550, defense: 110, image: 'icon/armor/ori-armor.png',
                value: 1500, price: 3700, rarity: 10, intro: '完整的龍鱗及骨架\n完好的包覆使用者'
        },
        {
                id: 'ori-god-armor', name: '奧利哈鋼之神甲-失落帝國', type: 'armor', hp: 750, defense: 280, image: 'icon/armor/ori-god-armor.png',
                value: 1500, price: 3700, rarity: 10, intro: '能自主適應穿戴者身形的鎧甲\n能更完美適配使用者'
        },
        {
                id: 'xmas-armor', name: '聖誕服', type: 'armor', hp: 55, defense: 45, image: 'icon/armor/xmas-armor.png',
                value: 1200, price: 5500, rarity: 10, intro: '聖誕節限時副本掉落'
        },
        {
                id: 'a1', name: '皮革護甲', type: 'armor', hp: 10, defense: 5, image: 'icon/armor/a1.png',
                value: 15, price: 250, rarity: 1, intro: '普通的皮革上衣'
        },
        {
                id: 'a2', name: '鋼鐵胸甲', type: 'armor', hp: 25, defense: 15, image: 'icon/armor/a2.png',
                value: 50, price: 500, rarity: 2, intro: '鋼鐵製的胸甲\n可以有效抵擋普通怪物的攻擊'
        },
        {
                id: 'a3', name: '泰坦合金板甲', type: 'armor', hp: 170, defense: 35, image: 'icon/armor/a3.png',
                value: 200, price: 2500, rarity: 4, intro: '泰坦甲殼融合金\n製成的堅硬護甲'
        },
        {
                id: 'a4', name: '死者肩甲', type: 'armor', hp: 50, defense: 25, image: 'icon/armor/a4.png',
                value: 80, price: 750, rarity: 3, intro: '「只有一種方法能讓你從我這裡拿到這件盔甲...」'
        },
        {
                id: 'a5', name: '僧侶袈裟', type: 'armor', hp: 120, defense: 20, image: 'icon/armor/a5.png',
                value: 780, price: 1500, rarity: 3, intro: '寺廟得道高僧的袈裟'
        },
        {
                id: 'a6', name: '聖盾鐵鎧', type: 'armor', hp: 250, defense: 30, image: 'icon/armor/a6.png',
                value: 1280, price: 3450, rarity: 5, intro: '聖騎士的胸鎧\n有效抵禦混沌之力的侵蝕'
        },
        {
                id: 'a7', name: '鐵血戰甲', type: 'armor', hp: 50, defense: 50, image: 'icon/armor/a7.png',
                value: 350, price: 680, rarity: 3, intro: '「戰場廝殺留下的勝者，必不會毫髮無傷」'
        },
        {
                id: 'a8', name: '火焰鱗甲', type: 'armor', hp: 150, defense: 40, image: 'icon/armor/a8.png',
                value: 600, price: 1050, rarity: 4, intro: '歷經極度高溫煉成的火焰鎧甲'
        },
        {
                id: 'a9', name: '龍皮護胸', type: 'armor', hp: 300, defense: 60, image: 'icon/armor/a9.png',
                value: 1000, price: 2100, rarity: 5, intro: '古代巨龍厚皮製成的護胸'
        },
        {
                id: 'a10', name: '守護者之鎧', type: 'armor', hp: 450, defense: 100, image: 'icon/armor/a10.png',
                value: 1800, price: 3800, rarity: 6, intro: '失落帝國守護者的鎧甲\n在末日時仍然堅守國度'
        },

        // 護脛
        {
                id: 'ori-broken-greaves', name: '碎裂的奧利哈鋼鱗甲', type: 'greaves', hp: 100, defense: 85, image: 'icon/greaves/ori-broken-greaves.png',
                value: 1500, price: 3700, rarity: 10, intro: '破損的龍鱗護脛\n有幾處破損但仍堅韌'
        },
        {
                id: 'ori-greaves', name: '奧利哈鋼龍鱗', type: 'greaves', hp: 300, defense: 150, image: 'icon/greaves/ori-greaves.png',
                value: 1500, price: 3700, rarity: 10, intro: '完整包覆下身的龍鱗甲\n閃耀且實用'
        },
        {
                id: 'ori-god-greaves', name: '奧利哈鋼之神鱗-海格力斯', type: 'greaves', hp: 450, defense: 250, image: 'icon/greaves/ori-greaves.png',
                value: 1500, price: 3700, rarity: 10, intro: '由神身上剝落的鱗甲製成\n有效防禦的同時機動性還高'
        },
        {
                id: 'xmas-greaves', name: '聖誕襪', type: 'greaves', attack: 25, defense: 30, image: 'icon/greaves/xmas-greaves.png',
                value: 1200, price: 5500, rarity: 10, intro: '聖誕節限時副本掉落'
        },
        {
                id: 'g1', name: '牛仔褲', type: 'greaves', defense: 15, image: 'icon/greaves/g1.png',
                value: 60, price: 100, rarity: 1, intro: '普通的緊身牛仔褲\n些許影響行動'
        },
        {
                id: 'g2', name: '厚皮腿甲', type: 'greaves', defense: 30, image: 'icon/greaves/g2.png',
                value: 70, price: 220, rarity: 1, intro: '厚重的腿甲\n但富有安全感'
        },
        {
                id: 'g3', name: '狂戰士護脛', type: 'greaves', defense: 55, hp: -30, image: 'icon/greaves/g3.png',
                value: 160, price: 340, rarity: 2, intro: '穿上他似乎會激起戰意'
        },
        {
                id: 'g4', name: '鐵鍊腿甲', type: 'greaves', defense: 45, image: 'icon/greaves/g4.png',
                value: 120, price: 280, rarity: 2, intro: '鐵鍊編織成的腿甲\n兼顧防禦和行動'
        },
        {
                id: 'g5', name: '守護者長靴', type: 'greaves', hp: 50, defense: 50, image: 'icon/greaves/g5.png',
                value: 300, price: 550, rarity: 3, intro: '城邦守護者的標配長靴'
        },
        {
                id: 'g6', name: '刺客皮靴', type: 'greaves', attack: 20, defense: 35, image: 'icon/greaves/g6.png',
                value: 450, price: 780, rarity: 4, intro: '暗影刺客的靴子\n能有效減少腳步聲'
        },
        {
                id: 'g7', name: '泰坦合金護脛', type: 'greaves', defense: 90, hp: 80, image: 'icon/greaves/g7.png',
                value: 900, price: 1600, rarity: 5, intro: '泰坦甲殼融合金\n製成的堅硬護脛'
        },

        // 項鍊
        {
                id: 'ori-broken-necklace', name: '受汙染的奧利哈鋼之心', type: 'necklace', hp: 100, defense: 15, image: 'icon/necklace/ori-broken-necklace.png',
                value: 1500, price: 3700, rarity: 10, intro: '保存不良的龍心\n效果大打折扣'
        },
        {
                id: 'ori-necklace', name: '奧利哈鋼龍心', type: 'necklace', hp: 300, defense: 35, image: 'icon/necklace/ori-necklace.png',
                value: 1500, price: 3700, rarity: 10, intro: '保存完好的龍心\n裝備後似乎可以獲得龍之力'
        },
        {
                id: 'ori-god-necklace', name: '奧利哈鋼之神心-克里提亞', type: 'necklace', hp: 400, attack: 50, defense: 60, image: 'icon/necklace/ori-god-necklace.png',
                value: 1500, price: 3700, rarity: 10, intro: '神的心臟\n只有弒神者可以配戴'
        },
        {
                id: 'n1', name: '守護項鍊', type: 'necklace', hp: 20, defense: 5, image: 'icon/necklace/n1.png',
                value: 30, price: 500, rarity: 2, intro: '守護者的初級項鍊'
        },
        {
                id: 'n2', name: '狂暴掛墜', type: 'necklace', attack: 15, image: 'icon/necklace/n2.png',
                value: 40, price: 750, rarity: 2, intro: '狂戰士的護身符'
        },
        {
                id: 'n3', name: '生命吊墜', type: 'necklace', hp: 50, image: 'icon/necklace/n3.png',
                value: 20, price: 300, rarity: 1, intro: '保佑長壽的護符'
        },
        {
                id: 'n4', name: '原生羽飾', type: 'necklace', hp: 70, image: 'icon/necklace/n4.png',
                value: 60, price: 550, rarity: 3, intro: '巨鳥羽毛裝飾而成的飾品'
        },
        {
                id: 'n5', name: '守望之源', type: 'necklace', hp: 125, defense: 45, image: 'icon/necklace/n5.png',
                value: 660, price: 1250, rarity: 4, intro: '古代城邦守望者的力量之源'
        },
        {
                id: 'n6', name: '紫水晶項鍊', type: 'necklace', hp: 225, defense: 55, image: 'icon/necklace/n6.png',
                value: 660, price: 1550, rarity: 5, intro: '洞窟紫水晶打磨編織而成的項鍊\n散發紫色光芒'
        },
        {
                id: 'n7', name: '暗影線圈', type: 'necklace', attack: 50, defense: -30, image: 'icon/necklace/n7.png',
                value: 850, price: 1800, rarity: 6, intro: '暗影怪物的纖維加工而成的飾品'
        },
        {
                id: 'n8', name: '遠古勳章', type: 'necklace', hp: 350, image: 'icon/necklace/n8.png',
                value: 1100, price: 2300, rarity: 7, intro: '古代英雄的功勳獎章'
        },
        {
                id: 'n9', name: '和諧護符', type: 'necklace', attack: 30, hp: 150, defense: 30, image: 'icon/necklace/n9.png',
                value: 1600, price: 3200, rarity: 8, intro: '古代祈求停戰的和平飾品'
        },
        {
                id: 'n10', name: '混沌之星', type: 'necklace', attack: 75, hp: 200, defense: 45, image: 'icon/necklace/n10.png',
                value: 2500, price: 4500, rarity: 9, intro: '造成怪物混沌化的主因\n淨化後可安全配戴'
        },
        {
                id: 'n11', name: '影之嘆息', type: 'necklace', attack: 175, hp: 250, defense: 55, image: 'icon/necklace/n11.png',
                value: 2750, price: 4800, rarity: 9, intro: '蘊含黑影之力的神石'
        },

        // 戒指
        {
                id: 'ori-broken-ring', name: '污濁的奧利哈鋼之眼', type: 'ring', attack: 35, critChance: 0.10, image: 'icon/ring/ori-broken-ring.png',
                value: 1500, price: 3700, rarity: 10, intro: '黯淡的眼睛\n似乎無法使出全力'
        },
        {
                id: 'ori-ring', name: '奧利哈鋼魔眼', type: 'ring', attack: 140, defense: 30, critChance: 0.20, image: 'icon/ring/ori-ring.png',
                value: 1500, price: 3700, rarity: 10, intro: '從奧利哈鋼身上取出的眼睛\n保存完好且散發不尋常的光芒'
        },
        {
                id: 'ori-god-ring', name: '奧利哈鋼之神眼-蒂邁歐', type: 'ring', attack: 240, defense: 50, critChance: 0.30, image: 'icon/ring/ori-god-ring.png',
                value: 1500, price: 3700, rarity: 10, intro: '看穿一切的神之眼\n能看見過去古文記載中的世界'
        },
        {
                id: 'r1', name: '力量之戒', type: 'ring', attack: 10, image: 'icon/ring/r1.png',
                value: 300, price: 600, rarity: 2, intro: '配戴上後似乎充滿了力量'
        },
        {
                id: 'r2', name: '鐵壁指環', type: 'ring', defense: 10, image: 'icon/ring/r2.png',
                value: 210, price: 550, rarity: 2, intro: '鋼鐵合金製作的指環\n關鍵時刻可以當成指虎用'
        },
        {
                id: 'r3', name: '黯淡全能之石', type: 'ring', attack: 5, hp: 10, defense: 5, image: 'icon/ring/r3.png',
                value: 400, price: 900, rarity: 3, intro: '失去光芒的全能之石\n甚至散發著黑暗氣息'
        },
        {
                id: 'r4', name: '乾淨全能之石', type: 'ring', attack: 10, hp: 15, defense: 10, image: 'icon/ring/r4.png',
                value: 600, price: 1200, rarity: 4, intro: '淨化過的全能之石\n雖不會發光但無侵蝕痕跡'
        },
        {
                id: 'r5', name: '閃耀全能之石', type: 'ring', attack: 20, hp: 25, defense: 20, image: 'icon/ring/r5.png',
                value: 1000, price: 2000, rarity: 5, intro: '閃耀的全能之石\n給予配戴者完全的力量'
        },
        {
                id: 'r6', name: '束縛之戒', type: 'ring', attack: 70, hp: -55, image: 'icon/ring/r6.png',
                value: 700, price: 1800, rarity: 5, intro: '和戒指訂製誓約\n以換取更強大力量'
        },
        {
                id: 'r7', name: '幻影之戒', type: 'ring', attack: 35, hp: 35, defense: 35, image: 'icon/ring/r7.png',
                value: 1500, price: 2500, rarity: 5, intro: '半透明的紫色戒指\n似乎可以操控影子'
        },
        {
                id: 'r8', name: '泰坦防護環', type: 'ring', hp: 80, defense: 50, image: 'icon/ring/r8.png',
                value: 800, price: 1600, rarity: 6, intro: '古代泰坦的防護星環'
        },
        {
                id: 'r9', name: '嗜血魔戒', type: 'ring', attack: 70, hp: -20, defense: 15, critChance: 0.15, image: 'icon/ring/r9.png',
                value: 1200, price: 2200, rarity: 7, intro: '魔物將軍配戴的飾品\n藉由吸收巨量人類血液增強'
        },
        {
                id: 'r10', name: '賢者之眼', type: 'ring', attack: 50, hp: 60, defense: 40, critChance: 0.05, image: 'icon/ring/r10.png',
                value: 1800, price: 3000, rarity: 8, intro: '古代賢者的眼睛\n似乎可以看穿魔物的行動'
        },
        {
                id: 'r11', name: '毀滅指輪', type: 'ring', attack: 120, critChance: 0.15, image: 'icon/ring/r11.png',
                value: 2350, price: 3800, rarity: 9, intro: '具有強大力量的毀滅性戒指'
        },
        {
                id: 'r12', name: '光之低語', type: 'ring', attack: 150, defense: 150, image: 'icon/ring/r12.png',
                value: 2750, price: 4800, rarity: 10, intro: '蘊含皎月之力的神石'
        },

        // 藥水
        {
                id: 'ori-blood', name: '奧利哈鋼之血', type: 'consumable', hp: 300, image: 'icon/consumable/ori-blood.png',
                value: 10, price: 50, rarity: 10, intro: '從奧利哈鋼傷口蒐集的血液\n似乎對人體有益處'
        },
        {
                id: 'c1', name: '輕型治療藥水', type: 'consumable', heal: 30, image: 'icon/consumable/c1.png',
                value: 10, price: 50, rarity: 1, intro: '普通的藥水\n可以輕微治癒傷口'
        },
        {
                id: 'c2', name: '強效治療藥水', type: 'consumable', heal: 60, image: 'icon/consumable/c2.png',
                value: 40, price: 100, rarity: 2, intro: '藥效更強的藥水\n相對有效地治癒傷口'
        },
        {
                id: 'c3', name: '醫療箱', type: 'consumable', heal: 200, image: 'icon/consumable/c3.png',
                value: 150, price: 350, rarity: 4, intro: '完整配置的醫療組\n可以大幅修復身上各處傷口'
        },
        {
                id: 'c4', name: '普通藥草', type: 'consumable', heal: 40, image: 'icon/consumable/c4.png',
                value: 40, price: 75, rarity: 1, intro: '路邊採摘的藥草\n可以簡單止血'
        },
        {
                id: 'c5', name: '大回復藥劑', type: 'consumable', heal: 120, image: 'icon/consumable/c5.png',
                value: 150, price: 280, rarity: 3, intro: '500mL的藥水\n很甜很有用'
        },
        {
                id: 'c6', name: '秘藥', type: 'consumable', heal: 100, hp: 100, image: 'icon/consumable/c6.png',
                value: 700, price: 1440, rarity: 5, intro: '老僧侶製作的秘藥\n服用後可強化人體並治療傷勢'
        },
        {
                id: 'c7', name: '神聖治療藥水', type: 'consumable', heal: 250, image: 'icon/consumable/c7.png',
                value: 350, price: 580, rarity: 6, intro: '教會出品的藥水\n蘊含信仰的力量'
        },
        {
                id: 'c8', name: '不朽藥水', type: 'consumable', heal: 500, image: 'icon/consumable/c8.png',
                value: 800, price: 1250, rarity: 7, intro: '鳳凰血液製成的藥劑\n些微繼承了鳳凰的恢復能力'
        },
        {
                id: 'c9', name: '涅槃藥劑', type: 'consumable', heal: 800, image: 'icon/consumable/c9.png',
                value: 1500, price: 2800, rarity: 8, intro: '鳳凰血液製成的藥劑\n有效繼承了鳳凰的恢復能力'
        },
        {
                id: 'c10', name: '賢者之心', type: 'consumable', hp: 150, defense: 50, image: 'icon/consumable/c10.png',
                value: 1700, price: 2400, rarity: 9, intro: '古代賢者死後保存的心臟\n僅能給天選之人服用\n提供強大治療和防禦'
        },

        // 特殊道具
        {
                id: 'return-jewel', name: '回歸玉', type: 'special',
                value: 5000, price: 100000, rarity: 5,
                image: 'icon/special/return-jewel.png',
                intro: '使用後可重新選擇職業，但需再歷練500層才能再次轉職。'

        },
        {
                id: 'heart-of-the-sea', name: '海洋之心', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/heart-of-the-sea.png',
                intro: '蘊含汪洋之力的寶物。使用後可獲得海洋之力。'
        },
        {
                id: 'heart-of-the-sky', name: '蒼穹之核', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/heart-of-the-sky.png',
                intro: '蘊含蒼穹之力的寶物。使用後可獲得蒼穹之力。'
        },
        {
                id: 'wings-of-the-swallow', name: '飛燕之羽', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/wings-of-the-swallow.png',
                intro: '飛燕的羽毛，可以使用後獲得飛燕之力。'
        },
        {
                id: 'wings-of-the-shark', name: '暗鯊之鰭', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/wings-of-the-shark.png',
                intro: '深海暗鯊的鰭。'
        },
        {
                id: 'heart-broken-scabbard', name: '心之碎裂刀鞘', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/heart-broken-scabbard.png',
                intro: '名刀的刀鞘，已碎裂。'
        },
        {
                id: 'heart-broken-blade', name: '心之碎裂刀刃', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/heart-broken-blade.png',
                intro: '名刀的刀刃，已碎裂。'
        },
        {
                id: 'heart-broken-jaw', name: '心之碎裂刀顎', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/heart-broken-jaw.png',
                intro: '名刀的刀顎，已碎裂。'
        },
        {
                id: 'heart-design-drawing', name: '心之古刀羊皮紙', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/heart-design-drawing.png',
                intro: '古代羊皮紙，上面記載了古刀的設計稿。'
        },
        {
                id: 'broken-fire-wings', name: '烈火折翼之羽', type: 'special',
                value: 5000, price: 100000, rarity: 7,
                image: 'icon/special/broken-fire-wings.png',
                intro: '受傷的鳳凰羽毛，僅帶有微弱的鳳凰之力。'
        },
        {
                id: 'heart-of-phoenix', name: '朱雀之涅槃核心', type: 'special',
                value: 5000, price: 100000, rarity: 10,
                image: 'icon/special/heart-of-phoenix.png',
                intro: '涅槃核心，賦予新生的力量。'
        },
        {
                id: 'flame-of-the-truth', name: '朱雀之三昧真火', type: 'special',
                value: 5000, price: 100000, rarity: 10,
                image: 'icon/special/flame-of-the-truth.png',
                intro: '集元神、元氣、元精凝聚而成的火焰。'
        },
        {
                id: 'broken-moon', name: '碎裂冰鑑', type: 'special',
                value: 2400, price: 5000, rarity: 8,
                image: 'icon/special/broken-moon.png',
                intro: '凝聚凝霜月之力的寶物。'
        },
        // 舊日遺物
        {
                id: 'heart-of-Azathoth', name: '阿撒托斯之核', type: 'special',
                value: 62400, price: 115000, rarity: 11,
                image: 'icon/special/heart-of-Azathoth.png',
                intro: '原初混沌之源核'
        },
        {
                id: 'shape-of-Nyarlathotep', name: '奈亞拉托提普之形', type: 'special',
                value: 62400, price: 115000, rarity: 11,
                image: 'icon/special/shape-of-Nyarlathotep.png',
                intro: '伏行之混沌化身'
        },
        {
                id: 'uterus-of-Shub-Niggurath', name: '莎布-尼古拉絲之卵', type: 'special',
                value: 62400, price: 115000, rarity: 11,
                image: 'icon/special/uterus-of-Shub-Niggurath.png',
                intro: '至高母神的生命之源'
        },
        {
                id: 'key-of-Yog-Sothoth', name: '猶格-索托斯之鑰', type: 'special',
                value: 62400, price: 115000, rarity: 11,
                image: 'icon/special/key-of-Yog-Sothoth.png',
                intro: '鑰匙和門，一生萬物，萬物歸一'
        },
        {
                id: 'scales-of-Daoloth', name: '道羅斯之秤', type: 'special',
                value: 62400, price: 115000, rarity: 11,
                image: 'icon/special/scales-of-Daoloth.png',
                intro: '裂帷者'
        },
        {
                id: 'eye-of-Ghroth', name: '格赫羅斯之眼', type: 'special',
                value: 62400, price: 115000, rarity: 11,
                image: 'icon/special/eye-of-Ghroth.png',
                intro: '前兆，報應，死星'
        },
        {
                id: 'flame-of-Tulzscha', name: '圖爾茲查之燄', type: 'special',
                value: 62400, price: 115000, rarity: 11,
                image: 'icon/special/flame-of-Tulzscha.png',
                intro: '卓越之青炎'
        },
        {
                id: 'dust-of-Abhoth', name: '阿布霍斯之塵', type: 'special',
                value: 62400, price: 115000, rarity: 11,
                image: 'icon/special/dust-of-Abhoth.png',
                intro: '不淨者之源'
        },


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
        { id: 'tough_hide', name: '堅韌獸皮', value: 75, dropRate: 0.45 },
        { id: 'shadow_silk', name: '暗影絲線', value: 180, dropRate: 0.15 },
        { id: 'venom_sac', name: '劇毒囊', value: 250, dropRate: 0.12 },
        { id: 'obsidian_chunk', name: '黑曜石碎片', value: 320, dropRate: 0.10 },
        { id: 'chaos_shard', name: '混沌結晶碎片', value: 650, dropRate: 0.04 },

        // Boss 級或稀有掉落 
        { id: 'dragon_scale', name: '巨龍鱗片', value: 1500, dropRate: 0.02 },
        { id: 'ancient_core', name: '遠古核心', value: 2000, dropRate: 0.015 },
        { id: 'titan_alloy', name: '泰坦合金錠', value: 3500, dropRate: 0.005 },

        // 活動Boss掉落
        { id: 'xmas-star', name: '聖誕星', value: 1500, dropRate: 0.005 },

        // 奧利哈鋼系列掉落 
        { id: 'ori_dust', name: '奧利哈鋼粉塵', value: 5000, dropRate: 0.003 },
        { id: 'ori_essence', name: '奧利哈鋼精華', value: 10000, dropRate: 0.001 },

];

export const STARTER_LOOT_IDS = [
        'w1',
        'h1',
        'a1',
        'g1',
        'c1',
        'c1',
        'c1',
        'c1',
        'c2',
];

// =========================================================
// 合成系統 Crafting System
// =========================================================

export const CRAFTING_RECIPES = [

        {
                id: 'craft_w18',
                name: '《天鯊海燕》',
                resultItemId: 'w18',
                materials: [
                        { itemId: 'heart-of-the-sea', count: 1 },
                        { itemId: 'heart-of-the-sky', count: 1 },
                        { itemId: 'wings-of-the-swallow', count: 1 },
                        { itemId: 'wings-of-the-shark', count: 1 }
                ],
                description: '融合深海和蒼穹的神力，鍛造自然神刀',
                goldCost: 50000
        },
        {
                id: 'craft_w19',
                name: '《心相湧流》',
                resultItemId: 'w19',
                materials: [
                        { itemId: 'heart-broken-scabbard', count: 1 },
                        { itemId: 'heart-broken-blade', count: 1 },
                        { itemId: 'heart-broken-jaw', count: 1 },
                        { itemId: 'heart-design-drawing', count: 1 }
                ],
                description: '收集心之古刀的所有碎片，重鑄傳說名刀',
                goldCost: 50000
        },
        {
                id: 'craft_w21',
                name: '《涅槃真火-大夏龍雀》',
                resultItemId: 'w21',
                materials: [
                        { itemId: 'w20', count: 1 },
                        { itemId: 'broken-fire-wings', count: 1 },
                        { itemId: 'heart-of-phoenix', count: 1 },
                        { itemId: 'flame-of-the-truth', count: 1 },

                ],
                description: '集齊失落的鳳凰聖物，鍛造蘊火神刀',
                goldCost: 50000
        },
        {
                id: 'craft_w22',
                name: '《霜月之輪刃》',
                resultItemId: 'w22',
                materials: [
                        { itemId: 'w8', count: 1 },
                        { itemId: 'w9', count: 1 },
                        { itemId: 'w17', count: 1 },
                        { itemId: 'broken-moon', count: 1 },

                ],
                description: '集齊四大冰霜聖器，鍛造霜月之器',
                goldCost: 50000
        },

        // 舊日套裝
        {
                id: 'craft_The-Great-Old_sword',
                name: '《舊日誓約之劍》',
                resultItemId: 'The-Great-Old_sword',
                materials: [
                        { itemId: 'heart-of-Azathoth', count: 1 },
                        { itemId: 'shape-of-Nyarlathotep', count: 1 },
                        { itemId: 'uterus-of-Shub-Niggurath', count: 1 },
                        { itemId: 'key-of-Yog-Sothoth', count: 1 },
                        { itemId: 'scales-of-Daoloth', count: 1 },
                        { itemId: 'eye-of-Ghroth', count: 1 },
                        { itemId: 'flame-of-Tulzscha', count: 1 },
                        { itemId: 'dust-of-Abhoth', count: 1 },
                ],
                description: '集合舊日遺物，喚醒神器',
                goldCost: 50000
        },
        {
                id: 'craft_The-Great-Old_helmet',
                name: '《舊日誓約之視》',
                resultItemId: 'The-Great-Old_helmet',
                materials: [
                        { itemId: 'heart-of-Azathoth', count: 1 },
                        { itemId: 'shape-of-Nyarlathotep', count: 1 },
                        { itemId: 'uterus-of-Shub-Niggurath', count: 1 },
                        { itemId: 'key-of-Yog-Sothoth', count: 1 },
                        { itemId: 'scales-of-Daoloth', count: 1 },
                        { itemId: 'eye-of-Ghroth', count: 1 },
                        { itemId: 'flame-of-Tulzscha', count: 1 },
                        { itemId: 'dust-of-Abhoth', count: 1 },
                ],
                description: '集合舊日遺物，喚醒神器',
                goldCost: 50000
        },
        {
                id: 'craft_The-Great-Old_armor',
                name: '《舊日誓約之盔》',
                resultItemId: 'The-Great-Old_armor',
                materials: [
                        { itemId: 'heart-of-Azathoth', count: 1 },
                        { itemId: 'shape-of-Nyarlathotep', count: 1 },
                        { itemId: 'uterus-of-Shub-Niggurath', count: 1 },
                        { itemId: 'key-of-Yog-Sothoth', count: 1 },
                        { itemId: 'scales-of-Daoloth', count: 1 },
                        { itemId: 'eye-of-Ghroth', count: 1 },
                        { itemId: 'flame-of-Tulzscha', count: 1 },
                        { itemId: 'dust-of-Abhoth', count: 1 },
                ],
                description: '集合舊日遺物，喚醒神器',
                goldCost: 50000
        },
        {
                id: 'craft_The-Great-Old_greaves',
                name: '《舊日誓約之脛》',
                resultItemId: 'The-Great-Old_greaves',
                materials: [
                        { itemId: 'heart-of-Azathoth', count: 1 },
                        { itemId: 'shape-of-Nyarlathotep', count: 1 },
                        { itemId: 'uterus-of-Shub-Niggurath', count: 1 },
                        { itemId: 'key-of-Yog-Sothoth', count: 1 },
                        { itemId: 'scales-of-Daoloth', count: 1 },
                        { itemId: 'eye-of-Ghroth', count: 1 },
                        { itemId: 'flame-of-Tulzscha', count: 1 },
                        { itemId: 'dust-of-Abhoth', count: 1 },
                ],
                description: '集合舊日遺物，喚醒神器',
                goldCost: 50000
        },
        {
                id: 'craft_The-Great-Old_necklace',
                name: '《舊日誓約之鍊》',
                resultItemId: 'The-Great-Old_necklace',
                materials: [
                        { itemId: 'heart-of-Azathoth', count: 1 },
                        { itemId: 'shape-of-Nyarlathotep', count: 1 },
                        { itemId: 'uterus-of-Shub-Niggurath', count: 1 },
                        { itemId: 'key-of-Yog-Sothoth', count: 1 },
                        { itemId: 'scales-of-Daoloth', count: 1 },
                        { itemId: 'eye-of-Ghroth', count: 1 },
                        { itemId: 'flame-of-Tulzscha', count: 1 },
                        { itemId: 'dust-of-Abhoth', count: 1 },
                ],
                description: '集合舊日遺物，喚醒神器',
                goldCost: 50000
        },
        {
                id: 'craft_The-Great-Old_ring',
                name: '《舊日誓約之環》',
                resultItemId: 'The-Great-Old_ring',
                materials: [
                        { itemId: 'heart-of-Azathoth', count: 1 },
                        { itemId: 'shape-of-Nyarlathotep', count: 1 },
                        { itemId: 'uterus-of-Shub-Niggurath', count: 1 },
                        { itemId: 'key-of-Yog-Sothoth', count: 1 },
                        { itemId: 'scales-of-Daoloth', count: 1 },
                        { itemId: 'eye-of-Ghroth', count: 1 },
                        { itemId: 'flame-of-Tulzscha', count: 1 },
                        { itemId: 'dust-of-Abhoth', count: 1 },
                ],
                description: '集合舊日遺物，喚醒神器',
                goldCost: 50000
        },

];

// =========================================================
// 成就系統 Achievement System
// =========================================================

export const ACHIEVEMENT_TIERS = {
        COMMON: { name: '普通', color: '#27ae60', icon: '🟢' },
        RARE: { name: '稀有', color: '#3498db', icon: '🔵' },
        EPIC: { name: '史詩', color: '#9b59b6', icon: '🟣' },
        LEGENDARY: { name: '傳說', color: '#e67e22', icon: '🟠' },
        GOD: { name: '神話', color: '#c22d12ff', icon: '🔴' }
};

export const ACHIEVEMENT_CATEGORIES = {
        EXPLORATION: { name: '探索', icon: '🗺️' },
        COMBAT: { name: '戰鬥', icon: '⚔️' },
        WEALTH: { name: '財富', icon: '💰' },
        COLLECTION: { name: '收藏', icon: '📦' }
};

export const ACHIEVEMENTS = [
        // 探索類
        {
                id: 'explore_10',
                name: '初探者',
                description: '抵達10層',
                tier: 'COMMON',
                icon: '🚶',
                category: 'EXPLORATION',
                requirement: 10,
                checkFunction: 'checkDepth'
        },
        {
                id: 'explore_50',
                name: '探索者',
                description: '抵達50層',
                tier: 'RARE',
                icon: '🏃',
                category: 'EXPLORATION',
                requirement: 50,
                checkFunction: 'checkDepth'
        },
        {
                id: 'explore_100',
                name: '深淵行者',
                description: '抵達100層',
                tier: 'RARE',
                icon: '🧗',
                category: 'EXPLORATION',
                requirement: 100,
                checkFunction: 'checkDepth'
        },
        {
                id: 'explore_250',
                name: '幻影之森',
                description: '抵達250層',
                tier: 'EPIC',
                icon: '🌀',
                category: 'EXPLORATION',
                requirement: 250,
                checkFunction: 'checkDepth'
        },
        {
                id: 'explore_500',
                name: '還有多遠',
                description: '抵達500層',
                tier: 'EPIC',
                icon: '🌌',
                category: 'EXPLORATION',
                requirement: 500,
                checkFunction: 'checkDepth'
        },
        {
                id: 'explore_1000',
                name: '初見身軀',
                description: '抵達1000層',
                tier: 'LEGENDARY',
                icon: '🪬',
                category: 'EXPLORATION',
                requirement: 1000,
                checkFunction: 'checkDepth'
        },
        {
                id: 'explore_10000',
                name: '神的召見',
                description: '抵達10000層',
                tier: 'LEGENDARY',
                icon: '🧿',
                category: 'EXPLORATION',
                requirement: 10000,
                checkFunction: 'checkDepth'
        },

        // 戰鬥類
        {
                id: 'kill_10',
                name: '新手獵人',
                description: '擊敗10隻怪物',
                tier: 'COMMON',
                icon: '🗡️',
                category: 'COMBAT',
                requirement: 10,
                checkFunction: 'checkKills'
        },
        {
                id: 'kill_100',
                name: '怪物剋星',
                description: '擊敗100隻怪物',
                tier: 'RARE',
                icon: '⚔️',
                category: 'COMBAT',
                requirement: 100,
                checkFunction: 'checkKills'
        },
        {
                id: 'evolution_complete',
                name: '勇者之道',
                description: '完成轉職挑戰',
                tier: 'EPIC',
                icon: '🐉',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkEvolution'
        },
        {
                id: 'kill_1000',
                name: '屠魔戰神',
                description: '擊敗1000隻怪物',
                tier: 'LEGENDARY',
                icon: '👑',
                category: 'COMBAT',
                requirement: 1000,
                checkFunction: 'checkKills'
        },

        // Boss 擊殺類
        {
                id: 'boss_guardian',
                name: '地城征服者',
                description: '擊敗地城守衛者',
                tier: 'RARE',
                icon: '🛡️',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'boss1'
        },
        {
                id: 'boss_dragon',
                name: '屠龍勇士',
                description: '擊敗遠古巨龍',
                tier: 'RARE',
                icon: '🐉',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'boss2'
        },
        {
                id: 'boss_tree',
                name: '森林守護者',
                description: '擊敗大樹守衛',
                tier: 'RARE',
                icon: '🌳',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'boss3'
        },
        {
                id: 'boss_titan',
                name: '鋼鐵終結者',
                description: '擊敗泰坦戰甲',
                tier: 'RARE',
                icon: '⚙️',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'boss6'
        },
        {
                id: 'boss_slayer',
                name: 'Boss 獵人',
                description: '擊敗任意 5 個不同的 Boss',
                tier: 'EPIC',
                icon: '⚔️',
                category: 'COMBAT',
                requirement: 5,
                checkFunction: 'checkUniqueBossKills'
        },
        {
                id: 'shadow_beater',
                name: '剷滅幻影',
                description: '擊敗奧利哈鋼之幻影',
                tier: 'LEGENDARY',
                icon: '🌑',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'ori-shadow'
        },
        {
                id: 'body_beater',
                name: '破壞神軀',
                description: '擊敗奧利哈鋼之軀',
                tier: 'LEGENDARY',
                icon: '🌓',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'ori-body'
        },
        {
                id: 'god_killer',
                name: '弒神之戰',
                description: '擊敗奧利哈鋼之神',
                tier: 'LEGENDARY',
                icon: '🌕',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'ori-god'
        },
        {
                id: 'xmas_killer',
                name: '聖誕紅',
                description: '擊敗聖誕活動限定Boss-猩紅尼古拉',
                tier: 'EPIC',
                icon: '🎅',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'xmasboss'
        },
        {
                id: 'moon_shadow_beater',
                name: '滿月之日，破影之時',
                description: '擊敗殘月魅影',
                tier: 'LEGENDARY',
                icon: '🌙',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'moon-shadow'
        },
        {
                id: 'pheonix_beater',
                name: '涅槃者',
                description: '擊敗全部鳳凰系列Boss',
                tier: 'LEGENDARY',
                icon: '🔥',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: ['phoenix-boss', 'revive-phoenix-1', 'revive-phoenix-2']
        },
        {
                id: 'Outer-Azathoth_beater',
                name: '盲目痴愚之神',
                description: '擊敗阿撒托斯',
                tier: 'GOD',
                icon: '🌑',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'Outer-Azathoth'
        },
        {
                id: 'Outer-Nyarlathotep_beater',
                name: '阿撒托斯之信使',
                description: '擊敗奈亞拉托提普',
                tier: 'GOD',
                icon: '🌒',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'Outer-Nyarlathotep'
        },
        {
                id: 'Outer-Shub-Niggurath_beater',
                name: '孕育千萬子孫的森之黑山羊',
                description: '擊敗莎布-尼古拉絲',
                tier: 'GOD',
                icon: '🌘',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'Outer-Shub-Niggurath'
        },
        {
                id: 'Outer-Yog-Sothoth_beater',
                name: '虛空之扉超越者',
                description: '擊敗猶格-索托斯',
                tier: 'GOD',
                icon: '🌕',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'Outer-Yog-Sothoth'
        },
        {
                id: 'Outer-Daoloth_beater',
                name: '面紗粉飾者',
                description: '擊敗道羅斯',
                tier: 'GOD',
                icon: '🌓',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'Outer-Daoloth'
        },
        {
                id: 'Outer-Ghroth_beater',
                name: '毀滅之先驅',
                description: '擊敗格赫羅斯',
                tier: 'GOD',
                icon: '🌗',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'Outer-Ghroth'
        },
        {
                id: 'Outer-Tulzscha_beater',
                name: '獨尊之聖主',
                description: '擊敗圖爾茲查',
                tier: 'GOD',
                icon: '🌔',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'Outer-Tulzscha'
        },
        {
                id: 'Outer-Abhoth_beater',
                name: '邪魔之祖',
                description: '擊敗阿布霍斯',
                tier: 'GOD',
                icon: '🌒',
                category: 'COMBAT',
                requirement: 1,
                checkFunction: 'checkBossKill',
                bossId: 'Outer-Abhoth'
        },

        // 財富類
        {
                id: 'gold_1000',
                name: '小有積蓄',
                description: '累積1000金幣',
                tier: 'COMMON',
                icon: '💰',
                category: 'WEALTH',
                requirement: 1000,
                checkFunction: 'checkGoldEarned'
        },
        {
                id: 'gold_10000',
                name: '富商',
                description: '累積10000金幣',
                tier: 'RARE',
                icon: '💎',
                category: 'WEALTH',
                requirement: 10000,
                checkFunction: 'checkGoldEarned'
        },
        {
                id: 'stones_100000',
                name: '寶石收藏家',
                description: '持有100000顆耀魂石',
                tier: 'EPIC',
                icon: '💠',
                category: 'WEALTH',
                requirement: 100000,
                checkFunction: 'checkStones'
        },
        {
                id: 'gold_100000',
                name: '財富之王',
                description: '累積100000金幣',
                tier: 'LEGENDARY',
                icon: '👑',
                category: 'WEALTH',
                requirement: 100000,
                checkFunction: 'checkGoldEarned'
        },

        // 收藏類
        {
                id: 'items_5',
                name: '收集愛好者',
                description: '解鎖5件道具',
                tier: 'COMMON',
                icon: '📦',
                category: 'COLLECTION',
                requirement: 5,
                checkFunction: 'checkKnownItems'
        },
        {
                id: 'items_30',
                name: '寶物獵人',
                description: '解鎖30件道具',
                tier: 'RARE',
                icon: '🎁',
                category: 'COLLECTION',
                requirement: 30,
                checkFunction: 'checkKnownItems'
        },
        {
                id: 'items_50',
                name: '圖鑑大師',
                description: '解鎖50件道具',
                tier: 'EPIC',
                icon: '📚',
                category: 'COLLECTION',
                requirement: 50,
                checkFunction: 'checkKnownItems'
        },

        //道具收集成就

        {
                id: 'ori_broken_set',
                name: '破損神器',
                description: '收集破損的奧利哈鋼道具',
                tier: 'EPIC',
                icon: '🌟',
                category: 'COLLECTION',
                checkFunction: 'checkItemCollection',
                requiredItems: [
                        'ori-broken-sword',
                        'ori-broken-helmet',
                        'ori-broken-armor',
                        'ori-broken-greaves',
                        'ori-broken-necklace',
                        'ori-broken-ring'
                ]
        },
        {
                id: 'ori_set',
                name: '天選者',
                description: '收集完整的奧利哈鋼道具',
                tier: 'EPIC',
                icon: '🌟',
                category: 'COLLECTION',
                checkFunction: 'checkItemCollection',
                requiredItems: [
                        'ori-sword',
                        'ori-helmet',
                        'ori-armor',
                        'ori-greaves',
                        'ori-necklace',
                        'ori-ring'
                ]
        },
        {
                id: 'ori_god_set',
                name: '天神',
                description: '收集充滿神力的奧利哈鋼道具',
                tier: 'LEGENDARY',
                icon: '🌟',
                category: 'COLLECTION',
                checkFunction: 'checkItemCollection',
                requiredItems: [
                        'ori-god-sword',
                        'ori-god-helmet',
                        'ori-god-armor',
                        'ori-god-greaves',
                        'ori-god-necklace',
                        'ori-god-ring'
                ]
        },
        {
                id: 'xmas_collector',
                name: '血紅之夜',
                description: '收集所有聖誕節限定裝備',
                tier: 'EPIC',
                icon: '🎄',
                category: 'COLLECTION',
                checkFunction: 'checkItemCollection',
                requiredItems: ['xmas-sword', 'xmas-helmet', 'xmas-armor', 'xmas-greaves']
        },


        // 鍛造武器成就
        {
                id: 'craft_the_w19',
                name: '相由心生，洶湧而溢',
                description: '鍛造傳說名刀《心相湧流》',
                category: 'COLLECTION',
                tier: 'EPIC',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'w19'
        },
        {
                id: 'craft_the_18',
                name: '蒼穹之蛟龍，滄溟之鴻雁',
                description: '鍛造神刀《天鯊海燕》',
                category: 'COLLECTION',
                tier: 'LEGENDARY',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'w18'
        },
        {
                id: 'craft_the_w21',
                name: '涅槃之明，輝耀萬方',
                description: '鍛造神器《涅槃真火-大夏龍雀》',
                category: 'COLLECTION',
                tier: 'LEGENDARY',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'w21'
        },
        {
                id: 'craft_the_w22',
                name: '冰月寒鋒凝霜華',
                description: '鍛造武器《霜月之輪刃》',
                category: 'COLLECTION',
                tier: 'LEGENDARY',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'w22'
        },

        // 舊日裝備成就
        {
                id: 'craft_Great_sword',
                name: '《誓約-猛擊》',
                description: '鍛造武器《舊日誓約之劍》',
                category: 'COLLECTION',
                tier: 'GOD',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'The-Great-Old_sword'
        },
        {
                id: 'craft_Great_helmet',
                name: '《誓約-視界》',
                description: '鍛造武器《舊日誓約之視》',
                category: 'COLLECTION',
                tier: 'GOD',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'The-Great-Old_helmet'
        },
        {
                id: 'craft_Great_armor',
                name: '《誓約-守護》',
                description: '鍛造武器《舊日誓約之盔》',
                category: 'COLLECTION',
                tier: 'GOD',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'The-Great-Old_armor'
        },
        {
                id: 'craft_Great_greaves',
                name: '《誓約-迅捷》',
                description: '鍛造武器《舊日誓約之脛》',
                category: 'COLLECTION',
                tier: 'GOD',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'The-Great-Old_greaves'
        },
        {
                id: 'craft_Great_necklace',
                name: '《誓約-束縛》',
                description: '鍛造武器《舊日誓約之鍊》',
                category: 'COLLECTION',
                tier: 'GOD',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'The-Great-Old_necklace'
        },
        {
                id: 'craft_Great_ring',
                name: '《誓約-靈魂》',
                description: '鍛造武器《舊日誓約之環》',
                category: 'COLLECTION',
                tier: 'GOD',
                icon: '🛠️',
                checkFunction: 'checkCraftedWeapon',
                targetWeapon: 'The-Great-Old_ring'
        },
        {
                id: 'The-Great-Old-Collector',
                name: '舊日遺物收藏家',
                description: '收集所有舊日遺物',
                tier: 'GOD',
                icon: '🧿',
                category: 'COLLECTION',
                checkFunction: 'checkItemCollection',
                requiredItems: ['heart-of-Azathoth', 'shape-of-Nyarlathotep', 'uterus-of-Shub-Niggurath', 'key-of-Yog-Sothoth', 'scales-of-Daoloth', 'eye-of-Ghroth', 'flame-of-Tulzscha', 'dust-of-Abhoth']
        },
        {
                id: 'The-Great-Old-One',
                name: '舊日支配者',
                description: '收集所有舊日聖物',
                tier: 'GOD',
                icon: '🧿',
                category: 'COLLECTION',
                checkFunction: 'checkItemCollection',
                requiredItems: ['The-Great-Old_sword', 'The-Great-Old_helmet', 'The-Great-Old_armor', 'The-Great-Old_greaves', 'The-Great-Old_necklace', 'The-Great-Old_ring']
        },



];
