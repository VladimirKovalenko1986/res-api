export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spinner = refs.button.querySelector('.spinner-border');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load More';
    this.refs.spinner.style.display = 'none';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading.....';
    this.refs.spinner.style.display = 'inline-block';
  }

  show() {
    this.refs.button.hidden = false;
  }

  hide() {
    this.refs.button.hidden = true;
  }
}
