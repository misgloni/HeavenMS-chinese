/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 *
 *@author Ronan
 */

importPackage(Packages.server.expeditions);
importPackage(Packages.tools);
importPackage(Packages.scripting.event);

var status = 0;
var expedition;
var expedMembers;
var player;
var em;
var exped = MapleExpeditionType.BALROG_NORMAL;
var expedName = "Balrog";
var expedBoss = "Balrog";
var expedMap = "Balrog's Tomb";

var list = "你想做什么?#b\r\n\r\n#L1#查看当前远征队成员.#l\r\n#L2#开始战斗!#l\r\n#L3#停止远征.#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(exped);
    em = cm.getEventManager("BalrogBattle");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("你还没有和 " + expedBoss + "战斗的能力!");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<Expedition: " + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\nWould you like to assemble a team to take on #r" + expedBoss + "#k?\r\n#b#L1#Lets get this going!#l\r\n\#L2#No, I think I'll wait a bit...#l\r\n\#L3#I would like to see info about this expedition...#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {
                    cm.sendOk("你的远征已经在进行中, 对于那些仍在战斗的人, 让我们为那些勇敢的灵魂祈祷.");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("你已经参加了这次的远征. 请等待 #r" + expedition.getLeader().getName() + "#k 开始.");
                    cm.dispose();
                } else { //If you aren't in it, you're going to get added
                    cm.sendOk(expedition.addMember(cm.getPlayer()));
                    cm.dispose();
                }
            } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                if (expedition.contains(player)) { //If you're registered, warp you in
                    var eim = em.getInstance(expedName + player.getClient().getChannel());
                    if(eim.getIntProperty("canJoin") == 1) {
                        eim.registerPlayer(player);
                    } else {
                        cm.sendOk("你的远征队已经开始与 " + expedBoss + " 战斗. 我会为你们祈祷的.");
                    }
                    
                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("又一支远征队主动发起对 " + expedBoss + "的挑战, 愿英雄能战胜一切.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                expedition = cm.getExpedition(exped);
                if(expedition != null) {
                    cm.sendOk("已经有人主动成为远征队的队长了, 你可以尝试加入他们！");
                    cm.dispose();
                    return;
                }
                
                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + " 远征队#k 已经创建。\r\n\r\n再次与我交谈以查看当前队伍, 或开始战斗!");
                } else if (res > 0) {
                    cm.sendOk("抱歉, 你已经达到了今天此远征的尝试次数!请另一天再试...");
                } else {
                    cm.sendOk("在启动远征时发生了意外错误, 请稍后重试.");
                }
                
                cm.dispose();
                return;
            } else if (selection == 2) {
                cm.sendOk("当然, 不是每个人都敢挑战 " + expedBoss + ".");
                cm.dispose();
                return;
            } else {
                cm.sendSimple("你好. 我是#b#n无影#n#k，这座神庙目前正遭到巴尔洛克军队的围攻. 我们目前不知道是谁下达的命令. " +
                    "几周以来, #e#b Altair 骑士团#n#k 一直在派遣雇佣兵，但他们每次都被消灭. " +
                    "那么, 冒险者, 你想试试运气, 战胜这个无法形容的恐怖敌人吗？\r\n #L1#什么是#e Altair 骑士团?");
                    
                status = 10;
            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("无法加载远征");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("你是远征队的唯一成员");
                    cm.dispose();
                    return;
                }
                var text = "以下队员组成了你的远征队（点击他们可以将他们踢出）:\r\n";
                text += "\r\n\t\t1." + expedition.getLeader().getName();
                for (var i = 1; i < size; i++) {
                    text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                }
                cm.sendSimple(text);
                status = 6;
            } else if (selection == 2) {
                var min = exped.getMinSize();
                var size = expedition.getMemberList().size();
                if (size < min) {
                    cm.sendOk("你的远征队至少需要有 " + min + " 名玩家登录.");
                    cm.dispose();
                    return;
                }
                
                cm.sendOk("远征即将开始, 你现在将被传送到 #b" + expedMap + "#k.");
                status = 4;
            } else if (selection == 3) {
                player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + " 结束了这次远征."));
                cm.endExpedition(expedition);
                cm.sendOk("远程已经结束.有时最好的策略就是逃跑.");
                cm.dispose();
                return;
            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("该活动无法初始化, 请和GM报告这个问题.");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if(!em.startInstance(expedition)) {
                cm.sendOk("另一支远征队已经主动挑战了 " + expedBoss + ",让我们为这些勇敢的灵魂祈祷吧.");
                cm.dispose();
                return;
            }
            
            cm.dispose();
            return;
        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("你已经从远征队中禁止了 " + banned.getValue());
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        } else if (status == 10) {
            cm.sendOk("Altair 骑士团是一群精英雇佣兵, 负责监督世界经济和战斗行动. 它是在 40 年前黑魔法师被击败后成立的, 希望能够预见下一次可能的袭击.");
            cm.dispose();
        }
    }
}
