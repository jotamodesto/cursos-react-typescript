abstract class View<T> {
  private _elemento: JQuery;

  constructor(seletor: string) {
    this._elemento = $(seletor);
  }

  update(model: T): void {
    this._elemento.html(this.template(model));
  }

  protected abstract template(model: T): string;
}
