const COUNTERS = document.querySelectorAll(".js-tally-quantity")
const GRAND_TOTAL = document.querySelectorAll(".js-total")
const SUBTOTALS = document.querySelectorAll(".js-subtotal-display")
const RESET_ALL_BTN = document.getElementById("js-grand-total__btn--reset")
const RESET_COUNTERS = document.querySelectorAll(".js-inputs")

/* set prices code */
// const PRICES = document.querySelectorAll(".qty-input")
// const PRICE_SETTINGS = document.querySelectorAll(".js-settings")
// const SET_PRICES = []
// let price1 = "0"

// This gets price value from input in settings view
// PRICE_SETTINGS.forEach((price, index) => {
//   price.addEventListener("keyup", event => {
//     event.preventDefault()
//     if (event.target.id === "js-price-0") {
//       price1 = event.srcElement.value
//     }
//     console.log(price1)
//   })
// })

// PRICES.forEach(price => {

//   price.setAttribute("js-window-price", price1)

// })
/* End set prices code */

// Event listeners
COUNTERS.forEach((counter, index) => {
  counter.addEventListener("click", event => {
    event.preventDefault()
    playSound()
    calculate(index, counter)
  })
})

const audio = new Audio()
audio.src = "./sounds/-.wav"

const playSound = () => {
  audio.play()
}

const incrementCount = counter => {
  let countPlus = parseFloat(counter.value) + 1
  counter.value = countPlus
  resetAll(countPlus)
}

const decrementCount = counter => {
  let countMinus = parseFloat(counter.value) - 1
  if (countMinus < 0) {
    countMinus = 0
  }
  counter.value = countMinus
}

const getSubtotal = (price, count, display) => {
  let subtotal = 0
   subtotal = parseFloat(count * price).toFixed(2)
  display.innerText = subtotal
}

const displayGrandTotal = () => {
  let totalAll = 0
  
  SUBTOTALS.forEach(total => {
    totalAll += parseFloat(total.innerHTML)
  })
  GRAND_TOTAL.forEach(totals => {
    totals.innerText = totalAll
    resetAll()
  })
}

const calculate = (index, counter) => {
  let count = 0
  const counterType = document.getElementById("js-window-type_" + index)
  const price = counterType.getAttribute("js-window-price")
  const subtotalDisplay = document.getElementById("js-subtotal-id_" + index)

  if (event.target.innerText === "+ 1") {
    incrementCount(counterType)
  } else if (event.target.innerText === "- 1") {
    decrementCount(counterType)
  }

  count = counterType.value
  getSubtotal(price, count, subtotalDisplay)
  let subtotal = subtotalDisplay.innerText
  displayGrandTotal()

  // This event listener is if count is manually changed in User Interface Input
  counter.addEventListener("keyup", event => {
    count = event.srcElement.value
    getSubtotal(price, count, subtotalDisplay)
    displayGrandTotal()
  })
}

const resetAll = count => {
  RESET_ALL_BTN.addEventListener("click", event => {
    event.preventDefault() //
    GRAND_TOTAL.forEach(total => {
      total.innerHTML = 0.0
    })

    SUBTOTALS.forEach(subtotal => {
      subtotal.innerText = 0
    })

    RESET_COUNTERS.forEach(counter => {
      counter.firstElementChild.value = 0
    })
  })
}
