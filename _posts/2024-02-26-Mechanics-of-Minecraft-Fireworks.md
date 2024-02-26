---
layout: post
title: "Minecraft 煙火機制"
categories: ["Minecraft"]
description: "關於 Minecraft 煙火的機制講解"
---

本篇透過研究 Minecraft 的程式碼，來解析煙火從合成、NBT 標籤、施放一直到爆炸並產生粒子的機制，當下版本為 Java 1.21。

---

## 一、火藥球 Firework Star

煙火必須要有火藥球才能綻放出絢麗的爆炸特效，火藥球的合成材料包括了火藥、染料、形狀材料以及附加效果材料。

### 1. 火藥（必要）

火藥球的合成需要恰好一個火藥。

### 2. 染料（必要）

火藥球的合成需要至少一個染料，不包含骨粉、青金石等替代材料。在火藥球中添加染料，會將染料本身的顏色加入初始顏色清單中，這份清單決定了煙火爆炸時粒子的初始顏色。此外，將合成好的火藥球與染料合成，會將顏色加入最終顏色清單中，決定煙火爆炸粒子的最終顏色。關於顏色如何分佈與變化，在之後的爆炸粒子中會有更深入的說明。

### 3. 形狀材料

遊戲中煙火爆炸會產生不同的形狀，一顆火藥球只能擁有一個爆炸形狀，以下是不同材料所對應的爆炸形狀：

