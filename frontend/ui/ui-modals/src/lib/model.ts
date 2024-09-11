export type ButtonCommand ={
  icon?: string
  title: string
  command: () => {}
}

export type DialogConfig = {
  text: string;
  buttons: ButtonCommand[]
}
