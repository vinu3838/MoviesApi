// main document ready function to check if dom is loaded fully or not
//image, Ratings to be handled


var i = 0;
var MoviesArr=[];
$(document).ready(() => {


    $('.container .response').hide();
$('.modal').css('display','none');
    $("#datepicker").datepicker({
        inline: true
    });
    $('.search').on('click', function() {

        getAllDetails();
    })
	$(document).on('keypress', function(event) {
	if (event.keyCode==13)
	{

        getAllDetails();
		}
    })

});

		let MovieSearch= (respons, MoviesAr)=> {
    let k;
    for (k = 0; k < MoviesAr.length; k++) {
	
        if (MoviesAr[k]['imdbID'] ==(respons['imdbID'])) {
		console.log(MoviesAr[k]);
            return true;
			break;
        }
    }
    return false;
}

let getAllDetails = () => {
 let title = $('#title').val();
 let Imdb = $('#Imdb').val();
 let year= parseInt($('#Year').val());

if((title==''||title=='')&&(Imdb==''||Imdb==''))
{
alert ("Title and IMDB ID both can't be null, Enter one of them");
}
else if(((parseInt(year) < 1111 || parseInt(year) > 9999) || isNaN(year) ) && (($('#Year').val()) !=""))
{

alert ("Enter a valid year");
}
else
{
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'http://www.omdbapi.com/?t='+title+'&i='+Imdb+'&y='+($('#Year').val())+'&apikey=6c8eeacc',

        success: (response) => {
		


let result= MovieSearch(response,MoviesArr);
		
            
            if (response['Response'] == 'False') {
			
			
               $('#dialog p').empty();
                if (i == 0) {
                    $('.container .response').hide();
                }
                $('#dialog p').append('<b>Error:  <b>' + response['Error']);
                $("#dialog").dialog().show();
			  
	
             
            }
			
           else if(result)
		   {
		  
		   alert("Check for "+response['Title']+' in Previous Searchs');
		   }

			else {
			$("#dialog").dialog().show();
			$("#dialog").dialog('close');
                console.log(response);


                if (i == 0) {
                 
                    null;
                } else {
                   
                    var $PrevSearch = $('.container .response').clone();

                    if (i == 1) {
                        
                        $PrevSearch.css('display', '');

                        $('#Previous').append($PrevSearch);
                    } else {

                        $PrevSearch.attr('class', 'item').css('display', '');
                        $PrevSearch.attr('class', 'item').css('border-style', 'ridge');
						//$PrevSearch.attr('class', 'item').css('background-color', '#fff');
						 
                        $PrevSearch.addClass('m-5');
                        $('.carousel-inner').append($PrevSearch);
                    }




                }


                i++;

                $(' .container .response #info p').empty();
                $('.container .response .card .card-body .card-title').empty();
                $('.container .response').show();
                $('.container .response .card .card-body .card-title').append(response['Title']);
                $('.container .response #info p').empty();
                let imgSrc;
                if (response['Poster'] == "N/A") {
                    imgSrc = 'data:image/jpeg;base64,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';
                } else {
                    imgSrc = response['Poster'];
                }
              
                $('.container .response .card .card-img-fluid').attr('src', imgSrc);

                $('.container .response #info p').append('<b>Year: </b>' + response['Year'] +
                    '</br><b>Date of Release: ' +
                    '</b>' + response['Released'] +
                    '</br><b>Rated: </b>' + response['Rated'] +
                    '</br><b>Runtime: </b>' + response['Runtime'] +
                    '</br><b>Genre: </b>' + response['Genre'] +
                    '</br><b>Director: </b>' + response['Director'] +
                    '</br><b>Writer: </b>' + response['Writer'] +
                    '</br><b>Actors: </b>' + response['Actors'] +
                    '</br><b>Plot: </b>' + response['Plot'] +
                    '</br><b>Language: </b>' + response['Language'] +
                    '</br><b>Country: </b>' + response['Country'] +
                    '</br><b>Awards: </b>' + response['Awards'] +
                    '</br><b>Metascore: </b>' + response['Metascore'] +
                    '</br><b>Imdb Rating: </b>' + response['imdbRating'] +
                    '</br><b>Imdb Votes: </b>' + response['imdbVotes'] +
                    '</br><b>Imdb ID: </b>' + response['imdbID'] +
                    '</br><b>Type: </b>' + response['Type'] +
                    '</br><b>DVD: </b>' + response['DVD'] +
                    '</br><b>BoxOffice: </b>' + response['BoxOffice'] +
                    '</br><b>Production: </b>' + response['Production'] +
                    '</br><b>Website: </b>' + response['Website'])

                if (response['Ratings'].length == 0) {
                    $('.container .response #info p').append('</br><b>Ratings: </b> N/A')
                } else {
                    $('.container .response #info p').append('</br><b>Ratings: </b><ul>')
                    for (arr of response['Ratings']) {

                        $('.container .response #info p').append('<li>' + arr['Source'] + ': ' + arr['Value'] + '</li>')
                    }
                    $('.container .response #info p').append('</ul>')
                }

                $('.container .response').show();


 MoviesArr.push(response);
 console.log(MoviesArr);
            }
        },
        error: (err) => {
            $('.container .response').hide();

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        }

    });
}
}
