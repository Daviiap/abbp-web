const form_inscricao = document.getElementById('form_inscricao');

const submit_inscricao_button = document.getElementById('submit_inscricao_button');

let isFormCompleted = true;
const formAttributes = {
  name: null,
  categoria: null,
  patrocinio: null,
  endereco: null,
  cidade: null,
  bairro: null,
  cep: null,
  telefone: null,
  email: null,
  termo: null,
  whatsapp: null,
  instagram: null,
}

const getInputs = (element) => {
  for (const child of element.children) {
    if (child.tagName === 'INPUT') {
      if (child.type === 'checkbox') {
        formAttributes[child.name] = child.checked;
        if (!child.checked) {
          isFormCompleted = false;
        }
      } else {
        formAttributes[child.name] = child.value;
        if (!child.value) {
          isFormCompleted = false;
        }
      }
    } else if (child.children.length) {
      getInputs(child);
    }
  }
}

submit_inscricao_button.onclick = (event) => {
  event.preventDefault();
  isFormCompleted = true;
  getInputs(form_inscricao);

  // if (isFormCompleted) {
  const { name,
    categoria,
    patrocinio,
    endereco,
    cidade,
    bairro,
    cep,
    telefone,
    email,
    termo,
    whatsapp,
    instagram, } = formAttributes;

  const request = {
    name,
    category: categoria,
    sponsorship: patrocinio,
    address: {
      street: endereco,
      number: '123',
      city: cidade,
      district: bairro,
      postalCode: cep,
      country: 'Brasil'
    },
    phoneNumber: {
      ddi: '55',
      ddd: telefone.substr(0, 2),
      number: telefone.substr(2, 9)
    },
    email: email,
    whatsApp: {
      ddi: '55',
      ddd: whatsapp.substr(0, 2),
      number: whatsapp.substr(2, 9)
    },
    instagram: instagram,
    responsibilityTermsChecked: termo,
    time: Date.now()
  };

  (async () => {
    const rawResponse = await fetch('http://localhost:3000/subscription', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    const response = await rawResponse.json();

    console.log(response);
  })();

  // }
}