export interface IAppSettings {
  singleSpa: {
    [key: string]: string
  }
  element: {
    [key: string]: {
      url: string,
      tag: string
    }
  }
}
