import "./css/App.css";
import { useEffect, useState } from "react";

const mock = [
  {
    id: 218,
    name: "Mechanical Rick",
    status: "unknown",
    species: "Robot",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/218.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/23"],
    url: "https://rickandmortyapi.com/api/character/218",
    created: "2017-12-30T14:33:16.920Z",
  },
];

function App() {
  const [conteudo, SetConteudo] = useState(<></>);
  const [busca, setBusca] = useState("");

  function traduzirEspecie(species) {
    switch (species) {
      case "Human":
        return "Humano";
      case "Alien":
        return "Alien";
      case "Humanoid":
        return "Humanoide";
      case "Mytholog":
        return "Mytologico";
      case "Mytholog Humanoid":
        return "Humanoide Mitologico";
      case "Animal":
        return "Animal";
      case "Robot":
        return "Robo";
      case "Disease":
        return "Doença";
      case "Poopybutthole":
        return "Poopybutthole";
      case "Cronenberg":
        return "Cronenbergue";
      case "Duck":
        return "Pato";
      case "unknown":
        return "Desconhecido";
      default:
        return "Desconhecido";
    }
  }

  function traduzirStatus(status) {
    switch (status) {
      case "Alive":
        return "Vivo";
      case "Dead":
        return "Morto";
      case "genderless":
        return "Sem genero";
      case "unknown":
        return "Desconhecido";
      default:
        return "Desconhecido";
    }
  }

  function traduzirGenero(gender) {
    switch (gender) {
      case "Male":
        return "Masculino";
      case "Female":
        return "Feminino";
      case "unknown":
        return "Desconhecido";
      default:
        return "Desconhecido";
    }
  }

  async function carregarTodosOsPersonagens() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const result = await fetch(
      "https://rickandmortyapi.com/api/character"+busca,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {return result})
      .catch((error) => console.log('error', error));

    const char = JSON.parse(result);
    return char.results;
  }

  async function ListaPersonagem() {
    const todosPersonagens = await carregarTodosOsPersonagens();
    console.log("Episodios", todosPersonagens[0].episode);
    return todosPersonagens.map((personagem) => (
      <div className="card char" key={personagem.id}>
        <img src={personagem.image} alt={personagem.name} />

        <h2>{personagem.name}</h2>
        <p>
          <b>Espécie</b>: {traduzirEspecie(personagem.species)}
        </p>
        <p>
          {" "}
          <b>Gênero</b>: {traduzirGenero(personagem.gender)}
        </p>
        <div className="lista-secundaria">
          <b>Participações: </b>
          {personagem.episode.map((ep) => (
            <span key={ep.split("episode/")[1]}>
              Ep-{ep.split("episode/")[1]}
            </span>
          ))}
        </div>
        <p>
          <b>Status</b>: {traduzirStatus(personagem.status)}
        </p>
      </div>
    ));
  }

  useEffect(() => {
    async function carregar() {
      SetConteudo(await ListaPersonagem());
    }
    carregar();
  }, [busca]);


  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
        <h2>
          <a href="/">Personagens</a>
        </h2>
      </header>
      <div className="filtros">
        <span className="filtos-titulo">Filtros</span>
        <div className="filtro status">          
          <b>Status</b>
          <span onClick={() => setBusca('?status=alive')}>Vivo</span>
          <span onClick={() => setBusca('?status=dead')}>Morto</span>
          <span onClick={() => setBusca('?status=unknown')}>Desconhecido</span>
        </div>
      </div>
      <div className="lista-principal">{conteudo}</div>
    </div>
  );
}

export default App;
