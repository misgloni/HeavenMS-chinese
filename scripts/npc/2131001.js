var status = -1;
var exchangeItem = 4000439;

function start() {
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
        cm.sendSimple("我叫 #p2131001#, 我是这里最强的魔法师.#b\r\n#L0#带走这些青苔石, 你可以用这些东西来发动魔法. #l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("你身上的东西不太够...我需要100个.");
	    cm.dispose();
	} else {
            // thanks yuxaij for noticing a few methods having parameters not matching the expected Math library function parameter types
	    cm.sendGetNumber("这是个好办法! 我可以用 #i4310000# 绝对音感来换你100个 #i" + exchangeItem + "##t" + exchangeItem + "#. 你想换多少? (现在的物品数: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("请在 背包栏 预留足够的空间.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("感谢!");
	    }
	}
        cm.dispose();
    }
}