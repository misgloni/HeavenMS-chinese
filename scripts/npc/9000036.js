var status = -1
var selectionType

function start() {
    action(1, 0, 0);
}

//每个function都从`status==1`开始
var functionList = [
    {"desc": "购买难以获得的物品", "func": buySomething},
    {"desc": "完成不能完成的任务", "func": completeQuest}
];

function action(mode, type, selection) {

    //base
    status++;
    if (mode != 1) {
        cm.dispose();
        return;
    }

    if (status == 0) {
        var status_0_text = "我是冒险岛临时处理BUG专员, 你可以叫我 #b#p9000036##k, 有什么需要我的帮助吗? ";
        for (var i = 0; i < functionList.length; i++) {
            status_0_text += "\r\n#L" + i + "#" + functionList[i]["desc"] + "#l";
        }
        cm.sendSimple(status_0_text);
    } else if (status == 1) {
        if (selection >= functionList.length) {
            cm.sendSimple("你选择了异常的数据, 我已经上报了...");
            cm.dispose();
            return;
        }
        selectionType = selection;
        functionList[selection]["func"](mode, type, selection);
    } else if (status > 1) {
        functionList[selection]["func"](mode, type, selectionType);
    }
}

function buySomething(mode, type, selection) {
    cm.openShopNPC(9000036);
    cm.dispose();
}

function completeQuest(mode, type, selection) {
    cm.sendSimple("查看一下效果:" + cm.isQuestComplete(1041) + "--" + cm.isQuestActive(1041) + "--" + cm.isQuestStarted(1041));
    cm.dispose();
}