const KEY = "settings"

type SettingsObject = {
    xMargin: number;
    yMargin: number;
}

const DEFAULT: SettingsObject = {
    xMargin: 0,
    yMargin: 0
};

class Settings {
    xMargin = $state(0);
    yMargin = $state(0);

    constructor(value: SettingsObject) {
        this.xMargin = value.xMargin;
        this.yMargin = value.yMargin;
    }

    save() {
        localStorage.setItem(KEY, `{"xMargin": ${this.xMargin}, "yMargin": ${this.yMargin}}`);
    }
}

export let settings = new Settings(loadSettings());

function loadSettings() {
    const stored = localStorage.getItem(KEY);

    if (!stored) {
        localStorage.setItem(KEY, JSON.stringify(DEFAULT));
        return DEFAULT;
    };

    const parsed = JSON.parse(stored);
    if (Object.keys(parsed).length !== Object.keys(DEFAULT).length) {
        localStorage.setItem(KEY, JSON.stringify(DEFAULT));
        return DEFAULT;
    }

    return parsed;
}