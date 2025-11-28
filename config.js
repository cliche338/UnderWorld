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
        { id: 'k2', name: "幽魂射手", hp: 55, attack: 40, defense: 30, goldReward: 50, difficulty: 2 },
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
        { id: 'boss6', name: "泰坦戰甲", hp: 750, attack: 180, defense: 180, goldReward: 850, difficulty: 5, isBoss: true },
        { id: 'x-mo4', name: "混沌-魔能戰魂", hp: 1800, attack: 220, defense: 150, goldReward: 350, difficulty: 4 },

    // 世界級 Boss
        { id: 'ori-shadow', name: "奧利哈鋼幻影", hp: 37373, attack: 377, defense: 377, goldReward: 370, difficulty: 10, isBoss: true },
        { id: 'ori-body', name: "奧利哈鋼之軀", hp: 700700, attack: 777, defense: 777, goldReward: 370, difficulty: 10, isBoss: true },
        { id: 'ori-god', name: "奧利哈鋼之神", hp: 7777777777777, attack: 777777, defense: 7777, goldReward: 7777, difficulty: 10, isBoss: true },
     ];   

export const ITEMS = [

    // 武器
        { id: 'ori-broken-sword', name: '奧利哈鋼斷劍', type: 'weapon', attack: 60, value: 1500, price: 3700, rarity: 10, intro: '斷裂的聖劍'},
        { id: 'ori-sword', name: '奧利哈鋼聖劍', type: 'weapon', attack: 220, value: 1500, price: 3700, rarity: 10, intro: '修復完好的聖劍\n蘊含巨大能量'},
        { id: 'w1', name: '生鏽的短刀', type: 'weapon', attack: 3, value: 20, price: 50, rarity: 1, intro: '普通的短刀但生鏽了' },
        { id: 'w2', name: '戰士長劍', type: 'weapon', attack: 8, value: 30, price: 400, rarity: 2, intro: '普通戰士們普遍使用的武器'}, 
        { id: 'w3', name: '龍牙戰斧', type: 'weapon', attack: 15, value: 100, price: 300, rarity: 3 , intro: '屠龍戰士曾使用過的斧頭'},
        { id: 'w4', name: '狂暴利刃', type: 'weapon', attack: 50, value: 340, price: 1500, rarity: 4 , intro: '脾氣差的劍士曾經的刀'},
        { id: 'w5', name: '普通的長劍', type: 'weapon', attack: 5, value: 20, price: 100, rarity: 1, intro: '就是普通的劍'},
        { id: 'w6', name: '刺客短匕', type: 'weapon', attack: 25, value: 230, price: 550, rarity: 3, intro: '暗殺者常用的匕首'},
        { id: 'w7', name: '騎士槍盾', type: 'weapon', attack: 25, defense: 25, value: 320, price: 680, rarity: 4, intro: '舊城邦騎士的套裝'},
        { id: 'w8', name: '澄澈之鋒刃', type: 'weapon', attack: 75, value: 520, price: 1220, rarity: 5 ,intro: '刀刃澄澈可透光的冰晶刀'},
        { id: 'w9', name: '冰晶樹節枝', type: 'weapon', attack: 85, value: 620, price: 1320, rarity: 6 ,intro: '用冰晶樹的樹枝加工而成的武器'},
        { id: 'w10', name: '魔影之爪', type: 'weapon', attack: 155, defense: -40, value: 720, price: 1420, rarity: 7, intro: '暗影惡魔的爪子'},
        { id: 'w11', name: '嵐切', type: 'weapon', attack: 50, value: 340, price: 1300, rarity: 8, intro: '御風劍士的寶刀'},
        { id: 'w12', name: '幽魂長弓', type: 'weapon', attack: 110, defense: 10, value: 950, price: 1950, rarity: 8, intro: '幽魂射手的弓箭'},
        { id: 'w13', name: '混沌魔刃', type: 'weapon', attack: 180, hp: -50, value: 1100, price: 2300, rarity: 9, intro: '被混沌之力侵蝕的古刀'},
        { id: 'w14', name: '滅龍聖劍', type: 'weapon', attack: 190, defense: -25,value: 1400, price: 3000, rarity: 9, intro: '曾經對巨龍造成重創的劍'},
        { id: 'w15', name: '解', type: 'weapon', attack: 550,value: 1400, price: 3000, rarity: 10, intro: '「龍麟 反發 成雙之流星」'},
        { id: 'w16', name: '噬魂七星劍', type: 'weapon', attack: 250, defense: -80,value: 1700, price: 2600, rarity: 9, intro: '「想獲得強大的力量就必須犧牲點什麼...」'},
       
    // 頭盔
        { id: 'ori-broken-helmet', name: '碎裂的奧利哈鋼頭骨', type: 'helmet', hp: 200, defense: 85, value: 1500, price: 3700, rarity: 10, intro: '碎裂的龍骨頭盔'},
        { id: 'ori-helmet', name: '奧利哈鋼龍骨', type: 'helmet', hp: 400, defense: 150, value: 1500, price: 3700, rarity: 10, intro: '完整龍骨製成的頭盔\n散發著王者的氣息'},
        { id: 'h1', name: '皮革帽子', type: 'helmet', defense: 15, value: 70, price: 120, rarity: 1, intro: '一般的皮革帽'},
        { id: 'h2', name: '士兵鋼盔', type: 'helmet', defense: 25, value: 150, price: 250, rarity: 1, intro: '普通士兵的鋼盔\n還算堪用'},
        { id: 'h3', name: '軍官帽', type: 'helmet', defense: 30, value: 250, price: 300, rarity: 1, intro: '軍官階級才能獲得的帽子'},
        { id: 'h4', name: '夜視護目鏡', type: 'helmet', defense: 20, value: 250, price: 220, rarity: 2, intro: '可以在黑夜中偵測動體的護目鏡'},
        { id: 'h5', name: '惡魔之眼', type: 'helmet', attack: 50, value: 350, price: 630, rarity: 3, intro: '和惡魔在激戰中拔下的惡魔眼睛'},
        { id: 'h6', name: '鋼鐵面罩', type: 'helmet', hp: 20, defense: 35, value: 300, price: 480, rarity: 2, intro: '鋼鐵戰士的面罩'},
        { id: 'h7', name: '堅韌戰盔', type: 'helmet', defense: 60, value: 450, price: 720, rarity: 3, intro: '身經百戰的鬥士頭盔'},
        { id: 'h8', name: '影步兜帽', type: 'helmet', attack: 30, defense: 25, value: 600, price: 950, rarity: 4, intro: '暗影刺客的連帽披風'},
        { id: 'h9', name: '泰坦頭骨', type: 'helmet', hp: 120, defense: 50, value: 850, price: 1400, rarity: 5, intro: '泰坦戰甲的頭骨'},
        { id: 'h10', name: '王者頭冠', type: 'helmet', hp: 180, attack: 40, defense: 40, value: 1200, price: 2000, rarity: 6, intro: '古代失落國度帝王的頭冠'},
    
    // 胸甲
        { id: 'ori-broken-armor', name: '碎裂的奧利哈鋼戰甲', type: 'armor', hp: 275, defense: 55, value: 1500, price: 3700, rarity: 10, intro: '掉落了幾片龍鱗\n但不影響戰甲的主要功能'},
        { id: 'ori-armor', name: '奧利哈鋼龍軀', type: 'armor', hp: 550, defense: 110, value: 1500, price: 3700, rarity: 10, intro: '完整的龍鱗及骨架\n完好的包覆使用者'},
        { id: 'a1', name: '皮革護甲', type: 'armor', hp: 10, defense: 5, value: 15, price: 250, rarity: 1, intro: '普通的皮革上衣'},
        { id: 'a2', name: '鋼鐵胸甲', type: 'armor', hp: 25, defense: 15, value: 50, price: 500, rarity: 2, intro: '鋼鐵製的胸甲\n可以有效抵擋普通怪物的攻擊'},
        { id: 'a3', name: '泰坦合金板甲', type: 'armor', hp: 170, defense: 35, value: 200, price: 2500, rarity: 4, intro: '泰坦甲殼融合金\n製成的堅硬護甲'},
        { id: 'a4', name: '死者肩甲', type: 'armor', hp: 50, defense: 25, value: 80, price: 750, rarity: 3, intro: '「只有一種方法能讓你從我這裡拿到這件盔甲...」'},
        { id: 'a5', name: '僧侶袈裟', type: 'armor', hp: 120, defense: 20, value: 780, price: 1500, rarity: 3, intro: '寺廟得道高僧的袈裟'},
        { id: 'a6', name: '聖盾鐵鎧', type: 'armor', hp: 250, defense: 30, value: 1280, price: 3450, rarity: 5, intro: '聖騎士的胸鎧\n有效抵禦混沌之力的侵蝕'},
        { id: 'a7', name: '鐵血戰甲', type: 'armor', hp: 50, defense: 50, value: 350, price: 680, rarity: 3, intro: '「戰場廝殺留下的勝者，必不會毫髮無傷」'},
        { id: 'a8', name: '火焰鱗甲', type: 'armor', hp: 150, defense: 40, value: 600, price: 1050, rarity: 4, intro: '歷經極度高溫煉成的火焰鎧甲'},
        { id: 'a9', name: '龍皮護胸', type: 'armor', hp: 300, defense: 60, value: 1000, price: 2100, rarity: 5, intro: '古代巨龍厚皮製成的護胸'},
        { id: 'a10', name: '守護者之鎧', type: 'armor', hp: 450, defense: 100, value: 1800, price: 3800, rarity: 6, intro: '失落帝國守護者的鎧甲\n在末日時仍然堅守國度'},
         
    // 護脛
        { id: 'ori-broken-greaves', name: '碎裂的奧利哈鋼鱗甲', type: 'greaves', hp: 100, defense: 85, value: 1500, price: 3700, rarity: 10, intro: '破損的龍鱗護脛\n有幾處破損但仍堅韌'},
        { id: 'ori-greaves', name: '奧利哈鋼龍鱗', type: 'greaves', hp: 300, defense: 150, value: 1500, price: 3700, rarity: 10, intro: '完整包覆下身的龍鱗甲\n閃耀且實用'},
        { id: 'g1', name: '牛仔褲', type: 'greaves', defense: 15, value: 60, price: 100, rarity: 1, intro: '普通的緊身牛仔褲\n些許影響行動'},
        { id: 'g2', name: '厚皮腿甲', type: 'greaves', defense: 30, value: 70, price: 220, rarity: 1, intro: '厚重的腿甲\n但富有安全感'},
        { id: 'g3', name: '狂戰士護脛', type: 'greaves', defense: 55, hp:-30, value: 160, price: 340, rarity: 2, intro: '穿上他似乎會激起戰意'},
        { id: 'g4', name: '鐵鍊腿甲', type: 'greaves', defense: 45, value: 120, price: 280, rarity: 2, intro: '鐵鍊編織成的腿甲\n兼顧防禦和行動'},
        { id: 'g5', name: '守護者長靴', type: 'greaves', hp: 50, defense: 50, value: 300, price: 550, rarity: 3, intro: '城邦守護者的標配長靴'},
        { id: 'g6', name: '刺客皮靴', type: 'greaves', attack: 20, defense: 35, value: 450, price: 780, rarity: 4, intro: '暗影刺客的靴子\n能有效減少腳步聲'},
        { id: 'g7', name: '泰坦合金護脛', type: 'greaves', defense: 90, hp: 80, value: 900, price: 1600, rarity: 5, intro: '泰坦甲殼融合金\n製成的堅硬護脛'},
    
    // 項鍊
        { id: 'ori-broken-necklace', name: '碎裂的奧利哈鋼之心', type: 'necklace', hp: 100, defense: 15, value: 1500, price: 3700, rarity: 10, intro: '保存不良的龍心\n效果大打折扣'},
        { id: 'ori-necklace', name: '奧利哈鋼龍心', type: 'necklace', hp: 300, defense: 35, value: 1500, price: 3700, rarity: 10, intro: '保存完好的龍心\n裝備後似乎可以獲得龍之力'},
        { id: 'n1', name: '守護項鍊', type: 'necklace', hp: 20, defense: 5, value: 30, price: 500, rarity: 2, intro: '守護者的初級項鍊'},
        { id: 'n2', name: '狂暴掛墜', type: 'necklace', attack: 15, value: 40, price: 750, rarity: 2, intro: '狂戰士的護身符'},
        { id: 'n3', name: '生命吊墜', type: 'necklace', hp: 50, value: 20, price: 300, rarity: 1, intro: '保佑長壽的護符'},
        { id: 'n4', name: '原生羽飾', type: 'necklace', hp: 70, value: 60, price: 550, rarity: 3, intro: '巨鳥羽毛裝飾而成的飾品'},
        { id: 'n5', name: '守望之源', type: 'necklace', hp: 125, defense: 45, value: 660, price: 1250, rarity: 4, intro: '古代城邦守望者的力量之源'},
        { id: 'n6', name: '紫水晶項鍊', type: 'necklace', hp: 225, defense: 55, value: 660, price: 1550, rarity: 5, intro: '洞窟紫水晶打磨編織而成的項鍊\n散發紫色光芒'},
        { id: 'n7', name: '暗影線圈', type: 'necklace', attack: 50, defense: -30, value: 850, price: 1800, rarity: 6, intro: '暗影怪物的纖維加工而成的飾品'},
        { id: 'n8', name: '遠古勳章', type: 'necklace', hp: 350, value: 1100, price: 2300, rarity: 7, intro: '古代英雄的功勳獎章'},
        { id: 'n9', name: '和諧護符', type: 'necklace', attack: 30, hp: 150, defense: 30, value: 1600, price: 3200, rarity: 8, intro: '古代祈求停戰的和平飾品'},
        { id: 'n10', name: '混沌之星', type: 'necklace', attack: 75, hp: 200, defense: 45, value: 2500, price: 4500, rarity: 9, intro: '造成怪物混沌化的主因\n淨化後可安全配戴'},

    // 戒指
        { id: 'ori-broken-ring', name: '污濁的奧利哈鋼之眼', type: 'ring', attack: 35, value: 1500, price: 3700, rarity: 10, intro: '黯淡的眼睛\n似乎無法使出全力'},
        { id: 'ori-ring', name: '奧利哈鋼魔眼', type: 'ring', attack: 140, defense: 30, value: 1500, price: 3700, rarity: 10, intro: '從奧利哈鋼身上取出的眼睛\n保存完好且散發不尋常的光芒'},
        { id: 'r1', name: '力量之戒', type: 'ring', attack: 10, value: 300, price: 600, rarity: 2, intro: '配戴上後似乎充滿了力量'},
        { id: 'r2', name: '鐵壁指環', type: 'ring', defense: 10, value: 210, price: 550, rarity: 2 , intro: '鋼鐵合金製作的指環\n關鍵時刻可以當成指虎用'},
        { id: 'r3', name: '黯淡全能之石', type: 'ring', attack: 5, hp: 10, defense: 5, value: 400, price: 900, rarity: 3, intro: '失去光芒的全能之石\n甚至散發著黑暗氣息'},
        { id: 'r4', name: '乾淨全能之石', type: 'ring', attack: 10, hp: 15, defense: 10, value: 600, price: 1200, rarity: 4, intro: '淨化過的全能之石\n雖不會發光但無侵蝕痕跡'},
        { id: 'r5', name: '閃耀全能之石', type: 'ring', attack: 20, hp: 25, defense: 20, value: 1000, price: 2000, rarity: 5, intro: '閃耀的全能之石\n給予配戴者完全的力量'},
        { id: 'r6', name: '束縛之戒', type: 'ring', attack: 70, hp: -55, value: 700, price: 1800, rarity: 5, intro: '和戒指訂製誓約\n以換取更強大力量'},
        { id: 'r7', name: '幻影之戒', type: 'ring', attack: 35, hp: 35, defense: 35, value: 1500, price: 2500, rarity: 5, intro: '半透明的紫色戒指\n似乎可以操控影子'}, 
        { id: 'r8', name: '泰坦防護環', type: 'ring', hp: 80, defense: 50, value: 800, price: 1600, rarity: 6, intro: '古代泰坦的防護星環'},
        { id: 'r9', name: '嗜血魔戒', type: 'ring', attack: 70, hp: -20, defense: 15, value: 1200, price: 2200, rarity: 7, intro: '魔物將軍配戴的飾品\n藉由吸收巨量人類血液增強'},
        { id: 'r10', name: '賢者之眼', type: 'ring', attack: 50, hp: 60, defense: 40, value: 1800, price: 3000, rarity: 8, intro: '古代賢者的眼睛\n似乎可以看穿魔物的行動'},
        { id: 'r11', name: '毀滅指輪', type: 'ring', attack: 120, value: 2350, price: 3800, rarity: 9, intro: '具有強大力量的毀滅性戒指'},

    // 藥水
        { id: 'ori-blood', name: '奧利哈鋼之血', type: 'consumable', hp: 300, value: 10, price: 50, rarity: 10, intro: '從奧利哈鋼傷口蒐集的血液\n似乎對人體有益處'},
        { id: 'c1', name: '輕型治療藥水', type: 'consumable', heal: 30, value: 10, price: 50, rarity: 1, intro: '普通的藥水\n可以輕微治癒傷口'},
        { id: 'c2', name: '強效治療藥水', type: 'consumable', heal: 60, value: 40, price: 100, rarity: 2, intro: '藥效更強的藥水\n相對有效地治癒傷口'},
        { id: 'c3', name: '醫療箱', type: 'consumable', heal: 200, value: 150, price: 350, rarity: 4, intro: '完整配置的醫療相\n可以大幅修復身上各處傷口'},
        { id: 'c4', name: '普通藥草', type: 'consumable', heal: 30, value: 40, price: 75, rarity: 1, intro: '路邊採摘的藥草\n可以簡單止血'},
        { id: 'c5', name: '大回復藥劑', type: 'consumable', heal: 120, value: 150, price: 280, rarity: 3, intro: '500mL的藥水\n很甜很有用'},
        { id: 'c6', name: '秘藥', type: 'consumable', hp: 100, value: 700, price: 1440, rarity: 5, intro: '老僧侶製作的秘藥\n服用後可強化人體'},
        { id: 'c7', name: '神聖治療藥水', type: 'consumable', heal: 250, value: 350, price: 580, rarity: 6, intro: '教會出品的藥水\n蘊含信仰的力量'},
        { id: 'c8', name: '涅槃藥劑', type: 'consumable', heal: 500, value: 800, price: 1250, rarity: 7, intro: '鳳凰血液製成的藥劑\n些微繼承了鳳凰的恢復能力'},
        { id: 'c9', name: '不朽藥水', type: 'consumable', heal: 800, value: 1500, price: 2800, rarity: 8, intro: '鳳凰血液製成的藥劑\n有效繼承了鳳凰的恢復能力'},
        { id: 'c10', name: '賢者之心', type: 'consumable', defense: 500, value: 3000, price: 5000, rarity: 9, intro: '古代賢者死後保存的心臟\n僅能給天選之人服用'},

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
    
