
class SuperProgress extends HTMLElement {
  constructor(valor = 0 , maximo = 100) {
    super();
    this.valor = this.getAttribute('valor') || valor;
    this.maximo = this.getAttribute('maximo') || maximo;
  }

  get valor() {
    return this.getAttribute('valor');
  }

  set valor(v) {
    this.setAttribute('valor', v);
  }

  get maximo() {
    return this.getAttribute('maximo');
  }

  set maximo(m) {
    this.setAttribute('maximo', m);
  }

  static get observedAttributes() {
    return ['valor','maximo'];
  }

  attributeChangedCallback(name, old, now) {
    let barrita = document.querySelector('progress') || document.createElement('progress');
    let spantext = document.querySelector('span') || document.createElement('span');
    let maximo = document.getElementById('maximo');
    barrita.max = 100;
    switch (name) {
      case 'valor':
        barrita.value = now;
        this.append(barrita,spantext)
        if(now>=0 && barrita.max>=now){
          barrita.value = now;
          spantext.textContent = ' ' + now + '%';
        }else now = old;
        break;
      case 'maximo':
        barrita.max = now;
        if(now>=0){
          barrita.max = now;
          maximo.textContent = now
        }
        else now = old;
        break;
    }
  }
}

customElements.define('super-progress', SuperProgress);
let super1 = document.querySelector('super-progress')