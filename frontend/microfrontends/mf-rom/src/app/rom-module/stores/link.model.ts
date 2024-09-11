
export class Link {
  public fromId!: string;
  public toId!: string;
  public count!: number;
}


export class LinkStateModel {
  links!: Link [];
  loaded!: boolean;
}

export class AddDraftLink {
  static readonly type = '[Links] Add Draft Link To Item';

  constructor(
    public link: Link
  ) {
  }
}

export class LoadLinks {
  static readonly type = '[Links] Load All Links';

  constructor() {
  }
}
