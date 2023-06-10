/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Author: Xterminator
	NPC Name: 		Robin
	Map(s): 		Maple Road : Snail Hunting Ground I (40000)
	Description: 		Beginner Helper
*/
var status;
var sel;

function start() {
    status = -1;
    sel = -1;
    cm.sendSimple("现在...你可以问我任何有关旅行的问题！\r\n#L0##b我要怎么移动？#l\r\n#L1#我该如何击倒怪物？#l\r\n#L2#我该如何拾取物品？#l\r\n#L3#我被击倒后会发生什么？#l\r\n#L4#我什么时候可以选择职业？#l\r\n#L5#告诉我更多关于这个岛的事！#l\r\n#L6#我应该怎么做才能成为一名战士？#l\r\n#L7#我应该怎么做才能成为弓箭手？#l\r\n#L8#成为魔法师要怎么做？#l\r\n#L9#我应该怎么做才能成为飞侠？#l\r\n#L10#如何提升角色属性？ (S)#l\r\n#L11#如何查看刚捡到的物品？#l\r\n#L12#如何穿上物品？#l\r\n#L13#如何查看我佩戴的物品？#l\r\n#L14#什么是技能？ (K)#l\r\n#L15#我怎么去金银岛？#l\r\n#L16#什么是冒险币？#l#k");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && type != 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        if(sel == -1)
            sel = selection;
        if (sel == 0)
            cm.sendNext("你的移动方式是：使用#bleft, right arrow#k在平地和斜坡上移动，然后按#bAlt#k跳跃。");
        else if (sel == 1)
            cm.sendNext("这是击倒怪物的方法。每个怪物都拥有自己的 血量（HP），您可以通过使用普通攻击或技能来击倒它们。当然，他们越强，就越难拿下他们。");
        else if (sel == 2)
            cm.sendNext("这就是你收集物品的方式。一旦你打倒了一个怪物，一个物品就会掉落到地上。这个时候你可以站在物品前方并按 #bZ#k 或 #b0 on the NumPad#k 来获取物品。");
        else if (sel == 3)
            cm.sendNext("想知道你死后会发生什么吗？当你的生命值降为0时，你会变成幽灵状态，并且在你死亡的位置会落下一个墓碑，你将无法移动，但是你仍然可以和其他玩家聊天。");
        else if (sel == 4)
            cm.sendNext("什么时候可以选择职业？哈哈哈，别紧张我的朋友。在选择职业前你需要达到特定的要求。通常到你的等级达到 8 或 10 级之后就可以转职了，所以你应该加把劲升级。");
        else if (sel == 5)
            cm.sendNext("想了解这个岛吗？这里叫彩虹岛，漂浮在半空中。这个岛屿已经在天空中漂浮了一段时间，所以穷凶极恶的怪物都不会在这附近出现。这是一个非常安全而又宁静的岛屿，非常适合初学者！");
        else if (sel == 6)
            cm.sendNext("你想成为#bWarrior#k 吗？嗯，那我建议你去金银岛。前往名为#rPerion#k 的战士城镇，向#bDances with Balrog#k 学习。他会教你如何成为一名真正的战士。哦，还有一件非常重要的事情：你需要至少达到 10 级才能成为一名战士！！");
        else if (sel == 7)
            cm.sendNext("你想成为#bBowman#k 吗？你需要去金银岛才能转职。前往名为#rHenesys#k 的弓箭手小镇，与美丽的#bAthena Pierce#k 交谈，了解成为弓箭手的方方面面。哦，还有一件非常重要的事情：你至少需要达到 10 级才能成为一名弓箭手！！");
        else if (sel == 8)
            cm.sendNext("你想成为#bMagician#k 吗？为此，你必须前往金银岛。前往名为#rEllinia#k 的魔法师居住区，最顶层就是魔法图书馆。在里面，你会遇到所有魔法师的领袖，#bGrendel the Really Old#k，他会教你成为魔法师的一切。");
        else if (sel == 9)
            cm.sendNext("你想成为#bThief#k？为了成为其中的一员，您必须前往金银岛。前往名为#rKerning City#k 的飞侠小镇，在小镇阴暗的一侧，您会看到飞侠的藏身之处。在那里，你会遇到#bDark Lord#k，他会教你做飞侠的一切。哦，还有一件非常重要的事情：你至少需要达到 10 级才能成为飞侠！！");
        else if (sel == 10)
            cm.sendNext("想知道如何提升角色的能力值吗？首先按#bS#k 来查看能力窗口。每次升级时，你都会获得 5 个能力点，也就是 AP。将这些 AP 分配给您选择的能力。就这么简单。");
        else if (sel == 11)
            cm.sendNext("你想知道如何检查你捡到的物品，是吗？当你打败怪物时，它会在地上掉落特有的物品，你可以按#bZ#k 捡起物品。该物品随后将存储在您的物品栏中，您只需按#bI#k 即可查看你的物品栏。");
        else if (sel == 12)
            cm.sendNext("你想知道如何穿上装备，对吧？按#bI#k 查看您的物品栏。将鼠标光标放在一个物品上面，然后双击它就可以穿上对应的装备。如果你发现自己无法佩戴该物品，很可能是您的角色不符合等级和属性要求。你也可以通过打开装备栏（#bE#k）并将装备拖入其中来放置项目。要取下装备，可以双击装备栏中的物品。");
        else if (sel == 13)
            cm.sendNext("你想查看你的装备栏，对吧？按#bE#k 打开装备栏，你会在其中看到你当前所穿的装备。要取下一个装备，可以双击该装备。然后该装备将会放回你的物品栏里。");
        else if (sel == 14)
            cm.sendNext("获得职业后得到的特殊“能力”也就是 技能。你将获得职业的特有技能。你还没有转职，所以现在的你还没有任何技能，但请记住要检查你的技能，按#bK#k 打开技能书。希望这些能帮助你进行后面的冒险。");
        else if (sel == 15)
            cm.sendNext("你想问怎么去金银岛？在这个岛的东边有一个港口，叫做南港。去到那边之后，你会发现一艘浮在空中的船。船长就在船的前方，去和他对话吧。");
        else if (sel == 16)
            cm.sendNext("这是 冒险岛 中使用的货币。您可以通过 冒险币 购买物品。你可以通过击败怪物、在商店出售物品或完成任务等途径来获得冒险币");
    } else if (status == 1) {
        if (sel == 0)
            cm.sendNextPrev("为了攻击怪物，你需要装备上武器。装备后，按#bCtrl#k 使用武器攻击。只要能在正确的时机攻击，你就可以对怪物造成伤害。");
        else if (sel == 1)
            cm.sendNextPrev("随着你在职业之路上越走越远，你会获得各种不同种类的技能，你可以将技能分配给热键以快速使用出来。如果是攻击技能，则不需要按Ctrl进行攻击，只需按指定为热键的按钮即可。");
        else if (sel == 2)
            cm.sendNextPrev("请记住，如果你的物品栏已满，你将无法获得更多物品。因此，如果你有不需要的物品，请将其出售，这样你就可以继续获得新的物品。转职后，物品栏可能会增加。");
        else if (sel == 3)  
            cm.sendNextPrev("如果你只是一个新手，死了也没什么损失。然而，一旦你找到职业，情况就不同了。你死后会损失一部分经验值，所以一定要不惜一切代价避免死亡。");
        else if (sel == 4) 
            cm.sendNextPrev("等级并不是决定你转职的唯一因素。你还需要根据职业需要提升特定能力值。比如，要成为一名战士，你的 力量 必须超过35，等等，你知道我在说什么吗？你要确保你的能力加点和你将来的职业相符。");
        else if (sel == 5)
            cm.sendNextPrev("不过，想要成为强大的冒险家，还是别在这里待太久了。在这里的话无论多久你都无法转职的。在这个小岛的下面是一个巨大的岛屿，叫做金银岛。那个地方比这里大得多。");
        else if (sel == 8)
            cm.sendNextPrev("哦对了，和其他职业不同的是，要成为魔法师只需要8级就可以了。提早转职的同时，想要成为真正强大的魔法师也需要付出很多。在选择你的道路之前，请仔细考虑。");
        else if (sel == 10)
            cm.sendNextPrev("将鼠标光标放在所有能力值项的上方以获得简要说明。比如战士是力量，弓箭手是敏捷，魔法师是智力，盗贼是运气。但是这不会直接决定你的方向，所以你需要好好想想如何通过分配分数来提升你的角色。");
        else if (sel == 15)
            cm.sendNextPrev("还有一件事！如果你不确定自己在哪里，可以按#bW#k。会弹出一个显示你定位的世界地图。你不必担心在冒险途中迷路。");
        else
            start();
    }else
        start();
}