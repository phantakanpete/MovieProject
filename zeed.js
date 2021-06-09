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
    {
        name: "Cinema 1",
        showtime: ["17.30","19.30","20.30"],
        movie: "60c062b061711c2698b043e0",
        cinema: "60c0873f34b84e1f94bf6d99"
    },
    {
        name: "Cinema 2",
        showtime: ["10.30","11.30","12.30"],
        movie: "60c062b061711c2698b043e1",
        cinema: "60c0873f34b84e1f94bf6d99"
    },
    {
        name: "Cinema 3",
        showtime: ["11.00","13.00","15.00"],
        movie: "60c062b061711c2698b043e2",
        cinema: "60c0873f34b84e1f94bf6d99"
    }
];

const cinemalist = [
    {
        name: "Paradis Cinema Wall Sina",
        img: "https://img.wattpad.com/b0062755d42f3f37654e7df448ed87403eb8da0f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5378662d59686d32736d663876513d3d2d3330373538363637302e313437313531666535343339313533363731353734303738343932342e706e67?s=fit&w=720&h=720",
        desc: "It's just another one cinema"
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