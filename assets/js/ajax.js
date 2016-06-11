var arrSingers = ['Mariah Carey','Beyonce','Micheal Jackson','Taylor Swift','Prince','Backsteert Boys','Madona','Justin Beiber','Demi Lovato','Rihanna','Miley Cyrus'];

            var addSingerBtn = function(singer){
                var btn = $("<button>");
                btn.attr("data-person", singer);
                btn.attr("class","singer");
                btn.html(singer);
                $("#buttons").append(btn);

            };

            var addAllButtons = function(){
                for(var i=0;i<arrSingers.length;i++){
                    addSingerBtn(arrSingers[i]);
                }
            };

            addAllButtons();

            $("#btnAdd").on("click", function(){
                addSingerBtn($("#newSinger").val());
            });

            $('#buttons').on('click', "button", function() {
                var p = $(this).data('person');
                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

                $.ajax({
                        url: queryURL,
                        method: 'GET'
                    })
                    .done(function(response) {
                        var results = response.data;
                        $('#gifsAppearHere').html('');
                        for (var i = 0; i < results.length; i++) {
                            var gifDiv = $('<div class="item">')

                            var rating = results[i].rating;

                            var p = $('<p>').text("Rating: " + rating);

                            var personImage = $('<img>');
                            var animated = results[i].images.fixed_height.url;
                            var still = results[i].images.fixed_height_still.url;

                            personImage.attr('src', still);
                            personImage.attr('data-still', still);
                            personImage.attr('data-animated', animated);

                            personImage.on("click", function(){
                                var clickedImg = $(this);
                                var still = clickedImg.data('still');
                                var animated = clickedImg.data('animated');
                                var src = clickedImg.attr('src');

                                if(src === still) {
                                    clickedImg.attr('src', animated);
                                } else {
                                    clickedImg.attr('src', still);
                                }
                            });

                            gifDiv.append(personImage);
                            gifDiv.append(p);

                            $('#gifsAppearHere').prepend(gifDiv);
                        }

                    });
            });