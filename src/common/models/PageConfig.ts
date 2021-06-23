export default class PageConfig {
  component: any;
  description: any;
  image: any;
  initialState: any;
  title: any;
  url: any;
  version: any;
  constructor({
    url,
    image,
    title,
    version,
    initialState,
    component,
    description
  }: any) {
    this.url = url;
    this.image = image;
    this.title = title;
    this.version = version;
    this.initialState = initialState;
    this.component = component;
    this.description = description;

    for (const prop in this) {
      if (arguments[0][prop] === undefined) {
        console.warn(`Unable to find ${prop} for ${url}`);
      }
    }
  }
}
