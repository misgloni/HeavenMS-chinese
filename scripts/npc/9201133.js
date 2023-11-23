var map = 677000010;
var quest = 28283;
var status = -1;
var inHuntingGround;

function start(mode, type, selection) {
        inHuntingGround = (cm.getMapId() >= 677000010 && cm.getMapId() <= 677000012);
	action(1, 0, 0);        
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if(!inHuntingGround) {
            if (cm.isQuestStarted(quest)) {
                if(!cm.getPlayer().haveItemEquipped(1003036)) {
                    cm.sendOk("前面一直传过来一股恶臭... 在进去之前需要装备 #rgas mask#k .");
                    cm.dispose();
                    return;
                }

                cm.sendYesNo("你准备前往 #b#m" + map + "##k?");
            } else {
                cm.sendOk("入口被一股奇异的力量挡住.");
                cm.dispose();
            }
        } else {
            if(cm.getMapId() == 677000011) {
                map = 677000012;
                cm.sendYesNo("你准备前往 #b#m" + map + "##k?");
            } else {
                map = 105050400;
                cm.sendYesNo("你准备离开这个地方了吗?");
            }
        }
    } else {
        cm.warp(map, 0);
	cm.dispose();
    }
}