> 以下動畫來自 [Minecraft Wiki](https://zh.minecraft.wiki)

| 材料 | 形狀 | 動畫 |
| ---- | ---- | ---- |
| 無 | 小型球狀 | [![Firework Star (Small Sphere).gif](https://zh.minecraft.wiki/images/thumb/Firework_Star_%28Small_Sphere%29.gif/200px-Firework_Star_%28Small_Sphere%29.gif?f2de6)](https://zh.minecraft.wiki/w/File:Firework_Star_(Small_Sphere).gif) |
| 火焰彈 | 大型球狀 | [![Firework Star (Large Sphere).gif](https://zh.minecraft.wiki/images/thumb/Firework_Star_%28Large_Sphere%29.gif/200px-Firework_Star_%28Large_Sphere%29.gif?72744)](https://zh.minecraft.wiki/w/File:Firework_Star_(Large_Sphere).gif) |
| 金粒 | 星形 | [![Firework Star (Star Shape).gif](https://zh.minecraft.wiki/images/thumb/Firework_Star_%28Star_Shape%29.gif/200px-Firework_Star_%28Star_Shape%29.gif?1777f)](https://zh.minecraft.wiki/w/File:Firework_Star_(Star_Shape).gif) |
| 生物頭顱 | 苦力怕形 | [![Firework Star (Creeper Shape).gif](https://zh.minecraft.wiki/images/thumb/Firework_Star_%28Creeper_Shape%29.gif/200px-Firework_Star_%28Creeper_Shape%29.gif?e7af6)](https://zh.minecraft.wiki/w/File:Firework_Star_(Creeper_Shape).gif) |
| 羽毛 | 爆裂 | [![Firework Star (Burst).gif](https://zh.minecraft.wiki/images/thumb/Firework_Star_%28Burst%29.gif/200px-Firework_Star_%28Burst%29.gif?d9b30)](https://zh.minecraft.wiki/w/File:Firework_Star_(Burst).gif) |

### 4. 附加效果材料

遊戲中附加效果有閃爍與蹤跡兩種，可同時存在：

> 以下動畫來自 [Minecraft Wiki](https://zh.minecraft.wiki)

| 材料 | 效果 | 動畫 |
| ---- | ---- | ---- |
| 螢石粉 | 閃爍 | [![Firework Star (Twinkle effect).gif](https://zh.minecraft.wiki/images/thumb/Firework_Star_%28Twinkle_effect%29.gif/200px-Firework_Star_%28Twinkle_effect%29.gif?89cf5)](https://zh.minecraft.wiki/w/File:Firework_Star_(Twinkle_effect).gif) |
| 鑽石 | 蹤跡 | [![Firework Star (Trail effect).gif](https://zh.minecraft.wiki/images/thumb/Firework_Star_%28Trail_effect%29.gif/200px-Firework_Star_%28Trail_effect%29.gif?edaa8)](https://zh.minecraft.wiki/w/File:Firework_Star_(Trail_effect).gif) |

---

## 二、煙火

煙火的合成材料包括火藥、紙以及火藥球。

### 1. 火藥（必要）

煙火中的火藥材料多寡決定了煙火的飛行時間，亦即從發射到爆炸的這段時間長度，可以加入一至三個火藥來為煙火提供不同的飛行時間。煙火的飛行時間公式為： $10 \times (火藥數量 + 1) + rand(6) + rand(7)$ 遊戲刻，其中 $rand(n)$ 為 $0$ 至 $n - 1$ 的隨機數字。平均飛行時間為 $5.5 + (10 \times 火藥數量 + 1)$ 遊戲刻，實際飛行時間的機率分佈會以平均飛行時間為中心，向左右遞減。

### 2. 紙（必要）

煙火的合成需要恰好一張紙。

### 3. 火藥球

在煙火中加入火藥球可以新增其效果（顏色、形狀與附加效果）至 NBT 標籤中，於爆炸時逐一釋放。

---

## 三、NBT 標籤

煙火是如何將火藥球的資訊保存，一路傳遞到煙火爆炸？煙火透過 NBT 標籤儲存火藥球的資訊，NBT 標籤內有多種標籤，其中煙火從物品到實體都會持續保有名為 `Explosions` 的 NBT 標籤。

`Explosions` 是一個列表，其中有多個火藥球 NBT 標籤。當製作煙火時，會把所有作為合成材料的火藥球之 NBT 標籤放進煙火的 `Explosions` 標籤。這個標籤看起來的樣子是：煙火有一個 NBT 標籤叫做 `Explosions`，裡面有很多火藥球 NBT 標籤，每個火藥球 NBT 標籤都有爆炸形狀、閃爍、軌跡等資訊。

---

## 四、發射煙火

生成煙火實體（發射煙火）有三種方法，第一種是直接發射，即手持煙火物品對方塊使用，發射方向朝上；第二種是用弩發射，煙火可以替代箭矢作為弩的發射物被填充並射出，發射方向為準心瞄準的方向；第三種則是透過發射器發射，方向為發射器口朝向的方向，只有以發射器發射時不記錄發射者。此外，生成煙火實體時，實體會讀取召喚時使用之物品，進而讀取煙火的 NBT 標籤並儲存。

---

## 五、煙火飛行與爆炸

煙火實體在被生成時，會依照煙火物品合成所用的火藥數量，套進公式後初始化最大飛行時間。在之後的飛行時間內，每兩個遊戲刻會在煙火實體處發射煙火粒子，方向朝下，速度是煙火實體 Y 軸速度的一半。當達到最大飛行時間後，煙火實體便會爆炸，造成傷害並生成煙火爆炸子。

煙火的傷害計算公式為 $damage = 5 + 2 \times \text{火藥球數量}$，爆炸時會對半徑五格內的生物造成傷害，傷害與距離的關係為 $damage \times \sqrt{\frac{5 - distance}{5}}$，當 $damage = 5$ 時如下圖所示，橫軸為距離，縱軸為傷害：
![煙火距離與傷害關係圖](assets/img/20240226/firework-distance-damage.png "煙火距離與傷害關係圖")

---

## 六、煙火爆炸子

終於來到煙火的重頭戲，當煙火實體爆炸時會生成煙火爆炸子，煙火爆炸子和煙火實體一樣持有關於火藥球的 NBT 標籤，煙火爆炸子的任務是產生爆炸音效以及將火藥球逐個釋放。

煙火爆炸子生成時，會產生煙火爆炸的音效，若火藥球有三個以上或是含有大型球狀的火藥球，則會產生較沈重的音效，反之會產生較清亮的音效。此外，若玩家與煙火爆炸子的距離為 16 格以上，此音效還會產生延遲，玩家看到爆炸後過一段時間才能聽到煙火的爆炸聲。

每過兩個遊戲刻，煙火爆炸子會依序從 NBT 標籤中選擇一個火藥球，根據火藥球的資訊，在煙火爆炸子處產生指定形狀的大量爆炸粒子，也就是我們平常看到的煙火特效。在生成爆炸粒子時，會將軌跡、閃爍、透明度與顏色等資訊傳遞給爆炸粒子，其中初始顏色和最終顏色是分別從火藥球 NBT 標籤內的「初始顏色清單」與「最終顏色清單」隨機選擇，爆炸粒子行進時會由初始顏色逐漸轉變為最終顏色。