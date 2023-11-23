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
 * @npc: Guon
 * @map: 251010404 - Over the Pirate Ship
 * @func: Pirate PQ
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

        if (status == 0) {
            em = cm.getEventManager("PiratePQ");
            if (em == null) {
                cm.sendOk("Pirate PQ 异常出错");
                cm.dispose();
                return;
            } else if (cm.isUsingOldPqNpcStyle()) {
                action(1, 0, 0);
                return;
            }

            cm.sendSimple("#e#b<组队任务：海盗船>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n救命啊！我的儿子被绑在可怕的#r海盗王#k手中。我需要你的帮助... 请组建或加入一个队伍来拯救他。请让你的#b队长#k与我交谈或你自己组建一个队伍。#b\r\n#L0#我想参与组队任务。\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "启用") + "组队搜索。\r\n#L2#我想了解更多详情。");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("只有加入队伍才能参与组队任务。");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.sendOk("你的队长必须与我交谈才能启动此组队任务。");
                    cm.dispose();
                } else {
                    var eli = em.getEligibleParty(cm.getParty());
                    if (eli.size() > 0) {
                        if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("另一支队伍已经进入了此频道的#r组队任务#k。请尝试其他频道，或等待当前队伍完成。");
                        }
                    } else {
                        cm.sendOk("你暂时无法启动此组队任务，因为你的队伍人数不符合，也可能是其中有些队员不具备参与资格，或者他们不在当前地图。如果你找不到队伍成员，尝试使用组队搜索。");
                    }

                    cm.dispose();
                }
            } else if (selection == 1) {
                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                cm.sendOk("你的组队搜索状态现在为：#b" + (psState ? "启用" : "关闭") + "#k。随时与我交谈以恢复原状。");
                cm.dispose();
            } else {
                cm.sendOk("#e#b<组队任务：海盗船>#k#n\r\n在这个组队任务中，你的任务是逐步穿越船舶，击败沿途所有的海盗和坏蛋，达到#r海盗王#k面前。取决于在之前阶段打开的大箱子数量，BOSS会更加强大，所以要保持警惕。打开这些箱子，如果成功，将为你的队伍提供额外的奖励，值得一试！祝你好运。");
                cm.dispose();
            }
        }
    }
}