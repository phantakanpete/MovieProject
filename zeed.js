const mongoose = require('mongoose');
const Movie = require('./models/movie');
const Promotion = require('./models/promotion');
const Theatre  = require('./models/theatre');
const Cinema  = require('./models/cinema');

const list = [
    {
        name: "The Batman",
        image: "https://i.pinimg.com/originals/95/45/b2/9545b266a6a53d0d43c3bbab4e2f4cca.jpg",
        reldate: "2022-03-04",
        genre: "Action, Thriller",
        rate: "18",
        duration: "XX Mins",
        desc: "In his second year of fighting crime, Batman explores the corruption that plagues Gotham City and how it may tie to his own family, in addition to coming into conflict with a serial killer known as the Riddler.",
        trailer: "https://youtube.com/embed/NLOp_6uPccQ"
    },
    {
        name: "The King's Man",
        image: "https://www.joblo.com/assets/images/joblo/posters/2019/07/the-kings-man-poster.jpg",
        reldate: "2021-12-22",
        genre: "Action, Thriller",
        rate: "18",
        duration: "XX Mins",
        desc: "In the early years of the 20th century, the Kingsman agency is formed to stand against a cabal plotting a war to wipe out millions.",
        trailer: "https://youtube.com/embed/5zdBG-iGfes"
    },
    {
        name: "Black Widow",
        image: "https://www.joblo.com/assets/images/joblo/posters/2020/03/2EF9FAE7-B888-4DBA-868D-B4E289BAE769.jpeg",
        reldate: "2021-07-19",
        genre: "Action, Sci-Fi",
        rate: "13",
        duration: "133 Mins",
        desc: "Following the events of Captain America: Civil War (2016), Natasha Romanoff finds herself alone and forced to confront a dangerous conspiracy with ties to her past. Pursued by a force that will stop at nothing to bring her down, Romanoff must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.",
        trailer: "https://youtube.com/embed/Fp9pNPdNwjI"
    },
    {
        name: "No time to die",
        image: "https://www.joblo.com/assets/images/joblo/posters/2020/03/no_time_to_die_poster7.jpg",
        reldate: "2021-05-17",
        genre: "Action, Thriller",
        rate: "13",
        duration: "163 Mins",
        desc: "Five years after the capture of Ernst Stavro Blofeld, James Bond has left active service. He is approached by his friend and CIA officer Felix Leiter, who enlists his help in the search for Valdo Obruchev, a missing scientist. When it becomes apparent that Obruchev has been abducted, Bond must confront a villain whose schemes could see the death of millions.",
        trailer: "https://youtube.com/embed/BIhNsAtPbPI"
    },
    {
        name: "Tenet",
        image: "https://www.joblo.com/assets/images/joblo/posters/2020/08/teneposterfinal7.jpg",
        reldate: "2021-01-02",
        genre: "Action, Thriller",
        rate: "13",
        duration: "150 Mins",
        desc: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
        trailer: "https://youtube.com/embed/AZGcmvrTX9M"
    },
    {
        name: "Godzilla vs Kong",
        image: "https://www.joblo.com/assets/images/joblo/posters/2021/03/godzilla-kong-poster.jpg",
        reldate: "2021-04-14",
        genre: "Action, Thriller",
        rate: "13",
        duration: "113 Mins",
        desc: "The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against one another - the fearsome Godzilla and the mighty Kong - with humanity caught in the balance.",
        trailer: "https://youtube.com/embed/odM92ap8_c0"
    },
    {
        name: "Mortal Kombat",
        image: "https://www.joblo.com/assets/images/joblo/posters/2021/03/mortal-kombat-2021-poster-group.jpg",
        reldate: "2021-05-05",
        genre: "Action, Thriller, Sci-Fi",
        rate: "18",
        duration: "110 Mins",
        desc: "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.",
        trailer: "https://youtube.com/embed/NYH2sLid0Zc"
    },
    {
        name: "Zack Snyder's Justice League",
        image: "https://www.joblo.com/assets/images/joblo/posters/2021/03/Zack-Snyder-Justice-League-Poster-Key-Art.jpg",
        reldate: "2021-02-14",
        genre: "Action, Adventure, Fantasy",
        rate: "18",
        duration: "242 Mins",
        desc: "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
        trailer: "https://youtube.com/embed/vM-Bja2Gy04"
    },
    {
        name: "The Suicide Squad",
        image: "https://www.joblo.com/assets/images/joblo/posters/2021/03/The-Suicide-Squad-poster-913.jpg",
        reldate: "2021-08-21",
        genre: "Action, Comedy",
        rate: "18",
        duration: "XX Mins",
        desc: "Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.",
        trailer: "https://youtube.com/embed/vBumm7mYT_0"
    }
];

