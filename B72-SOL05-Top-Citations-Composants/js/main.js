const personnes = [
  { id: 1, prenom: 'Kristy', nom: 'Lavilla',  avatar: 'kristy.png' },
  { id: 2, prenom: 'Veronika', nom: 'Smith', avatar: 'veronika.jpg' },
  { id: 3, prenom: 'Daniel', nom: 'Le Blanc', avatar: 'daniel.jpg', },
  { id: 4,  prenom: 'Molly', nom: 'Müller', avatar: 'molly.png' },
];

let CitationImage = Vue.component('citation-image', {
  props: {
    image: {
      type: String,
      required: true
    },
    couleur: {
      type: String,
      required: true
    },
    titre: {
      type: String,
      required: true
    }
  },
  template:  `<figure class="media-left">
                <img class="image is-64x64"
                     :src="'./img/animaux/' + image"
                     :alt="titre"
                     :style="'background-color:' + couleur"
                >
              </figure>`
});

let CitationAuteur = Vue.component('citation-auteur', {
  props: {
    auteur: {
      type: Object,
      required: true
    }
  },
  computed: {
    nomPrenom: function () {
      return this.auteur.nom + ' ' + this.auteur.prenom
    },
    cheminImage: function () {
      return './img/avatars/' + this.auteur.avatar
    }
  },
  template:  ` <small class="is-size-7">
                      Postée par :
                      <img class="image is-24x24"
                           :src="cheminImage"
                           :title="nomPrenom"
                           :alt="nomPrenom"
                      >
                    </small>`
});

let CitationContenu = Vue.component('citation-contenu', {
  components: {
    CitationAuteur
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    titre: {
      type: String,
      required: true
    },
    texte: {
      type: String,
      required: true
    },
    auteur: {
      type: Object,
      required: true
    }
  },
  template:  `<div class="media-content">
                <div class="content">
                  <p>
                    <strong>
                      <a :href="url"
                         class="has-text-info"
                      >
                        {{ titre }}
                      </a>
                      <span class="tag is-small">#{{ id }}</span>
                    </strong>
                    <br>
                    {{ texte }}
                    <br>
                   <citation-auteur :auteur="auteur"></citation-auteur>
                  </p>
                </div>
              </div>`
});

let Citation = Vue.component('citation', {
  components: {
    CitationImage, CitationContenu
  },
  props: {
    citation: {
      type: Object,
      required: true
    }
  },
  methods: {
    voter: function () {
      this.citation.votes += 1
      // this.$emit('voter', this.citation.id)
    }
  },
  template:  `<article :class="{ 'blue-border': citation.votes >= 20 }" class="media">
                <citation-image :image="citation.image" 
                                :couleur="citation.couleur"
                                :titre="citation.titre"
                ></citation-image>
                <citation-contenu :id="citation.id"
                                  :url="citation.url"
                                  :titre="citation.titre"
                                  :texte="citation.texte"
                                  :auteur="citation.auteur"
                                 
                ></citation-contenu>
                <div class="media-right">
                      <span class="icon is-small">
                        <i @click="voter" class="fa fa-chevron-up"></i>
                        <strong class="has-text-info">{{ citation.votes }}</strong>
                      </span>
                </div>
              </article>`
});

let CitationForm = Vue.component('citation-form', {
  data: function() {
    return {
      citation: {
        titre: '',
        texte: '',
        url: '',
        votes: 0,
        image: '',
        couleur: '',
        auteur: {}
      },
      auteurId: 0,
      personnes: personnes
    }
  },
  methods: {
    ajouter: function() {
      this.citation.auteur = this.auteurComplet
      this.$emit('ajouter', this.citation)
    }
  },
  computed: {
    auteurComplet: function () {
      return this.personnes.find(auteur => auteur.id === this.auteurId);
    }
  },
  template:  `<form @submit.prevent="ajouter">
                <div class="field">
                  <label class="label">Titre</label>
                  <div class="control">
                    <input v-model="citation.titre"
                           class="input" type="text"
                           placeholder="Titre de votre citation">
                  </div>
                </div>
                
                <div class="field">
                  <label class="label">URL</label>
                  <div class="control">
                    <input v-model="citation.url"
                           class="input" type="text"
                           placeholder="Lien vers la citation">
                  </div>
                </div>
                
                <div class="field">
                  <label class="label">Texte</label>
                  <div class="control">
                    <textarea v-model="citation.texte"
                              class="textarea"
                              placeholder="Texte de votre citation"></textarea>
                  </div>
                </div>
                
                <div class="field">
                  <label class="label">Couleur de fond de l'image</label>
                  <div class="control">
                    <input v-model="citation.couleur"
                           class="input" type="text"
                           placeholder="#ff00ff">
                  </div>
                </div>
          
                <div class="field">
                  <div class="control">
                    <label class="radio">
                      <input v-model="citation.image"
                             value="Lion.png" 
                             type="radio" name="image">
                      <img src="./img/animaux/Lion.png">
                    </label>
                    <label class="radio">
                      <input v-model="citation.image"
                             value="Ours.png" 
                             type="radio" name="image">
                      <img src="./img/animaux/Ours.png">
                    </label>
                    <label class="radio">
                      <input v-model="citation.image"
                             value="Chameau.png" 
                             type="radio" name="image">
                      <img src="./img/animaux/Chameau.png">
                    </label>
                    <label class="radio">
                      <input v-model="citation.image"
                             value="Elephant.png" 
                             type="radio" name="image">
                      <img src="./img/animaux/Elephant.png">
                    </label>
                  </div>
                </div>
          
                <div class="field">
                  <label class="label">Auteur</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="auteurId">
                        <option disabled selected value="0">Sélectionner un auteur</option>
                        <option v-for="personne in personnes"
                                :key="personne.id"
                                :value="personne.id">{{ personne.nom }}</option>
                      </select>
                    </div>
                  </div>
                </div>
          
                <button class="button is-primary">Ajouter la citation</button>
              </form>`
});

let app = new Vue({
  el: '#app',
  components: {
    Citation
  },
  data: {
    citations: Data.citations
  },
  methods: {
    genererId: function () {
      let max = 0;
      for(let citation of this.citations) {
        if (citation.id > max) {
          max = citation.id;
        }
      }
      return max + 1;
    },
    ajouterCitation: function (citation) {
      let newCitation = {
        id: this.genererId(),
        titre: citation.titre,
        texte: citation.texte,
        url: citation.url,
        votes: citation.votes,
        image: citation.image,
        couleur: citation.couleur,
        auteur: citation.auteur
      }

      this.citations.push(newCitation)
    }
  },
  computed: {
    triParVotes: function () {
      return this.citations.sort((a, b) => {
        return b.votes - a.votes;
      });
    }
  }
});
