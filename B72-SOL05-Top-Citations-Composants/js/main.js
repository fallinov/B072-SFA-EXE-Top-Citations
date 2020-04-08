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

let app = new Vue({
  el: '#app',
  components: {
    Citation
  },
  data: {
    citations: Data.citations
  },
  computed: {
    triParVotes: function () {
      return this.citations.sort((a, b) => {
        return b.votes - a.votes;
      });
    }
  }
});
