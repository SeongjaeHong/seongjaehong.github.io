export class LanguageManager {
  constructor() {
    this.defaultLang = 'kr';
    this.currentLang = this.defaultLang;
    this.serviceLangs = ['kr', 'en'];
  }

  get lang() {
    return this.currentLang;
  }

  set lang(value) {
    if (this.serviceLangs.includes(value)) {
      this.currentLang = value;
    } else {
      console.error(`Given language "${value}" is not supported.`);
    }
  }
}
