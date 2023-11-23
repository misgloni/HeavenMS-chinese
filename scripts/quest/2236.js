var status = 0;

function end(mode, type, selection) {
    if (mode != 1) {
        qm.sendOk("时间不多了, 尽快吧...");
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendNext("我能感觉到恶魔的气息在逐渐减退, 你已经按照我所说的把符咒都贴上了么?");
        status++;
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.gainExp(60000);
        qm.sendOk("谢谢, 希望这些刚贴上去的符咒能多坚持一段时间.");
        qm.dispose();
    }
}