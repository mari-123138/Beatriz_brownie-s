let itens = []
let total = 0
let desconto = 0

function addItem(btn) {
  const item = btn.closest(".item")
  const nome = item.dataset.nome
  const preco = Number(item.dataset.preco)

  const existe = itens.find(i => i.nome === nome)
  if (existe) existe.qtd++
  else itens.push({ nome, preco, qtd: 1 })

mostrarToast("Brownie adicionado 🍫")


  total += preco
  atualizar()
}

function removeItem(btn) {
  const item = btn.closest(".item")
  const nome = item.dataset.nome
  const i = itens.findIndex(x => x.nome === nome)
  if (i === -1) return

  itens[i].qtd--
  total -= itens[i].preco
  if (itens[i].qtd === 0) itens.splice(i, 1)

mostrarToast("Brownie removido")


  atualizar()
}

function atualizar() {
  let txt = ""
  itens.forEach(i => txt += `• ${i.nome} x${i.qtd}\n`)
  pedido.value = txt
  valor.value = itens.length
    ? `R$ ${(total - desconto).toFixed(2)}`
    : ""
}

function aplicarCupom() {
  const msg = document.getElementById("msgCupom")
  const codigo = cupom.value.toUpperCase()

  if (codigo === "BROWNIE10") {
    desconto = total * 0.1
    msg.innerText = "Cupom aplicado com sucesso 🎉 10% OFF"
  } else {
    desconto = 0
    msg.innerText = "Cupom inválido 😕"
  }

  atualizar()
}


function abrirCheckout() {
  if (!itens.length) return alert("Escolhe algo")
  modalEntrega.classList.remove("hidden")
}

function fecharEntrega() {
  modalEntrega.classList.add("hidden")
}

tipoEntrega.addEventListener("change", e => {
  campoEndereco.classList.toggle("hidden", e.target.value !== "entrega")
})

function confirmarEntrega() {
  if (!nome.value || !tipoEntrega.value || !pagamento.value)
    return alert("Preenche tudo")

  let msg = "🍫 Pedido Beatriz Brownies\n\n"
  itens.forEach(i => msg += `• ${i.nome} x${i.qtd}\n`)
  msg += `\n💰 Total: R$ ${(total - desconto).toFixed(2)}`
  msg += `\n📦 ${tipoEntrega.value}`
  msg += `\n💳 ${pagamento.value}`
  msg += `\n👤 ${nome.value}`

  if (tipoEntrega.value === "entrega")
    msg += `\n📍 ${endereco.value}`

  if (observacoes.value.trim())
    msg += `\n📝 ${observacoes.value}`

  window.open(
    `https://wa.me/5599999999999?text=${encodeURIComponent(msg)}`
  )

  cancelarPedido()
}

function cancelarPedido() {
  itens = []
  total = desconto = 0
  pedido.value = valor.value = cupom.value = ""
  nome.value = endereco.value = observacoes.value = ""
  atualizar()
}

function mostrarToast(msg) {
  const toast = document.getElementById("toast")
  toast.innerText = msg
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 2000)
}
