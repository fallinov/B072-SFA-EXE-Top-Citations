let CitationImage = Vue.component('citation-image', {
  props: {
    image: {
      type: String,
      required: true
    },
    titre: {
      type: String,
      required: true
    },
    couleur: {
      type: String,
      required: true
    }
  },
  computed: {
    cheminImage: function () {
      return './img/animaux/' + this.image
    },
    bgColor: function () {
      return 'background-color:' + this.couleur
    }
  },
  methods: {

  },
  template: `<figure class="media-left">
                <img class="image is-64x64"
                     :src="cheminImage"
                     :alt="titre"
                     :style="bgColor"
                >
              </figure>`


})





let app = new Vue({
  el: '#app',
  components: {
    CitationImage
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
  },
  methods: {
    voter: function (idCitation) {
      // Recherche la citation
      let citationChoisie = this.citations.find(obj => {
        return obj.id === idCitation
      });
      // Ajoute un vote à la citation
      citationChoisie.votes += 1;
    }
  }
});
