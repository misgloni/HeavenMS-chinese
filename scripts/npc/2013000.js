/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

/**
 * @author: Ronan
 * @npc: Wonky
 * @map: 200080101 - Orbis - The Unknown Tower
 * @func: Orbis PQ
 */

var status = 0;
var em = null;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (cm.getMapId() == 200080101) {
            if (status == 0) {
                em = cm.getEventManager("OrbisPQ");
                if (em == null) {
                    cm.sendOk("OrbisPQ脚本出现异常。");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<队伍任务：女神之塔>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n 你打算加入或者创建队伍完成 #bTower of Goddess#k任务吗？让你的 #b队长#k 来和我对话，或者你可以创建一个队伍。#b\r\n#L0#我想要参加组队任务。\r\n#L1#我想要 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "启动") + " 队伍搜索.\r\n#L2#我想听听更多细节。\r\n#L3#我想要兑换奖品。");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("只有在队伍中你才能参与组队任务。");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("你的队长必须与我交谈才能开始这个组队任务。");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("另一个队伍已经进入了这个频道的 #r组队任务#k。请尝试另一个频道，或等待当前队伍完成。");
                            }
                        } else {
                            cm.sendOk("你暂时无法开始这个组队任务，由于你的队伍人数不符合要求，或者一些队员的等级不足，或者他们中的某些人不在当前地图上。如果你找不到队伍成员，请尝试使用队伍搜索功能。");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("你的队伍搜索状态现在是：#b" + (psState ? "启用" : "关闭") + "#k。如果你想改变它，随时与我交谈。");
                    cm.dispose();
                } else if (selection == 2) {
                    cm.sendOk("#e#b<组队任务：女神之塔>#k#n\r\n我们的女神已经失踪了一段时间；传闻称她最后一次被看到在女神之塔里。此外，我们的圣地被如潮的小精灵占领，这些生物最近一直在奥比斯的外围游荡。他们的领袖，小精灵之王，目前占据着王座，可能知道她的下落。我们敦促你们组织一支勇敢的英雄队伍，冲进去夺回我们的圣地，拯救她。如果你的团队包括每个职业类型的成员（战士、魔法师、弓箭手、盗贼和海盗），你们将得到我的祝福，以此在战斗中协助你们。你们会帮助我们吗？\r\n");
                    cm.dispose();
                } else {
                    cm.sendSimple("那么，你想要获得什么奖品？\r\n#b#L0#给我女神手镯。\r\n");
                }
            } else if (status == 2) {
                if (selection == 0) {
                    if (!cm.haveItem(1082232) && cm.haveItem(4001158, 10)) {
                        cm.gainItem(1082232, 1);
                        cm.gainItem(4001158, -10);
                        cm.dispose();
                    } else {
                        cm.sendOk("你已经有女神手镯，或者你身上没有10个 #t4001158#。");
                        cm.dispose();
                    }
                }
            }
        } else {
            if (status == 0) {
                cm.sendYesNo("你要退出这次救援任务吗？");
            } else if (status == 1) {
                cm.warp(920011200);
                cm.dispose();
            }
        }
    }
}