const promolist = [
    {
        title: "Buy double tickets free 1 popcorn",
        image: "https://image.freepik.com/vecteurs-libre/illustration-du-film-popcorn-soda-emporter-lunettes-cinema-3d-billets-conception-cinema-dans-style-plat_185107-97.jpg",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        movie: ["Mortal Kombat","The Batman","The Suicide Squad"],
        utldate: "2021-12-07",
        branch: "All branches in Paradis Inc."
    },
    {
        title: "Buy 2 ticket and free 1 chowkwuay cha-kang-rao",
        image: "https://image.freepik.com/vecteurs-libre/illustration-du-film-popcorn-soda-emporter-lunettes-cinema-3d-billets-conception-cinema-dans-style-plat_185107-97.jpg",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        movie: ["Tenet"],
        utldate: "2021-06-07",
        branch: "All branches in Paradis Inc."
    },
    {
        title: "Buy 3 Chowkwuay cha-kang-rao get free 1 ticket",
        image: "https://image.freepik.com/vecteurs-libre/illustration-du-film-popcorn-soda-emporter-lunettes-cinema-3d-billets-conception-cinema-dans-style-plat_185107-97.jpg",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        movie: ["Black Widow","Godzilla vs Kong"],
        utldate: "2021-05-31",
        branch: "All branches in Paradis Inc."
    },
    {
        title: "Who come with cosplay costume get free tickets",
        image: "https://image.freepik.com/vecteurs-libre/illustration-du-film-popcorn-soda-emporter-lunettes-cinema-3d-billets-conception-cinema-dans-style-plat_185107-97.jpg",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        movie: ["Attack on Titan: Chronicle"],
        utldate: "2021-05-30",
        branch: "All branches in Paradis Inc."
    },
    {
        title: "Buy 2 ticket free 1 popcorn",
        image: "https://image.freepik.com/vecteurs-libre/illustration-du-film-popcorn-soda-emporter-lunettes-cinema-3d-billets-conception-cinema-dans-style-plat_185107-97.jpg",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        movie: ["Mortal Kombat","The Batman"],
        utldate: "2021-7-07",
        branch: "All branches in Paradis Inc."
    },
    {
        title: "Buy 2 ticket free 1 popcorn",
        image: "https://image.freepik.com/vecteurs-libre/illustration-du-film-popcorn-soda-emporter-lunettes-cinema-3d-billets-conception-cinema-dans-style-plat_185107-97.jpg",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        movie: ["Mortal Kombat","The Batman"],
        utldate: "2021-7-07",
        branch: "All branches in Paradis Inc."
    },
    {
        title: "Buy 2 ticket free 1 popcorn",
        image: "https://image.freepik.com/vecteurs-libre/illustration-du-film-popcorn-soda-emporter-lunettes-cinema-3d-billets-conception-cinema-dans-style-plat_185107-97.jpg",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        movie: ["Mortal Kombat","The Batman"],
        utldate: "2021-7-07",
        branch: "All branches in Paradis Inc."
    },
    {
        title: "Buy 2 ticket free 1 popcorn",
        image: "https://image.freepik.com/vecteurs-libre/illustration-du-film-popcorn-soda-emporter-lunettes-cinema-3d-billets-conception-cinema-dans-style-plat_185107-97.jpg",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        movie: ["Mortal Kombat","The Batman","Wonder Woman"],
        utldate: "2021-7-07",
        branch: "All branches in Paradis Inc."
    }
];

