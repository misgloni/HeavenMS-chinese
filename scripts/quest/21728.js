var status = 0;

function end(mode, type, selection) {
    if (mode != 1) {
        qm.sendOk("真是太让人害怕了...");
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendNext("你已经遇到 #b人偶师#k 了吗?");
        status++;
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.gainExp(9950);
        qm.sendOk("真厉害, 你全身而退了.");
        qm.dispose();
    }
}