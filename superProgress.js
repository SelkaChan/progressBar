class SuperProgress extends HTMLElement {

  constructor(value = 50, max = 100, time = 0) {
    super();
    this.value = this.getAttribute('value') || value;
    this.max = this.getAttribute('max') || max;
    this.time = this.getAttribute('time') || time;
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(v) {
    this.setAttribute('value', v);
  }

  get max() {
    return this.getAttribute('max');
  }

  set max(m) {
    this.setAttribute('max', m);
  }

  get time() {
    return this.getAttribute('time');
  }

  set time(t) {
    this.setAttribute('time', t);
  }

  static get observedAttributes() {
    return ['value', 'max'];
  }

  attributeChangedCallback(name, old, now) {
    let barrita = document.querySelector('super-progress');

    let barra = document.querySelector('progress') || document.createElement('progress');
    let spanMax = document.querySelector('#maximo');
    let spanValue = document.querySelector('#valorAct');
    let spanpercentage = document.querySelector('#porcentajeAct');

    switch (name) {
      case 'value':
        if (now >= 0) {
          if (parseInt(barra.value) > parseInt(barra.max)) {
            barra.value = barra.max
          } else {
            barra.value = now;
          }
        }
        else {
          now = old;
          barra.value = now;
        }
        break;

      case 'max':
        if (now >= 0) {
          barra.max = now
        } else {
          now = old;
        }
        spanMax.textContent = "Máximo actual: " + now;
        barra.max = now
        break;
    }

    if (barrita.hasAttribute('mValor')) {
      spanValue.textContent = "Valor actual: " + barra.value;
    } else if (barrita.hasAttribute('mPorcentaje')) {
      spanpercentage.textContent = "Porcentaje actual: " + barra.value / barra.max * 100 + "%"
    } else {
      console.log("Los dos");
      spanValue.textContent = "Valor actual: " + barra.value;
      spanpercentage.textContent = "Porcentaje actual: " + barra.value / barra.max * 100 + "%"
    }
    barrita.append(barra);
  }
}

customElements.define('super-progress', SuperProgress);
let barrita = document.querySelector('super-progress');

let intervalo;
let btn = document.querySelector('#boton');

iniciarTimer()
btn.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-outline-danger')) {
    clearInterval(intervalo);
    e.target.classList.remove('btn-outline-danger')
    e.target.classList.add('btn-success')
    e.target.textContent = "Iniciar timer"
  } else {
    e.target.classList.remove('btn-success')
    e.target.classList.add('btn-outline-danger')
    e.target.textContent = "Parar timer"
    iniciarTimer();
  }
})

function iniciarTimer() {
  intervalo = setInterval(() => {
    sumarValue(1);
    console.log(this.time)
  }, barrita.time);
}

function sumarValue(v) {
  if (parseInt(barrita.value) <= parseInt(barrita.max)) {
    barrita.value = parseInt(barrita.value) + v;
  }
}

function restarValue(v) {
  if (barrita.value >= 0) {
    barrita.value = parseInt(barrita.value) - v;
  }
}

