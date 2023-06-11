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
	NPC Name: 		Rain
	Map(s): 		Maple Road : Amherst (1010000)
	Description: 		Talks about Amherst
*/
var status = -1;

function start() {
    cm.sendNext("这是位于彩虹岛东北部的名为#bAmherst#k的小镇。彩虹岛很适合新手训练，毕竟周围只有弱小的怪物。");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && status == 2){
            status -= 2;
            start();
        }else if(mode == 0)
            status-= 2;
        else
            cm.dispose();
    }else{
        if (status == 1)
            cm.sendNextPrev("如果你想变强，那就去#bSouthperry#k，那里有港口。乘坐浮空巨轮前往名为#bVictoria Island#k 的地方。与这里相比，那边更加广阔。");
        else if (status == 2)
            cm.sendPrev("在金银岛，您可以进行转职。它叫做#bPerion#k...？听说有一座光秃秃的荒凉小镇，那里住着战士部落。不知道那里是个怎么样的地方呢？");
        else if (status == 3)
            cm.dispose();
    }
}