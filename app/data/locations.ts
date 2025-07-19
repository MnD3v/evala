export interface Location {
  id: number;
  name: string;
  description: string;
  mainImage: string;
  images: string[];
}

export const locations: Location[] = [
  {
    id: 1,
    name: "Campement Allemand",
    description:
      "Découvrez ce lieu historique datant de la période coloniale allemande, offrant une vue imprenable sur la ville de Kara. Un site qui témoigne de l'histoire coloniale du Togo et qui est aujourd'hui un point d'intérêt touristique majeur.",
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FCampement-1.jpg?alt=media&token=c286f020-5015-4721-91f1-85b50faccb37",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FCampement-1.jpg?alt=media&token=c286f020-5015-4721-91f1-85b50faccb37",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FCampement-2.jpg?alt=media&token=d351fcb9-6e48-4841-bc13-96138a3757c3",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FCampement-3.jpeg?alt=media&token=31b6014d-2024-4233-b235-de8e22c149db",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FCampement-4.jpeg?alt=media&token=6c978909-64f7-4dcb-bb68-a84febebdb97"
    ]
  },
  {
    id: 2,
    name: "Hotel Kara",
    description:
      "Profitez d'un séjour confortable et authentique à l'Hotel Kara, situé au cœur de la région. Cet établissement offre un cadre idéal pour découvrir la culture locale et assister aux festivités de l'Evala tout en bénéficiant d'un service de qualité.",
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FHK-1.jpg?alt=media&token=49cc3745-2703-4751-9b5d-17678828a52b",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FHK-1.jpg?alt=media&token=49cc3745-2703-4751-9b5d-17678828a52b",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FHK-2.jpg?alt=media&token=e0dab163-89a1-46cf-941f-d11369ebdb63"
    ]
  },
  {
    id: 3,
    name: "GerinKouka",
    description:
      "Explorez GerinKouka, un site naturel exceptionnel de la région de Kara offrant des paysages à couper le souffle. Cette destination unique combine beauté naturelle et patrimoine culturel, idéale pour les amateurs de nature et d'authenticité.",
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FKouka-1.jpg?alt=media&token=db10f02e-5962-434a-ac29-5eeff8377e14",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FKouka-1.jpg?alt=media&token=db10f02e-5962-434a-ac29-5eeff8377e14",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FKouka-2.jpg?alt=media&token=94148440-1bbe-4847-b6ff-660132e6b8e4",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FKouka-3.jpg?alt=media&token=2819dce1-dd73-4050-8439-8ce466d8e254"
    ]
  },
  {
    id: 4,
    name: "Monument de l'Indépendance Bafilo",
    description:
      "Découvrez le Monument de l'Indépendance de Bafilo, symbole de la liberté et de l'histoire du Togo. Ce monument emblématique commémore l'indépendance du pays et constitue un lieu de mémoire important pour comprendre l'héritage historique de la nation togolaise.",
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FMonument-1.jpg?alt=media&token=73130ace-3316-4a41-98e0-0e013fe0574f",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FMonument-1.jpg?alt=media&token=73130ace-3316-4a41-98e0-0e013fe0574f",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FMonument-2.jpg?alt=media&token=e07a2474-3c71-4390-a3a7-2f7a133f9c6f",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FMonument-3.jpg?alt=media&token=ccaaef84-99bd-4e6c-8413-79ef30698762"
    ]
  },
  {
    id: 5,
    name: "Palais des congrès",
    description:
      "Visitez le Palais des congrès de Kara, infrastructure moderne dédiée aux événements culturels et institutionnels. Ce lieu prestigieux accueille régulièrement des conférences, spectacles et célébrations, incarnant le dynamisme contemporain de la région.",
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FPalais-1.jpg?alt=media&token=be902e8a-1046-4435-bfb6-f3106f5b1f98",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FPalais-1.jpg?alt=media&token=be902e8a-1046-4435-bfb6-f3106f5b1f98",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FPalais-2.jpg?alt=media&token=b019b467-c289-4a06-9f84-0ef48b6b4dc2",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2FPalais-3.jpg?alt=media&token=9bd14f82-ea7a-4646-b640-6aa3d6c41e09"
    ]
  },
  {
    id: 6,
    name: "HAUTS FOURNEAUX DE BANDJELI",
    description:
      "Explorez les Hauts Fourneaux de Bandjeli, vestiges fascinants du patrimoine industriel de la région de Kara. Ces structures historiques témoignent de l'activité sidérurgique traditionnelle et représentent un site archéologique et culturel unique au Togo.",
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2Ffourneaux-1.jpg?alt=media&token=a01d47a3-f7ae-4e8b-9899-9f35c9662094",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2Ffourneaux-1.jpg?alt=media&token=a01d47a3-f7ae-4e8b-9899-9f35c9662094",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2Ffourneaux-2.jpg?alt=media&token=bccc884e-6ac2-4ca4-9f97-2fb85fae6d7d",
      "https://firebasestorage.googleapis.com/v0/b/moger-pro.appspot.com/o/images%2Ffourneaux-3.jpg?alt=media&token=e38a4e01-3f38-4f92-9eb3-84e71d29a387"
    ]
  }
]; 