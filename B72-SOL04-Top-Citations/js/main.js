let app = new Vue({
  el: '#app',
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
