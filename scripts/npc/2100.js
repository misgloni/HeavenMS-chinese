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
	NPC Name: 		Sera
	Map(s): 		Maple Road : Entrance - Mushroom Town Training Camp (0), Maple Road: Upper level of the Training Camp (1), Maple Road : Entrance - Mushroom Town Training Camp (3)
	Description: 		First NPC
*/

var status = -1;

function start() {
    if (cm.c.getPlayer().getMapId() == 0 || cm.c.getPlayer().getMapId() == 3)
        cm.sendYesNo("欢迎来到冒险岛的世界。这个训练营的目的是帮助初学者学习游戏玩法。你想参加这个训练营吗？有些人没有参加训练就开始了他们的旅程。但我强烈建议你参加我们的训练。");
    else
        cm.sendNext("这是你开始第一个训练内容的房间。在这个房间里，你将提前了解你选择的职业。");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && status == 0){
            cm.sendYesNo("你真的想马上开始你的旅程吗？");
            return;
        }else if(mode == 0 && status == 1 && type == 0){
            status -= 2;
            start();
            return;
        }else if(mode == 0 && status == 1 && type == 1)
            cm.sendNext("当你最终做出决定时，请再和我谈谈。");
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 0 || cm.c.getPlayer().getMapId() == 3){
        if(status == 0){
            cm.sendNext("好吧，那我就让你进训练营吧。请听从导师的指导。");
        }else if(status == 1 && type == 1){
            cm.sendNext("似乎你想在不参加训练计划的情况下开始你的旅程。那么，我就让你去训练场吧。小心~");
        }else if(status == 1){
            cm.warp(1, 0);
            cm.dispose();
        }else{
            cm.warp(40000, 0);
            cm.dispose();
        }
    }else
    if(status == 0)
        cm.sendPrev("一旦你足够努力地训练，你将有资格获得一份职业，你可以在 射手村 成为弓箭手，在 魔法密林 成为魔法师，在 勇士部落 成为战士，或者在 废弃都市 成为飞侠……");
    else
        cm.dispose();
}