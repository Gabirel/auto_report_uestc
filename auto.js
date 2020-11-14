function click_from_bounds(bound) {
    sleep(500);
    click(bound.centerX(), bound.centerY());
    sleep(500);
}

function generate_random_tempature() {
    var min = 36.2,
        max = 36.8,
        result = Math.random() * (max - min) + min;
    result = result.toFixed(1)
    return result;
}

function add_tempature(x, y) {
    // click 体温上报
    sleep(500)
    click(530, 1853)

    // click 体温上报 + 号
    sleep(1000);
    click(995, 1735);

    // click time
    sleep(1000);
    click(600, 1112);

    // choose time epoch
    sleep(1000);
    click(x, y);
    sleep(1000);
    // click return if necessary
    click(500, 700);

    // input tempature
    sleep(500);
    click(500, 1230);
    input(generate_random_tempature())

    // confirm
    swipe(400, 1000, 400, 300, 1000);
    sleep(1000);
    click(600, 1035);

    // final confirm
    sleep(1000);
    click(700, 1145);
}

function report_tempature() {
    // morning
    add_tempature(100, 360);

    // afternoon
    add_tempature(100, 450);

    // eveving
    add_tempature(100, 580);
}

function report_safety() {
    // click 报平安
    sleep(500)
    click(140, 1853)

    // click + 号
    sleep(2000);
    click(950, 1720);
    toastLog("+ is clicked")

    sleep(1000);
    for (let i = 0; i < 3; i++) {
        swipe(500, 1640, 500, 200, 500);
    }
    // confirm
    sleep(2000)
    click(500, 1730);

    // final confirm
    sleep(2000);
    click(700, 1145);
}

function back_to_wechat_home() {
    var chats_text = "Chats";
    var lang_type = context.resources.configuration.locale.language;
    if (lang_type == "zh") {
        contactText = "微信";
    }
    var chats_button = text(chats_text).findOne(3000);
    if (chats_button == null) {
        toastLog("not found: " + chats_text);
        exit(1);
    }
    click_from_bounds(chats_button.bounds());
}

function main() {
    // wait for accessibility to be enabled
    auto.waitFor();

    setScreenMetrics(1080, 1920);

    launch("com.tencent.mm");

    var contactText = "Contacts";
    // determine which lanuage the system is using
    var lang_type = context.resources.configuration.locale.language;
    if (lang_type == "zh") {
        contactText = "通讯录";
    }

    var contactButton = text(contactText).findOne(3000);
    if (contactButton == null) {
        toastLog("not found: " + contactText);
        exit(1);
    }
    toastLog(contactText + " found. Success")
    click_from_bounds(contactButton.bounds());

    var uestc_official = "成电在线";
    var current_button = text(uestc_official).findOne(3000);
    if (current_button == null) {
        toastLog("not found: " + uestc_official);
        exit(1);
    }
    click_from_bounds(current_button.bounds())

    var eportal = "研究生健康状况填报";
    current_button = text(eportal).findOne(3000);
    if (current_button == null) {
        toastLog("not found: " + eportal);
        exit(1);
    }
    click_from_bounds(current_button.bounds());

    toastLog("5s内未出界面，请重新刷新。否则按音量健停止脚本");
    sleep(5000);
    toastLog("开始上报安全");
    sleep(2000);
    report_safety();

    toastLog("开始上报体温");
    sleep(1000);
    report_tempature();

    // click twice to exit official account
    for (let i = 0; i < 2; i++) {
        sleep(500);
        click(50, 130);
    }
    back_to_wechat_home();

    toast("finished!");
}

main();