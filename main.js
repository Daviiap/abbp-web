/*  abre e fecha o menu quando clicar no icone: hamburguer e x */
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  loop: true,
  mousewheel: true,
  keyboard: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  effect: 'coverflow',
  coverflowEffect: {
    rotate: 30,
    slideShadows: false
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  /*
  autoplay: {
    delay: 800
  },
*/
  breakpoints: {
    320: {
      slidesPerView: 1,
      setWrapperSize: true
    },
    768: {
      slidesPerView: 3,
      setWrapperSize: true
    },
    1000: {
      slidesPerView: 4,
      setWrapperSize: true
    }
  }
})

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #parceiros .text, #parceiros .parceiros,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* Botão voltar para o topo */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* Menu ativo conforme a seção visível na página */
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})

/* Máscaras ER VALIDAÇÃO DE TELEFONE*/
function mascara(o, f) {
  v_obj = o
  v_fun = f
  setTimeout('execmascara()', 1)
}
function execmascara() {
  v_obj.value = v_fun(v_obj.value)
}

function mtel(v) {
  v = v.replace(/\D/g, '') //Remove tudo o que não é dígito
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2') //Coloca parênteses em volta dos dois primeiros dígitos
  v = v.replace(/(\d)(\d{4})$/, '$1-$2') //Coloca hífen entre o quarto e o quinto dígitos
  return v
}

function mtel1(v1) {
  v1 = v1.replace(/\D/g, '') //Remove tudo o que não é dígito
  v1 = v1.replace(/(\d)(\d{3})$/, '$1-$2') //Coloca hífen entre o quarto e o quinto dígitos
  return v1
}

function id(el) {
  return document.getElementById(el)
}
window.onload = function () {
  ;(id('telefone').onkeyup = function () {
    mascara(this, mtel)
  }),
    (id('cep').onkeyup = function () {
      mascara(this, mtel1)
    }),
    (id('whatsapp').onkeyup = function () {
      mascara(this, mtel)
    })
}
