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
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("乘坐这艘船，你可以前往更大的大陆。只要交给我 #e150 mesos#n，我会带你去#bVictoria Island#k。问题是，一旦离开这里，就再也回不来了。你想去金银岛吗？");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type != 1)
            status -= 2;
        else if(type == 1 || (mode == -1 && type != 1)){
            if(mode == 0)
                cm.sendOk("嗯……我想你在这里还有事要做？");
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801))
            cm.sendNext("好吧，现在给我 150 金币……啊，你有阿默斯特酋长卢卡斯的推荐信吗？既然卢卡斯推荐了你，我看你作为冒险者的潜力非常非常大，这次就不收取你费用了！");
        else
            cm.sendNext("如果你厌倦这个地方了，那就交给我#e150 mesos#n 吧");
    } else if (status == 2) {
        if (cm.haveItem(4031801))
            cm.sendNextPrev("既然你有推荐信，我就不向你收取费用了。好吧，系好安全带，因为我们准备去金银岛，中途可能会有点颠簸！！");
        else
        if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("什么？你没有足够的冒险币？这样你就不能前往金银岛了，记住，进入飞船的门票是 150 金币");
                cm.dispose();
            } else
                cm.sendNext("好的！ 这#e150#n 金币我接受了！好了，出发去金银岛！");
        } else {
            cm.sendOk("让我看看……我觉得你现在的实力还不够。你必须至少达到 7 级才能前往金银岛。");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801)) {
            cm.gainItem(4031801, -1);
        } else {
            cm.gainMeso(-150);
        }
        cm.warp(104000000, 0);
        cm.dispose();
    }
}