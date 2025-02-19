const app = document.getElementById("app") // objeto e função para pegar o elemento da id app

//array para cadastrar usuario
const users = [
  {
    email: 'teste@test.com',
    phone: '999999999999',
    ref: 100,
    refBy: null
  },
  {
    email: 'tust@tust.com',
    phone: '9999999999',
    ref: 200,
    refBy: 100
  },
  {
    email: 'tost@tost.com',
    phone: '9999999999',
    ref: 300,
    refBy: 200
  }
]


//Find: se bool = false (nao enconstrou usuario) Mostra a pagina de cadastro. se bool = true (encontrou o usuario cadastrado) Mostra a pagina de convite.
const getUser = (userData) => {
  return users.find((user)=> {
    return user.email == userData.email
  })
  } 

const getTotalSubscribers = (userData) => {
  const subs = users.filter((user)=> {
    return user.refBy == userData.ref
  })
  return subs.length

}

const showInvite = (userData) => {
  app.innerHTML = ` 
    <input type="text"id="link" value="https://evento.com?ref=${userData.ref}" disabled>
    
    <div id="stats">
      <h4>
        ${getTotalSubscribers(userData)}
      </h4>
      <p>
        Inscrições feitas
      </p>
    </div>
  `//https://evento.com?ref=${userData.ref} = contabilizar a referencia
}

const saveUser = (userData) => {
  const newUser = {
    ...userData,
    ref: Math.round(Math.random() * 4000),
    refBy: 100
  }
  users.push(newUser)
  console.log(users)
  return newUser
}



const formAction = () => {
  const form = document.getElementById('form')
  form.onsubmit = (event) => { //se o evento acontecer
    event.preventDefault() // realiza algo (no caso nao realiza o padrao que seria enviar o formulario)
    const formData = new FormData(form) //
    const userData = { //criação de um objeto(propriedade e valor)
      email: formData.get('email'),
      phone: formData.get('phone')
    }

    const user = getUser(userData)
    if(user){
      showInvite(user)
    }else{
      const newUser = saveUser(userData)
      showInvite(newUser)
    }

  }
}

const startApp = () => {
  const content = `
  <form id="form">
    <input type="email" name="email" placeholder="E-mail" />
    <input type="text" name="phone" placeholder="Telefone" /> 
    <button>
      Confirmar
    </button>
  </form>
  `
  //varivavel + "." = objeto
  app.innerHTML = content
  
  formAction() //executa
}
startApp() //executa

document.getElementById("Logo").onclick = () => startApp() //evento para quando clicar voltar para o inicio

