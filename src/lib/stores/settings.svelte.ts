const KEY = "settings";

type SettingsObject = {
	xMargin: number;
	yMargin: number;
	gridCols: number;
};

const DEFAULT: SettingsObject = {
	xMargin: 0,
	yMargin: 0,
	gridCols: 0,
};

class Settings {
	xMargin = $state(0);
	yMargin = $state(0);
	gridCols = $state(0);

	constructor(value: SettingsObject) {
		Object.assign(this, value);
	}

	save() { 
		localStorage.setItem(KEY, `{"xMargin":${this.xMargin},"yMargin":${this.yMargin},"gridCols":${this.gridCols}}`);
	}
}

export let settings = new Settings(loadSettings());

function loadSettings() {
	const stored = localStorage.getItem(KEY);

	if (!stored) {
		localStorage.setItem(KEY, JSON.stringify(DEFAULT));
		return DEFAULT;
	}

	const parsed = JSON.parse(stored);
	if (Object.keys(parsed).length !== Object.keys(DEFAULT).length) {
		localStorage.setItem(KEY, JSON.stringify(DEFAULT));
		return DEFAULT;
	}

	return parsed;
}