const theatrelist = [
    //sina cinema
    {
        name: "Cinema 1",
        showtime: ["07:30","15:30","20:00"],
        movie: "60c062b061711c2698b043e0",
        cinema: "60c09f0f81fbfb20d0553fda"
    }
    // {
    //     name: "Cinema 2",
    //     showtime: ["10.30","15.30","20.30"],
    //     movie: "60c062b061711c2698b043e1",
    //     cinema: "60c09f0f81fbfb20d0553fda"
    // },
    // {
    //     name: "Cinema 3",
    //     showtime: ["11.00","16.00","21.00"],
    //     movie: "60c062b061711c2698b043e2",
    //     cinema: "60c09f0f81fbfb20d0553fda"
    // },
    // {
    //     name: "Cinema 4",
    //     showtime: ["11.00","16.00","21.00"],
    //     movie: "60c062b061711c2698b043e3",
    //     cinema: "60c09f0f81fbfb20d0553fda"
    // },
    // {
    //     name: "Cinema 5",
    //     showtime: ["11.00","16.00","21.00"],
    //     movie: "60c062b061711c2698b043e4",
    //     cinema: "60c09f0f81fbfb20d0553fda"
    // },
    // {
    //     name: "Cinema 6",
    //     showtime: ["11.00","16.00","21.00"],
    //     movie: "60c062b061711c2698b043e5",
    //     cinema: "60c09f0f81fbfb20d0553fda"
    // },
    // {
    //     name: "Cinema 7",
    //     showtime: ["11.00","16.00","21.00"],
    //     movie: "60c062b061711c2698b043e6",
    //     cinema: "60c09f0f81fbfb20d0553fda"
    // },
    // {
    //     name: "Cinema 8",
    //     showtime: ["11.00","16.00","21.00"],
    //     movie: "60c062b061711c2698b043e7",
    //     cinema: "60c09f0f81fbfb20d0553fda"
    // },
    // {
    //     name: "Cinema 9",
    //     showtime: ["11.00","16.00","21.00"],
    //     movie: "60c062b061711c2698b043e8",
    //     cinema: "60c09f0f81fbfb20d0553fda"
    // },
    // //rose cinema
    // {
    //     name: "Cinema 1",
    //     showtime: ["10.30","15.30","20.30"],
    //     movie: "60c062b061711c2698b043e0",
    //     cinema: "60c09f0f81fbfb20d0553fdb"
    // },
    // {
    //     name: "Cinema 2",
    //     showtime: ["10.30","15.30","20.30"],
    //     movie: "60c062b061711c2698b043e6",
    //     cinema: "60c09f0f81fbfb20d0553fdb"
    // },
    // {
    //     name: "Cinema 3",
    //     showtime: ["10.30","15.30","20.30"],
    //     movie: "60c062b061711c2698b043e7",
    //     cinema: "60c09f0f81fbfb20d0553fdb"
    // },
    // {
    //     name: "Cinema 4",
    //     showtime: ["10.30","15.30","20.30"],
    //     movie: "60c062b061711c2698b043e8",
    //     cinema: "60c09f0f81fbfb20d0553fdb"
    // },
    // {
    //     name: "Cinema 5",
    //     showtime: ["10.30","15.30","20.30"],
    //     movie: "60c062b061711c2698b043e3",
    //     cinema: "60c09f0f81fbfb20d0553fdb"
    // },
    // {
    //     name: "Cinema 6",
    //     showtime: ["10.30","15.30","20.30"],
    //     movie: "60c062b061711c2698b043e4",
    //     cinema: "60c09f0f81fbfb20d0553fdb"
    // },
    // //maria cinema
    // {
    //     name: "Cinema 1",
    //     showtime: ["12.00","17.00","21.00"],
    //     movie: "60c062b061711c2698b043e7",
    //     cinema: "60c09f0f81fbfb20d0553fdc"
    // },
    // {
    //     name: "Cinema 2",
    //     showtime: ["12.00","17.00","21.00"],
    //     movie: "60c062b061711c2698b043e8",
    //     cinema: "60c09f0f81fbfb20d0553fdc"
    // },
    // {
    //     name: "Cinema 3",
    //     showtime: ["12.00","17.00","21.00"],
    //     movie: "60c062b061711c2698b043e1",
    //     cinema: "60c09f0f81fbfb20d0553fdc"
    // },
    // {
    //     name: "Cinema 4",
    //     showtime: ["12.00","17.00","21.00"],
    //     movie: "60c062b061711c2698b043e2",
    //     cinema: "60c09f0f81fbfb20d0553fdc"
    // }
];

const cinemalist = [
    {
        name: "Paradis Cinema Wall Sina",
        img: "https://qph.fs.quoracdn.net/main-qimg-26bdface26f01e9affea2008966a2261",
        desc: "The people who live here are the rich people. The King’s palace is here, too. It’s the last line of defence for humanity against the Titans. The cities of wall Sina are protected by the Military Police, who work under the King. The Underground cities are poorer and prone to criminal activity."
    },
    {
        name: "Paradis Cinema Wall Rose",
        img: "https://qph.fs.quoracdn.net/main-qimg-bdbaf2c9e7af3e8d1ffb89b3214da0f5",
        desc: "Wall Rose is the wall that protects the middle class people. The residents here live in neither poverty, nor luxury. This wall is the second line of defence for humanity against the Titans."
    },
    {
        name: "Paradis Cinema Wall Maria",
        img: "https://qph.fs.quoracdn.net/main-qimg-c48cae7aca5eac4c164aeb24e64744eb",
        desc: "Wall Maria is the wall that protects the lower class people basically the poor people from Titans. The residents who live there live more difficult lives than the people in the other walls, and, should the walls ever be breached one day, would be in the most danger from Titans."
    }
];

function zeedDB(){
    // Movie.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log('Remove completed');
    //         list.forEach(function(zeed){
    //             Movie.create(zeed, function(err, movie){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     console.log('Add completed');
    //                 }    
    //             });
    //         });
    //     }
    // });
    // Promotion.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log('Remove completed');
    //         promolist.forEach(function(zeed){
    //             Promotion.create(zeed, function(err, promotion){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     console.log('Add completed');
    //                 }    
    //             });
    //         });
    //     }
    // });
    // Cinema.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log('Remove completed');
    //         cinemalist.forEach(function(zeed){
    //             Cinema.create(zeed, function(err, cinema){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     console.log('Add completed');
    //                 }    
    //             });
    //         });
    //     }
    // });
    Theatre.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Remove completed');
            theatrelist.forEach(function(zeed){
                Theatre.create(zeed, function(err, theatre){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Add completed');
                    }    
                });
            });
        }
    });
}

module.exports = zeedDB;