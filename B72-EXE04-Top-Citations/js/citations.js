window.Data = (function () {
  const citations = [
    {
      id: 1,
      titre: 'L\'ours',
      texte: 'Il ne faut pas vendre la peau de l\'ours avant de l\'avoir tué.',
      url: 'https://citation-celebre.leparisien.fr/citations/49179',
      votes: 16,
      image: 'Ours.png',
      couleur: '#ffeedb',
      auteur: {
        prenom: 'Daniel',
        nom: 'Le Blanc',
        avatar: 'daniel.jpg',
      }
    },
    {
      id: 2,
      titre: 'Le chameau',
      texte: 'L\'hirondelle ne fait pas le printemps, mais le chameau fait le désert.',
      url: 'https://citation-celebre.leparisien.fr/citations/40371',
      votes: 11,
      image: 'Chameau.png',
      couleur: '#4c3b4d',
      auteur: {
        prenom: 'Kristy',
        nom: 'Lavilla',
        avatar: 'kristy.png'
      }
    },
    {
      id: 3,
      titre: 'Le lion',
      texte: 'N\'imitez rien ni personne. Un lion qui copie un lion devient un singe.',
      url: 'https://citation-celebre.leparisien.fr/citations/50390',
      votes: 17,
      image: 'Lion.png',
      couleur: '#a53860',
      auteur: {
        prenom: 'Veronika',
        nom: 'Smith',
        avatar: 'veronika.jpg'
      }
    },
    {
      id: 4,
      titre: 'L\'éléphant',
      texte: 'Un énorme éléphant n\'a pas toujours d\'énormes défenses.',
      url: 'https://citation-celebre.leparisien.fr/citations/20292',
      votes: 9,
      image: 'Elephant.png',
      couleur: '#61c9a8',
      auteur: {
        prenom: 'Molly',
        nom: 'Müller',
        avatar: 'molly.png'
      }
    }
  ];

  return { citations: citations };
}());
