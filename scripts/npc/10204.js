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
var status = -1;

function start() {
    cm.sendNext("海盗拥有出色的灵活性和力量，他们利用枪支进行远程攻击，同时在近战中使用他们的力量。枪手使用基于元素的子弹来增加伤害，而斗士则转变为不同的存在以获得最大效果。");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0)
           cm.sendNext("如果你想尝试成为一名海盗的话，就来找我吧。");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("想尝试一下当海盗吗？");
    } else if (status == 1){
	cm.lockUI();
        cm.warp(1020500, 0);
        cm.dispose();
    }
}