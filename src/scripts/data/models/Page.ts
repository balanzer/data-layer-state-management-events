interface IPage {
  name: string;
  url: string;
  type: string | null;
  category: string | null;
}

export class Page implements IPage {
  name: string;
  url: string;
  type: string | null;
  category: string | null;

  constructor() {
    this.name = "N/A";
    this.url = location.pathname;
    this.type = null;
    this.category = null;
  }

  setPageName(name: string) {
    this.name = name;
  }

  setPageUrl(url: string) {
    this.url = url;
  }

  setPageType(type: string) {
    this.type = type;
  }

  setPageCategory(category: string) {
    this.category = category;
  }
}
